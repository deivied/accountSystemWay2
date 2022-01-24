import { IObserver } from "./IObserver";

export interface ISubject{
    subscribe(obs:IObserver):any,
    unsubscribe(obs:IObserver):any,
    notify()
}