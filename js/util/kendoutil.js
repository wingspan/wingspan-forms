define([
    'underscore', 'jquery', 'kendo', '../util/util'
], function (_, $, kendo, util) {
    'use strict';
    var my = {};

    /**
     * Register a custom kendo MVVM binder for formatting numbers.
     * @type {*}
     */
    kendo.data.binders.numeric = kendo.data.Binder.extend({
        refresh: function () {
            var num = this.bindings['numeric'].get();

            $(this.element).text(kendo.toString(num, 'n0'));    // format as N,NNN
        }
    });
    kendo.data.binders.dateText = kendo.data.Binder.extend({
        refresh: function () {
            var date = this.bindings['dateText'].get();

            $(this.element).text(kendo.toString(date, 'dd-MMM-yyyy'));
        }
    });
    /*
     * This is needed for the implementation of the foreach binding.
     * @type {Function|fn|.duration.fn|jQuery.fn|fn|kendoJQuery.fn|Point2D.fn|Box2D.fn}
     */
    var SourceBinderClass = kendo.data.binders.source.fn;
    /**
     * This binding allows a foreach: binding that uses the interior HTML as the template.
     * @type {*}
     */
    kendo.data.binders.foreach = kendo.data.binders.source.extend({
        init: function (target, binding, options) {
            // Set the template using the contained markup
            var templateHtml = $(target).html();
            options.template = kendo.template(_.str.trim(templateHtml));

            SourceBinderClass.init.call(this, target, binding, options);
        },
        refresh: function (e) {
            // alias the binding data
            this.bindings.source = this.bindings.foreach;

            SourceBinderClass.refresh.call(this, e);
        }
    });

    /**
     * This came from a forum posting here:
     * http://www.kendoui.com/forums/kendo-ui-web/grid/dynamic-grid-height.aspx
     */
    function resizeKendoGrids() {
        var $grids = $(document.body).find('.k-grid.k-widget');

        $.each($grids, function () {
            var gridElement = $(this);
            var grid = gridElement.data('kendoGrid');

            // Depending on how the view template works, the widget might be on a child element
            if (!grid) {
                grid = gridElement.find('[data-role="grid"]').data('kendoGrid');
            }
            // Call the kendo private method that sets the grid content height based on toolbar,header,footer settings.
            // This is more robust than trying to figure out how they do it for different kinds of grids. (AHG)
            if (grid) {
                grid._setContentHeight();
            }
        });
    }

    // Register a single resize handler that will manage all the grids on the page.
    // This central registration will prevent memory leaks for handlers to views that appear/disappear.
    $(window).resize(resizeKendoGrids);

    my.resizeKendoGrids = resizeKendoGrids;



    my.templateWith = function templateWith(template, f) {
        return function (record) {
            return template(f(record));
        };
    };

    my.templateForEnum = function templateForEnum(field) {
        return kendo.template('#: ' + field + '.name #');
    };

    my.templateForUser = function templateForUser(field) {
        return kendo.template('#: ' + field + '.fullName #');
    };

    /**
     * Adds routines to the kendo model for interacting with the object's type info
     * @param baseModelConfig - existing model config that is to be added to
     * @param typeInfo - typeInfo to be used
     * @param localeManager - component's localeManager
     * @param rawModelFieldOpt - optional name of the field in the record that will
     * contain the raw data for the record (straight from the server) that maps to
     * the typeInfo. By default it is assumed that the root of the record is the object
     * described by the type info
     * @returns {*}  - Updated model config
     */
    my.typeInfoModel = function (baseModelConfig, typeInfo, localeManager, rawModelFieldOpt) {
        var rawModelPrefix = '';
        if (null !== rawModelFieldOpt && undefined !== rawModelFieldOpt && rawModelFieldOpt.length > 0) {
            rawModelPrefix = rawModelFieldOpt + '.';
        }

        var theTypeInfo = typeInfo;
        var theLocaleManager = localeManager;

        function subTypeInfo(fieldName) {
            return theTypeInfo.types[theTypeInfo.properties[fieldName].dataType];
        }

        var modelConfig = {
            nls: function (/* args passed through to locale manager */) {
                return theLocaleManager.localize.apply(theLocaleManager, arguments);
            },
            /**
             * get the type info associated with this object
             */
            typeInfo: function () {
                return theTypeInfo;
            },
            /**
             * get the field info for a specified fields.
             * NOTE: Supports one level of "." notation to get into the group values
             * e.g pendingDocuments.pendingDocumentTaskName
             */
            fieldInfo: function (fieldName) {
                var fieldsSplit = fieldName.split('.');
                if (fieldsSplit.length === 1) {
                    return theTypeInfo.properties[fieldName];
                } else {
                    return subTypeInfo(fieldsSplit[0]).properties[fieldsSplit[1]];
                }
            },
            /**
             * returns the raw value for a field
             */
            value: function (fieldName) {
                var rawFieldName = rawModelPrefix + fieldName;
                return this.get(rawFieldName);
            },
            /**
             * returns the display value for a field
             * @param fieldName name of the field to format
             * @param valueToFormatOpt optional value of the format, useful when dealing with sub fields
             * could use a better solution for this
             * @returns {*}
             */
            display: function (fieldName, valueToFormatOpt) {
                var value;
                if (undefined === valueToFormatOpt) {
                    value = this.value(fieldName);
                } else {
                    value = valueToFormatOpt;
                }
                return util.typedObjectValueToDisplayValue2(value, fieldName, this.fieldInfo(fieldName), theLocaleManager);
            },
            /**
             * returns the display value for a field
             * @param fieldName name of the field to format
             * could use a better solution for this
             * @returns {*}
             */
            displayDateOnly: function (fieldName) {
                return theLocaleManager.formatDate(new Date(Date.parse(this.value(fieldName))));
            },
            /**
             * returns the display value for a field
             * This is for when you want to specify the type info independently of the value or when it's necessary, as in the case of complex structures.
             * @param fieldName name of the field to format
             * @param typePath the path to the type info descriptor.
             * @returns {*}
             */
            displayEx: function (fieldName, typePath) {
                var value = this.value(fieldName);
                return util.typedObjectValueToDisplayValue2(value, fieldName, this.fieldInfo(typePath), theLocaleManager);
            },
            /**
             * Returns the label for a field
             * @param fieldName name of the field (support one level of '.')
             * @param excludeFieldEndingOpt
             * @returns label for the field optionally ending in the field separator/':'
             */
            label: function (fieldName, excludeFieldEndingOpt) {
                return this.labelize(this.fieldDisplayName(fieldName), excludeFieldEndingOpt);
            },
            /**
             * Translates fieldName to display name
             * @param fieldName
             * @returns {String}
             */
            fieldDisplayName: function (fieldName) {
                var label = this.fieldInfo(fieldName).label;
                if (undefined  === label) {
                    label = fieldName;
                }
                return label;
            },
            labelize: function (label, excludeFieldEndingOpt) {
                if (excludeFieldEndingOpt !== true) {
                    label = label + this.nls('labelSuffix');
                }
                return label;
            },
            /**
             * Takes a list of field names, converts them to their display names, intercalates separators.
             * @param fieldNames
             * @param excludeFieldEndingOpt
             * @returns {*}
             */
            labelizeCompound: function (fieldNames, excludeFieldEndingOpt) {
                function add(s, v) { return s + v; }
                var self = this;
                return this.labelize(_.reduce(util.intersperse(this.nls('countrySiteSeparator'), _.map(fieldNames, function (v) { return self.label(v, true); })), add, ''), excludeFieldEndingOpt);
            }
        };

        return $.extend(true, {}, baseModelConfig, modelConfig);
    };

    my.fixEditorOptions = function (kendoGrid, cell, model) {
        var column = kendoGrid.columns[kendoGrid.cellIndex(cell)];
        var field = model.fields[column.field];

        // If there's validation for a date field, need to update the date picker widget with validation options
        if (field.type === 'date' && field.validation) {
            cell.find('input').data('kendoDatePicker').setOptions(field.validation);
        }
    };

    /**
     * Disables row selection for clicks on elements with the given class name.
     *
     * @param grid
     * @param className
     */
    my.makeUnselectableInGrid = function (grid, className) {
        // De-reference a jQuery element containing the grid
        if (grid.jquery) {
            grid = grid.data('kendoGrid');
        }
        grid.selectable.userEvents.bind('select', function (e) {
            if ($(e.event.target).hasClass(className)) {
                // Tell the kendo UserEvents to cancel the "touch" (i.e. click)
                e.sender.cancel();
            }
        });
    };

    /**
     * Tweaks the kendo Selectable widget behavior so that clicks on rows toggle the selection, like a checkbox.
     *
     * @param grid
     */
    my.enableCheckboxSelection = function (grid) {
        grid.selectable.userEvents.notify = function (eventName, data) {
            // Make all "tap/click" events seem like they have the ctrlKey pressed, which gives a checkbox-style UX
            if (eventName === 'tap') {
                data.event.ctrlKey = true;
            }
            this.trigger(eventName, data);
        };
    };

    /**
     * Extend the grid widget API to allow setting the selection with a data object.
     *
     * @param item DataStore model (can be null)
     */
    kendo.ui.Grid.fn.selectDataItem = function (item) {
        if (item && item.uid) {
            this.select(this.table.find('tr[data-uid="' + item.uid + '"]'));
        }
    };

    /* Kendo doesn't expose the global default mouse movement threshold for detecting "clicks" for selection.
     * Use these gyrations to hook the two widgets that create Selectable stuff.
     */
    function setMouseMoveThresholdForSelectables(widget) {
        if (widget.selectable) {
            widget.selectable.userEvents.threshold = 9;     // Allow nine pixels of movement
        }
    }

    kendo.ui.Grid.fn._selectable = _.wrap(kendo.ui.Grid.fn._selectable, function (selectable) {
        selectable.call(this);
        setMouseMoveThresholdForSelectables(this);
    });
    kendo.ui.ListView.fn._selectable = _.wrap(kendo.ui.ListView.fn._selectable, function (selectable) {
        selectable.call(this);
        setMouseMoveThresholdForSelectables(this);
    });

    kendo.ui.Grid.fn.dataItem = _.wrap(kendo.ui.Grid.fn.dataItem, function (wrapped, tr) {
        if (_.isArray(this._data)) {
            return wrapped.call(this, tr);
        } else {
            return null;
        }
    });

    return my;
});
