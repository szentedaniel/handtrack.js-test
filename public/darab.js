import { app } from './app.js'

let darabok=[];
let darabokalap=new Array(); 

let darabSeb=[];
let dt=[];
let g=0.1;

darabokalap.push("images/fel/csirke_1.png",
"images/fel/csirke_2.png",
"images/fel/hagyma_1.png",
"images/fel/hagyma_2.png",
"images/fel/paprika_1.png",
"images/fel/paprika_2.png",
"images/fel/paradicsom_1.png",
"images/fel/paradicsom_2.png",
"images/fel/parizsi_1.png",
"images/fel/parizsi_2.png",
"images/fel/sajt_1.png",
"images/fel/sajt_2.png",
"images/fel/salata_1.png",
"images/fel/salata_2.png",
"images/fel/sonka_1.png",
"images/fel/sonka_2.png",
"images/fel/uborka_1.png",
"images/fel/uborka_2.png");

function darabEso(cx,cy,index)
{
    let sonka=createDarabok(cx,cy,index);
    darabok.push(sonka);
    dt.push(0);
    darabSeb.push(1)
}

function createDarabok(cx,cy,index)
{
    let sonkadab=PIXI.Sprite.from(darabokalap[index]);
    sonkadab.anchor.set(0.5,0.5);
    sonkadab.scale.set(0.3,0.3);
    sonkadab.x=cx;
    sonkadab.y=cy;
    app.stage.addChild(sonkadab);
    return sonkadab;
}

function updateDarabok()
{
    for(let i=0; i<darabok.length; i++){
        darabok[i].rotation+=0.05;

        /*feldobás*/
        if(darabSeb[i]>0)
        {
            if(i%2==0)
            {
                darabok[i].x += 0.5;
            }else{
                darabok[i].x -= 0.5;
            }
            darabok[i].y -= darabSeb[i];
            darabSeb[i] = (darabSeb[i] - (g*dt[i]));
            dt[i]+=0.05;
        }
        if(darabSeb[i]<=0)
        {
            if(i%2==0)
            {
                darabok[i].x += 0.5;
            }else{
                darabok[i].x -= 0.5;
            }
            dt[i]=1;
            darabok[i].y -= darabSeb[i];
            darabSeb[i] = darabSeb[i] - (g*dt[i]);
            dt[i]+=0.05; 
            if(darabok[i].y == 600)
            {
                darabSeb[i]=5;
            }
        }
                                                                     /*kiér a játék felületről*/
        if(darabok[i].y>=app.renderer.height){
            darabok[i].dead=true;
        }

        for(let i=0; i<darabok.length; i++){
            if(darabok[i].dead){
                app.stage.removeChild(darabok[i]);
                darabok.splice(i,1);
                dt.splice(i,1);
                darabSeb.splice(i,1);
            }
        }
    }
    
        for(let i=0; i<darabok.length; i++){
            if(darabok[i].dead){
                app.stage.removeChild(darabok[i]);
                darabok.splice(i,1);
                dt.splice(i,1);
                darabSeb.splice(i,1);
            }
        }
    }

export { updateDarabok, darabEso }