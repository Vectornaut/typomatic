class ResourceKit {
  stops = {
    '': false,
    '%': true
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
