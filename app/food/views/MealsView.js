define(['backbone', 'underscore', 'moxie.conf', 'food/models/MealModel', 'hbs!food/templates/index', 'food/views/MealItemView' ],
    function(Backbone, _, conf, MealModel, mealsTemplate, MealItemView) {
    
    var MealsView = Backbone.View.extend({

        initialize: function() { 
            this.collection.on('reset', this.render, this);
        },

        manage: true,
        template: mealsTemplate,

        beforeRender: function() {
            Backbone.trigger('domchange:title', "Restaurant XYZ");
            var todayMeals = [];

            function addMeal(meal) {
                todayMeals.push(new MealItemView({model: meal}));
            }

            // this.collection.fetch( {success: function (collection, response) {
//console.log('Collection models: ', this.models);
            // collection.each(addMeal, this); }});
            console.log('Collection models: ', this.collection.models);

            _.each(this.collection.models, addMeal, this);
            //debugger;

            this.insertViews({
                'ul#meals': todayMeals
            });
        },

    });
    return MealsView;
});
