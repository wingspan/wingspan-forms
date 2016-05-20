
'use strict';

var ReactTestUtils = React.addons.TestUtils;

describe('KendoListView', function() {

    it('renders', function () {
        ReactTestUtils.renderIntoDocument(
            <KendoListView
                dataSource={[]} />
        );

    });
});


var KendoListView = WingspanForms.KendoListView;
