# Relief-Web Widget library

[![npm dependencies](https://david-dm.org/reliefweb/rw-widget.js.svg)](https://david-dm.org/reliefweb/rw-widget.js) [![npm dev dependencies](https://david-dm.org/reliefweb/rw-widget.js/dev-status.svg)](https://david-dm.org/reliefweb/rw-widget.js)

## Global Build Dependencies

- [node/npm](http://nodejs.org/) - For package management
- [bower](http://bower.io/) - For client-side package management
- [grunt](http://gruntjs.com/) - For automation
- [browserify](http://browserify.org/) - For bundling various src files into a single distribution
- [compass](http://compass-style.org/) - For compiling SCSS into css styles.

## Dependencies

- [Beat Blocks](https://github.com/phase2/beat-blocks)

## Install

In root directory of the repo...

    npm install
    bower install

## Development

For development, be sure to have the default grunt task running during develop so that the bundled
distribution is built. This also runs a code linter and unit tests on watch.

Other helper grunt commands are

    grunt lint
    grunt build
    grunt test

## Widget structure

Widgets have a number of methods that make up a widget object. Understanding what each of these methods do is
helpful in understanding how to create new and unique widgets. It's helpful to examine src/widget-base.js to
get a better understanding of the specifics of how widgets behave.

At their core, a widget is a template file and a simple javascript object.

### Helpful methods

- .config() - Widget configuration get/setter
  Accepts 0, 1 or 2 parameters

  .config() - Returns the configuration of a widget as an object.
  .config(obj value) - Sets multiple config options, returns the full configuration of the widget as an object.
  .config(string key) - Returns the configuration of setting defined by the key of `string.`
  .config(string key, string|object value) - Sets the configuration for `key` to the value of `value`.

- .render(element) - Renders a widget where at a particular DOM element. Element can either be a string (CSS selector)
  or a DOMElement.

- .compile() - This method handles preparation of any configuration variables before rendering into a template. Override this
  method in your custom widgets if you want to load any external data into your template, or generate any additional
  content for your template before rendering.

- .link() - This method handles any event reactions or DOM manipulation that needs to happen after the initial DOM render.
  Override this method in your custom widgets to define your own js behaviors.

- .template() - The actual rendering method for a widget. By default, widgets use Handlebars.js for templating purposes.

## Differences between Beat-Blocks and Reliefweb Widgets

Much of the development process with ReliefWeb Widgets is very similar to [Beat-Blocks](https://github.com/phase2/beat-blocks) component development.
However, there are a few things that we do in this codebase in an attempt to improve on the developer experience and make
deployments easier within the ReliefWeb Crisis Page ecosystem.

- We use [Browserify](http://browserify.org/) to bundle our various pieces of javascript together into a single js file
that's usable in the browser. This allows us to write code that can be broken up into individual files.
- Templates are [pre-compiled](http://handlebarsjs.com/precompilation.html) and embedded into the widget directly via 
`require()` statements.
- Examples for each widget are set up in the example folder of the repository to facilitate an isolated and simplified 
development workflow.
- Widget styling is compiled from `src/scss`. This can be kicked off via the `grunt build` task.