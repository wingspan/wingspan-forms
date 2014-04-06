/** @jsx React.DOM */
'use strict';

var ReactTestUtils = React.addons.TestUtils;

describe('KendoComboBox', function() {

    it('must have a valueField and displayField', function () {
        expect(_.partial(ReactTestUtils.renderIntoDocument,
            <KendoComboBox value="42" />
        )).toThrow();

        expect(_.partial(ReactTestUtils.renderIntoDocument,
            <KendoComboBox value="42" valueField="id" />
        )).toThrow();
    });

    it('accepts inline data', function () {
        var dataSource = [{ id: 10, name: 'Dustin'}, { id: 11, name: 'Jon'}, { id: 12, name: 'Paul'}];
        ReactTestUtils.renderIntoDocument(
            <KendoComboBox
                displayField="name"
                valueField="id"
                dataSource={dataSource}
                value={dataSource[0]} />
        );
    });
});


var KendoComboBox = WingspanForms.KendoComboBox;
