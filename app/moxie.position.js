define(["underscore", "backbone", "moxie.conf"], function(_, Backbone, conf){
    var EVENT_POSITION_UPDATED = 'position:updated';
    var userPosition = {
        count: 0,
        supportsGeoLocation: Boolean(navigator.geolocation),
        follow: function(cb) {
            if (this.count===0) {
                this.startWatching();
            }
            this.on(EVENT_POSITION_UPDATED, cb);
            if (this.latest) {
                // New subscribers should get the latest location fix
                this.trigger(EVENT_POSITION_UPDATED, this.latest);
            }
            this.count++;
        },
        unfollow: function(cb) {
            this.off(EVENT_POSITION_UPDATED, cb);
            this.count--;
        },
        locationSuccess: function(position) {
            this.trigger(EVENT_POSITION_UPDATED, position);
            this.latest = position;
        },
        locationError: function() {
            if (!this.latest) {
                // We have no good position data so update to the default location
                this.trigger(EVENT_POSITION_UPDATED, conf.defaultLocation);
                this.latest = conf.defaultLocation;
            }
        },
        startWatching: function() {
            if (this.supportsGeoLocation) {
                // Ask for immediate position then watch with a big timeout / max age
                navigator.geolocation.getCurrentPosition(this.locationSuccess, this.locationError);
                this.watchID = navigator.geolocation.watchPosition(this.locationSuccess, this.locationError,
                    {maximumAge: 120000, timeout:25000}); // This is useful for debugging problem with geolocation
            } else {
                this.locationError();
            }
        }
    };
    _.bindAll(userPosition);
    _.extend(userPosition, Backbone.Events);
    return userPosition;
});
