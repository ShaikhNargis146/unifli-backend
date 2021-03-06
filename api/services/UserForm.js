URLSlugs = require('mongoose-url-slugs');

var schema = new Schema({
    form: {
        type: String
    },
     result: {
        type:  Schema.Types.Mixed
    },
     formSubmissionDate: {
        type: Date
    },
     status: {
        type: String
    },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    }
});
schema.plugin(URLSlugs('name', {field: 'myslug'}));

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('UserForm', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
      getByUrl: function (data, callback) {
    this.findOne({
      "myslug": data.myslug
        }, function(err, deleted) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, deleted);
            }
        });
    },
};
module.exports = _.assign(module.exports, exports, model);