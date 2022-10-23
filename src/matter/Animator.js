import * as Matter from 'matter-js';

function Start() {
    // module aliases
    var Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Composites = Matter.Composites,
            Common = Matter.Common,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            Composite = Matter.Composite,
            Bodies = Matter.Bodies,
            Body = Matter.Body;

    // create an engine
    var engine = Engine.create(),
    world = engine.world;

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

    var background = Bodies.rectangle(350, 300, 450, 900, {
        isStatic: true,
        isSensor: true,
        render: {
            sprite: {
                texture: "/images/iphone.png",
                xScale: scale,
                yScale: scale
            }
        }
    });

    var stack = Composites.stack(20, 20, 10, 4, 0, 0, function(x, y) {
        var scale = 0.5
        if (Common.random() > 0.35) {
        //if (false) {
            return Bodies.circle(x, y, 20, {
                density: 0.1,
                frictionAir: 0.0006,
                //restitution: 0.3,
                friction: 0.01,
                render: {
                    sprite: {
                        texture: './emojis/car.png',
                        xScale: scale,
                        yScale: scale
                    }
                }
            });
        } else {
            return Bodies.circle(x, y, 20, {
                density: 0.1,
                frictionAir: 0.0006,
                //restitution: 0.3,
                friction: 0.01,
                render: {
                    sprite: {
                        texture: './emojis/motor.png',
                        xScale: scale,
                        yScale: scale
                    }
                }
            });
        }
    });
  
    // add all of the bodies to the world
    //Composite.add(engine.world, [boxA, boxB, proba, ground]);
    
    Composite.add(engine.world, stack);
    Composite.add(engine.world, background)

    var n = 64;
    var r = 525;
    var offsetx = 345
    var offsety = 180
    for(var i = 0; i < n; i++){
        var alpha = 360/n*i
        var x = r*Math.cos(alpha)
        var y = r*Math.sin(alpha)
        console.log(alpha, x, y)
        var body = Bodies.rectangle(x+offsetx, y+offsety, 500, 200, { isStatic: true, render:{
            opacity: 0
        } });
        Body.rotate(body,alpha)
        
        Composite.add(engine.world, body)
    }

    // run the renderer
    Render.run(render);

    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);


    // add mouse control
    var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
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
export default Start();