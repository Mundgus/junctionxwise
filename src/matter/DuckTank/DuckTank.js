import * as Matter from 'matter-js';
import iphone from "./Images/iphone.png"
import DuckImage from "./Images/duck.png"

// create an engine
const engine = Matter.Engine.create();
const world = engine.world;
var isMotor = true;

function DuckTankStart(){
    // module aliases
    var Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Composite = Matter.Composite,
        Bodies = Matter.Bodies,
        Body = Matter.Body;



    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 450,
            height: 900,
            showAngleIndicator: false,
            wireframes: false
        }
    });

    var scale = 1.8;

    var background = Bodies.rectangle(400, 300, 450, 900, {
        isStatic: true,
        isSensor: true,
        render: {
            sprite: {
                texture: iphone,
                xScale: scale,
                yScale: scale
            }
        }
    });

    const maxColumn = 20
    const maxrow = 25

    var stack = Composites.stack(210, 20, maxColumn, maxrow, 0, 0, function (x, y, column, row) {
        var duckScale = 0.5;
        var numOfDucks = 5;

        //console.log(column, row, row*maxColumn+column)
        if (row*maxColumn+column < numOfDucks) {
            //if (false) {
            return Bodies.circle(x, y, 20, {
                density: 0.003,
                frictionAir: 0.000006,
                //restitution: 0.3,
                friction: 0.00001,
                render: {
                    sprite: {
                        texture: DuckImage,
                        xScale: duckScale,
                        yScale: duckScale
                    }
                }
            });
        } else {
            return Bodies.circle(x, y, 8, {
                density: 0.05,
                frictionAir: 0.000006,
                //restitution: 0.3,
                friction: 0.0000001,
                render: {
                    fillStyle: '#2ecdec'
                }
            });
        }
    });

    // add all of the bodies to the world
    //Composite.add(engine.world, [boxA, boxB, proba, ground]);
    Composite.add(engine.world, stack);
    Composite.add(engine.world, background);
    
    var n = 64;
    var r = 525;
    var offsetx = 395;
    var offsety = 180;
    for (var i = 0; i < n; i++) {
        var alpha = 360 / n * i;
        var x = r * Math.cos(alpha);
        var y = r * Math.sin(alpha);
        // console.log(alpha, x, y);
        var body = Bodies.rectangle(x + offsetx, y + offsety, 500, 200, {
            isStatic: true, render: {
                opacity: 0
            }
        });
        Body.rotate(body, alpha);

        Composite.add(world, body);
    }

    // run the renderer
    Render.run(render);

    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);


    // add mouse control
    var mouse = Mouse.create(render.canvas), mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });
}

export {DuckTankStart};