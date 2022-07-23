/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Copyright 2021 Aaron Fenyes

This file is part of Typomatic.

Typomatic is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Typomatic is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Typomatic.  If not, see <http://www.gnu.org/licenses/>.

 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

class Typomatic {
  // resources
  resources
  
  // interface
  audioContext
  display
  inputField
  playButton
  tempoRange
  tempoDisp
  muteButton
  ruleEditor
  rulesButton
  msgBar
  code
  errorSummary
  rulesRevised
  
  // settings
  beat
  halfBeat
  soundOn = true
  
  // data and instructions
  str
  rules = []
  
  // execution
  stepInterval = null
  stepping = false
  
  constructor(
    audioContext,
    display,
    input,
    inputButton,
    stepButton,
    playButton,
    tempoRange,
    tempoDisp,
    muteButton,
    ruleEditor,
    rulesButton,
    msgBar
  ) {
    // set up sounds and colors
    this.resources = new ResourceKit(audioContext)
    
    // store the interface elements we'll need later
    this.audioContext = audioContext
    this.display = display
    this.inputField = inputField
    this.playButton = playButton
    this.tempoRange = tempoRange
    this.tempoDisp = tempoDisp
    this.muteButton = muteButton
    this.ruleEditor = ruleEditor
    this.rulesButton = rulesButton
    this.msgBar = msgBar
    
    // set up event listeners
    input.addEventListener('keypress', this.inputKeyPress.bind(this))
    inputButton.addEventListener('click', this.loadInput.bind(this))
    stepButton.addEventListener('click', this.blockingStep.bind(this))
    playButton.addEventListener('click', this.togglePlay.bind(this))
    tempoRange.addEventListener('input', this.showTempo.bind(this))
    tempoRange.addEventListener('change', this.changeTempo.bind(this))
    muteButton.addEventListener('click', this.toggleSound.bind(this))
    ruleEditor.addEventListener('input', this.compareCode.bind(this))
    rulesButton.addEventListener('click', this.loadRules.bind(this))
    
    // initialize display and tempo
    this.loadInput()
    this.showTempo()
    this.changeTempo()
    this.loadRules(); // this initializes `rulesRevised` to `false`
  }
  
  updateDisplay() {
    // clear the display
    var display = this.display
    while (display.firstChild) {
      display.removeChild(display.lastChild)
    }
    
    // fill the display with the working string
    display.appendChild(document.createTextNode(this.str))
  }
  
  inputKeyPress(event) {
    if (event.keyCode === 13) this.loadInput()
  }
  
  loadInput() {
    this.str = this.inputField.value
    this.updateDisplay()
  }
  
  showTempo() {
    let tempoStr = this.tempoRange.value + ' bpm';
    if (this.tempoDisp.firstChild) {
      this.tempoDisp.removeChild(this.tempoDisp.lastChild);
    }
    this.tempoDisp.appendChild(document.createTextNode(tempoStr));
  }
  
  changeTempo() {
    var playing = this.stop(false)
    var tempo = this.tempoRange.value
    this.beat = Math.round(6e4/tempo)
    this.halfBeat = Math.round(3e4/tempo)
    if (playing) this.play(false)
  }
  
  toggleSound() {
    if (this.soundOn) this.muteButton.classList.add('pressed')
    else this.muteButton.classList.remove('pressed')
    this.soundOn = !this.soundOn
  }
  
  compareCode() {
    let code = this.ruleEditor.getValue();
    let rulesRevised = code.length > 10000 || code !== this.code;
    this.rulesButton.disabled = !rulesRevised;
    if (this.rulesRevised !== rulesRevised) {
      this.rulesRevised = rulesRevised;
      if (rulesRevised) {
        this.setMsg('Click “Load rules” to use revisions');
      } else {
        this.showRuleStatus();
      }
    }
  }
  
  setMsg(msg) {
    if (this.msgBar.firstChild) {
      this.msgBar.removeChild(this.msgBar.lastChild);
    }
    this.msgBar.appendChild(document.createTextNode(msg));
  }
  
  showRuleStatus() {
    if (this.errorSummary === false) {
      if (this.rules.length === 0) {
        this.setMsg('No rules loaded');
      } else {
        this.setMsg('Rules loaded');
      }
    } else {
      this.setMsg(this.errorSummary);
    }
  }
  
  loadRules() {
    let freshRules = []
    let errors = []
    let code = ruleEditor.getValue()
    let lines = code.replace(/\r/g, '').split('\n')
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i]
      try {
        if (line !== '' && !/^\s\s.*/.test(line)) {
          freshRules.push(new Rule(line, this.resources))
        }
      } catch (errorMsg) {
        errors.push({
          row: i,
          column: 0,
          text: errorMsg,
          type: 'error'
        });
      }
    }
    if (errors.length === 0) {
      // set rules
      this.rules = freshRules
      
      // report no errors
      this.ruleEditor.session.clearAnnotations();
      this.errorSummary = false;
      
      // set GUI to okay mode
      this.rulesButton.classList.remove('error');
      this.msgBar.classList.remove('error');
    } else {
      // report errors
      this.ruleEditor.session.setAnnotations(errors);
      this.errorSummary = 'Can’t load rules: '
      if (errors.length === 1) {
        this.errorSummary += `error on line ${errors[0].row + 1}`
      } else {
        this.errorSummary += `errors on lines ${errors[0].row + 1}`
        for (let m = 1; m < errors.length; m++) {
          this.errorSummary += `, ${errors[m].row + 1}`
        }
      }
      
      // set GUI to error mode
      this.rulesButton.classList.add('error');
      this.msgBar.classList.add('error');
    }
    
    // report status
    this.showRuleStatus();
    
    // save code for comparison
    this.code = code;
    this.rulesRevised = false;
    this.rulesButton.disabled = true;
  }
  
  // carry out an execution step, and report whether execution is finished
  step() {
    for (var i = 0; i < this.rules.length; i++) {
      var rule = this.rules[i]
      if (rule.apply(this)) {
        // stop execution iff the rule we just applied is a stopping rule
        return rule.stop
      }
    }
    return true // stop execution, since no rules apply
  }
  
  // this wrapper for `step` won't run if it's already running
  blockingStep() {
    if (!this.stepping) {
      this.stepping = true
      var stop = this.step()
      this.stepping = false
      return stop
    } else {
      // don't stop execution, since we didn't get a chance to to step
      return false
    }
  }
  
  // this wrapper for `blockingStep` stops execution if appropriate
  stoppingStep() {
    if (this.blockingStep()) this.stop()
  }
  
  // try to start execution, and report whether we succeeded
  play(show = true) {
    if (this.stepInterval === null) {
      if (show && this.blockingStep()) { // if `show`, execute the first step immediately
        this.stop()
      } else {
        this.stepInterval = setInterval(this.stoppingStep.bind(this), this.beat)
        if (show) this.playButton.classList.add('pressed')
      }
      return true
    } else {
      return false
    }
  }
  
  // try to stop execution, and report whether we succeeded
  stop(show = true) {
    if (this.stepInterval !== null) {
      clearInterval(this.stepInterval)
      this.stepInterval = null
      if (show) this.playButton.classList.remove('pressed')
      return true
    } else {
      return false
    }
  }
  
  // toggle execution
  togglePlay() {
    if (!this.play()) this.stop()
  }
}
