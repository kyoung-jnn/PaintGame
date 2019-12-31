const canvas = document.getElementById('JsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("JsColor");
const range = document.getElementById('JsRange');
const mode = document.getElementById('JsMode');
const save = document.getElementById('JsSave');
 //default
const CANVAS_SIZE = 500;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

const INITIAL_COLOR = "#2c2c2c"
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth=2.5;
ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);

let painting = false;
let filling = false;

function startPainting(){
    painting = true;
}
function stopPainting(){
    painting = false;
}
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}
function handleModeBtn(event){
    if(filling == true){
        filling = false;
        mode.innerText = 'FILL'; 
    }
    else{
        filling = true;
        mode.innerText = 'PAINT';
    }
}
function handleSaveBtn(event){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaingJS";
    link.click();
}

function handleCanvasClick(){
    if(filling == true){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function handleCM(event){
    event.preventDefault();
}
if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click",handleColorClick));

if(range){
    range.addEventListener("input",handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeBtn);
}

if(save){
    save.addEventListener("click",handleSaveBtn);
}
