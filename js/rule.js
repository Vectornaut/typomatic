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

class Rule {
  from
  to
  stop
  
  // sounds and colors
  /*[SOUND] sound*/
  color
  
  constructor(line, resources) {
    var tokens = line.split(/\s/)
    if (tokens.length >= 1) this.from = tokens[0]; else this.from = ''
    if (tokens.length >= 2) this.to = tokens[1]; else this.to = ''
    if (tokens.length >= 3) {
      if (tokens[2] in resources.stops) this.stop = resources.stops[tokens[2]]
      /*[EXCEPTION] else throw new InterpreterException(InterpreterException.BAD_STOP, tokens[2])*/
    } else {
      this.stop = false;
    }
    /*[SOUND]
    if (tokens.length >= 4) {
      if (resources.containsSound(tokens[3])) this.sound = resources.getSound(tokens[3]);
      else throw new InterpreterException(InterpreterException.BAD_SOUND, tokens[3]);
    } else {
      sound = resources.getSound("");
    }
    */
    if (tokens.length >= 5) {
      if (tokens[4] in resources.colors) this.color = resources.colors[tokens[4]]
      /*[EXCEPTION] else throw new InterpreterException(InterpreterException.BAD_COLOR, tokens[4])*/
    } else {
      this.color = resources.colors['']
    }
  }
  
  // if this rule can be applied to the machine's working string, apply it and
  // return `true`. otherwise, return `false`
  apply(machine) {
    // look for a substring matching this rule
    var index = machine.str.indexOf(this.from)
    if (index === -1) return false
    
    // --- if a matching substring is found, apply the rule ---
    
    /*[SOUND] if (soundOn && this.sound != null) [PLAY SOUND]*/
    
    // cut the working string before and after the match
    var pre = machine.str.slice(0, index)
    var post = machine.str.slice(index + this.from.length)
    
    // clear the display and the color element
    while (machine.display.firstChild) {
      machine.display.removeChild(machine.display.lastChild)
    }
    if (this.color.firstChild) this.color.removeChild(this.color.lastChild)
    
    // highlight the match
    machine.display.appendChild(document.createTextNode(pre))
    this.color.appendChild(document.createTextNode(this.from))
    machine.display.appendChild(this.color)
    machine.display.appendChild(document.createTextNode(post))
    
    // replace the match in the working string, and update the display after
    // half a beat
    machine.str = pre + this.to + post
    console.log(machine.str)
    setTimeout(machine.updateDisplay.bind(machine), machine.halfBeat)
    return true
  }
}
