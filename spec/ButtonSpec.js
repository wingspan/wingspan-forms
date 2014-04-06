/** @jsx React.DOM */
'use strict';

var ReactTestUtils = React.addons.TestUtils;

describe('Button', function() {

    it('renders', function () {
        ReactTestUtils.renderIntoDocument(
            <Button
                onClick={$.noop}
                disabled={true}
                className="42"
            />
        );

        ReactTestUtils.renderIntoDocument(
            <Button onClick={$.noop} />
        );
    });
});


var Button = WingspanForms.Button;
