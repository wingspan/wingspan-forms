# wingspan-forms
> a dynamic form library for Facebook React, providing abstractions for building dynamic forms and controlled grids. Widgets provided by [Telerik's KendoUI](http://www.telerik.com/kendo-ui).

[![example form screenshot & jsfiddle](docs/_assets/simple-form.png?raw=true)](http://jsfiddle.net/dustingetz/5B9Qb/)

## Quick Interactive Examples

 * [basic form with validation](http://jsfiddle.net/dustingetz/5B9Qb/), [same form without fancy abstractions](http://jsfiddle.net/dustingetz/LpJb4/)
 * [list-of-forms](http://wingspan.github.io/wingspan-forms/examples/form-twins/) ([source](https://github.com/wingspan/wingspan-forms/blob/master/examples/form-twins/webapp/js/Page.js))
 * [faceted search](http://wingspan.github.io/wingspan-forms/examples/faceted-search/) ([source](https://github.com/wingspan/wingspan-forms/tree/master/examples/faceted-search))
 * [controlled grid](http://wingspan.github.io/wingspan-forms/examples/controlled-grid/) ([source](https://github.com/wingspan/wingspan-forms/tree/master/examples/controlled-grid))
 * [dynamic Master/Detail CRUD editor](http://wingspan.github.io/wingspan-forms/examples/form-master-detail/) ([source](https://github.com/wingspan/wingspan-forms/tree/master/examples/form-master-detail))
 * [sandbox showing all included controls in various configurations](http://wingspan.github.io/wingspan-forms/examples/sandbox/) ([source](https://github.com/wingspan/wingspan-forms/tree/master/examples/sandbox))


## Screenshots from large real world project

The state management abstractions in `wingspan-forms` are the foundation of a large app written at Wingspan. Here are some screenshots showing the complexity of app `wingspan-forms` is designed to manage:
 * [mega CRUD editor](http://curator-lilita-10664.bitballoon.com/work-area-metadata.png), [another view of same editor](http://carpenter-receptacles-54046.bitballoon.com/work-area-metadata-tall.png)
 * [complicated thingy picker](http://curator-lilita-10664.bitballoon.com/related-study-item-picker.png)
 * [validated form](http://curator-lilita-10664.bitballoon.com/proposed-study-item.png)
 * [faceted search](http://curator-lilita-10664.bitballoon.com/faceted-study-item-list.png)


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

## Build the examples

All of the demos have the same build steps.

    cd examples
    $ for file in $(find . -maxdepth 1 -type d -not -name ".*")
    > do
    > pushd $file
    > npm install; grunt
    > popd
    > done

or in a oneliner

    for file in $(find . -maxdepth 1 -type d -not -name ".*"); do pushd $file; npm install; grunt; popd; done

