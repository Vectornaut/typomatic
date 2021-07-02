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
  constructor(display, input, inputButton, tempo, tempoDisp) {
    // store the controls we'll need later
    this.display = display
    this.inputField = inputField
    this.tempoRange = tempoRange
    this.tempoDisp = tempoDisp
    
    // set up event listeners
    input.addEventListener('keypress', this.inputKeyPress.bind(this))
    inputButton.addEventListener('click', this.loadInput.bind(this))
    tempo.addEventListener('input', this.setTempo.bind(this))
    
    // initialize display and tempo
    this.loadInput()
    this.setTempo()
  }
  
  inputKeyPress(event) {
    if (event.keyCode === 13) this.loadInput()
  }
  
  loadInput() {
    this.display.str = this.inputField.value
    this.display.innerHTML = this.inputField.value
  }
  
  setTempo() {
    this.tempoDisp.innerHTML = this.tempoRange.value + ' bpm'
  }
}
