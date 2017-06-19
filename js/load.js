var Load = (function () {

    return {

        preload : function () {

            // loading bar
            var loadSprite = game.add.sprite(0, 0, 'loadingbar');
            loadSprite.width = 0;
            loadSprite.x = game.world.centerX - loadSprite.width / 2;
            loadSprite.y = game.world.centerY - 16;
            game.load.onLoadStart.add(function () {}, this);
            game.load.onFileComplete.add(function (progress) {
                loadSprite.width = game.width * (progress / 100);
                loadSprite.x = game.world.centerX - loadSprite.width / 2;
            }, this);
            game.load.onLoadComplete.add(function () {}, this);

			game.load.spritesheet('start_sheet', 'img/start_sheet.png',32,32);
			
        },

        create : function () {

            game.state.add('title', Balloon.title);
            game.state.add('feild', Balloon.feild);
            game.state.start('title');

        }

    };

}
    ());
