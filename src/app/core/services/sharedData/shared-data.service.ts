import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  data : Object = {};

   private _initialData: BehaviorSubject<string>=  new BehaviorSubject<any>('')
   _latestData$ = this._initialData.asObservable();
  constructor() { }

  changeData(latestData :any)
  {
    this._initialData.next(latestData)
    console.log(latestData);
  }


}
