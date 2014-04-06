/** @jsx React.DOM */
'use strict';

var ReactTestUtils = React.addons.TestUtils;

describe('KendoGrid', function() {

    it('renders', function () {
        ReactTestUtils.renderIntoDocument(
            <KendoGrid
                dataSource={{data:[{name: "test"},{name: "test"}]}}
                columns={[{ field:"name" }]}/>
        );

    });
});


var KendoGrid = WingspanForms.KendoGrid;
