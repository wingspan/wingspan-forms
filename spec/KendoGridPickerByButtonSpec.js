/** @jsx React.DOM */
'use strict';

var ReactTestUtils = React.addons.TestUtils;

describe('KendoGridPickerByButton', function() {

    it('renders', function () {
        ReactTestUtils.renderIntoDocument(
            <KendoGridPickerByButton
                dataSource={[]}
                columns={[]}
                valueField="id"
                value={[]}
            />
        );

    });
});


var KendoGridPickerByButton = WingspanForms.KendoGridPickerByButton;
