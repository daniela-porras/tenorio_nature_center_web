import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enviroment } from "../enviroments";

@Injectable({
    providedIn:'root'
})
export class VehiculoService{

    private url:string;
    private headers:any;

    constructor(private _http:HttpClient){
        this.url = enviroment.apiUrl;
        this.headers = new HttpHeaders().set('Content-Type','application/json');
    }

    getVehiculos():Observable<any>{

        const token = sessionStorage.getItem('token');

        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        });

        return this._http.get(
            this.url + 'vehiculo',
            { headers }
        );
    }

    getVehiculoById(id:number):Observable<any>{

        const token = sessionStorage.getItem('token');

        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        });

        return this._http.get(
            this.url + 'vehiculo/' + id,
            { headers }
        );
    }

}