define([
    // libs
    'jQuery',
    'skrollr',
    // apps
    'common/switchPage',
    'common/loading',
    'common/helper',
    'common/map',
    'common/api',
    'common/properties-' + ( window.lang || 'en' )
], function($, skrollr, switchPage, loading, helper, map , api , lang ) {
    // fix lang
    window._e = function( text ){
        return lang[ text ] || text;
    };

    $('a[data-lang]').click(function(){
        api.setCookie('lang' , $(this).attr('lang') , 60 * 60 * 24 * 30);
        window.location.reload();
    });


    var initialize = function() {
        // get current location
        //map.getPosition();

        // start loading
        loading.start();

        // start catch album and videos , weibo events
        helper.init();

        // update the link to hash mode
        switchPage.init();
    };

    return initialize;
})
