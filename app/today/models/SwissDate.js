define(['MoxieModel', 'moxie.conf', 'today/views/SwissDateView'], function(MoxieModel, conf, SwissDateView) {
    var SwissDate = MoxieModel.extend({
        url: conf.urlFor('dates'),
        View: SwissDateView
    });
    return SwissDate;
});
