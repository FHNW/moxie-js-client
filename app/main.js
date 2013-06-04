require(['jquery','backbone', 'router', 'fastclick', 'moxie.conf', 'favourites/views/FavouriteButtonView', 'backbone.queryparams', 'backbone.layoutmanager'], function($, Backbone, MoxieRouter, FastClick, conf, FavouriteButtonView) {
    // Include FastClick, this removes a 300ms touch event delay
    $(function() {
        new FastClick(document.body);

        // Listen for events on each click on Android
        // This seems to be the only way to open links in the android browser
        if ((window.device!==undefined) && (window.device.platform==='Android')) {
            $('#content').on('click', "a[target='_blank']", function(ev) {
                ev.preventDefault();
                var url = $(this).attr("rel");
                navigator.app.loadUrl(url, { openExternal:true });
                return false;
            });
        }
    });

    var moxieRouter = new MoxieRouter();

    // Default to requesting hal+json but fallback to json
    $.ajaxSetup({ headers: { 'Accept': 'application/hal+json;q=1.0, application/json;q=0.9, */*; q=0.01' } });

    // Add an event listener for sending document title changes
    Backbone.on('domchange:title', function(title) {$(document).attr('title', conf.titlePrefix+title);}, this);

    // This kicks off the app -- discovering the hashchanges and calling routers
    Backbone.history.start();

    // Some simple events called on the default index page -- mostly for the sidebar menu
    $('#home a').click(function(ev) {
        ev.preventDefault();
        $('body').toggleClass('is-sidebar-active');
        return false;
    });
    $('#back a').click(function(ev) {
        ev.preventDefault();
        window.history.back();
        return false;
    });
    $('.overlay, #sidebar a').click(function(ev) {
        $('body').toggleClass('is-sidebar-active');
    });
    new FavouriteButtonView({el: $('#favourite a')});
});
