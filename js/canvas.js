
var Canvas = (function () {

    // create and inject a canvas
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),

    setup = function () {

        // append to header
        var header = document.body;

        document.body.appendChild(canvas);

        //header.insertBefore(canvas, header.firstChild);


        // set actual matrix size of the canvas
        canvas.width = 320;
        canvas.height = 240;

    };

    setup();

    // events
    canvas.addEventListener('click', Feild.userAction)

    return {

        // the single draw function
        draw : function () {

            this.cls();

            // draw ships
            Feild.ships.forEach(function (ship) {

                ctx.fillStyle = '#0000ff';
                ctx.fillRect(ship.x, ship.y, ship.w, ship.h);

                ctx.fillStyle = '#00ff00';
                ctx.fillRect(ship.x, ship.y + ship.h - 5, ship.w * (ship.hp / ship.maxHP), 5);

            });

            // draw guns
            Feild.guns.forEach(function (gun) {

                ctx.fillStyle = '#af0000';
                ctx.fillRect(gun.x, gun.y, gun.size, gun.size);

            });

            // draw shots
            Feild.shots.forEach(function (shot) {

                ctx.fillStyle = '#ff0000';
                ctx.fillRect(shot.x, shot.y, shot.size, shot.size);

            });

        },

        // clear screen
        cls : function () {

            // default the canvas to a solid back background
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

        }

    };

}
    ());
