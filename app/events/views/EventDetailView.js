define(["backbone", "hbs!events/templates/event"],
    function(Backbone, eventTemplate) {
        var EventDetailView = Backbone.View.extend({
            manage: true,
            serialize: function() { return this.model.toJSON(); },
            template: eventTemplate
        });
        return EventDetailView;
});