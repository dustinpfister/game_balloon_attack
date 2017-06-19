var Feild = (function () {

    var api = {

        hp : 10,
        maxW : 320,
        guns : [],
        shots : [],
        ships : [],
        maxShips : 1

    };

    var Gun = function (options) {

        this.playerControl = options.playerControl || false;
        this.size = options.size || 32;
        this.x = options.x || 310 - this.size;
        this.y = options.y || 230 - this.size;
        this.shots = [];
        this.maxShots = 3;

    };

    api.update = function () {

        // update guns
        //this.guns.forEach(function (gun) {});

        // update shots
        this.shots.forEach(function (shot) {

            shot.update();

        });

        // purge old shots
        var i = this.shots.length;
        while (i--) {

            if (this.shots[i].dead) {

                this.shots.splice(i, 1);

            }

        }

        // update ships
        this.ships.forEach(function (ship) {

            ship.update();

        });

        // spawn new ships
        if (this.ships.length < this.maxShips) {

            this.ships.push(new Ship({

                    y : Math.round(Math.random() * 64)

                }))

        }

        // purge dead ships
        var i = this.ships.length;
        while (i--) {

            if (this.ships[i].dead) {

                this.ships.splice(i, 1);

            }

        }

    };

    // setup the feild
    api.start = function () {

        this.guns = [];

        // setup player gun
        this.guns.push(new Gun({

                playerControl : true

            }));

        // setup ship
        this.ships.push(new Ship({}));

    };

    // get all player controled guns
    api.getPlayerControl = function () {

        var playerGuns = [];

        this.guns.forEach(function (gun) {

            console.log(gun.playerControl)

            if (gun.playerControl) {

                playerGuns.push(gun);

            }

        });

        return playerGuns;

    };

    api.shoot = function (x, y) {

        // just get the first on for now
        var gun = this.getPlayerControl()[0];

        if (gun.shots.length < gun.maxShots) {

            console.log('okay good');

            var heading = Math.atan2(y - gun.y, x - gun.x);

            this.shots.push(new Shot({

                    heading : heading,
                    x : gun.x,
                    y : gun.y

                }))

        } else {

            console.log('max shot');

        }

    };

    // a user action has happened.
    api.userAction = function (e) {

        var bx = e.target.getBoundingClientRect(),
        x,
        y;

        // mouse click
        if (e.type === 'click') {

            // just use e.clientX, and e.clientY.
            x = e.clientX - bx.left;
            y = e.clientY - bx.top;

            console.log(x + ',' + y);

            api.shoot(x, y);

        }

    };

    api.start();

    return api;

}
    ());

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

var loop = function () {

    setTimeout(loop, 33);
    Feild.update();
    Canvas.draw();

};

loop();
