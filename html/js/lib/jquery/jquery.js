if( !window.jQuery ) {
    define([
        'lib/order!lib/jquery/jquery.min',
        'lib/order!lib/jquery/jquery.fancybox',
        'lib/order!lib/jquery/jquery.jcarousel',
        'lib/order!lib/jquery/mediaelement-and-player.min'
    ], function() {
        return $;
    })
}