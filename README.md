Moxie JS Client
===============

The new version of Mobile Oxford in development.

The Code
--------

There is a lot of JavaScript in this project. To manage this we're using jrburke/requirejs this allows us to write modular JavaScript following the API defined by AMD.

The Build
---------

**CSS:** This project uses SASS. In order to compile to CSS you will need to have installed [zurb-foundation](http://foundation.zurb.com/) and [compass](http://compass-style.org/install/). These can both me installed through `bundle install` provided you have [bundler](http://gembundler.com/) installed. Now you're ready to compile our CSS, just type `compass compile` in the root of the project.

**Templates:** Our JS templates are written using wycats/handlebars.js and need to be precompiled before running Moxie. Install Handlebars `npm install -g handlebars` and compile with the following command:

    handlebars handlebars/places/ -f js/moxie.places.templates.js

**JavaScript:** Minification is handled by UglifyJS by way of r.js. This correctly walks our dependency graph and will only minify files which are used. So install r.js `npm install -g requirejs` and optimise:

    r.js -o js/moxie.build.js
