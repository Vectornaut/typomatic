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
  constructor(code) {
    var tokens = code.split(/\s+/)
    if (tokens.length >= 1) this.from = tokens[0]; else this.from = ""
    if (tokens.length >= 2) this.to = tokens[1]; else this.to = ""
    if (tokens.length >= 3) {
      if (tokens[2] === '') this.stop = false
      else if (tokens[2] === '%') this.stop = true
      /*[EXCEPTION] else throw new InterpreterException(InterpreterException.BAD_STOP, tokens[2]);*/
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
    /*[COLOR]
    if (tokens.length >= 5) {
      if (resources.containsColor(tokens[4])) this.color = resources.getColor(tokens[4]);
      else throw new InterpreterException(InterpreterException.BAD_COLOR, tokens[4]);
    } else {
      this.color = resources.getColor("");
    }*/
  }
  
  // if this rule can be applied to the string in the given display, apply it
  // and return `true`. otherwise, return `false`. the display must have a
  // `str` property that contains the working string
  apply(display, tempo, soundOn) {
    // look for a substring matching this rule
    var index = display.str.indexOf(this.from)
    console.log(this.from + " --> " + this.to)
    if (index === -1) return false
    
    // if a matching substring is found, apply the rule
    /*[SOUND] if (soundOn && this.sound != null) [PLAY SOUND]*/
    var pre = display.str.slice(0, index)
    var post = display.str.slice(index + this.from.length)
    /*[COLOR] display.innerHTML = pre + '<span class="' + this.color + "'>" + this.from + '</span>' + post*/
    display.str = pre + this.to + post
    display.innerHTML = display.str
  }
}
