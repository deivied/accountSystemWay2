import { IObserver } from "../interfaces/IObserver";
import { Caisses } from "./caisse";
import { Transaction } from "./transaction";

export class ViewSolde implements IObserver{
    private div : HTMLDivElement;
    private head : HTMLHeadElement;
    private span : HTMLSpanElement;
    
    constructor(){
        this.div = document.querySelector('.solde');
        this.head = document.createElement('h2');
        this.head.innerText = 'Solde : '
        this.span = document.createElement('span');
        this.head.append(this.span);    
        this.div.append(this.head);
    }

    viewSolde(caisse : Caisses, transac : Transaction){
        if (transac.getType() === 'debit' && caisse.getSolde() >= transac.getMontant()) {
            caisse.setSoldeDebit(transac.getMontant());
            this.span.innerText = caisse.getSolde().toString();
            console.log(`Compte debite de : ${transac.getMontant()} nouveau solde ${caisse.getSolde()}`);
        }
        else if (transac.getType() === 'debit' && caisse.getSolde() <= transac.getMontant()) {
            caisse.setSoldeDebit(transac.getMontant());
            this.span.className = 'soldeDecouver';
            this.span.innerText = caisse.getSolde().toString();
            console.log("Votre solde est inferieur au montant à débiter");
            console.log(`Compte debite de : ${transac.getMontant()} nouveau solde ${caisse.getSolde()}`);
        }
        else if (transac.getType() === 'credit') {
            caisse.setSoldeCredit(transac.getMontant());
            this.span.className = 'soldeCouver';
            this.span.innerText = caisse.getSolde().toString();
            console.log(`Compte credite de : ${transac.getMontant()} nouveau solde ${caisse.getSolde()}`);
        }
        else{
            console.log("Non pris en compte");
        }
    }
    update(caisse: Caisses) {
        this.span.className = 'soldeCouver';
        this.span.innerText = caisse.getSolde().toString();
    }
}