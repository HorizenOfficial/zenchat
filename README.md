# DEPRECATED
# ZenChat has been integrated into Sphere By Horizen https://github.com/ZencashOfficial/Sphere_by_Horizen/releases
# As such ZenChat is no longer maintained

Private and Anonymous Messaging Application, built on top of the Zencash blockchain.

Download the releases here: https://github.com/ZencashOfficial/ZENChat/releases

![](http://i.imgur.com/7Dc45pR.gif)

### TODO:
1. Add types (flow)
2. Add Unit Tests

### To get started:
* Run `npm install`

##### Development
* Run `npm run dev` to start webpack-dev-server. Electron will launch automatically after compilation.

##### Production
_You have two options, an automatic build or two manual steps_

###### One Shot
* Run `npm run package` to have webpack compile your application into `dist/bundle.js` and `dist/index.html`, and then an electron-packager run will be triggered for the current platform/arch, outputting to `builds/`

###### Manual
_Recommendation: Update the "postpackage" script call in package.json to specify parameters as you choose and use the `npm run package` command instead of running these steps manually_
* Run `npm run build` to have webpack compile and output your bundle to `dist/bundle.js`
* Then you can call electron-packager directly with any commands you choose

If you want to test the production build (In case you think Babili might be breaking something) after running `npm run build` you can then call `npm run prod`. This will cause electron to load off of the `dist/` build instead of looking for the webpack-dev-server instance. Electron will launch automatically after compilation.
