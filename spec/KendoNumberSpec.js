/** @jsx React.DOM */
'use strict';

var ReactTestUtils = React.addons.TestUtils;

describe('KendoNumber', function() {

    it('renders', function () {
        ReactTestUtils.renderIntoDocument(
            <KendoNumber value={10} />
        );
    });
});


var KendoNumber = WingspanForms.KendoNumber;
