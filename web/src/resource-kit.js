class ResourceKit {
  stops = {
    '': false,
    '%': true
  }
  sounds = {
    '': null,
    '.': null,
    '+': null,
    '/': null,
    '$': null,
    '#': null,
    '*': null
  }
  colors = {}
  
  constructor(audioContext) {
    this.loadAudio('.', 'sounds/bip.wav', audioContext)
    this.loadAudio('+', 'sounds/bleep.wav', audioContext)
    this.loadAudio('/', 'sounds/boing.wav', audioContext)
    this.loadAudio('$', 'sounds/bling.wav', audioContext)
    this.loadAudio('#', 'sounds/scratch.wav', audioContext)
    this.loadAudio('*', 'sounds/sparkle.wav', audioContext)
    
    this.colors[''] = ResourceKit.makeSpan('white-highlight')
    this.colors['p'] = ResourceKit.makeSpan('pink-highlight')
    this.colors['o'] = ResourceKit.makeSpan('orange-highlight')
    this.colors['y'] = ResourceKit.makeSpan('yellow-highlight')
    this.colors['g'] = ResourceKit.makeSpan('green-highlight')
    this.colors['b'] = ResourceKit.makeSpan('blue-highlight')
    this.colors['v'] = ResourceKit.makeSpan('violet-highlight')
  }
  
  // references:
  //
  //   Boris Smus - Getting Started with Web Audio API
  //   https://www.html5rocks.com/en/tutorials/webaudio/intro/
  //
  //   MDN Web Docs - BaseAudioContext.decodeAudioData()
  //   https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/decodeAudioData
  //
  //   MDN Web Docs - AudioBufferSourceNode
  //   https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode
  //
  loadAudio(name, url, audioContext) {
    // open a request for the desired sound
    var request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.responseType = 'arraybuffer'
    
    // say what to do when the response is fulfilled
    var kit = this
    request.onload = function() {
      console.log(kit)
      audioContext.decodeAudioData(request.response).then(
        function(buffer) {
          kit.sounds[name] = buffer
          console.log(`loaded ${buffer}`)
        }
      )
    }
    
    // send the request
    request.send()
  }
  
  static makeSpan(className) {
    var span = document.createElement('span')
    span.setAttribute('class', className)
    return span
  }
}
