var boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {

    if ((x1 > x2 + w2) || (x1 + w1 < x2) || (y1 + h1 < y2) || (y1 > y2 + h2)) {
        return false;
    } else {
        return true;
    };

};

var Shot = function (options) {

    this.owner = options.owner || 'player';

    this.age = 0;
    this.maxAge = 100;
    this.dead = false;

    this.size = 5;
    this.delta = 5; // px per tick

    this.heading = options.heading || Math.PI;
    this.x = options.x || 0;
    this.y = options.y || 0;

    this.sprite = game.add.sprite(this.x, this.y, 'start_sheet', 1);

};

Shot.prototype.onKill = function () {

    this.sprite.kill();

};

Shot.prototype.update = function () {

    var shot = this;

    if (!this.dead) {

        Feild.ships.forEach(function (ship) {

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
        this.sprite.x = this.x;
        this.sprite.y = this.y;

        this.age += 1;
        if (this.age >= this.maxAge) {

            this.dead = true;

        }

    }

};
