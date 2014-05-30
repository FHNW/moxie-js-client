define([], function() {
    var MoxieConf = {
        endpoint: 'http://localhost:5000',
        titlePrefix: 'FHNW Mobile - ',
        paths: {
            places_search: '/places/search',
            places_categories: '/places/types',
            places_id: '/places/',
            food: '/food/',
            news: '/news/',
            dates: '/dates/today',
            events_id: '/events/',
            events_list: '/events/search?from=now',
            weather: '/weather/',
            notifications_list: '/notifications/',
            notifications_id: '/notifications/',
        },
        urlFor: function(api_method) {
            return this.endpoint + this.paths[api_method];
        },
        pathFor: function(api_method) {
            return this.paths[api_method];
        },
        defaultLocation: {coords: {latitude: 51.752018, longitude: -1.257723}},
        mapbox: {key: 'mobileox.map-iihxb1dl'},
        map: {
            defaultZoom: 15,
            bounds: {exponent: 0.75, limit: 500, fallback: 5},
            phoneViewMediaQuery: "only screen and (max-width: 767px)",
            defaultTileLayerOptions:  {
                minZoom: 0,
                maxZoom: 18,
                // Detect retina - if true 4* map tiles are downloaded
                detectRetina: true
            }
        },
        position: {
            updateInterval: 60000,          // 60 seconds
            errorMargin: 50,                // 50 meters
            accuracyTimeout: 25000,         // 25 seconds
            maximumAge: 600000,             // 10 minutes
            enableHighAccuracy: true,       // Use the GPS if possible
        },
        news: {
            feeds: [
                    {"title": "University of Oxford - Media", "url": "http://www.ox.ac.uk/news_rss.rm", "slug": "offices-media"},
                ],
            numberOfEntries: 10,
        },
        today: {
            nearbyRTI: {
                fetchCount: 5,      // Number of POIs we fetch to find 1 nearby which doesn't appear in your favourites
            }
        },
        security: {
            feed: null,
        },
        ga: {trackingID: "UA-40281467-3", period: 10, debug: true},
        pushNotifications: {
            ios: {
                enabled: false
            },
            android: {
                enabled: false,
                senderID: ""
            }
        }
    };
    return MoxieConf;
});
