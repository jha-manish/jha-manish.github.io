app.about = {

    init:function(){



        $(".about h1").blast({
            delimiter: "character",
            tag: "span"
        });

        $(".about p").blast({
            delimiter: "word",
            tag: "span"
        });


        a = 0;


        $(".about h1 .blast").each(function(){

            var el = $(this);

            setTimeout(function(){

                el.addClass('animated bounceIn');


            },a);


            a = a + 100;

        });


        setTimeout(function(){

            $(".about .blast").removeClass('animated bounceIn');
            $(".about .blast").css('opacity',1);

            $(".about .blast").mouseenter(function (){

                var el = $(this);

                $(this).addClass('animated rubberBand');
                $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){

                    el.removeClass('animated rubberBand');

                });

            });


        },1000);




    }

}
