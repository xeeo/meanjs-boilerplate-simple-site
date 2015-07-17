'use strict';

module.exports = {
    app              : {
        title      : 'Mean Boilerplate',
        description: 'A boilerplate for Mean Apps',
        keywords   : 'MEANJS Mean Boilerplate'
    },
    prerenderToken   : process.env.PRERENDER_TOKEN || '',
    baseUrl          : process.env.BASE_URL || '',
    port             : process.env.PORT || 3000,
    mailer           : {
        to     : process.env.MAILER_TO || 'MAILER_TO',
        from   : process.env.MAILER_FROM || 'MAILER_FROM',
        options: {
            service: process.env.MAILER_SERVICE_PROVIDER || '',
            auth   : {
                apiKey: process.env.MANDRILL_APIKEY || ''
            }
        }
    },
    templateEngine   : 'swig'
};
