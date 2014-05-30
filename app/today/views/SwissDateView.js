define(['today/views/CardView', 'hbs!today/templates/swiss_date'], function(CardView, swissDateTemplate) {
    var SwissDateView = CardView.extend({
        weight: 90,
        manage: true,
        id: 'swiss_date',
        attributes: {'class': 'today'},
        serialize: function() {
            return this.model.toJSON();
        },
        template: swissDateTemplate
    });
    return SwissDateView;
});
