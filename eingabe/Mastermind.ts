import readlineSync = require('readline-sync')

function neuesFeld(){
    let lösung=[]
        for(let i=1; i<=4;i++){
            lösung[i-1]=Math.ceil(Math.random()*6)
        }
        return lösung
}

function prüfen(array:number[],lösung:number[]){
    let lös=[...lösung]
    let arr=[...array]
    let gleich=0
    let vorhanden=0
    for (let i=0;i<=3;i++){
           if(array[i]==lös[i]){
               gleich++
               lös[i]=-1
               arr[i]=0
           }
    }
    for (let i=0;i<=3;i++){
            for(let k=0;k<=3;k++){
                if(arr[i]==lös[k]){
                    vorhanden++
                    lös[k]=-1
                    break
            }    
           }   
    }
    return {gleich, vorhanden }
}

function eingabe(){
    let eingabe = readlineSync.question("Geben sie 4 Ziffern zwischen 1 und 6 ein: ")
    let array = eingabe.split("").map(x=>Number(x))
    return array
}

//Programmstart
let lösung=neuesFeld()
let count=0
let array:number[]=[]
let result : {gleich: number , vorhanden:number} = { gleich:0,vorhanden:0 }
let gewonnen=false

console.log("MASTERMIND")
while (count<=9 && result.gleich < 4 ){
    array=eingabe()
    result = prüfen(array,lösung)
    console.log("richtig: "+result.gleich+"\n vorhanden: "+result.vorhanden)
    count++
    if(result.gleich==4){
        gewonnen=true
        break
    }
}
if(gewonnen==true){
console.log("Richtig nach "+count+" Versuchen!\nDie Lösung ist: "+array.toString())}
else{
console.log("Leider verloren.\nDie richtige Antwort wäre "+lösung.toString()+" gewesen.")}