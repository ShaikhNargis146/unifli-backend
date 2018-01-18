module.exports = function (data, options) {
    var req = this.req;
    var res = this.res;
    var sails = req._sails;
    if (!data) {
        data = {};
    }
    var env = require("../../config/env/" + sails.config.environment + ".js");
    res.view(sails.config.environment, {
        jsFiles: jsFiles,
        title: data.title,
        description: data.description,
        keywords: data.keywords,
        adminurl: env.realHost + "/api/",
        realhosturl: env.realHost,
        image: env.realHost + "/api/download/" + data.image,
        url: env.realHost + req.path,
    });
};