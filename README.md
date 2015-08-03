# angular-boilerplate

[![Build Status](https://travis-ci.org/merty/angular-boilerplate.svg?branch=master)](https://travis-ci.org/merty/angular-boilerplate)
[![Code Climate](https://codeclimate.com/github/merty/angular-boilerplate/badges/gpa.svg)](https://codeclimate.com/github/merty/angular-boilerplate)

An opinionated boilerplate project for AngularJS applications, crafted with best practices in mind.

## Getting Started

It is highly recommended that you read the project yourself to have a better understanding of how the project is composed.

In addition to that, sample codes provided within the project are also thoughtfully written so following those practices (such as using IIFEs and choosing named functions over anonymous functions) should also be helpful.

Below you can find instructions on using the project, an outline of how the project is composed and brief explanations of parts of the project.

## Usage

Install the packages from NPM and Bower repositories:

```
$ npm install
```

Combine and minify CSS and JS files using Gulp:

```
$ npm run-script build
```

Serve the application using Python's SimpleHTTPServer: *(use for development purposes only!)*

```
$ npm start > /dev/null &
```

Run unit tests using Karma:

```
$ npm run-script test-unit
```

Run end-to-end tests using Protractor:

```
$ npm run-script test-e2e
```

## Directory Structure

The root directory is composed of directories `src` and `tests`, as well as configuration and deployment-related files.

`src` directory contains every single file the application needs to run. Think of this directory as the public facing directory.

`tests` directory contains integration-testing-related files. It comes with an `e2e` directory by default where you can place your end-to-end testing files.

The rest of the files are either to configure the development environment or to handle various deployment processes.


```
.
├── src                                # Complete client application
│   ├── app                            # AngularJS application files
│   │   ├── components                 # Directive definitions
│   │   ├── core                       # Core module
│   │   ├── modules                    # Application-specific modules
│   │   │   └── home                   # An example module
│   │   └── services                   # Service definitions
│   ├── assets                         # Third-party or non-JS assets
│   │   ├── images                     # Image files
│   │   ├── stylesheets                # CSS files
│   │   └── vendor                     # Third-party assets
│   │       ├── angular                # AngularJS core
│   │       ├── angular-loader         # AngularJS module loader
│   │       ├── angular-mocks          # AngularJS mocking library for unit tests
│   │       ├── angular-route          # AngularJS routing library
│   │       ├── angular-sanitize       # AngularJS HTML-sanitizing library
│   │       └── html5-boilerplate      # HTML5 Boilerplate library
│   ├── build                          # Combined and minified CSS & JS files
│   └── layout                         # Partial HTML files for the application layout
├── tests                              # Integration tests
│   └── e2e                            # End-to-end test specifications
├── .bowerrc                           # Bower package definition file
├── .editorconfig                      # Editor configuration file
├── .gitattributes                     # Git configuration file
├── .gitignore                         # Git configuration file
├── .jscsrc                            # JSCS configuration file
├── .jshintrc                          # JSHint configuration file
├── .travis.yml                        # Travis-CI configuration file
├── LICENSE                            # Project license text
├── README.md                          # The file you are reading right now
├── bower.json                         # Bower dependencies file
├── gulp.conf.json                     # Gulp configuration file
├── gulpfile.js                        # Gulp tasks for build automation
├── karma.conf.js                      # Unit-testing configuration
├── package.json                       # Node.js package definition file
└── protractor.conf.js                 # End-to-end testing configuration
```

## App Structure

The AngularJS application has its own directory inside the `src` directory. Everything AngularJS (except the third-party libraries) should be within this directory.

App module is the main module, therefore it resides at the root of the `src/app` directory, together with its own configuration file.

```
src/app                                # Everything that composes the AngularJS app is here
├── components                         # Directive definitions
├── core                               # Core module
├── modules                            # Application-specific modules
├── services                           # Service definitions
├── app.config.js                      # App configuration
└── app.module.js                      # App module definition
```

## Core Module Structure

Core module is considered special, therefore it has its own directory within the `src/app` directory.

Core module is responsible for loading global dependencies such as `ngRoute` and `ngSanitize`.

```
src/app/core/                          # Has its own folder within the app directory
├── core.config.js                     # Configuration
├── core.module.js                     # Module definition
└── core.route.js                      # Route definition
```

## Sample Module Structure

Each module has its own directory to increase its reusability.

If the module has partial HTML files, they can be stored in a `partials` directory within the module.

Unit test specifications are also stored together with the module to make it easier to write unit tests as you go.

```
src/app/modules/home/                  # Should have its own directory under app/modules
├── home.controller.js                 # Controller definition
├── home.html                          # HTML file associated with the module, if any
├── home.module.js                     # Module definition
├── home.route.js                      # Route definition
└── home.spec.js                       # Unit tests for the module
```

## Sample End-to-End Test for a Module

Each module has its separate end-to-end test scenario file within the `tests/e2e` directory, named as `<module>.scenario.js` where `<module>` represents the name of the module.

```
tests/e2e/                             # Under the directory for end-to-end tests
└── home.scenario.js                   # Test file, named as "<module>.scenario.js"
```

## Author

Mert Yazicioglu - [Website](https://www.mertyazicioglu.com) &middot; [GitHub](https://github.com/merty) &middot; [Twitter](https://twitter.com/_mert)

## License

This project is released under the MIT License. See the `LICENSE` file for details.
