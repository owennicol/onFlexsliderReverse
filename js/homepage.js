$(function () {
    var runOnce = false,
        slideTimer = 3000,
        direction = 'fwd',
        nextSlide = 0,
        endSlide,
        timer;

    $('#HomepageSlider').flexslider({
        animation: "slide",
        animationLoop: false,
        slideshow: false,
        reverse: false,
        nextText: "",
        prevText: "",
        startAt: 0,
        pauseOnHover: true,
        allowOneSlide: true,
        controlNav: false,
        directionNav: false,
        slideshowSpeed: slideTimer,
        animationSpeed: 600,
        init: function (slider) {
            if (!runOnce) {
                runOnce = true;

                endSlide = slider.count - 1;

               $('#HomepageSlider').on('mouseover', function () {
                    clearInterval(timer);
                    return false;
                });

                $('#HomepageSlider').on('mouseout', function () {
                    setTimer();
                    return false;
                });

                function setTimer() {
                    timer = setInterval(function () {
                        var thisSlide = slider.currentSlide;

                        if ((thisSlide === 0)) {
                            nextSlide = 1;
                            direction = 'fwd';
                        }
                        else if ((thisSlide < endSlide) && (direction == 'fwd')) {
                            nextSlide++;
                            direction = 'fwd';
                        }
                        else if ((thisSlide < endSlide) && (direction == 'rev')) {
                            nextSlide--;
                            direction = 'rev';
                        }
                        else if (thisSlide == endSlide) {
                            nextSlide = endSlide - 1;
                            direction = 'rev';
                        }
                        else {
                            slider.flexslider('next');
                            direction = 'fwd';
                        }
                      
                        //move to next slide
                        slider.flexslider(nextSlide);
                        //set the correct slide pip to active
                        $('#SliderNav .flex-control-paging li a').removeClass('flex-active');
                        $('#SliderNav .flex-control-paging li').eq(nextSlide).find('a').addClass('flex-active');

                    }, slideTimer);
                }

                setTimer();
            }


        }
    });

    if ($('#HomepageSlider').data('flexslider')) {

        //set first pip to active
        $('#SliderNav .flex-control-paging li').first().find('a').addClass('flex-active');

        //click on a pip
        $('#SliderNav .flex-control-paging li a').on('click', function (e) {
            e.preventDefault();
            var index = $(this).parent().index();
            // go to the slide relating to this pip
            $('#HomepageSlider').flexslider(index);

            //set the correct slide pip to active
            $('#SliderNav .flex-control-paging li a').removeClass('flex-active');
            $(this).addClass('flex-active');

            //set the next slide to this slide
            if (index == nextSlide) {
                return;
            }
            else {
                nextSlide = index;
            }
            //clear the timer - wait for mouseout to start again
            clearInterval(timer);
            return false;
        });
    }


});


