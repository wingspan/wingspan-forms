### This library is not yet ready to be used! We just split this off from our development head and there are still some remaining issues, including missing image assets.

`wingspan-forms` is a widget library for Facebook React. It provides KendoUI bindings for Facebook React as well as default markup and styles.

Facebook React is a javascript DOM management library, built around applying functional programming to managing the DOM. You could think of React as the `View` in MVC. Views are pure, in the functional programming sense. No mutable state need be stored in the DOM.

Tradiitonal javascript widget libraries (JQueryUI, KendoUI, Sencha) tend to model each wdiget as a standalone MVC entity. For example, a ComboBox widget has code for managing the state of the combobox, for updating the DOM when the state changes, and for logic like querying for the list of options and for applying filters. The React philosophy is that this approach results in poor separation of concerns and makes large codebases difficult to reason about.

In React, widgets are pure (in the functional programming sense). All state is stored in a central javascript controller layer (not in the DOM). Views are pure and are seperated from models (unlike MVVM which couples model and view). This means, for example, that the invalid-ness or disabled-ness is not controlled or influenced by the widget itself; rather, the widget is instructed from the outside that it should render itself invalid or disabled. This means complex validation rules can be handled in a central location, decoupled from the widgets.

All widgets in `wingspan-forms` make use of a special interface called "value/onChange". All widgets are passed a `value` (what value the view should draw) as well as an `onChange` callback, which will be invoked if the widget requests a change. The `onChange` callback aggregates all state in one central place, and triggers a re-render.



## Install build dependencies

    brew install node           # on OSX, install node.js and NPM
    npm install -g grunt-cli    # install grunt

## Build the wingspan-forms library

    npm install                 # install grunt plugins
    bower install               # fetch javascript dependencies
    grunt react                 # compile javascript
    grunt less                  # compile css, into dist/wingspan-forms.css
    grunt requirejs             # optimize javascript, into dist/wingspan-forms.js

## Build the helloworld example

    cd examples/helloworld
    npm install
    bower install
    grunt react

## Other examples

We include three examples: helloworld (no module loader), helloworld (requirejs), and sandbox. Sandbox contains a demo of all the controls, with nice styles.

## License

MIT.
