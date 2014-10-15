$(function() {
    var i = 0,
        s = 0,
        audioPlayer = document.getElementById('player'),
        section = $('section.songtext').addClass('videoClip'),
        state = location.search,
        strove = $('section.songtext p'),
        scene = $('section.scene'),
        sceneTime = $(scene).data,
        init = function init(){

            audioPlayer.load();

            if ( getParameterByName('state') ){
                var state = getParameterByName('state');

                switch (state) {
                    case 'rec':
                        //hide the controls and title in recording mode and space bar = start
                        $('body').addClass('play');
                        $('body').addClass('rec');
                        $('body').bind('keypress', function(e) {

                            if ( e.which === 32 ){
                                e.preventDefault();
                                audioPlayer.play();
                                watchAudio();
                            }
                        });
                        break;

                    case 'edit':
                            editor();
                            $(audioPlayer).on('play', function(){
                                watchAudio();
                            });
                        break;

                    default:
                        $('body').addClass('play');
                        $(audioPlayer).on('play', function(){
                            watchAudio();
                        });
                        break
                }
            } else {
                $('body').addClass('play');
                $(audioPlayer).on('play', function(){
                    watchAudio();
                });
            }


            setHeight();


        },

        setHeight = function setHeight() {
            var wHeight = window.innerHeight;

            $('.wrap').height(wHeight - 60);
            $('.wrap').show();
        },

        makeScared = function makeScared() {
            $('.scared2').addClass('show');
        },

        makeBeer = function makebeer() {
            var beer = $('img.beer');

                for (var x = 0 ; x < 15; x ++) {
                    beer.clone().appendTo( $('.scene.beer' ) );
                }
        },

        getParameterByName = function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },

        editor = function editor() {
            $('body').addClass('edit');

            $('.edit p').on('click', function(p){
                 var $this = this;

                 $(this).attr('data.time', audioPlayer.currentTime );
                 $(this).append('<span>' + audioPlayer.currentTime + '</span>');
             });
        },

        roundMe = function roundMe(time) {
            return Math.round(time);
        },

        updateLyrics = function updateLyrics(){
            if ( i > 0 ) {
                strove[i-1].classList.remove('show');
            }

            strove[i].classList.add('show');
            i ++;
        },

        showScene = function showScene(){
            if ( s > 0 ) {
                scene[s-1].classList.remove('show');
                scene[s-1].classList.add('hide');

            }

            if ( s === 1 ) {
                setTimeout( makeScared() , 2000);
            }

            if ( s === 2 ) {
                makeBeer();
            }

            scene[s].classList.add('show');
            s ++;
        },

        watchAudio = function watchAudio(){
            $(audioPlayer).bind('timeupdate', function(t){
                // sync songtext
                var curTime = roundMe( t.target.currentTime );


                //for ( curTime in strove) {
                //    if( Object.prototype.hasOwnProperty.call(strove, curTime) ) {
                //        audioPlayer.pause();
                //        strove.children().data('time', curTime).addClass('show');
                //
                //      //console.log("o." + curTime + " = " + strove[curTime ]);
                //    }
                //}

                // show songtext
                //for ( curTime in roundMe( $(strove).attr('data.time') ) ) {
                //
                //
                //    $(strove).removeClass('show');
                //    $(strove).attr('data.time', curTime).addClass('show');
                //    //i ++;
                //}

                if ( roundMe(curTime) === roundMe( $(strove[i]).attr('data.time') ) ) {
                    updateLyrics(i);
                }

                // show scene
                if ( roundMe(curTime) === roundMe( $(scene[s]).attr('data.time') ) ) {
                    showScene ();
                }
            });
        };

    init();

    $(window).resize(function(){
        setHeight();
    });

    $('#edit').on('click', function(){
        section.removeClass('videoClip');
        editor();
    });

});
