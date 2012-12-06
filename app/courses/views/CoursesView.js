define(['jquery', 'backbone', 'underscore', 'hbs!templates/base', 'hbs!courses/templates/courses', 'leaflet', 'moxie.conf'], 
	function($, Backbone, _, baseTemplate, coursesTemplate, L, MoxieConf){
    var CoursesView = Backbone.View.extend({

        initialize: function() {
            _.bindAll(this);
            $.ajax({
                url: MoxieConf.urlFor('courses_search') + "?q=" + this.options.query,
                dataType: 'json'
            }).success(this.renderCoursesList);
        },

        render: function() {
            $("#content").html(baseTemplate());
        },

        renderCoursesList: function(data) {
            if(data.results.length > 0) {
                $('#list').html(coursesTemplate(data));
            } else {
                $('#list').html("<h3>No results</h3>");
            }
        }
    });
    return CoursesView;
});
