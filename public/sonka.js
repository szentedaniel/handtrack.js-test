import { app, pointd } from './app.js'
import { darabEso } from './darab.js'
import {handX, handY} from './tracking.js'

let hozzavalok=new Array();
let szendvicshez=[0,0,0,0,0,0,0,0,0]; //ABC sorrendben az elvágott, és még fel nem használt hozzávalók

//alapanyagok feldobásához a változók
let sonkak=[];
let t=[];
let kezdoseb=[];
let g=0.1;

let eger=false;
let coords = [{}]

//összes hozzávaló képei
hozzavalok.push("images/egesz/csirke.png",
"images/egesz/hagyma.png",
"images/egesz/paprika.png",
"images/egesz/paradicsom.png",
"images/egesz/parizsi.png",
"images/egesz/sajt.png",
"images/egesz/salata.png",
"images/egesz/sonka.png",
"images/egesz/uborka.png");


function sonkaEso(){
    let sonka=createSonka();
    sonkak.push(sonka);
    t.push(0);
    kezdoseb.push(Math.floor(Math.random() * app.renderer.height/200)+app.renderer.height/80)
}
let idle=setInterval(sonkaEso, 500); //500 milisec-enként feldob valamit

const handEvent = (x, y) => {
    const event = new CustomEvent("handevent", { //MouseEvent-mousemove
        bubbles: true,
        cancelable: true,
        detail: {
            clientX: x,
            clientY: y
        }
    });
    document.dispatchEvent(event)
}

setInterval(() => {
    handEvent(handX,handY)
}, 1000/30);

//létrehozza a feldobandó alapanyagot
function createSonka(){
    let forras=hozzavalok[Math.floor(Math.random()*hozzavalok.length)] //random hozzávaló
    let sonka=PIXI.Sprite.from(forras);
    sonka.name=forras;
    sonka.anchor.set(0.5,0.5);
    sonka.scale.set(0.3,0.3);
    sonka.x=(app.renderer.width*2/3)*Math.random(); // a jobb 1/3-ot meghagyja más objektumoknak, egyébként random helyen dob fel alapanyagot
    sonka.y=app.renderer.height/*+sonka.height*/; //az egész alapanyag lenről jön, nem csak megjelenik alul a fele (anchor középen)    
    sonka.interactive=true;
    
    sonka.on('handevent', onButtonDown)
    app.stage.addChild(sonka);
    return sonka;
}

//mozgatja a hozzávalókat (dobás+forgás)
function updateSonkak(){
    for(let i=0; i<sonkak.length; i++){
        sonkak[i].rotation+=0.05;

        if(kezdoseb[i]>0)
        {
            sonkak[i].y -= kezdoseb[i];
            kezdoseb[i] = kezdoseb[i] - (g*t[i]);
            t[i]+=0.05;
        }
        if(kezdoseb[i]<=0)
        {
            t[i]=1;
            sonkak[i].y -= kezdoseb[i];
            kezdoseb[i] = kezdoseb[i] - (g*t[i]);
            t[i]+=0.05; 
            if(sonkak[i].y == app.renderer.height)
            {
                kezdoseb[i]=5;
            }
        }
        //ha kiér a játékfelületről
        if(sonkak[i].y>=app.renderer.height/*+sonkak[i].height/2*/){
            sonkak[i].dead=true;
        }
    }
    //amelyikek kiértek a játéktérről, megszűnnek
    for(let i=0; i<sonkak.length; i++){
        if(sonkak[i].dead){
            app.stage.removeChild(sonkak[i]);
            sonkak.splice(i,1);
            t.splice(i,1);
            kezdoseb.splice(i,1);
        }
    }
}

