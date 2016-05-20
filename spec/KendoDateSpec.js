
'use strict';

var ReactTestUtils = React.addons.TestUtils;

describe('KendoDate', function() {

    it('renders', function () {
        ReactTestUtils.renderIntoDocument(
            <KendoDate value="" />
        );

    });
});


var KendoDate = WingspanForms.KendoDate;
