var Balloon = (function () {

    return {

        // the actual field game state
        feild : {

            create : function () {

                console.log('feild created');

            },

            update : function () {}

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
