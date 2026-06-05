import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enviroment } from "../enviroments";

@Injectable({
    providedIn:'root'
})
export class EstadoReservaService{

    private url:string;
    private headers:any;

    constructor(private _http:HttpClient){
        this.url = enviroment.apiUrl;
        this.headers = new HttpHeaders().set('Content-Type','application/json');
    }

    getEstadosReserva():Observable<any>{

        return this._http.get(
            this.url + 'estadoreserva'
        );
    }

    getEstadoReservaById(id:number):Observable<any>{

        return this._http.get(
            this.url + 'estadoreserva/' + id
        );
    }

    createEstadoReserva(data:any):Observable<any>{

        const token = sessionStorage.getItem('token');

        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        });

        return this._http.post(
            this.url + 'estadoreserva',
            data,
            { headers }
        );
    }

    updateEstadoReserva(data:any):Observable<any>{

        const token = sessionStorage.getItem('token');

        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        });

        return this._http.put(
            this.url + 'estadoreserva',
            data,
            { headers }
        );
    }

    deleteEstadoReserva(id:number):Observable<any>{

        const token = sessionStorage.getItem('token');

        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        });

        return this._http.delete(
            this.url + 'estadoreserva/' + id,
            { headers }
        );
    }

}