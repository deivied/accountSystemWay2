import {IObserver } from "../interfaces/IObserver";
import { ISubject } from "../interfaces/ISubject";
import { Transaction } from "./transaction";


export class Caisses implements ISubject{
    private solde : number;
    private transactions : Transaction[];
    private observer:IObserver[]=[];
    constructor(solde : number, trsc: Transaction[]) {
        this.solde = solde;
        this.transactions= trsc
        this.notify()
    }
    subscribe(obs: IObserver) {
        this.observer.push(obs)
        console.log('subscribe');
    }
    unsubscribe(obs: IObserver) {
        let index = this.observer.indexOf(obs)
        this.observer.splice(index,1)
        console.log(('unsubscribe'));
    }
    addTransac(transac: Transaction){
        // this.tr=transac
        // this.notify()
        this.transactions.push(transac);
        console.log('addtransaction');
    }
    notify() {
        this.observer.forEach(obs=>obs.update(this))
        console.log('notify');
    }
    getTransac(){
        return this.transactions;
    }
    
    getSolde(){
        return this.solde;
    }

    setSoldeDebit(montant : number){
        this.solde -= montant;
    }

    setSoldeCredit(montant : number){
        this.solde += montant;
    }
    
   
}