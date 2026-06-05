import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroments';

@Injectable({
  providedIn: 'root'
})
export class IdiomaGuiaService {

  private url:string;

  constructor(private http:HttpClient){
    this.url = enviroment.apiUrl;
  }

  getIdiomasByGuia(id:number):Observable<any>{

    return this.http.get(
      this.url + 'idiomaguia/guia/' + id
    );

  }

}