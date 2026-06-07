import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enviroment } from "../enviroments";
 
@Injectable({
    providedIn:'root'
})
export class ParticipanteService{
 
    private url:string;
    private headers:any;
 
    constructor(private _http:HttpClient){
        this.url = enviroment.apiUrl;
        this.headers = new HttpHeaders().set('Content-Type','application/json');
    }
 
    getParticipantes():Observable<any>{
        const token = sessionStorage.getItem('token');
        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        });
        return this._http.get(this.url + 'participante', { headers });
    }
 
    getParticipanteById(id:number):Observable<any>{
        const token = sessionStorage.getItem('token');
        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        });
        return this._http.get(this.url + 'participante/' + id, { headers });
    }
 
    getReservasByCliente(id:number):Observable<any>{
        const token = sessionStorage.getItem('token');
        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        });
        return this._http.get(this.url + 'participante/cliente/' + id, { headers });
    }
 
    getParticipantesByReserva(id:number):Observable<any>{
        return this._http.get(
            this.url + 'participante/reserva/' + id
        );
    }

    getReservasDisponiblesParaFacturar(): Observable<any> {
    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + token
    });

    return this._http.get(
        this.url + 'participante/disponibles-facturar',
        { headers }
    );
    }
 
    getParticipantesSinFacturaByReserva(id:number):Observable<any>{
        return this._http.get(
            this.url + 'participante/reserva/' + id + '/sin-factura'
        );
    }
 
}
 