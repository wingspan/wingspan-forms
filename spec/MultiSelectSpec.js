/** @jsx React.DOM */
'use strict';

var ReactTestUtils = React.addons.TestUtils;

describe('MultiSelect', function() {

    it('renders', function () {
        ReactTestUtils.renderIntoDocument(
            <MultiSelect value="42" />
        );

    });
});


var MultiSelect = WingspanForms.MultiSelect;
