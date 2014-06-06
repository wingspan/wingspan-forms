/** @jsx React.DOM */
define([
  'underscore', 'jquery', 'react', 'kendo',
  '../util/util',
  '../ControlCommon',
  '../ImmutableOptimizations'
], function (_, $, React, kendo, util, ControlCommon, ImmutableOptimizations) {
  'use strict';


  /**
   * value interface is ISO-8601, with the date portion ommitted.
   * HH:MM:SS
   */
  var KendoDate = React.createClass({
    mixins: [ImmutableOptimizations(['onChange'])],

    statics: { fieldClass: function () { return 'formFieldDatepicker'; } },

    getDefaultProps: function () {
      return {
        format: 'HH:mm:ss', // display format
        value: undefined,
        id: undefined,
        onChange: function () {},
        disabled: false,
        isValid: [true, ''],
        readonly: false,
        noControl: false
      };
    },

    /*jshint ignore:start */
    render: function () {
      return (this.props.noControl
        ? (<span>{this.props.value ? kendo.toString(util.parseISODate(this.props.value), this.props.format) : ''}</span>)
        : (<input id={this.props.id} type="text" />));
    },
    /*jshint ignore:end */

    componentDidMount: function () {

      if (this.props.noControl) {
        // Everything was done in JSX.
        return;
      }

      var $el = $(this.getDOMNode());
      console.assert($el);

      $el.kendoTimePicker({
        change: this.onChange,
        format: this.props.format
      });

      ControlCommon.setKendoDateState(
        $el.data('kendoTimePicker'),
        kendo.parseDate(this.props.value, 'HH:mm:ss'),
        this.props.disabled, this.props.readonly,
        this.props.max, this.props.min);
    },

    componentDidUpdate: function (prevProps, prevState) {
      if (this.props.noControl) {
        // Everything was done in JSX.
        return;
      }

      var $el = $(this.getDOMNode());
      console.assert($el);

      ControlCommon.setKendoDateState(
        $el.data('kendoTimePicker'),
        kendo.parseDate(this.props.value, 'HH:mm:ss'),
        this.props.disabled, this.props.readonly,
        this.props.max, this.props.min);
    },

    onChange: function (event) {
      var kendoWidget = event.sender;
      var val = kendo.toString(kendoWidget.value(), 'HH:mm:ss');
      this.props.onChange(val);
    }
  });

  return KendoDate;
});
