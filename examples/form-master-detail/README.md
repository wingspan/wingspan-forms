react-master-detail
===================

Simple master/detail CRUD editor in react, leveraging the [wingspan-forms library](https://github.com/wingspan/wingspan-forms).

# how to build and run

This project has a mandatory frontend build step.

### install dependencies - Node, Grunt, Bower

    brew install node
    npm install -g grunt-cli
    npm install -g bower

### prepare for build

    npm install    # fetch node plugins for mandatory build step
    bower install  # fetch js dependencies

### build the `wingspan-forms` dependency
(sorry, I just open sourced this in Janurary and it has rough edges)

    cd bower_components/wingspan-forms
    npm install                   # this is a seperate project which also uses node plugins
    bower install                 # and has its own dependencies
    grunt react less requirejs    # do the library build

### build the actual app

    cd ../..   # back to app directory
    grunt react less

### serve the app
from the project directory on localhost, using `python -m SimpleHTTPServer` or something, and browse to index.html


