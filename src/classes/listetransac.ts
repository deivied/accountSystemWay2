import { IObserver } from "../interfaces/IObserver";
import { ISubject } from "../interfaces/ISubject";
import { Caisses } from "./caisse";
import { Transaction } from "./transaction";

export class listeTransac implements IObserver {
    private ul: HTMLUListElement;
    
    constructor() {
        this.ul = document.querySelector('.listeOrdonnee')
    }

    update(caisse: Caisses) {
        let transac = caisse.getTransac()
        let liHtml = document.createElement('li');
        let headHtml = document.createElement('h4');
        let paraHtml = document.createElement('p');
        transac.forEach(trsc => {
            liHtml.className = trsc.getType()
            headHtml.innerText = `${trsc.getType() === 'debit' ? 'Debit' : 'Credit'}`;
            paraHtml.innerHTML = trsc.setText()
        })
        this.ul.append(liHtml)
        liHtml.append(headHtml)
        liHtml.append(paraHtml)

    }
}