/** @jsx React.DOM */
'use strict';

var ReactTestUtils = React.addons.TestUtils;

describe('UserPickerPlus', function() {

    it('renders', function () {
        ReactTestUtils.renderIntoDocument(
            <UserPickerPlus dataSource={[]} />
        );

    });
});


var UserPickerPlus = WingspanForms.UserPickerPlus;
