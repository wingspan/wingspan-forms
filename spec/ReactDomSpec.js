/** @jsx React.DOM */
'use strict';

var ReactTestUtils;

describe('react', function() {

    beforeEach(function() {
        ReactTestUtils = React.addons.TestUtils;
    });

    it('can render', function() {
        var label = <div>Hello</div>;
        ReactTestUtils.renderIntoDocument(label);
    });

    it('can detect exceptions in render', function () {
        var Throws = React.createClass({
            render: function () { throw 42; }
        });
        expect(_.partial(ReactTestUtils.renderIntoDocument, <Throws />)).toThrow();
    });

    it('can get wingspan-forms on the page', function () {
        ReactTestUtils.renderIntoDocument(
            <KendoText value="42" />
        );
    });
});


var KendoText = WingspanForms.KendoText;
