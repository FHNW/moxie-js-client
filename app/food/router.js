define(["app", "moxie.conf", "backbone", "food/views/MealsView", "food/collections/MealCollection"],
    function(app, conf, Backbone, MealsView, MealCollection){

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
