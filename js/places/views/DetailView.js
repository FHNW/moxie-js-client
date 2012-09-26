define(['jquery', 'backbone', 'underscore', 'handlebars', 'leaflet', 'moxie.conf'], function($, Backbone, _, Handlebars, L, MoxieConf){
    var DetailView = Backbone.View.extend({

        initialize: function() {
            _.bindAll(this);
            console.log(this);
            var headers;
            if (this.user_position) {
                headers = {'Geo-Position': this.user_position.join(';')};
            }
            var url = MoxieConf.endpoint+"/places/"+this.options.poid;
            $.ajax({
                url: url,
                dataType: 'json',
                headers: headers
            }).success(this.getDetail);
            this.user_position = null;
            this.poi = null;
            var wpid = navigator.geolocation.watchPosition(this.handle_geolocation_query, this.geo_error, {maximumAge:60000, timeout:20000});
        },

        getDetail: function(data) {
            this.poi = new this.model(data);
            this.render();
        },

        render: function() {
            var context = {'poi': this.poi};
            console.log(context);
            $("#content").html(Handlebars.templates.detail(context));
            this.map = L.map('map').setView([51.75310, -1.2600], 15);
            L.tileLayer('http://{s}.tile.cloudmade.com/b0a15b443b524d1a9739e92fe9dd8459/997/256/{z}/{x}/{y}.png', {
                maxZoom: 18,
                // Detect retina - if true 4* map tiles are downloaded
                detectRetina: true
            }).addTo(this.map);
            this.map.attributionControl.setPrefix('');
            var latlng = new L.LatLng(this.poi.get('lat'), this.poi.get('lon'));
            var marker = new L.marker(latlng, {'title': this.poi.get('name')});
            marker.addTo(this.map);
        },

        geo_error: function(error) {
            if (!this.user_position) {
                console.log("No user location");
            }
        },

        handle_geolocation_query: function(position) {
            this.user_position = [position.coords.latitude, position.coords.longitude];
            var you = new L.LatLng(position.coords.latitude, position.coords.longitude);
            L.circle(you, 10, {color: 'red', fillColor: 'red', fillOpacity: 1.0}).addTo(this.map);
            this.map.panTo(you);
        }

    });
    return DetailView;
});
