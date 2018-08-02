app.text = {

    init:function(){

        $(".text-page h1").blast({
            delimiter: "character",
            tag: "span"
        });


        a = 0;


        $(".text-page h1 .blast").each(function(){

            var el = $(this);

            setTimeout(function(){

                el.addClass('animated bounceIn');


            },a);


            a = a + 50;

        });


        setTimeout(function(){

            $(".text-page .blast").removeClass('animated bounceIn');
            $(".text-page .blast").css('opacity',1);

            $(".text-page .blast").mouseenter(function (){

                var el = $(this);

                $(this).addClass('animated rubberBand');
                $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){

                    el.removeClass('animated rubberBand');

                });

            });


        },1000);



    }

}


window.goBack = function (e){
    var defaultLocation = "http://jacekjeznach.com";
    var oldHash = window.location.hash;

    history.back(); // Try to go back

    var newHash = window.location.hash;

    /* If the previous page hasn't been loaded in a given time (in this case
     * 1000ms) the user is redirected to the default location given above.
     * This enables you to redirect the user to another page.
     *
     * However, you should check whether there was a referrer to the current
     * site. This is a good indicator for a previous entry in the history
     * session.
     *
     * Also you should check whether the old location differs only in the hash,
     * e.g. /index.html#top --> /index.html# shouldn't redirect to the default
     * location.
     */

    if(
        newHash === oldHash &&
        (typeof(document.referrer) !== "string" || document.referrer  === "")
    ){
        window.setTimeout(function(){
            // redirect to default location
            window.location.href = defaultLocation;
        },1000); // set timeout in ms
    }
    if(e){
        if(e.preventDefault)
            e.preventDefault();
        if(e.preventPropagation)
            e.preventPropagation();
    }
    return false; // stop event propagation and browser default event
}
