module.exports = function (config) {

  var appBase = 'app/';      // transpiled app JS files
  var appAssets = '/base/app/'; // component assets fetched by Angular's compiler

  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-sourcemap-loader')
    ],

    files: [
      // System.js for module loading
      'node_modules/systemjs/dist/system-polyfills.js',
      'node_modules/systemjs/dist/system.src.js',

      // Polyfills
      'node_modules/es6-shim/es6-shim.js',

      // Reflect and Zone.js
      'node_modules/reflect-metadata/Reflect.js',
      'node_modules/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/zone.js/dist/async-test.js',
      'node_modules/zone.js/dist/fake-async-test.js',

      // RxJs.
      { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },

      // Angular 2 itself and the testing library
      { pattern: 'node_modules/@angular/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: false },

      // transpiled application & spec code paths loaded via module imports
      { pattern: 'app/**/*.js', included: false, watched: true },
      { pattern: 'app/**/*.spec.js', included: false, watched: true },

      // asset (HTML & CSS) paths loaded via Angular's component compiler
      // (these paths need to be rewritten, see proxies section)
      { pattern: appBase + '**/*.html', included: false, watched: true },
      { pattern: appBase + '**/*.css', included: false, watched: true },

      // paths for debugging with source maps in dev tools
      { pattern: 'app/**/*.ts', included: false, watched: false },
      { pattern: 'app/**/*.js.map', included: false, watched: false },

      // main entry point
      'karma-test-shim.js',
    ],

    // proxied base paths for loading assets
    proxies: {
      // required for component assets fetched by Angular's compiler
      "/app/": appAssets
    },

    // exclude angular 2 test files
    exclude: [
      'node_modules/angular2/**/*_spec.js'
    ],
    // Source files that you wanna generate coverage for.
    // Do not include tests or libraries (these files will be instrumented by Istanbul)
    // remove test files from coverage and add javascript files to source map module
    preprocessors: {
      'app/**/!(*app.component|main|*.spec).js': ['coverage'], 
      'app/**/*.js': ['sourcemap']
    },
    reporters: ['progress', 'coverage'],
    // Generate json used for remap-istanbul
    coverageReporter: {
      reporters: [
        { type: 'json', subdir: '.', file: 'coverage-final.json' }
      ],
      includeAllSources: true
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    captureTimeout: 60000,
    browserDisconnectTimeout: 2000,
    browserNoActivityTimeout: 10000,
    browserDisconnectTolerance: 10,
    singleRun: true
  })
}