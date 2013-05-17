define(["backbone", "underscore", "moxie.conf"], function(Backbone, _, conf) {

    var Course = Backbone.Model.extend({
        url: function() {
            return conf.urlFor('course_id') + this.id;
        },
        parse: function(data) {
            if (data._embedded && data._embedded.presentations) {
                data.presentations = data._embedded.presentations;
            } else {
                data.presentations = [];
            }
            return _.omit(data, ['_embedded', '_links']);
        }
    });

    return Course;

});
