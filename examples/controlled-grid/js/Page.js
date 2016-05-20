define([
    'underscore', 'react', 'react-dom', 'kendo', 'wingspan-forms'
], function (_, React, ReactDOM, kendo, Forms) {
    'use strict';

    var FormField = Forms.FormField;
    var KendoText = Forms.KendoText;
    var KendoComboBox = Forms.KendoComboBox;
    var CheckBox = Forms.CheckBox;
    var KendoGridPicker = Forms.KendoGridPicker;

    function entrypoint(rootElement) {

        var data = [
            { name: 'Alex',    id: '1',  gender: 'female' },
            { name: 'Bobby',   id: '2',  gender: 'male'   },
            { name: 'Chris',   id: '3',  gender: 'female' },
            { name: 'Daryl',   id: '4',  gender: 'male'   },
            { name: 'Freddy',  id: '5',  gender: 'female' },
            { name: 'Georgie', id: '6',  gender: 'male'   },
            { name: 'Jacky',   id: '7',  gender: 'female' },
            { name: 'Louie',   id: '8',  gender: 'male'   },
            { name: 'Max',     id: '9',  gender: 'female' }
        ];
        var fields = [
            { label: 'Pick a Person' },
            { label: 'Selected Person' },
            { label: 'People by Gender' },
            { label: 'People by Checkboxes' },
            { label: 'People by Grid' }
        ];

        var App = React.createClass({

            getInitialState: function () {
                return {
                    selection: '',
                    male: false,
                    female: false,
                    visible: []
                };
            },

            componentWillMount: function () {
                this.visibleDataSource = new kendo.data.DataSource({ data: this.visibleValues() });
            },

            componentDidUpdate: function (prevProps, prevState) {
                this.visibleDataSource.data(this.visibleValues());

                if (this.state.selection && !_.contains(_.pluck(this.visibleValues(), 'id'), this.state.selection)) {
                    this.onChange('selection', '');
                }

                var allPeopleByGender = _.groupBy(this.props.data, 'gender'),
                    allMales = allPeopleByGender.male,
                    allFemales = allPeopleByGender.female,
                    newState = {},
                    self = this;

                if (checkStateChanged('male')) {
                    newState.visible = visibilityByGenderSelection(allMales, this.state.male);
                } else if (checkStateChanged('female')) {
                    newState.visible = visibilityByGenderSelection(allFemales, this.state.female);
                }

                var visiblePeopleByGender = _.groupBy(newState.visible || this.state.visible, 'gender');

                updateGenderCheckState(allMales, 'male');
                updateGenderCheckState(allFemales, 'female');

                if (!_.isEqual(prevState, _.extend({}, prevState, newState))) {
                    this.setState(newState);
                }

                function checkStateChanged(gender) {
                    return prevState[gender] ^ self.state[gender];
                }

                function visibilityByGenderSelection(genderGroup, genderIsSelected) {
                    return (genderIsSelected ? unionDeep : differenceDeep).call(undefined, self.state.visible, genderGroup);
                }

                function updateGenderCheckState(allPeopleOfAGender, gender) {
                    if (!visiblePeopleByGender[gender]) {
                        newState[gender] = false;
                    } else if (_.isEmpty(differenceDeep(allPeopleOfAGender, visiblePeopleByGender[gender]))) {
                        newState[gender] = true;
                    }
                }
            },

            visibleValues: function () {
                var visibleIds = this.visibleIds();
                return _.filter(this.props.data, function (record) { return _.contains(visibleIds, record.id); });
            },

            visibleIds: function () {
                return _.pluck(this.state.visible, 'id');
            },

            render: function () {
                var self = this, visibleIds = _.pluck(this.state.visible, 'id');

                var personDisplayTemplate = '#: name # - #: gender #';

                var nameCheckBoxes = _.map(this.props.data, function (record) {
                    /* jshint ignore:start */
                    return (
                        <CheckBox
                            key={record.id}
                            id={record.id}
                            label={record.name}
                            value={_.contains(visibleIds, record.id)}
                            onChange={_.partial(self.onCheckboxChecked, record)} />
                    );
                    /* jshint ignore:end */
                });

                var genderCheckBoxes = _.map(['male', 'female'], function (gender) {
                    /* jshint ignore:start */
                    return (
                        <CheckBox
                            key={gender}
                            id={gender}
                            label={capitalizeFirstLetter(gender)}
                            value={self.state[gender]}
                            onChange={_.partial(self.onChange, gender)} />
                    );
                    /* jshint ignore:end */
                });

                var gridColumns = [
                    { title: 'Name', template: personDisplayTemplate, sortable: false },
                    { title: 'Id', template: '#: id #', sortable: false }
                ];

                var selectedPerson = (
                    _.findWhere(this.state.visible, { id: this.state.selection }) ||
                    { name: 'Nobody!' }
                );

                /* jshint ignore:start */
                return (
                    <div className="App">
                        <FormField fieldInfo={fields[0]}>
                            <KendoComboBox
                                value={this.state.selection}
                                dataSource={this.visibleDataSource}
                                onChange={_.partial(this.onChange, 'selection')}
                                template={personDisplayTemplate}
                                displayField="name"
                                valueField="id" />
                        </FormField>

                        <FormField fieldInfo={fields[1]}>
                            <KendoText value={selectedPerson.name} />
                        </FormField>

                        <FormField fieldInfo={fields[2]}>
                            {genderCheckBoxes}
                        </FormField>

                        <FormField fieldInfo={fields[3]}>
                            {nameCheckBoxes}
                        </FormField>

                        <FormField fieldInfo={fields[4]}>
                            <KendoGridPicker
                                dataSource={this.props.data}
                                value={this.state.visible}
                                columns={gridColumns}
                                onChange={_.partial(this.onChange, 'visible')} />
                        </FormField>

                        <FormCloser />

                        <PrettyJson value={this.state} />
                    </div>
                );
                /* jshint ignore:end */
            },

            onChange: function (field, value) {
                var newState = {};
                newState[field] = value;

                this.setState(newState);
            },

            onCheckboxChecked: function (record, checked) {
                var newVisible = (checked ? unionDeep : differenceDeep)(this.state.visible, record);
                this.onChange('visible', newVisible);
            }
        });

        ReactDOM.render(React.createElement(App, {data: data}), rootElement);
    }

    var PrettyJson = React.createClass({
        getDefaultProps: function () {
            return {
                indentSpaces: 2
            };
        },

        render: function () {
            return React.createElement('pre', null, JSON.stringify(this.props.value, undefined, this.props.indentSpaces));
        }
    });

    var FormCloser = React.createClass({
        render: function () {
            var style = { clear: 'both'};
            return React.createElement('div', {style: style});
        }
    });

    function capitalizeFirstLetter(string) {
        return [
            string.charAt(0).toUpperCase(),
            string.slice(1)
        ].join('');
    }

    function containsDeep(haystack, needle) {
        return !!_.find(haystack, function (h) {
            return _.isEqual(h, needle);
        });
    }

    function uniqueDeep(xs) {
        return _.reduce(xs, function (acc, x) {
            return (!containsDeep(acc, x) ?
                acc.concat(x) :
                acc);
        }, []);
    }

    function unionDeep(/* set1, set2, ... */) {
        return uniqueDeep(_.flatten(arguments));
    }

    function differenceDeep(/* set1, set2, ... */) {
        var removeTheseItems = _.flatten(_.tail(arguments));
        var fromTheseItems = _.head(arguments);
        return _.filter(fromTheseItems, function (x) {
            // if the current item in the first set exists in any of the other sets,
            // it should not be in the difference.
            var shouldRemove = containsDeep(removeTheseItems, x);
            return !shouldRemove;
        });
    }

    return {
        entrypoint: entrypoint
    };
});
