// the main Phaser game instance
var game = (function () {

    return new Phaser.Game(

        640, 480,
        //320, 240, // weird problem with the tilemap
        Phaser.AUTO,
        'gamearea', {

        // preload
        preload : function () {

            game.load.image('loadingbar', 'img/loadingbar.png');

        },

        // create
        create : function () {

            // just add and start the load state
            game.state.add('load', Load);
            game.state.start('load');

        }

    });

}
    ());
