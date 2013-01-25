var CodeMirror = require('./codemirror/codemirror').CodeMirror
var inherits = require('inherits')
var events = require('events')

module.exports = function(game, opts) {
  return new ScriptGun(game, opts)
}

function ScriptGun(game, opts) {
  var self = this
  if (!opts) opts = {}
  this.game = game
  this.container = document.body
  if (opts.container) this.container = opts.container
  
  this.editor = CodeMirror(this.container, {
    value: opts.functionBody || "if (game.erase) game.setBlock(position, 0)\nelse game.createBlock(position, game.currentMaterial)\n",
    mode:  "javascript"
  })
  
  this.setMousedown(this.editor.getValue())
  
  this.editor.on('change', function() {
    this.game.controls.emit('command', 'moveLeft', false) // i dont know why this is needed but it is
    var functionBody = self.editor.getValue()
    self.emit('change', functionBody)
    game.removeListener('mousedown', self.mousedown)
    self.setMousedown(functionBody)
  })  
}

inherits(ScriptGun, events.EventEmitter)

ScriptGun.prototype.setMousedown = function(functionBody) {
  var self = this
  try {
    var funcString = "function mousedown(position) {" + functionBody + "}"
    eval(funcString)
    self.mousedown = mousedown 
    self.game.on('mousedown', mousedown)
  } catch(e) {
    self.emit('error', e)
  }
}