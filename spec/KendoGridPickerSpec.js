/** @jsx React.DOM */
'use strict';

var ReactTestUtils = React.addons.TestUtils;

describe('KendoGridPicker', function() {

    it('renders', function () {
        ReactTestUtils.renderIntoDocument(
            <KendoGridPicker
                dataSource={[]}
                columns={[]}
                value={[]} />
        );

    });
});


var KendoGridPicker = WingspanForms.KendoGridPicker;
