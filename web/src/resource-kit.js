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
  colors = {
    '': ResourceKit.makeSpan('white-highlight'),
    'p': ResourceKit.makeSpan('pink-highlight'),
    'o': ResourceKit.makeSpan('orange-highlight'),
    'y': ResourceKit.makeSpan('yellow-highlight'),
    'g': ResourceKit.makeSpan('green-highlight'),
    'b': ResourceKit.makeSpan('blue-highlight'),
    'v': ResourceKit.makeSpan('violet-highlight')
  }
  
  constructor(audioContext) {
    this.loadSound('.', 'sounds/bip.wav', audioContext)
    this.loadSound('+', 'sounds/bleep.wav', audioContext)
    this.loadSound('/', 'sounds/boing.wav', audioContext)
    this.loadSound('$', 'sounds/bling.wav', audioContext)
    this.loadSound('#', 'sounds/scratch.wav', audioContext)
    this.loadSound('*', 'sounds/sparkle.wav', audioContext)
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
  loadSound(name, url, audioContext) {
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
