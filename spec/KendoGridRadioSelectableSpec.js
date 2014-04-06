/** @jsx React.DOM */
'use strict';

var ReactTestUtils = React.addons.TestUtils;

describe('KendoGridRadioSelectable', function() {

    it('renders', function () {
        ReactTestUtils.renderIntoDocument(
            <KendoGridRadioSelectable
                dataSource={[]}
                columns={[]}
                valueField="id" />
        );

    });
});


var KendoGridRadioSelectable = WingspanForms.KendoGridRadioSelectable;
