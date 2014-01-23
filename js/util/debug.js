define([
    'underscore',
    'stacktrace' // exposes 'printStackTrace'
], function (_) {
    'use strict';

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

    return {
        verify: verify
    };
});
