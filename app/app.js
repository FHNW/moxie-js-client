define(['jquery', 'backbone', 'underscore', 'core/views/MapBrowseLayout', 'favourites/collections/Favourites', 'favourites/views/FavouriteButtonView', 'today/collections/TodaySettings', 'core/collections/HelpMessages', 'cordova.help'], function($, Backbone, _, MapBrowseLayout, Favourites, FavouriteButtonView, TodaySettings, HelpMessages, cordova) {
    var app = {

        navigate: _.wrap(Backbone.history.navigate, function(nav, path, options) {
            nav.apply(Backbone.history, [path, options]);
        }),
        currentLayout: null,

        // These are full-container layouts
        // Specifically we're using it so we don't remove the Map when
        // the layout is updated, to reduce processing/requests
        //
        // Most layouts don't need to be included here unless similar
        // benefits (such as keeping the Map in the DOM) can be found.
        layouts: {'MapBrowseLayout': MapBrowseLayout},

        showView: function(view) {
            return this.renderView(view);
        },

        isCordova: cordova.isCordova,
        isOnline: function() {
            var connectionAvailable = true;
            if (this.isCordova()) {
                // If device.ready then we can provide more details about the network
                //
                // NOTE: It's important to test all these attributes before accessing them as we
                //       don't know if device.ready has fired. This seems to cause issues on older
                //       Android devices.
                if (('connection' in navigator) && ('type' in navigator.connection) && ('Connection' in window)) {
                    if(navigator.connection.type === window.Connection.NONE) {
                        connectionAvailable = false;
                    }
                }
            }
            return connectionAvailable;
        },

        whenOnline: function(cb) {
            return $(document).on("online", cb);
        },

        // These two collections are both stored in localStorage
        // in Future both should be sync'd remotely
        todaySettings: new TodaySettings(),
        favourites: new Favourites(),
        helpMessages: new HelpMessages(),

        renderView: function(view, options) {
            options = options || {};
            if (this.isCordova()) {
                if (options.menu) {
                    $('#back').hide();
                    $('#home').show();
                } else {
                    $('#home').hide();
                    $('#back').show();
                }
            }

            // Remove existing contextButton, this should call cleanup
            if (this.contextButtonView) {
                this.contextButtonView.remove();
            }
            // Render the Context button
            //
            // If no `contextButtonView` is specified in `options` then we
            // render out the FavouriteButtonView as a default button.
            this.contextButtonView = options.contextButtonView || new FavouriteButtonView({collection: this.favourites});
            $('#context-button').empty().append(this.contextButtonView.el);
            this.contextButtonView.render();

            // Remove any existing layouts
            // If managed with LayoutManager this will call cleanup
            if (this.currentLayout) {
                this.currentLayout.remove();
            }
            // Attach a view to the DOM and call render
            this.currentLayout = view;
            $('#content').empty().append(this.currentLayout.el);
            this.currentLayout.render();
        },

        getLayout: function(name) {
            if (this.currentLayout && this.currentLayout.name === name) {
                return this.currentLayout;
            } else {
                if (this.layouts[name]) {
                    var RequestedLayout = this.layouts[name];
                    var layout = new RequestedLayout();
                    this.renderView(layout);
                    return layout;
                } else {
                    throw new Error("Layout doesn't exist");
                }
            }
        }
    };

    return app;
});
