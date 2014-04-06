/** @jsx React.DOM */
'use strict';

var ReactTestUtils = React.addons.TestUtils;

describe('SwitchBox', function() {

    it('renders', function () {
        ReactTestUtils.renderIntoDocument(
            <SwitchBox value={true} />
        );

    });
});


var SwitchBox = WingspanForms.SwitchBox;
