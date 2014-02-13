define([
    'underscore', 'kendo', 'q',
    'Database'
], function (_, kendo, Q, Database) {
    'use strict';

    var SuperClass = kendo.data.DataSource.fn;

    var FacetDataStore = kendo.data.DataSource.extend({
        options: {
            url: '', // The URL of the collection resource backing this store
            autoSync: true, // Set "autoSync" to true so that add/remove calls go to the server first
            serverPaging: true,
            serverSorting: true
        },

        init: function(options) {
            options.schema = {
                data: function (response) {
                    this.facets = response.facets;
                    return response.results;
                }.bind(this)
            };

            options.transport = {
                read: function (request) {
                    Database.queryFacets(this.filters).then(request.success).done();
                }.bind(this)
            };
            SuperClass.init.call(this, options);
        },

        read: function (filters) {
            this.filters = filters;
            SuperClass.read.call(this, undefined);
            return promiseForRead(this);
        }
    });


    function promiseForRead(dataStore) {
        var result = new Q.defer();
        function finished(e) {
            dataStore.unbind('change', finished).unbind('error', finished);
            if (e.errorThrown) {
                result.reject(e.errorThrown);
            }
            else {
                result.resolve(e);
            }
        }
        dataStore.bind(['change', 'error'], finished);
        return result.promise;
    }

    return FacetDataStore;
});
