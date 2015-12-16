
'use strict';

var ReactTestUtils = React.addons.TestUtils;

describe('TopStateMixin', function() {

    var fieldInfo = {
        dataType: 'enum',
        label: 'Gender',
        name: 'gender',
        options: {
            metadata: { idProperty: 'value', nameProperty: 'label'},
            dataSource: new kendo.data.DataSource({ data: [{ value: 'male', label: 'Male'}, { value: 'female', label: 'Female'}] })
        }
    };

    it('fieldInfo dataSources should be instances of kendo.data.DataSource', function () {
        expect(fieldInfo.options.dataSource instanceof kendo.data.DataSource).toBe(true);
    });

    it('can clone fieldInfos that have kendo datasources inside', function () {
        var cloned = lodash.cloneDeep(fieldInfo, function (val) { return val instanceof kendo.data.DataSource ? val : undefined; });
        expect(cloned.options.dataSource instanceof kendo.data.DataSource).toBe(true);
    });
});


var AutoControl = WingspanForms.AutoControl;
