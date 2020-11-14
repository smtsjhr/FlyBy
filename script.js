var auto_pan = false;
var pan = 0;
var x_pan = 0;
var y_shift = 0;
var scale = 1;

var enable_interaction;

if (auto_pan) {
 enable_interaction = false;
}
else {
    enable_interaction = true;
}
var get_mouse_pos = true;
var get_touch_pos = true;

const t_rate = 0.005;
var t = 0;
const fps = 30;
var fpsInterval, startTime, now, then, elapsed;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var W = canvas.width = window.innerWidth;
var H = canvas.height = window.innerHeight;

var dwitter_mode = true;

if (dwitter_mode) {
    function S(x){return Math.sin(x)}
    function C(x){return Math.cos(x)}
    function T(x){return Math.tan(x)}
    function R(r,g,b,a){return `rgba(${r},${g},${b},${a})`}
    var c = canvas;
    var x = ctx;
}

function DwitterCode_Birds(t) {
    for(j=16;j--;){x.moveTo((u=scale*500*(T(t+j)-0.5)),v=(-100+u/2+scale*200*C(j+t)));for(i=5;i--;x.lineTo(u+(w=(-scale*50+u/5))*C(a=.3+S(20*t+10*S(j))/1.5)*S(1.5*i),v+w*(C(1.5*i)/50+i%2*S(a)))){x.fill()}};
}

function DwitterCode_Sun(t, alpha) {
    for(f=128;f--;){x.rotate(g=f*.049087);for(i=70;i--;){x.fillStyle=R(0,100,250,alpha);x.fillRect((40*S(g+0*t)+50)*(35-i+1*(10*t/(2*Math.PI))%1),200,15, 3e3)}}
}

function draw() {

    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;

    scale = W/1920;

    if (auto_pan) {
        pan = easeInOutCubic(0.5+0.5*S(2*t))  
    }
    else {
        pan = x_pan;
    }
    let alpha = 0.02 + 0.04*((2*(pan%1)-1)**2);

    ctx.save();
    x.fillStyle=R(255,200,90,1);
    x.fillRect(0,0,W,H);
    ctx.translate(0.5*W-0.4*W+0.8*W*pan,0);
    //ctx.scale(1,1);
    DwitterCode_Sun(t, alpha );
    ctx.restore();
    
    ctx.save();
    ctx.translate(W*pan,y_shift);
    ctx.scale(1-2*pan,1);
    ctx.fillStyle = 'rgba(0,0,0,1)';
    DwitterCode_Birds(t);
    ctx.restore();


    t += t_rate;
       
}


function startAnimating(fps) {
    
    fpsInterval = 1000/fps;
    then = window.performance.now();
    startTime = then;
    
    animate();
 }
 
 function animate(newtime) {
    
     requestAnimationFrame(animate);
 
     now = newtime;
     elapsed = now - then;
 
     if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        draw();    
     }

     if(enable_interaction) {
        // canvas.addEventListener('mousedown', e => {
        //     get_mouse_pos = true;
        //     getMousePosition(canvas, e)
        // });
          
        // canvas.addEventListener('mouseup', e => {
        //     get_mouse_pos = false;
        // });
      
        canvas.addEventListener('mousemove', function(e) {
            if(get_mouse_pos) {
                getMousePosition(canvas, e)
          }
        })
        
        // canvas.addEventListener('touchstart', function(e) {
        //     getTouchPosition(canvas,e);
        //     event.preventDefault();
        // }, false);
          
        // canvas.addEventListener('touchend', function(e) {
     
        // }, false);
          
        canvas.addEventListener('touchmove', function(e) {
            getTouchPosition(canvas,e);
            e.preventDefault();
        }, false);
    }
  
 }
 
   
function getMousePosition(canvas, event) {
    interaction(canvas,event)
}

function getTouchPosition(canvas, event) {
    var event = event.touches[0];
    interaction(canvas,event)
}

function interaction(canvas, event) {
    mouse_x = event.clientX/canvas.width;
    x_pan = mouse_x;
}

function easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}


startAnimating(fps);