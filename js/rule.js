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
  
  static stopDict = {
    '': false,
    '%': true
  }
  
  static colorDict = {
    '': 'white-highlight',
    'p': 'pink-highlight',
    'o': 'orange-highlight',
    'y': 'yellow-highlight',
    'g': 'green-highlight',
    'b': 'blue-highlight',
    'v': 'violet-highlight'
  }
  
  constructor(code) {
    var tokens = code.split(/\s/)
    if (tokens.length >= 1) this.from = tokens[0]; else this.from = ""
    if (tokens.length >= 2) this.to = tokens[1]; else this.to = ""
    if (tokens.length >= 3) {
      if (tokens[2] in Rule.stopDict) this.stop = Rule.stopDict[tokens[2]]
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
      if (tokens[4] in Rule.colorDict) this.color = Rule.colorDict[tokens[4]]
      /*[EXCEPTION] else throw new InterpreterException(InterpreterException.BAD_COLOR, tokens[4])*/
    } else {
      this.color = Rule.colorDict['']
    }
  }
  
  // if this rule can be applied to the machine's working string, apply it and
  // return `true`. otherwise, return `false`
  apply(machine) {
    // look for a substring matching this rule
    var index = machine.str.indexOf(this.from)
    if (index === -1) return false
    
    // if a matching substring is found, apply the rule
    /*[SOUND] if (soundOn && this.sound != null) [PLAY SOUND]*/
    var pre = machine.str.slice(0, index)
    var post = machine.str.slice(index + this.from.length)
    machine.display.innerHTML = `<span>${pre}<span class="${this.color}">${this.from}</span>${post}</span>`
    machine.str = pre + this.to + post
    setTimeout(machine.updateDisplay.bind(machine), machine.halfPeriod)
    return true
  }
}
