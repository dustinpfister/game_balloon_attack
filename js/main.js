
var loop = function () {

    setTimeout(loop, 33);
    Feild.update();
    Canvas.draw();

};

loop();
