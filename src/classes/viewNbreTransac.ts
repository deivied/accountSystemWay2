import { IObserver } from "../interfaces/IObserver";
import { Caisses } from "./caisse";

export class ViewNbreTransac implements IObserver{
    private table : HTMLTableElement;
    private tdDebit : HTMLTableCellElement;
    private tdCredit : HTMLTableCellElement;
    private tr : HTMLTableRowElement
    constructor(){
        this.table = document.querySelector('.table-nbr-transac');
        this.tr = document.createElement('tr');
        this.tdDebit = document.createElement('td');
        this.tdCredit = document.createElement('td');
        this.tdCredit.innerText = '0';
        this.tdDebit.innerText = '0';
        this.tr.append(this.tdDebit, this.tdCredit);
        this.table.append(this.tr);
    }

    update(caisse: Caisses) {
        let transactions = caisse.getTransac();
        let cptDebit = 0;
        let cptCredit = 0;
        transactions.forEach(transaction => {
            if (transaction.getType() === 'debit') {
                cptDebit ++;
                this.tdDebit.innerText = cptDebit.toString(); 
            }
            else{
                cptCredit ++;
                this.tdCredit.innerText = cptCredit.toString(); 
            }
        })
    }
}