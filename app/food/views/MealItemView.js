define(['backbone', 'hbs!food/templates/meal_item', ],
    function(Backbone, mealItemTemplate) {
    
    var MealItemView = Backbone.View.extend({
        manage: true,
        tagName: "li",
        serialize: function() { 
            return this.model.toJSON(); 
        },
        template: mealItemTemplate

    });
    return MealItemView;
});
