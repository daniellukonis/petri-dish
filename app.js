console.log('connected');

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const margin = 30;
function resizeCanvas(){
    let w = window.innerWidth - margin;
    let h = window.innerHeight - margin;
    w>h ? w=h : h=w;
    canvas.width = w
    canvas.height = h
    return [w,h];
};
let canvasSize = resizeCanvas();

function clearCanvas(){
    context.fillStyle = 'rgb(255,255,255)'
    let w = canvas.width;
    let h = canvas.height;
    context.fillRect(0,0,w,h);
};
clearCanvas();

let rgb = [100,200,120];
const circle = Math.PI * 2;
function drawArc(x=0,y=0,r=100,s=0){
    context.save();
    context.lineWidth = 10;
    context.strokeStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]},${s})`
    context.beginPath();
    context.arc(x,y,r,0,circle);
    context.stroke();
    context.restore();
}
// drawArc(100,100);

const interval = '10'
function moveArc(){
    // let x = canvasSize[0]*0.5;
    let x = 0;
    let xd = 1;
    let xrand = 0;
    // let y = canvasSize[1]*0.5
    let y = 0;
    let yd = 1;
    let yrand = 0;
    let r = 20;
    let s = 0.25;
    let sd = 1;
    const si = 0.1; 
    let intervalID = setInterval(()=>{
        if(s>0.25 || s<0){
            sd *= -1;
        } 

        // if(x<-10 || y<-10 || x>canvasSize[0]+10 || y>canvasSize[1]+10){
        //     x=canvasSize[0]*0.5;
        //     y=canvasSize[1]*0.5;
        // };

        if(x>canvasSize[0] || x<0){
            x = 0;
            y = Math.floor(Math.random()*canvasSize[1]);
            // xd *= -1;
            // x = canvasSize[0]*0.5;
            // y = canvasSize[1]*0.5;
            // xrand = Math.floor(Math.random()*5)
        }
        if(y>canvasSize[1] || y<0){
            y = 0;
            x = Math.floor(Math.random()*canvasSize[0]);
            // yd *= -1;
            // x = canvasSize[0]*0.5;
            // y = canvasSize[1]*0.5;
            // yrand = Math.floor(Math.random()*5)
        }

        drawArc(x,y,r,s);
        x<0 || y<0 ? console.log(x,y) : null;
        r = Math.floor(Math.random()*20)+10;
        x += xrand + Math.random()*10 * xd;
        y += yrand + Math.random()*10 * yd;
        s += si*sd;
        
    },interval);
    console.log(intervalID);
};
let flip = true;
const crgb = [0,200,100];
let ni = setInterval(()=>{
    if(flip){
        rgb = [255,255,255];
        flip = false;
    }
    else{
        rgb = crgb;
        flip = true;
    }
},'50000')
moveArc();

window.addEventListener('resize', ()=>{
    resizeCanvas();
})

//editor

const editor = document.querySelector('#editor');
const editorDropdown = document.querySelector('#editor-dropdown');

editorDropdown.addEventListener('click',()=>{
    editor.classList.toggle('editor-active');
    editor.classList.toggle('editor-sleep');
});

const redChannelInput = document.querySelector('#input-r');
const redChannelLabel = document.querySelector('#label-r');
redChannelInput.addEventListener('input',()=>{
    redChannelLabel.innerText = `Red | ${redChannelInput.value}`
    rgb[0] = redChannelInput.value;
    console.log(rgb);
});

const greenChannelInput = document.querySelector('#input-g');
const greenChannelLabel = document.querySelector('#label-g');
greenChannelInput.addEventListener('input',()=>{
    greenChannelLabel.innerText = `Green | ${greenChannelInput.value}`
    rgb[1] = greenChannelInput.value;
    console.log(rgb);
});

const blueChannelInput = document.querySelector('#input-b');
const blueChannelLabel = document.querySelector('#label-b');blueChannelInput.addEventListener('input',()=>{
blueChannelLabel.innerText = `Blue | ${blueChannelInput.value}`
    rgb[2] = blueChannelInput.value;
    console.log(rgb);
});