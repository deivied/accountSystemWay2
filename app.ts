import { Caisses } from "./src/classes/caisse"
import { listeTransac } from "./src/classes/listetransac"
import { Transaction } from "./src/classes/transaction"
import { ViewEtat } from "./src/classes/viewEtat"
import { ViewListClient } from "./src/classes/viewListClient"
import { ViewNbreTransac } from "./src/classes/viewNbreTransac"
import { ViewSolde } from "./src/classes/viewSolde"
import { IObserver } from "./src/interfaces/IObserver"



const form = document.querySelector('#form') as HTMLFormElement
const typeOp = document.querySelector('#typeOperation') as HTMLInputElement
const montant = document.querySelector('#montant') as HTMLInputElement
const motif = document.querySelector('#motif') as HTMLInputElement
const nomClient = document.querySelector('#clientNom') as HTMLInputElement
// let localStore = window.localStorage.account;
// let listForm : object [];

//let maCaisse = new Caisses(100000, []);
let caisse= new Caisses(10000,[]);
let viewSolde = new ViewSolde();
let viewNbreTransac = new ViewNbreTransac();
let viewEtat = new ViewEtat();
viewSolde.update(caisse);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let laTransaction = new Transaction(nomClient.value, typeOp.value, montant.valueAsNumber, motif.value);
    let viewListClient = new ViewListClient();
    caisse.addTransac(laTransaction);
    viewListClient.update(caisse);
    let liste1:IObserver= new listeTransac();
    
    caisse.subscribe(liste1);
    liste1.update(caisse);
    viewSolde.viewSolde(caisse, laTransaction);
    viewNbreTransac.update(caisse);
    viewEtat.update(caisse);
    
    
});

// const render = (container : HTMLElement): void => {
//     const li = document.createElement('li');
//     const titreOp = document.createElement('h4');
//     const parag = document.createElement('p');
//     titreOp.innerText = `${typeOp.value} === debit ? Debit : Credit`;
//     parag.innerText = ` `;
// }