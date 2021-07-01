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

function inputKeyPress(event) {
  if (event.keyCode === 13) loadInput()
}

function loadInput() {
  var str = document.getElementById('input').value
  var display = document.getElementById('display')
  display.str = str
  display.innerHTML = str
}

function setTempo() {
  var tempo = document.getElementById('tempo').value
  document.getElementById('tempoDisp').innerHTML = tempo + ' bpm'
}
