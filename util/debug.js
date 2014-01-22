define([
    'underscore', 'q',
    'stacktrace' // exposes 'printStackTrace'
], function (_, Q) {
    'use strict';

    /**
     * Safari (and possibly other browsers) don't allow changing the Error.stack property, so configure Q's longStackSupport
     * based on whether that works.
     * @returns {boolean}
     */
    function checkReadOnlyStack() {
        try {
            throw new Error();
        }
        catch (e) {
            try {
                e.stack = 'debug.js';
            }
            catch (e2) {
                return false;
            }
        }
        return true;
    }

    Q.longStackSupport = checkReadOnlyStack();

    /**
     * For window.onerror compat, all exception objects need to turn into a string.
     */
    function verify(expression, fmt /* ... */) {
        var message;
        if (!expression) {
            var stacktrace = printStackTrace().slice(5).join('\n');
            try {
                var fmtArgs = _.tail(_.tail(arguments));
                message = _.str.sprintf(fmt, fmtArgs);
            }
            catch (e) {
                message = _.str.sprintf('wspt.verify: exception inside wspt.verify: `%s` (`%s`)\n%s', e, fmt, stacktrace);
            }
            throw new Error(message + '\n' + stacktrace);
        }
    }
    function verifyField(object, fieldName) {
        var field = object[fieldName];
        // allows empty string, e.g.
        verify(! (_.isUndefined(field) || _.isNull(field)), 'Missing \'%s\'', fieldName);
    }

    /**
     * Hook to log errors to server using some library.
     * @param err an exception
     */
    function onWindowError(errorMsg, url, lineNumber) {
        void errorMsg;
        void url;
        void lineNumber;
        //console.log('logToServer: ', errorMsg);
    }



    return {
        onWindowError: onWindowError,
        verify: verify,
        verifyField: verifyField
    };

});
