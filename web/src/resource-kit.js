class ResourceKit {
  stops = {
    '': false,
    '%': true
  }
  sounds = {
    '': null,
    '.': new Audio('sounds/bip.wav'),
    '+': new Audio('sounds/bleep.wav'),
    '/': new Audio('sounds/boing.wav'),
    '$': new Audio('sounds/bling.wav'),
    '#': new Audio('sounds/scratch.wav'),
    '*': new Audio('sounds/sparkle.wav')
  }
  colors = {}
  
  constructor() {
    this.colors[''] = ResourceKit.makeSpan('white-highlight')
    this.colors['p'] = ResourceKit.makeSpan('pink-highlight')
    this.colors['o'] = ResourceKit.makeSpan('orange-highlight')
    this.colors['y'] = ResourceKit.makeSpan('yellow-highlight')
    this.colors['g'] = ResourceKit.makeSpan('green-highlight')
    this.colors['b'] = ResourceKit.makeSpan('blue-highlight')
    this.colors['v'] = ResourceKit.makeSpan('violet-highlight')
  }
  
  static makeSpan(className) {
    var span = document.createElement('span')
    span.setAttribute('class', className)
    return span
  }
}
