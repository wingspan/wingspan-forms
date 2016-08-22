import React from 'react'
import $ from 'jquery'
import { noop } from '../ReactCommon'

const SwitchBox = React.createClass({

    statics: { fieldClass: function () { return 'formFieldSwitch'; } },

    getDefaultProps: function () {
        return {
            onChange: noop,
            labels: { 'yes': 'Yes', 'no': 'No' },
            disabled: false,
            readonly: false,
            noControl: false
        };
    },

    getDisplayValue: function () {
        return !!this.props.value ? this.props.labels.yes : this.props.labels.no;
    },

    onKeyDown: function (e) {
        if (e.key === ' ') {
            if (!this.props.readonly) {
                this.props.onChange(!this.props.value);
            }
            // Prevent the default always so that the space key doesn't scroll the page.
            e.preventDefault();
        }
    },

    /*jshint ignore:start */
    render: function () {
        var props = this.props;

        if (props.noControl) {
            return (React.createElement("span", null, this.getDisplayValue()));
        }

        var yes = props.value === true;
        var no  = props.value === false;

        var toggle = (onChange, val) => {
            // Prevent toggle if already in that state
            if(val !== this.props.value) {
                return _.partial(onChange, val);
            }
        };

        var clickYes = props.readonly ? noop : toggle(props.onChange, true);
        var clickNo  = props.readonly ? noop : toggle(props.onChange, false);

        return (
            <div tabIndex="0" className="switch" onKeyDown={this.onKeyDown}>
                <ul>
                    <li className={yes ? 'active' : ''} onClick={clickYes}>
                        <span className={yes ? 'pos' : ''}>{props.labels.yes}</span>
                    </li>
                    <li className={no ? 'active' : ''} onClick={clickNo}>
                        <span className={no ? 'neg' : ''}>{props.labels.no}</span>
                    </li>
                </ul>
            </div>
        );
    }
    /*jshint ignore:end */
});

export default SwitchBox;