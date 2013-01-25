# voxel-script-gun

write javascript functions that execute when you click on a voxel

```
npm install voxel-script-gun
```

## example

```javascript
var scriptGun = require('voxel-script-gun')
scriptGun(game, {container: document.querySelector('#editor')})
```

when you make a script gun it will create a javascript editor. each time the code inside the editor changes it will be used as the body of a function that will get called each time the player click on a voxel and will get passed in a `position` variable that is the x, y, and z game coordinates of the location that the player clicked on in the game.

### scriptGun(options)

options can be:

```javascript
{
  container: HTMLElement that an editor will get appended to,
  functionBody: string to use as the initial contents of the editor
}
```

### scriptGun.on('change', function(functionBody) {})

this gets called whenever the editor contents change. `functionBody` is the contents of the editor

### scriptGun.on('error', function(err) {})

this gets called whenever the contents fail to eval into valid javascript

# Get it running on your machine

The first time you set up, you should install the required npm packages:

```
cd voxel-script-gun
npm install
npm install browserify -g
```

Then run the start script (which you'll need to do every time you want to run the demo):

```
npm start
```

Then point your browser to [http://localhost:8080](http://localhost:8080) and have fun!

If you get stuck then look at the [readme for voxel-hello-world](http://github.com/maxogden/voxel-hello-world)

## license

BSD
