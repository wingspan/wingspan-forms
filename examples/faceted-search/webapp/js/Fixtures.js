define([
    'underscore'
], function (_) {
    'use strict';


    function generateDatabase() {
        var N = 25;
        var firstNameChoices = ['Alice', 'Bob', 'Charlie', 'Danny', 'Ernie'];//, 'Frank', 'Graham', 'Holly', 'Indigo', 'James']
        var lastNameChoices = ['Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf'];//, 'Hotel', 'India', 'Juliet', 'Kilo', 'Lima', 'Mike', 'Novemeber', 'Oscar', 'Papa', 'Quebec', 'Romeo', 'Sierra', 'Tango', 'Uniform', 'Victor', 'Whiskey', 'X-Ray', 'Yankee', 'Zulu']
        var database = _.chain(_.range(1, N)).map(function () {
            var firstName = firstNameChoices[_.random(0, firstNameChoices.length-1)];
            var lastName = lastNameChoices[_.random(0, lastNameChoices.length-1)];
            return {
                firstName: firstName,
                lastName: lastName,
                phoneNumber: [_.str.pad(_.random(0, 999), 3, '0', 'left'), _.str.pad(_.random(0, 999), 3, '0', 'left'), _.str.pad(_.random(0, 9999), 4, '0', 'left')].join('-'),
                contactGroup: ['friend', 'work', 'family'][_.random(0,2)],
                email: _.str.sprintf('%s.%s@example.com', firstName, lastName).toLowerCase(),
                id: generateUUID(),
                revision: 1
            };
        }).value();
        return database;
    }

    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x7|0x8)).toString(16);
        });
        return uuid;
    };

    return { generateDatabase: generateDatabase };
});
