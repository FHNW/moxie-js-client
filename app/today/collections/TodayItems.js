define(['underscore', 'core/collections/MoxieCollection', 'today/models/NearbyRTI', 'today/models/Events', 'today/models/FavouriteRTI', 'today/models/Notifications'], function(_, MoxieCollection, NearbyRTI, Events, FavRTI, Notifications) {
    var TodayItems = MoxieCollection.extend({
        initialize: function(models, options) {
            this.favourites = options.favourites;
            this.favouritesUpdated = false;
            this.favourites.on('change add remove', _.bind(function() {
                this.favouritesUpdated = true;
            }, this));

            this.settings = options.settings;
            this.settingsUpdated = false;
            this.settings.on('change add remove', _.bind(function() {
                this.settingsUpdated = true;
            }, this));
        },
        fetch: function() {
            // If we have already loaded the Cards and the favourites haven't updated
            // we don't need to load them again.
            if (this.length===0 || this.favouritesUpdated || this.settingsUpdated) {
                this.favouritesUpdated = false;
                this.settingsUpdated = false;

                var models = [];
                models.push(new Notifications());   // not optional
                if (this.settings.enabled('Events')) { models.push(new Events()); }

                var favPOIDs = [];
                if (this.settings.enabled('FavRTI')) {
                    this.favourites.each(function(fav) {
                        var attrs = fav.attributes;
                        if ('options' in attrs && 'model' in attrs.options && 'RTI' in attrs.options.model && attrs.options.model.RTI.length > 0) {
                            // Find a user Favourite which has an RTI attribute
                            favPOIDs.push(attrs.options.model.id);
                            var favRTI = new FavRTI(attrs.options.model);
                            if (fav.has('userTitle')) {
                                favRTI.set('userTitle', fav.get('userTitle'));
                            }
                            models.push(favRTI);
                        }
                    }, this);
                }

                // Pass the POI ID's to the nearby RTI card so we can avoid showing
                // a duplicate RTICard on the today view.
                if (this.settings.enabled('NearbyRTI')) { models.push(new NearbyRTI({favouritePOIs: favPOIDs})); }

                this.reset(models);
                this.each(function(model) {
                    model.fetch();
                });
            }
        }
    });
    return TodayItems;
});
