
'use strict';

var ReactTestUtils = React.addons.TestUtils;

describe('KendoTabStrip', function() {

    it('renders', function () {
        var tabs = {
            'First Tab': (<span>first content</span>),
            'Second Tab': (<span>second content</span>)
        };
        ReactTestUtils.renderIntoDocument(
            <KendoTabStrip
                dataSource={[]}
                tabs={tabs} />
        );

    });
});


var KendoTabStrip = WingspanForms.KendoTabStrip;
