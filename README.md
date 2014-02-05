# wingspan-forms
> a widget library for Facebook React, providing abstractions for building dynamic forms & form validation, and default markup and styles.

## Disclaimer

`wingspan-forms` is used heavily at Wingspan in a large project scheduled to go to production in April. As such, `wingspan-forms` should be considered stable, but not mature. There are a few known minor bugs, and as there is no documentation you will need to read the source code to figure out how to use it.

The widgets in `wingspan-forms` are powered by KendoUI. KendoUI is not bundled, as it is GPL/commercial dual licensed, so your application will need to provide a suitable version of KendoUI. However, `wingspan-forms` provides a strict interface which KendoUI does not escape; as such, it is mechanical for future work to switch out the underlying Kendo dependency with another widget library, like Sencha or JQuery UI.


## Description

Facebook React is a javascript DOM management library, built around applying functional programming to managing the DOM. You could think of React as the `View` in MVC. Views are pure, in the functional programming sense. No mutable state need be stored in the DOM.

Tradiitonal javascript widget libraries (JQueryUI, KendoUI, Sencha) tend to model each wdiget as a standalone MVC entity. For example, a ComboBox widget has code for managing the state of the combobox, for updating the DOM when the state changes, and for logic like querying for the list of options and for applying filters. The React philosophy is that this approach results in poor separation of concerns and makes large codebases difficult to reason about.

In React, widgets are pure (in the functional programming sense). All state is stored in a central javascript controller layer (not in the DOM). Views are pure and are seperated from models (unlike MVVM which couples model and view). This means, for example, that the invalid-ness or disabled-ness is not decided by logic the widget itself; rather, logic outside the widget determines the widget state and then the "dumb widget" will render to match this state. This means complex validation rules and other business logic can be handled in a central location, decoupled from the widgets.

All widgets in `wingspan-forms` make use of a special interface called "value/onChange". All widgets are passed a `value` (what value the view should draw) as well as an `onChange` callback, which will be invoked if the widget requests a change. The `onChange` callback aggregates all state in one central place, and triggers a re-render.

## Build the wingspan-forms library

The build uses NPM and grunt which must already installed.

    npm install                 # install grunt plugins
    grunt                       # Build artifacts to dist/

## Build the sandbox example

    cd examples/sandbox
    npm install
    bower install
    grunt react less

## License

MIT.
