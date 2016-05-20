
'use strict';

var ReactTestUtils = React.addons.TestUtils;

describe('AutoControl', function() {

    var fieldInfo = {
        dataType: 'enum',
        label: 'Gender',
        name: 'gender',
        options: {
            metadata: { idProperty: 'value', nameProperty: 'label'},
            dataSource: [{ value: 'male', label: 'Male'}, { value: 'female', label: 'Female'}]
        }
    };

    it('renders', function () {
        ReactTestUtils.renderIntoDocument(
            <AutoControl fieldInfo={fieldInfo} value="male" />
        );
    });
});


var AutoControl = WingspanForms.AutoControl;
