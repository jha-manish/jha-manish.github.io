app.skills = {

    init:function(){



        $(".skills h1").blast({
            delimiter: "word",
            tag: "span"
        });

        $(".skills p").blast({
            delimiter: "word",
            tag: "span"
        });

        a = 0;


        $(".skills h1 .blast").each(function(){

            var el = $(this);

            setTimeout(function(){

                el.addClass('animated bounceIn');


            },a);


            a = a + 80;

        });


        setTimeout(function(){

            $(".skills .blast").removeClass('animated bounceIn');
            $(".skills .blast").css('opacity',1);

            $(".skills .blast").mouseenter(function (){

                var el = $(this);

                $(this).addClass('animated rubberBand');
                $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){

                    el.removeClass('animated rubberBand');

                });

            });


        },2000);

        var textCol = '#08FDD8';

        if($('body').hasClass('white')){

            textCol = '#00000' ;

        }


        if( ! $('#myCanvas').tagcanvas({
                textColour : textCol,
                outlineThickness : 0.5,
                outlineColour : '#fe0853',
                maxSpeed : 0.06,
                freezeActive:true,
                shuffleTags:true,
                shape:'sphere',
                zoom:1,
                noSelect:true,
                textFont:null,
                pinchZoom:true,
                freezeDecel:true,
                fadeIn:3000,
                initial: [0.3,-0.1],
                depth : 0.8
            })) {
            // TagCanvas failed to load
            $('#myCanvasContainer').hide();

        }

        setTimeout(function(){
            alertify.log(msg8);

        },2000);








    }

}
