/** @jsx React.DOM */
define([
  'underscore', 'react', 'jquery', 'wingspan-forms',
], function (_, React, $, Forms) {
  'use strict';



  var App = React.createClass({displayName: "App",
    getInitialState: function () {
      return {
        time: '23:11:09'
      };
    },
    render: function () {
      return (
        React.createElement("div", null, 
          React.createElement("div", {class: "formTitle"}, "KendoTime test"), 

          React.createElement(FormField, {fieldInfo: {label: 'timepicker'}, isValid: [true, ''], layout: "formField"}, 
            React.createElement(KendoTime, {
              value: this.state.time, 
              onChange: _.partial(this.onChange, 'time')})
          )
        )
      );
    },

    onChange: function (fieldName, fieldValue) {
      var nextState = {};
      nextState[fieldName] = fieldValue;
      this.setState(nextState);
    }
  });


  function entrypoint(rootEl) {
    React.renderComponent(React.createElement(App, null), rootEl);
  }

  var FormField = Forms.FormField;
  var KendoTime = Forms.KendoTime;

  return {
    entrypoint: entrypoint
  };
});
