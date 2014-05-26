define(["app", "moxie.conf", "underscore", "backbone", "food/views/MealsView", "food/collections/MealCollection", "backbone.subroute" ],
    function(app, conf, _, Backbone, MealsView, MealCollection){

        var FoodRouter = Backbone.SubRoute.extend({
            meals: new MealCollection(),

            routes: {
                '': 'listFood',
            },

            initialize: function() {
                this.meals.fetch({reset: true});
            },

            listFood: function() {
                app.showView(new MealsView({collection: this.meals}));
            },
        });
        return FoodRouter;
});
