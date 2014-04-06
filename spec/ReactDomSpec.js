/** @jsx React.DOM */
'use strict';

var ReactTestUtils = React.addons.TestUtils;

describe('Test', function() {

    it('can render React components', function() {
        var label = <div>Hello</div>;
        ReactTestUtils.renderIntoDocument(label);
    });

    it('can detect exceptions in render', function () {
        var Throws = React.createClass({
            render: function () { null.throw(); }
        });

        expect(_.partial(ReactTestUtils.renderIntoDocument, <Throws />)).toThrow();
        expect(_.partial(ReactTestUtils.renderIntoDocument, <div>Hello</div>)).not.toThrow();
    });

    it('can test wingspan-forms code', function () {
        ReactTestUtils.renderIntoDocument(
            <KendoText value="42" />
        );
    });
});


var KendoText = WingspanForms.KendoText;
