/** @jsx React.DOM */
'use strict';

var ReactTestUtils = React.addons.TestUtils;

describe('MultilineText', function() {

    it('renders', function () {
        ReactTestUtils.renderIntoDocument(
            <MultilineText value="42" />
        );

    });
});


var MultilineText = WingspanForms.MultilineText;
