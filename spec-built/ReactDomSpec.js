/** @jsx React.DOM */
'use strict';

var ReactTestUtils;

describe('react', function() {

    beforeEach(function() {
        ReactTestUtils = React.addons.TestUtils;
    });

    it('can render into fake dom', function() {

        var Throws = React.createClass({displayName: 'Throws',
            render: function () {
                throw 42;
                return (React.DOM.div(null ));
            }
        });

        var label = React.DOM.div(null, Throws( {className:"42"}),"Some Text We Need for Test");
        ReactTestUtils.renderIntoDocument(label);
    });

    it('can get wingspan-forms on the page', function () {
        ReactTestUtils.renderIntoDocument(
            KendoText( {value:"42"} )
        );
    });
});


var KendoText = WingspanForms.KendoText;
