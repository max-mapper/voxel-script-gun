var createGame = require('voxel-engine')
var scriptGun = require('./')
var highlight = require('voxel-highlight')

var container = document.querySelector('#container')

var game = createGame({
  startingPosition: [0, 1000, 0]
})

highlight(game)

window.game = game // for debugging
game.currentMaterial = 1
game.controls.pitchObject.rotation.x = -1.5 // look down
scriptGun(game, {container: document.querySelector('#editor')})
game.appendTo(container)

container.addEventListener('click', function() {
  game.requestPointerLock(container)
})

game.erase = true
window.addEventListener('keydown', function (ev) {
  if (ev.keyCode === 'X'.charCodeAt(0)) {
    game.erase = !game.erase
  }
})

function ctrlToggle (ev) { game.erase = !ev.ctrlKey }
window.addEventListener('keyup', ctrlToggle)
window.addEventListener('keydown', ctrlToggle)
