var Balloon = (function () {

    var sprite_pg;

    return {

        // the actual field game state
        feild : {

            create : function () {

                console.log('feild created');

                sprite_pg = game.add.sprite(0, 0, 'start_sheet', 0);

                Feild.start();

                console.log(Feild);

                sprite_pg.x = Feild.guns[0].x;
                sprite_pg.y = Feild.guns[0].y;

            },

            update : function () {

                var point = game.input.activePointer;

                // this is how you can use activePointer
                if (point.isDown) {

                    console.log(Feild.shots.length);

                    Feild.shoot(point.x, point.y);

                }

                Feild.update();

            }

        },

        title : {

            create : function () {

                console.log('title:');

                game.add.text(10, 10, 'Ballon attack', {
                    fill : '#ffffff'
                });

            },

            update : function () {

                console.log();

                // this is how you can use activePointer
                if (game.input.activePointer.isDown) {

                    game.state.start('feild');

                }

            }

        }

    };

}
    ());
