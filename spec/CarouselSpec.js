/** @jsx React.DOM */
'use strict';

var ReactTestUtils = React.addons.TestUtils;

describe('Carousel', function() {

    it('renders', function () {
        ReactTestUtils.renderIntoDocument(
            <Carousel
                value={1}
                options={[{ id: '0' }, { id: '1' }]}
            />
        );
    });
});


var Carousel = WingspanForms.Carousel;
