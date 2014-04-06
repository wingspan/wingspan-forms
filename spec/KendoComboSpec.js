/** @jsx React.DOM */
'use strict';

var ReactTestUtils = React.addons.TestUtils;

describe('KendoComboBox', function() {

    var inlineData = [{ id: 10, name: 'Dustin'}, { id: 11, name: 'Jon'}, { id: 12, name: 'Paul'}];

    it('must have a valueField and displayField', function () {
        expect(_.partial(ReactTestUtils.renderIntoDocument,
            <KendoComboBox value="42" />
        )).toThrow();

        expect(_.partial(ReactTestUtils.renderIntoDocument,
            <KendoComboBox value="42" valueField="id" />
        )).toThrow();
    });

    it('accepts inline data', function () {
        ReactTestUtils.renderIntoDocument(
            <KendoComboBox
                displayField="name"
                valueField="id"
                dataSource={inlineData}
                value={inlineData[0]} />
        );
    });

    // This should fail. I don't know how to force an update
    // in test mode.
//    it('can\'t update inline data', function () {
//
//        var div = document.createElement('div');
//        document.documentElement.appendChild(div);
//        React.renderComponent(
//            <KendoComboBox
//                displayField="name"
//                valueField="id"
//                dataSource={inlineData}
//                value={inlineData[0]} />,
//            div);
//        React.renderComponent(
//            <KendoComboBox
//                displayField="name"
//                valueField="id"
//                dataSource={[{id: 42, name: 'name'}]}
//                value={inlineData[1]} />,
//            div);
//    });
});


var KendoComboBox = WingspanForms.KendoComboBox;
