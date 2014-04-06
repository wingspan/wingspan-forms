/** @jsx React.DOM */
'use strict';

var ReactTestUtils = React.addons.TestUtils;

describe('KendoText', function() {

    it('can render with a value', function () {
        ReactTestUtils.renderIntoDocument(<KendoText value="42" />);
    });

    it('can render with a blank value', function () {
        ReactTestUtils.renderIntoDocument(<KendoText value="" />);
    });

    it('can render without a value', function () {
        ReactTestUtils.renderIntoDocument(<KendoText />);
    });
});


var KendoText = WingspanForms.KendoText;
