define(["app", "backbone", "places/router", "today/views/IndexView", "courses/router", "library/router", "favourites/views/FavouritesView"], function(app, Backbone, PlacesRouter, IndexView, CoursesRouter, LibraryRouter, FavouritesView){
    var MoxieRouter = Backbone.Router.extend({
        subrouters: {},
        routes: {
            "": "index",
            "favourites/": "favourites",

            "places/*subroute": "placesModule",
            "courses/*subroute": "coursesModule",
            "library/*subroute": "libraryModule"
        },

        index: function(params) {
            app.renderView(new IndexView({params: params}), {menu: true});
        },

        favourites: function(params) {
            app.renderView(new FavouritesView({params: params}), {menu: true});
        },

        placesModule: function(subroute) {
            if (!this.subrouters.Places) {
                this.subrouters.Places = new PlacesRouter('places', {createTrailingSlashRoutes: true});
            }
        },
        coursesModule: function(subroute) {
            if (!this.subrouters.Courses) {
                this.subrouters.Courses = new CoursesRouter('courses', {createTrailingSlashRoutes: true});
            }
        },
        libraryModule: function(subroute) {
            if (!this.subrouters.Library) {
                this.subrouters.Library = new LibraryRouter('library', {createTrailingSlashRoutes: true});
            }
        }
    });
    return MoxieRouter;
});
