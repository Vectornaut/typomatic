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
  ruleEditor
  msgArea
  rulesButton
  code
  
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
  
  constructor(audioContext, display, input, inputButton, stepButton, playButton, tempoRange, tempoDisp, ruleEditor, msgArea, rulesButton, tabButton) {
    // set up sounds and colors
    this.resources = new ResourceKit(audioContext)
    
    // store the interface elements we'll need later
    this.audioContext = audioContext
    this.display = display
    this.inputField = inputField
    this.playButton = playButton
    this.tempoRange = tempoRange
    this.tempoDisp = tempoDisp
    this.ruleEditor = ruleEditor
    this.msgArea = msgArea
    this.rulesButton = rulesButton
    
    // set up event listeners
    input.addEventListener('keypress', this.inputKeyPress.bind(this))
    inputButton.addEventListener('click', this.loadInput.bind(this))
    stepButton.addEventListener('click', this.blockingStep.bind(this))
    playButton.addEventListener('click', this.togglePlay.bind(this))
    tempoRange.addEventListener('input', this.showTempo.bind(this))
    tempoRange.addEventListener('change', this.changeTempo.bind(this))
    ruleEditor.addEventListener('input', this.compareCode.bind(this))
    ruleEditor.addEventListener('scroll', this.syncMsgs.bind(this))
    rulesButton.addEventListener('click', this.loadRules.bind(this))
    tabButton.addEventListener('click', this.insertTab.bind(this))
    
    // initialize display and tempo
    this.loadInput()
    this.showTempo()
    this.changeTempo()
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
    this.tempoDisp.innerHTML = this.tempoRange.value + ' bpm'
  }
  
  changeTempo() {
    var playing = this.stop(false)
    var tempo = this.tempoRange.value
    this.beat = Math.round(6e4/tempo)
    this.halfBeat = Math.round(3e4/tempo)
    if (playing) this.play(false)
  }
  
  compareCode() {
    this.rulesButton.disabled = this.ruleEditor.value.length < 10000 && this.ruleEditor.value === this.code
  }
  
  syncMsgs() {
    this.msgArea.scrollTop = this.ruleEditor.scrollTop
  }
  
  loadRules() {
    var freshRules = []
    var success = true
    var lines = ruleEditor.value.replace(/\r/g, '').split('\n')
    this.msgArea.value = ''
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i]
      try {
        if (line !== '' && !/^\s\s.*/.test(line)) {
          freshRules.push(new Rule(line, this.resources))
        }
      } catch (errorMsg) {
        this.msgArea.value += errorMsg
        success = false
      }
      this.msgArea.value += '\n'
    }
    if (success) {
      // set rules
      this.rules = freshRules
      
      // save code for comparison
      this.code = ruleEditor.value
      
      // update GUI
      this.rulesButton.disabled = true
      this.rulesButton.classList.remove('error')
      this.msgArea.classList.remove('error')
    } else {
      this.rulesButton.classList.add('error')
      this.msgArea.classList.add('error')
    }
  }
  
  // hat tip StackOverflow user kasdega
  // https://stackoverflow.com/a/6637396/1644283
  insertTab(event) {
    // refocus on rules area
    this.ruleEditor.focus()
    
    // get selection
    var code = this.ruleEditor.value
    var start = this.ruleEditor.selectionStart
    var end = this.ruleEditor.selectionEnd
    
    // replace selection with tab
    var pre = code.slice(0, start)
    var post = code.slice(end)
    this.ruleEditor.value = pre + '\t' + post
    
    // reposition caret
    this.ruleEditor.selectionStart = start + 1
    this.ruleEditor.selectionEnd = start + 1
    
    // compare code
    this.compareCode()
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
