/** @jsx React.DOM */
'use strict';

var ReactTestUtils = React.addons.TestUtils;

describe('KendoDatetime', function() {

    it('renders', function () {
        ReactTestUtils.renderIntoDocument(
            <KendoDatetime value="" />
        );

    });
});


var KendoDatetime = WingspanForms.KendoDatetime;
