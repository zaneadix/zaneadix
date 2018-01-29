
$(function() {

    var $window = $(window);
    var $header = $('header.navbar');
    var $postHeaders = $('.post-header');
    var $ratings = $('.rating');

    function initRatings () {
        $ratings.each(function (index) {
            $rating = $(this);
            $fill = $rating.find('.fill');
            $fill.attr('style', 'width: 0%');
        })
    }

    function initFixiePositions () {
        $header.data('setHeight', $header.outerHeight());
        $postHeaders.each(function () {
            $postHeader = $(this);
            var attrs = scrubFixie($postHeader);
            setFixiePositions($postHeader);
            $postHeader
                .attr('class', attrs.clazz)
                .attr('style', attrs.style);
        });
        fixieCheck();
    }

    function setFixiePositions (postHeader) {
        var $postHeader = (postHeader instanceof jQuery) ? postHeader : $(postHeader);
        $postHeader
            .data('setTop', $postHeader.offset().top)
            .data('setHeight', $postHeader.outerHeight())
            .parent()
            .height($postHeader.outerHeight());
    }

    function scrubFixie ($postHeader) {
        var attrs = {};
        attrs.clazz = $postHeader.attr('class');
        attrs.style = $postHeader.attr('style');
        $postHeader.removeClass('fixed absolute').removeAttr("style");
        return attrs;
    }
    
    function fixieCheck () {

        var headerHeight = $header.data('setHeight');
        var $fixedHeader;
        var $absoluteHeader;

        for (var index = 0; index <= $postHeaders.length; index++) {

            var $postHeader = $postHeaders.eq(index);
            var setTop = $postHeader.data('setTop');

            if (setTop <= ($window.scrollTop() + headerHeight)) {
                $fixedHeader = $postHeader;
                $absoluteHeader = (index-1 >= 0) ? $postHeaders.eq(index-1) : null;
            } else {
                break;
            }
        }

        
        if ($fixedHeader) {
            console.log('fixed:', $fixedHeader.find('.title').text());
        }
        if ($absoluteHeader) {
            console.log('absolute:', $absoluteHeader.find('.title').text());
        }
        


        // $postHeaders.each(function (index) {

        //     var $postHeader = $(this);
        //     var setTop = $postHeader.data('setTop');

        //     if (setTop <= ($window.scrollTop() + headerHeight)) {
        //         $postHeader.addClass("fixed").css("top", '0px');;


        //         var $nextPostHeader = $postHeaders.eq(index+1);
        //         var $nextTop = $nextPostHeader.data('setTop') - $postHeader.data('setHeight');

        //         if ($nextPostHeader.length > 0 && $postHeader.offset().top >= $nextTop) {
        //             $postHeader.addClass("absolute").css("top", $nextTop);
        //         }
        //     } else {

        //         $postHeader.removeClass("fixed");
        //         var $prevPostHeader = $postHeaders.eq(index - 1);
        //         if ($prevPostHeader.length > 0 && $window.scrollTop() <= $postHeader.data('setTop') - $postHeader.data('setHeight')) {
        //             $prevPostHeader.removeClass("absolute").removeAttr("style");
        //         }
        //     }
        // });
    }

    $postHeaders.wrap('<div class="fixieHeightKeeper" />');
    $window.on('resize', initFixiePositions);
    $window.on("scroll", fixieCheck);
    initFixiePositions();
    // initRatings();
});