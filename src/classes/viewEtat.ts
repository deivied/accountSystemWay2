import { IObserver } from "../interfaces/IObserver";
import { Caisses } from "./caisse";

export class ViewEtat implements IObserver{
    private div : HTMLDivElement;
    private head : HTMLHeadElement;
    constructor(){
        this.div = document.querySelector('.etat');
        this.head = document.createElement('h3');
        this.head.innerText = 'Etat';
        // this.head.className = 'etatVert';
        this.div.append(this.head);
    }

    update(caisse: Caisses) {
        let solde = caisse.getSolde();
        if (solde >= 0 ) {
            this.head.innerText = 'A couvert';
            this.div.className = 'etatVert';
            
        }else{
            this.head.innerText = 'A découvert';
            this.div.className = 'etatRouge';
        }
    }
}