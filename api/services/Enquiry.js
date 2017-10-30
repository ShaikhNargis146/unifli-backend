var schema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    query: {
        type: String,
    },
    user: {
        type: String,

    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Enquiry', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

    sendEnquiry: function (data, callback) {
        console.log("data", data);
        // var contact = this(data);
        var match = {};
        if (data.email) {
            match = {
                email: data.email
            };
        } else {
            match = {
                _id: data._id
            };
        }
        Enquiry.findOne(match).exec(function (err, data1) {
            console.log("data1", data1, err);
            if (err) {
                callback(err, null);
            } else if (data1) {
                console.log("data", data1);
                var emailData = {}
                emailData.email = data1.email;
                // emailData.mobile = data1.mobile;
                emailData.filename = "Inquiry";
                emailData.name = data1.name;
                emailData.subject = "Inquiry Details";
                console.log("email data : ", emailData);

                Config.email(emailData, function (err, emailRespo) {
                    console.log("emailRespo", emailRespo);
                    if (err) {
                        console.log(err);
                        callback(err, null);
                    } else if (emailRespo) {
                        callback(null, "Contact us form saved successfully!!!");
                    } else {
                        callback("Invalid data", null);
                    }
                });

            } else {
                callback("Invalid data", null);
            }
        });
    },

};
module.exports = _.assign(module.exports, exports, model);