import {shapes} from './shape.js'

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const TWO_PI = 2 * Math.PI;
let length = 0;
let shrink = false;
let pts = 2000;
let frame = 0;
let a, b, m, n1, n2, n3, phi, r, i, j, vector1, nb, p1, p2, p3, rev = null;

function setup() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.centerX  =  canvas.width / 2;
    canvas.centerY  =  canvas.height / 2;
    changeShape();
    loop();
}

function loop() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    frame++;
    
    for(i = frame%3; i < pts; i+=3) {
        ctx.fillStyle = `hsl(${frame % 360}, 50%, 50%)`;
        phi = i * rev / pts
        r = supershape(phi);
        nb = Math.random() * 8;
        for (j = 1; j <= nb; j+=2) {
            vector1 = getVector(r, phi + (frame / 50 % TWO_PI), length * j);
            ctx.fillRect(vector1.x + canvas.centerX, vector1.y + canvas.centerY, 1, 1);
        }
    }

    if (length < 0 || length > 100) {
        shrink = !shrink;
        if (length < 0) {
            length = 0;
            changeShape();
        }
    }

    shrink
        ? length -= 1
        : length += 0.25
        
    requestAnimationFrame(loop);
}


function changeShape() {
    let index = Math.round(Math.random() * (shapes.length-1));
    n1 = shapes[index].n1;
    n2 = shapes[index].n2;
    n3 = shapes[index].n3;
    a = 1;
    b = 1;
    m = shapes[index].baseM * Math.random() * 8;
    rev = shapes[index].rev;
}

function supershape(theta) {
    p1 = Math.pow(Math.abs(1/a*Math.cos(m/4*theta)), n2);
    p2 = Math.pow(Math.abs(1/b*Math.sin(m/4*theta)), n3);
    p3 = Math.pow(p1+p2, 1/n1);
    if(p3 === 0 )
        return 0;
    return 1/p3;
}

function getVector(r, angle, length) {
    return {
        x: parseInt(length * r * Math.cos(angle)),
        y: parseInt(length * r * Math.sin(angle))
    };
}

window.addEventListener('resize', () => setup());
setup();
