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

            //_.each(this.collection.models, addMeal, this);
            this.collection.each(addMeal, this);

            this.insertViews({
                'ul#meals': todayMeals
            });
        },

    });
    return MealsView;
});
