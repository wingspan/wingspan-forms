
'use strict';

var ReactTestUtils = React.addons.TestUtils;

describe('RadioGroup', function() {

    it('renders', function () {
        ReactTestUtils.renderIntoDocument(
            <RadioGroup value="2">
                <Radio value="1" name="test">Radio Label</Radio>
                <Radio value="2" name="test">Radio Label</Radio>
                <Radio value="3" name="test">Radio Label</Radio>
            </RadioGroup>
        );

    });
});


var RadioGroup = WingspanForms.RadioGroup;
var Radio = WingspanForms.Radio;
