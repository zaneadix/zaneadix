var moment = require('moment');

// moment.updateLocale('en', {
//     relativeTime : {
//         future: "in %s",
//         past:   "%s ago",
//         s: function (number, withoutSuffix, key, isFuture){
//             return '00:' + (number<10 ? '0':'') + number + ' minutes';
//         },
//         m:  "01:00 minutes",
//         mm: function (number, withoutSuffix, key, isFuture){
//             return (number<10 ? '0':'') + number + ':00' + ' minutes';
//         },
//         h:  "an hour",
//         hh: "%d hours",
//         d:  "a butt",
//         dd: "%d days",
//         M:  "a month",
//         MM: "%d months",
//         y:  "a year",
//         yy: "%d years"
//     }
// });

hexo.extend.helper.register('timePassed', function(date){
    return moment(date).startOf('day').fromNow();  
});