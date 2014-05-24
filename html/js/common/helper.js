define([
    // libs
    'jQuery',
    'Handlebars',
    'lib/text!templates/album.html',
    'lib/text!templates/video.html',
    'lib/text!templates/weibo.html'
], function($, Handlebars, albumTpl, videoTpl, weiboTpl) {
    var dBody = $('body');

    var modals = function() {
        dBody.delegate('.album', 'click', function() {
            var sHthml = Handlebars.compile(albumTpl)();

            $.fancybox({
                content: sHthml,
                closeClick: false,
                helpers: {
                    overlay: {
                        width: '100%',
                        height: '100%',
                        closeClick: false,
                        css: {
                            'background': '#fff'
                        }
                    }
                },
                beforeShow: function() {
                    setTimeout(function() {
                        var jcarousel = $('.fancybox-inner .jcarousel');

                        jcarousel.on('jcarousel:reload jcarousel:create', function() {
                            var width = jcarousel.innerWidth();
                            jcarousel.jcarousel('items').css('width', width + 'px');
                        }).jcarousel({
                            wrap: 'circular'
                        });

                        $('.jcarousel-control-prev').jcarouselControl({
                            target: '-=1'
                        });

                        $('.jcarousel-control-next').jcarouselControl({
                            target: '+=1'
                        });
                    }, 0)
                }
            })
        })

        dBody.delegate('.video', 'click', function() {
            var sHthml = Handlebars.compile(videoTpl)();
            $.fancybox({
                content: sHthml,
                closeClick: false,
                helpers: {
                    overlay: {
                        width: '100%',
                        height: '100%',
                        closeClick: false,
                        css: {
                            'background': '#fff'
                        }
                    }
                },
                beforeShow: function() {
                    setTimeout(function() {
                        var jcarousel = $('.fancybox-inner .jcarousel');

                        jcarousel.on('jcarousel:reload jcarousel:create', function() {
                            var width = jcarousel.innerWidth();
                            jcarousel.jcarousel('items').css('width', width + 'px');
                        }).jcarousel({
                            wrap: 'circular'
                        });

                        $('.jcarousel-control-prev').jcarouselControl({
                            target: '-=1'
                        });

                        $('.jcarousel-control-next').jcarouselControl({
                            target: '+=1'
                        });
                    }, 0)
                }
            })
        })

        // for quick debug
        // $($('.video')).click();
    }

    var weibo = function () {
        dBody.delegate('.showyitem', 'mouseenter', function() {
            var dTarget = $(this),
                nTop = parseInt(this.style.bottom),
                sHthml = Handlebars.compile(weiboTpl)();

            // set weibo content
            dTarget.html(sHthml);

            // show weibo on bottom
            if (nTop > 50) {
                dTarget.find('.weibo').addClass('weibo_bottom');
            } else {
                // on top
                dTarget.find('.weibo').addClass('weibo_top');
            }

            // empty weibo content
            $(window).on('load resize scroll',function(){
                dTarget.empty();
            })

            dTarget.bind('mouseleave', function () {
                dTarget.empty();
            })
        })
    }

    var init = function () {
        // for album/photo list modals
        modals();
        // for weibo mouse event
        weibo()
    }

    return {
        init: init
    }
})
