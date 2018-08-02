app.contact = {

    init:function(){



        $(".contact h1").blast({
            delimiter: "character",
            tag: "span"
        });
        a = 0;


        $(".contact .blast").each(function(){

            var el = $(this);

            setTimeout(function(){

                el.addClass('animated bounceIn');


            },a);


            a = a + 100;

        });




        setTimeout(function(){

            $(".contact .blast").removeClass('animated bounceIn');
            $(".contact .blast").css('opacity',1);

            $(".contact .blast").mouseenter(function (){

                var el = $(this);

                $(this).addClass('animated rubberBand');
                $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){

                    el.removeClass('animated rubberBand');

                });

            });

        },1000);

        b = 300;
        $(".contact li").each(function(){

            var el = $(this);

            setTimeout(function(){

                el.addClass('animated fadeInUp');


            },b);


            b =b + 100;

        });


        window.initialize();




        $('#submit').click(function(){


            app.contact.validate();


            if($('.contact-form .required').size()  > 0 ){


                alertify.error(msg1);

            }else {


                alertify.log(msg2);

                $.post( path + "mail.php", $( "#contact" ).serialize(),function( data ) {

                    if(data == '11'){

                        alertify.success(msg3);


                        $('.contact-form .required').removeClass('required');
                        $('.contact-form input[type="text"],.contact-form input[type="email"],.contact-form textarea').val('');

                    }else {

                        $('.contact-form .required').removeClass('required');
                        $('.contact-form input[type="text"],.contact-form input[type="email"],.contact-form textarea').val('');


                        alertify.error(msg4);

                    }

                } );

            }

            return false;

        });

        $('.contact-form input, .contact-form textarea').keyup(function(){

            app.contact.validate();

        });



    },
    validate:function(){

        if($('input[type=email]').val() == '' || !validateEmail($('input[type=email]').val())){

            $('input[type=email]').parent().addClass('required');



        }else {

            $('input[type=email]').parent().removeClass('required');
        }

        if($('textarea').val() == ''){

            $('textarea').parent().addClass('required');

        }else{
            $('textarea').parent().removeClass('required');

        }



    }


}

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}


window.initialize = function() {


    var mapOptions = {
        center: new google.maps.LatLng(51.272223,22.500727),
        zoom:5,
        disableDefaultUI: true
    };
    var map = new google.maps.Map(document.getElementById('map'),
        mapOptions);

    if($('body').hasClass('white')){

        var styles = [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}];

    }else {

        var styles = [
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#012621"
                    },
                    {
                        "weight": 0.8
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "labels",
                "stylers": [
                    {
                        "color": "#012621"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "color": "#0c0000"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "color": "#012621"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "color": "#012621"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "color": "#012621"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#06c5a9"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#06c5a9"
                    },
                    {
                        "lightness": -7
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#06c5a9"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "weight": 0.3
                    },
                    {
                        "lightness": 10
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#047968"
                    },
                    {
                        "lightness": "-7"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#06c5a9"
                    },
                    {
                        "visibility": "on"
                    },
                    {
                        "lightness": -15
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#06c5a9"
                    },
                    {
                        "lightness": "7"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#06c5a9"
                    },
                    {
                        "lightness": -34
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#333739"
                    }
                ]
            }
        ];
    }


    map.setOptions({styles: styles});

    var image = path + 'img/marker.png';
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(51.272223,22.500727),
        animation: google.maps.Animation.DROP,
        icon: image

    });

    marker.setMap(map);

    google.maps.event.addListenerOnce(map, 'tilesloaded', function(){


        $('.inf-map').addClass('animated fadeInUp');
        $('#map').css('opacity',1);




    });


}
