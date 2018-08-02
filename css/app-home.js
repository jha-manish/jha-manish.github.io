app.home = {

    init:function(){

		TweenMax.to( document.querySelector('.bg'), 0.4 ,{opacity:1 ,ease: Power2.easeIn});



		var mySVG = $('svg').drawsvg({duration:8000});

		mySVG.drawsvg('animate');

		TweenMax.fromTo($(".jb")[0], 1.4, {opacity:0,y:0, ease:Power2.easeIn},{opacity:1,y:0,delay:1.6});


        $('#nav_bar nav a').removeClass('active');
        $('.home-link').addClass('active');

        $(".home-page h1").blast({
            delimiter: "character",
            tag: "span"
        });




        a = 0;
        b= 0;
        $(".home-page .blast").each(function(){


            if(a==300){

                a=400;

            }

            if(a==1100){

                a=1200;

            }


            var el = $(this);

            if(a==400){

                setTimeout(function(){

                    $(".home-page h1 img").addClass('animation-logo');


                },800);
            }

            setTimeout(function(){

                el.addClass('animated bounceIn');




            },a);

            if(a < 1200) {
                a = a + 100;
            }else {

                a = a + 80;

            }



        });
        setTimeout(function(){

            $(".home-page .blast").removeClass('animated bounceIn');
            $(".home-page .blast").css('opacity',1);

            $(".home-page .blast").mouseenter(function (){

                var el = $(this);

                $(this).addClass('animated rubberBand');
                $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){

                    el.removeClass('animated rubberBand');

                });

            });


        },3000);



        $(".home-page .flat-button").mouseenter(function (){

            var el = $(this);


            $(this).addClass('animated rubberBand');
            $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){

                el.removeClass('animated rubberBand');

            });

        });



    }

}
