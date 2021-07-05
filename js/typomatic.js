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
  // gui
  display
  inputField
  playButton
  tempoRange
  tempoDisp
  rulesArea
  
  // resources
  resources = new ResourceKit()
  
  // settings
  beat
  halfBeat
  soundOn = false
  
  // data and instructions
  str
  rules = []
  
  // execution
  stepInterval = null
  stepping = false
  
  constructor(display, input, inputButton, stepButton, playButton, tempoRange, tempoDisp, rulesArea, rulesButton) {
    // store the controls we'll need later
    this.display = display
    this.inputField = inputField
    this.playButton = playButton
    this.tempoRange = tempoRange
    this.tempoDisp = tempoDisp
    this.rulesArea = rulesArea
    this.rulesButton = rulesButton
    
    // set up event listeners
    input.addEventListener('keypress', this.inputKeyPress.bind(this))
    inputButton.addEventListener('click', this.loadInput.bind(this))
    stepButton.addEventListener('click', this.blockingStep.bind(this))
    playButton.addEventListener('click', this.togglePlay.bind(this))
    tempoRange.addEventListener('input', this.setTempo.bind(this))
    rulesButton.addEventListener('click', this.loadRules.bind(this))
    
    // initialize display and tempo
    this.loadInput()
    this.setTempo()
  }
  
  updateDisplay() {
    // clear the display
    display = this.display
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
  
  setTempo() {
    var tempo = this.tempoRange.value
    this.beat = Math.round(6e4/tempo)
    this.halfBeat = Math.round(3e4/tempo)
    this.tempoDisp.innerHTML = tempo + ' bpm'
  }
  
  loadRules() {
    var freshRules = []
    var lines = rulesArea.value.replace(/\r/g, '').split('\n')
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i]
      if (line !== '' && !/^\s\s.*/.test(line)) {
        freshRules.push(new Rule(line, this.resources))
      }
    }
    this.rules = freshRules
    console.log(`loaded ${this.rules.length} new rules`)
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
  play() {
    if (this.stepInterval === null) {
      if (this.blockingStep()) { // execute the first step immediately
        this.stop()
      } else {
        this.stepInterval = setInterval(this.stoppingStep.bind(this), this.beat)
        this.playButton.classList.add('on')
      }
      return true
    } else {
      return false
    }
  }
  
  // try to stop execution, and report whether we succeeded
  stop() {
    if (this.stepInterval !== null) {
      clearInterval(this.stepInterval)
      this.stepInterval = null
      this.playButton.classList.remove('on')
    } else {
      return false
    }
  }
  
  // toggle execution
  togglePlay() {
    if (!this.play()) this.stop()
  }
}
