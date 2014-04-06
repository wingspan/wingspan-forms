/** @jsx React.DOM */
'use strict';

var ReactTestUtils = React.addons.TestUtils;

describe('UserPicker', function() {

    it('renders', function () {
        ReactTestUtils.renderIntoDocument(
            <UserPicker dataSource={[]} />
        );

    });
});


var UserPicker = WingspanForms.UserPicker;
