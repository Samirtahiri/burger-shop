import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SelectOptions} from "../../interface/select-options";

@Injectable({
  providedIn: 'root'
})
export class BurgerApiService {

  constructor(private http: HttpClient) { }

  getSelectOptions(): Observable<SelectOptions> {
    return this.http.get<SelectOptions>('assets/data/burger-data.json');
  }
}
