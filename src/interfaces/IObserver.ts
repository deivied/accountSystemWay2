import { Caisses } from "../classes/caisse";
import { Transaction } from "../classes/transaction";

export interface IObserver{
    update(caisse:Caisses):any;
}