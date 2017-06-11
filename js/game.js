var Feild = (function () {

    var boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {

        if ((x1 > x2 + w2) || (x1 + w1 < x2) || (y1 + h1 < y2) || (y1 > y2 + h2)) {
            return false;
        } else {
            return true;
        };

    };

    var api = {

        maxW : 320,
        guns : [],
        ships : [],
        maxShips : 1

    };

    var Ship = function (options) {

        this.x = options.x || 0;
        this.y = options.y || 0;
        this.w = options.w || 64;
        this.h = options.h || 32;

        this.maxHP = 3;
        this.hp = this.maxHP;
        this.delta = 1;
        this.attack = false;
        this.dead = false;

    };

    // update a ships data
    Ship.prototype.update = function () {

        if (!this.attack) {

            this.x += this.delta;

        } else {

            this.dead = true;

        }

        if (this.x >= api.maxW - 32) {

            this.x = api.maxW - 32;
            this.attack = true;

        }

    };

    var Shot = function (options) {

        this.age = 0;
        this.maxAge = 70;
        this.dead = false;
        this.size = 5;
        this.delta = 5; // px per tick

        this.heading = options.heading || Math.PI;
        this.x = options.x || 0;
        this.y = options.y || 0;

    };

    Shot.prototype.update = function () {

        var shot = this;

        if (!this.dead) {

            api.ships.forEach(function (ship) {

                if (boundingBox(

                        ship.x, ship.y, ship.w, ship.h,
                        shot.x, shot.y, shot.size, shot.size)) {

                    ship.hp -= 1;

                    if (ship.hp <= 0) {

                        ship.hp = 0;

                        ship.dead = true;

                    }

                    shot.dead = true;

                }

            })

            this.x += Math.cos(this.heading) * this.delta;
            this.y += Math.sin(this.heading) * this.delta;

            this.age += 1;
            if (this.age >= this.maxAge) {

                this.dead = true;

            }

        }

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
        this.guns.forEach(function (gun) {

            gun.shots.forEach(function (shot) {

                shot.update();

            });

            var i = gun.shots.length;
            while (i--) {

                if (gun.shots[i].dead) {

                    gun.shots.splice(i, 1);

                }

            }

        });

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

            gun.shots.push(new Shot({

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

                // draw shots
                gun.shots.forEach(function (shot) {

                    ctx.fillStyle = '#ff0000';
                    ctx.fillRect(shot.x, shot.y, shot.size, shot.size);

                });

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
