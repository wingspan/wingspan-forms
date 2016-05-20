
'use strict';

var ReactTestUtils = React.addons.TestUtils;

describe('KendoMultiSelect', function() {

    it('renders', function () {
        ReactTestUtils.renderIntoDocument(
            <KendoMultiSelect
                dataSource={[]}
                columns={[]}
                valueField="id"
                displayField="display" />
        );

    });
});


var KendoMultiSelect = WingspanForms.KendoMultiSelect;
