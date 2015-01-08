#Global Build Dependencies

- [node/npm](http://nodejs.org/) - For package management
- [bower](http://bower.io/) - For client-side package management
- [grunt](http://gruntjs.com/) - For automation
- [browserify](http://browserify.org/) - For bundling various src files into a single distribution

#Install

In root directory of the repo...

    npm install
    bower install

@TODO: Script this

#Development

For development, be sure to have the default grunt task running during develop so that the bundled
distribution is built. This also runs a code linter and unit tests on watch.

Other helper grunt commands are

    grunt lint
    grunt build
    grunt test
