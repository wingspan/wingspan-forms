# wingspan-forms examples repo

This repo is where the [`wingspan-forms`](https://github.com/wingspan/wingspan-forms) quick interactive examples are hosted.

All examples have a mandatory build step.

## Build one example

    cd helloworld
    npm install; grunt

## Build all examples

    $ for file in $(find . -maxdepth 1 -type d -not -name ".*")
    > do
    > pushd $file
    > npm install; grunt
    > popd
    > done

## Serve the 'webapp' directory

Serve with a static webserver (e.g. `python -m SimpleHTTPServer`) from any level. Serve from the top directory if you built all the examples. `index.html` is inside each example's `webapp` folder.
