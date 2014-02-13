define([], function () {
    'use strict';

    var Transport = kendo.Class.extend({
        init: function (url) {
            this.url = url;
        },

        read: function (request) {
            ServiceClient.ajaxCall({
                url: this.url,
                type: 'GET',
                dataType: 'json',
                data: dataCommon.mapQueryParams(request.data),
                processData: true
            }).then(request.success, request.error);
        },

        create: function (request) {
            ServiceClient.ajaxCall({
                url: this.url,
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(request.data),
                contentType: dataCommon.MIME_JSON,
                processData: false
            }).then(request.success, request.error);
        },

        update: function (request) {
            ServiceClient.ajaxCall({
                url: dataCommon.getIdentityUrl(request.data),
                type: 'PUT',
                dataType: 'json',
                data: JSON.stringify(request.data),
                contentType: dataCommon.MIME_JSON,
                processData: false
            }).then(request.success, request.error);
        },

        destroy: function (request) {
            ServiceClient.ajaxCall({
                url: dataCommon.getIdentityUrl(request.data),
                type: 'DELETE',
                dataType: 'json'
            }).then(request.success, request.error);
        }
    });

    return Transport;
});
