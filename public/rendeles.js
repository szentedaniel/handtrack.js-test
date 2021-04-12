import { hozzavalok, szendvicshez, szendvicshezRendeles } from '/sonka.js'
let rendelesek=[[]];

function rendeles(szint){
    let i,j;
    for (i=0; i<Math.ceil(szint+(szint/4))+2; i++){
        let rendeles=[];
        for (j=0; j<Math.ceil(Math.random()*szint/2)+1; j++){
            rendeles[j]=(hozzavalok[Math.floor(Math.random()*hozzavalok.length)]);
        }
        rendelesek[i]=rendeles;
    }
    console.log(szint);
    console.log(rendelesek);
}


export { rendeles }