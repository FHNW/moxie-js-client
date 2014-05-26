define(["core/collections/MoxieCollection", "food/models/MealModel", "moxie.conf"], function(MoxieCollection, Meal, conf) {

    var Meals = MoxieCollection.extend({
        model: Meal,
        url: conf.urlFor('food'),
        parse: function(data) {
            return data.meals;
        }
    });

    return Meals;

});
   
