/** @jsx React.DOM */
'use strict';

var ReactTestUtils = React.addons.TestUtils;

describe('CheckBox', function() {

    it('renders', function () {
        ReactTestUtils.renderIntoDocument(
            <FormField fieldInfo={_.object([['label', 'normal checkbox']])} isValid={[true, '']} layout="formField">
                <CheckBox label="Checkbox Label" value={true} />
                <CheckBox label="Checkbox Label" value={true} />
                <CheckBox label="Checkbox Label" value={true} />
            </FormField>
        );
    });
});


var CheckBox = WingspanForms.CheckBox;
var FormField = WingspanForms.FormField;
