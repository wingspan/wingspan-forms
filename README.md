# wingspan-forms
> a dynamic form library for Facebook React, providing abstractions for building dynamic forms and controlled grids. Widgets provided by [Telerik's KendoUI](http://www.telerik.com/kendo-ui).

[![example form screenshot & jsfiddle](docs/_assets/simple-form.png?raw=true)](http://jsfiddle.net/dustingetz/84JuE/12/)

## Quick Interactive Examples

 * [basic form with validation](http://jsfiddle.net/dustingetz/5B9Qb/2/)
 * [basic form with validation, no fancy abstractions](http://jsfiddle.net/dustingetz/84JuE/12/)
 * [dynamic form generated from JSON metadata](http://jsfiddle.net/dustingetz/gg4w5/2/)
 * [dynamic Master/Detail CRUD editor](http://wingspan.github.io/wingspan-forms/examples/form-master-detail/) ([source](https://github.com/wingspan/wingspan-forms-examples/tree/master/form-master-detail))
 * [faceted search demo](http://wingspan.github.io/wingspan-forms/examples/faceted-search/) ([source](https://github.com/wingspan/wingspan-forms-examples/tree/master/faceted-search))
 * [sandbox showing all included controls in various configurations](http://wingspan.github.io/wingspan-forms/examples/sandbox/) ([source](https://github.com/wingspan/wingspan-forms-examples/tree/master/sandbox))
 * [Simple example of how to keep all the state "at the top"](http://jsfiddle.net/dustingetz/YUCBT/2/)
 * [controlled grid](http://wingspan.github.io/wingspan-forms/examples/controlled-grid/) ([source](https://github.com/wingspan/wingspan-forms-examples/tree/master/controlled-grid))

## Documentation

* [basic form with validation - code walkthrough](http://www.dustingetz.com/2014/02/18/react-dynamic-forms.html)


## Disclaimer

`wingspan-forms` is used heavily at Wingspan in a large project scheduled to go to production in April. As such, `wingspan-forms` should be considered stable, but not mature. There are some known issues, and as there is no documentation yet you will need to read the source code to figure out how to use it.

The widgets in `wingspan-forms` are powered by [Telerik's KendoUI](http://www.telerik.com/kendo-ui). KendoUI is not bundled, as it is GPL/commercial dual licensed, so your application will need to provide a suitable version of KendoUI. However, `wingspan-forms` provides a strict interface which KendoUI does not escape; as such, it is mechanical for future work to switch out the underlying Kendo dependency with another widget library, like Sencha or JQuery UI.


## Description

Facebook React is a javascript DOM management library, built around applying functional programming to managing the DOM. You could think of React as the `View` in MVC. Views are pure, in the functional programming sense. No mutable state need be stored in the DOM.

Traditional javascript widget libraries (JQueryUI, KendoUI, Sencha) tend to model each widget as a standalone MVC entity. For example, a ComboBox widget has code for managing the state of the combobox, for updating the DOM when the state changes, and for logic like querying for the list of options and for applying filters. The React philosophy is that this approach results in poor separation of concerns and makes large codebases difficult to reason about.

In React, widgets are pure (in the functional programming sense). All state is stored in a central javascript controller layer (not in the DOM). Views are pure and are seperated from models (unlike MVVM which couples model and view). This means, for example, that the invalid-ness or disabled-ness is not decided by logic the widget itself; rather, logic outside the widget determines the widget state and then the "dumb widget" will render to match this state. This means complex validation rules and other business logic can be handled in a central location, decoupled from the widgets.

All widgets in `wingspan-forms` make use of a special interface called "value/onChange". All widgets are passed a `value` (what value the view should draw) as well as an `onChange` callback, which will be invoked if the widget requests a change. The `onChange` callback aggregates all state in one central place, and triggers a re-render.

## Build the wingspan-forms library

The build uses NPM and grunt which must already installed.

    npm install                 # install grunt plugins
    grunt                       # Build artifacts to dist/
