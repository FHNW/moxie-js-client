define(['backbone', 'underscore', 'moment', 'hbs!places/templates/trainrti', 'justgage'],
    function(Backbone, _, moment, trainRTITemplate) {

    // Refresh every 10 seconds
    var RTI_RENDER_REFRESH = 10000;

    var RTIView = Backbone.View.extend({
        initialize: function() {
            this.model.on('sync', this.render, this);
            this.model.on('request', this.showLoader, this);
            this.intervalID = window.setInterval(_.bind(this.render, this), RTI_RENDER_REFRESH);
        },
        manage: true,
        serialize: function() {
            var context = this.model.toJSON();
            var lastUpdated = this.model.get('lastUpdated');
            if (lastUpdated) {
                context.lastUpdatedFormatted = moment(lastUpdated).fromNow();
            }
            return context;
        },
        showLoader: function() {
            this.$("#rti-load").css('visibility', 'visible');
        },
        afterRender: function() {
            this.$("#rti-load").css('visibility', 'hidden');
        },
        cleanup: function() {
            this.model.off();
            if (this.intervalID) {
                window.clearInterval(this.intervalID);
            }
        }
    });
    var RTIViews = {
        "rail-arrivals": RTIView.extend({
            template: trainRTITemplate
        }),
    };
    // Departures uses the same view as arrivals
    RTIViews['rail-departures'] = RTIViews['rail-arrivals'];
    return RTIViews;
});
