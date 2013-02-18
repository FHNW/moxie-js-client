require(["jquery", "backbone", "jasmine-html"],

  function($, Backbone, jasmine) {
    // NOTE: This is *the* place to add specs to the test suite
    // See the docs for more info on adding specs to Moxie
    specs = [];
    // Core app
    specs.push('tests/specs/app');
    //Favourites
    specs.push('favourites/specs/button');
    $(function() {
      require(specs, function() {
        jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
        jasmine.getEnv().execute();
      });
    });
  }
);