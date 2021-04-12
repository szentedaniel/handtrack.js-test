import { updateDarabok } from './darab.js'
import { updateSonkak, szendvicshez, resetPalya } from './sonka.js'
import { rendeles } from './rendeles.js'

let app=new PIXI.Application(
    {
        backgroundColor: 0xAAAAAA
    }
);
app.renderer.resize(window.innerWidth-50, window.innerHeight-80);

document.body.appendChild(app.view);
app.stage.interactive=true;

let szint=1;
document.getElementById("kovetkezo").onclick= kovetkezoPalya;
document.getElementById("ujra").onclick=ujra;

let pointd=false;
app.view.setAttribute("id", 'canvas');
document.addEventListener('pointerdown', function() {pointd=true;});
document.addEventListener('pointerup', function() {pointd=false;});
document.getElementById("display").innerHTML=(
    "csirke:\t"+szendvicshez[0]+
    " hagyma:\t"+szendvicshez[1]+
    " paprika:\t"+szendvicshez[2]+
    " paradicsom:\t"+szendvicshez[3]+
    " párizsi:\t"+szendvicshez[4]+
    " sajt:\t"+szendvicshez[5]+
    " saláta:\t"+szendvicshez[6]+
    " sonka:\t"+szendvicshez[7]+
    " uborka:\t"+szendvicshez[8]);

/*
    let counter=new PIXI.Text("csirke:\t"+szendvicshez[0]+
    " hagyma:\t"+szendvicshez[1]+
    " paprika:\t"+szendvicshez[2]+
    " paradicsom:\t"+szendvicshez[3]+
    " párizsi:\t"+szendvicshez[4]+
    " sajt:\t"+szendvicshez[5]+
    " saláta:\t"+szendvicshez[6]+
    " sonka:\t"+szendvicshez[7]+
    " uborka:\t"+szendvicshez[8],
    {
        fontFamily : 'Arial',
        fontSize: 24,
        fill : 0xff1010,
        align : 'center'
    },
    app.view)
    */

const loader=PIXI.Loader.shared;
loader.add("sonka_spritesheet","spritesheets/sonka2.json").load(setup);

window.onresize = function(){
    app.renderer.resize(window.innerWidth-50, window.innerHeight-80);
}

function setup(){
/*    //animáció
    let sonka_sheet=loader.resources["sonka_spritesheet"].spritesheet;

    animatedsprite=new PIXI.AnimatedSprite(sonka_sheet.animations["sonka"]);
    animatedsprite.animationSpeed=0.5;
    animatedsprite.loop=false;
    animatedsprite.x=100;
    animatedsprite.y=0;

    //animatedsprite.play();
    app.stage.addChild(animatedsprite);
    */

    app.ticker.add(updateSonkak);
    app.ticker.add(updateDarabok);

    rendeles(szint);
}

function kovetkezoPalya(){
    szint++;
    rendeles(szint);
    resetPalya();
}

function ujra(){
    rendeles(szint);
    resetPalya();
}

/*
function animationLoop(){
    requestAnimationFrame(animationLoop);
    animatedsprite.rotation+=0.03;
    animatedsprite.y+=1;
}*/

export { app, pointd }