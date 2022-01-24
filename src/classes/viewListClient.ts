import { IObserver } from "../interfaces/IObserver";
import { Caisses } from "./caisse";
import { Transaction } from "./transaction";

export class ViewListClient implements IObserver {

    private tables: HTMLTableElement;
    private tr: HTMLTableRowElement;
    private tdClient: HTMLTableCellElement;
    private tdClDebit: HTMLTableCellElement;
    private tdClCredit: HTMLTableCellElement;

    constructor() {
        this.tables = document.querySelector('.table-liste-client');
    }

    // updateListClient(caisse: Caisses, transaction: Transaction) {
    //     let results = [];
    //     let transactions = caisse.getTransac();
    //     let result = transactions.filter(tr => tr.getNomClient() === transaction.getNomClient());
    //     console.log(result);

    //     if (result.length === 0) {
    //         if(transaction.getType() === 'debit'){
    //             results.push({
    //                 "nomClient": transaction.getNomClient(),
    //                 "typeTransac": transaction.getType(),
    //                 "debitCumulTr": transaction.getMontant(),
    //                 "creditCumulTr": 0
    //             });
    //         }
    //         else{
    //             results.push({
    //                 "nomClient": transaction.getNomClient(),
    //                 "typeTransac": transaction.getType(),
    //                 "debitCumulTr": 0,
    //                 "creditCumulTr": transaction.getMontant()
    //             });
    //         }
           
    //     }
    //     else {
    //         let idTr = results.findIndex(tr => tr.getNomClient() === transaction.getNomClient());
    //         if (transaction.getType() === 'debit') {
    //             let transacCumul = {
    //                 "nomClient": transaction.getNomClient(),
    //                 "typeTransac": 'debit',
    //                 "debitCumulTr": results[idTr].debitCumulTr + transaction.getMontant(),
    //                 "creditCumulTr": results[idTr].creditCumulTr
    //             }
    //             results.splice(idTr, 1, transacCumul);
    //         }
    //         else {
    //             let transacCumul = {
    //                 "nomClient": transaction.getNomClient(),
    //                 "typeTransac": 'credit',
    //                 "debitCumulTr": results[idTr].debitCumulTr,
    //                 "creditCumulTr": results[idTr].creditCumulTr + transaction.getMontant(),
    //             }
    //             results.splice(idTr, 1, transacCumul);
    //         }
    //     }
    //     console.log(results);
        
    //     results.forEach(result => {
    //         this.tdClient.innerText = result.nomClient;
    //         this.tdClCredit.innerText =  result.creditCumulTr
    //         this.tdClDebit.innerText = result.debitCumulTr
    //     });
    // }



    update(caisse: Caisses) {
        this.tr = document.createElement('tr');
        this.tdClCredit = document.createElement('td');
        this.tdClDebit = document.createElement('td');
        this.tdClient = document.createElement('td');
        this.tr.append(this.tdClient, this.tdClDebit, this.tdClCredit);
        this.tables.append(this.tr);
    
        let transactions = caisse.getTransac();
        let results = [];
        results = transactions.filter(tr => tr.getNomClient() === tr.getNomClient());
        console.log(results);



        transactions.forEach(transaction => {

            if (transaction.getType() === 'debit') {
                this.tdClient.innerText = transaction.getNomClient();
                this.tdClCredit.innerText = '0';
                this.tdClDebit.innerText = transaction.getMontant().toString();
            }
            else {
                this.tdClient.innerText = transaction.getNomClient();
                this.tdClCredit.innerText = transaction.getMontant().toString();
                this.tdClDebit.innerText = '0';
            }
        });

    }

}