function onButtonDown(e)
{
    let x;
    let y;
    if(eger){
        x=e.data.global.x; //pointer x koordinátája
        y=e.data.global.y; //pointer y koordinátája
    }
    else{
        //x=e.detail.clienX;
        //y=e.detail.clientY;
        console.log(x,y);
        x = e.detail.clientY / video.height * app.renderer.height
        y = e.detail.clientX / video.width * app.renderer.width
        if (coords.length <=5) {
            coords.push({x: x, y: y})
        }else {
            coords.shift()
            coords.push({x: x, y: y})
        }
        let sumX = 0
        let sumY = 0
        coords.forEach(cord => {
            sumX += cord.x
            sumY += cord.y
        });
    }
    //hozzávaló méretei
    let top=this.x-this.height/2;
    let bottom=this.x+this.height/2;
    let left=this.y-this.width/2;
    let right=this.y+this.width/2;
    if(pointd && this.y<app.renderer.height-50 && x>=top && x<=bottom && y>=left && y<=right){ //kattint, nem most jött fel a hozzávaló és hottáért valamelyik hozzávalóhoz
        let meret = sonkak.length;
        //meghatározza, hogy mit vágott el és annak a darabjait jeleníti meg
        switch(this.name){
            case("images/egesz/csirke.png"):
                darabEso(this.x,this.y,1);
                darabEso(this.x,this.y,0);
                szendvicshez[0]++;
                updateSzendvicshez();
                break;
            case("images/egesz/hagyma.png"):
                darabEso(this.x,this.y,3);
                darabEso(this.x,this.y,2);
                szendvicshez[1]++;
                updateSzendvicshez();
                break;  
            case("images/egesz/paprika.png"):
                darabEso(this.x,this.y,5);
                darabEso(this.x,this.y,4);
                szendvicshez[2]++;
                updateSzendvicshez();
                break;  
            case("images/egesz/paradicsom.png"):
                darabEso(this.x,this.y,7);
                darabEso(this.x,this.y,6);
                szendvicshez[3]++;
                updateSzendvicshez();
                break;  
            case("images/egesz/parizsi.png"):
                darabEso(this.x,this.y,8);
                darabEso(this.x,this.y,9);
                szendvicshez[4]++;
                updateSzendvicshez();
                break;  
            case("images/egesz/sajt.png"):
                darabEso(this.x,this.y,11);
                darabEso(this.x,this.y,10);
                szendvicshez[5]++;
                updateSzendvicshez();
                break;  
            case("images/egesz/salata.png"):
                darabEso(this.x,this.y,13);
                darabEso(this.x,this.y,12);
                szendvicshez[6]++;
                updateSzendvicshez();
                break; 
            case("images/egesz/sonka.png"):
                darabEso(this.x,this.y,14);
                darabEso(this.x,this.y,15);
                szendvicshez[7]++;
                updateSzendvicshez();
                break;
            case("images/egesz/uborka.png"):
                darabEso(this.x,this.y,16);
                darabEso(this.x,this.y,17);
                szendvicshez[8]++;
                updateSzendvicshez();
                break;  
        }
            this.dead=true;
            app.stage.removeChild(this);           
            sonkak.splice(meret,1);
            t.splice(meret,1);
            kezdoseb.splice(meret,1);
    }
}

function updateSzendvicshez(){
    
/*counter.updateText("csirke:\t"+szendvicshez[0]+
    " hagyma:\t"+szendvicshez[1]+
    " paprika:\t"+szendvicshez[2]+
    " paradicsom:\t"+szendvicshez[3]+
    " párizsi:\t"+szendvicshez[4]+
    " sajt:\t"+szendvicshez[5]+
    " saláta:\t"+szendvicshez[6]+
    " sonka:\t"+szendvicshez[7]+
    " uborka:\t"+szendvicshez[8]); 
*/
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
}

function resetPalya(){
    for (let i=0; i<app.stage.children.length; i++){
        app.stage.children[i].dead=true;
    }
    updateSonkak();
    szendvicshez=[0,0,0,0,0,0,0,0,0];
    updateSzendvicshez();
}

function szendvicshezRendeles(idx, db){

}

export { updateSonkak, szendvicshez, hozzavalok, resetPalya, szendvicshezRendeles }