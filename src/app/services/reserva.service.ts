import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enviroment } from "../enviroments";

@Injectable({
    providedIn:'root'
})
export class ReservaService{

    private url:string;
    private headers:any;

    constructor(private _http:HttpClient){
        this.url = enviroment.apiUrl;
        this.headers = new HttpHeaders().set('Content-Type','application/json');
    }

    getReservas():Observable<any>{

        return this._http.get(
            this.url + 'reserva'
        );
    }

    getReservaById(id:number):Observable<any>{

        return this._http.get(
            this.url + 'reserva/' + id
        );
    }

    createReserva(data:any):Observable<any>{

        const token = sessionStorage.getItem('token');

        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        });

        return this._http.post(
            this.url + 'reserva',
            data,
            { headers }
        );
    }

    updateReserva(data:any):Observable<any>{

        const token = sessionStorage.getItem('token');

        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        });

        return this._http.put(
            this.url + 'reserva',
            data,
            { headers }
        );
    }

    deleteReserva(id:number):Observable<any>{

        const token = sessionStorage.getItem('token');

        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        });

        return this._http.delete(
            this.url + 'reserva/' + id,
            { headers }
        );
    }

    createReservaCompleta(data:any):Observable<any>{
        const token = sessionStorage.getItem('token');
        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        });
        return this._http.post(
            this.url + 'reserva/completa',
            data,
            { headers }
         );

    }

}