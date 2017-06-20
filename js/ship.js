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

    this.sprite = game.add.sprite(this.x, this.y, 'start_sheet', 1);

};

Ship.prototype.onKill = function () {

    this.sprite.kill();

};

// update a ships data
Ship.prototype.update = function () {

    if (!this.attack) {

        this.x += this.delta;

    } else {

        Feild.hp -= 1;

        this.dead = true;

    }

    if (this.x >= Feild.maxW - 32) {

        this.x = Feild.maxW - 32;
        this.attack = true;

    }

    this.sprite.x = this.x;
    this.sprite.y = this.y;

};
