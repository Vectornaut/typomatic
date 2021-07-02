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
  tempoRange
  tempoDisp
  
  // settings
  tempo
  soundOn = false
  
  // data and instructions
  str
  rules = []
  
  constructor(display, input, inputButton, stepButton, tempo, tempoDisp) {
    // store the controls we'll need later
    this.display = display
    this.inputField = inputField
    this.tempoRange = tempoRange
    this.tempoDisp = tempoDisp
    
    // set up event listeners
    input.addEventListener('keypress', this.inputKeyPress.bind(this))
    inputButton.addEventListener('click', this.loadInput.bind(this))
    stepButton.addEventListener('click', this.step.bind(this))
    tempo.addEventListener('input', this.setTempo.bind(this))
    
    // initialize display and tempo
    this.loadInput()
    this.setTempo()
  }
  
  inputKeyPress(event) {
    if (event.keyCode === 13) this.loadInput()
  }
  
  loadInput() {
    this.str = this.inputField.value
    this.display.innerHTML = this.str
  }
  
  setTempo() {
    this.tempo = this.tempoRange.value
    this.tempoDisp.innerHTML = this.tempo + ' bpm'
  }
  
  // carry out one execution step. return `true` if it's time to stop execution,
  // and `false` otherwise
  step() {
    var i
    for (i = 0; i < this.rules.length; i++) {
      if (this.rules[i].apply(this)) {
        /*[BUSY BEAVER] stepsRun++;*/
        break;
      }
    }
    return i == this.rules.length || this.rules[i].stop
  }
}
