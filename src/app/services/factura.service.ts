import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enviroment } from "../enviroments";

@Injectable({
    providedIn: 'root'
})
export class FacturaService {

    private url: string;

    constructor(private _http: HttpClient) {
        this.url = enviroment.apiUrl;
    }

    private getHeaders(): HttpHeaders {
        const token = sessionStorage.getItem('token');
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
    }

    getFacturas(): Observable<any> {
        return this._http.get(this.url + 'factura');
    }

    getFacturaById(id: number): Observable<any> {
        return this._http.get(this.url + 'factura/' + id);
    }
    getReservasConFactura(): Observable<any> {
    return this._http.get(this.url + 'factura/reservas-facturadas');
    }

    createFactura(data: any): Observable<any> {
        return this._http.post(
            this.url + 'factura',
            data,
            { headers: this.getHeaders() }
        );
    }

    updateFactura(data: any): Observable<any> {
        return this._http.put(
            this.url + 'factura',
            data,
            { headers: this.getHeaders() }
        );
    }

    deleteFactura(id: number): Observable<any> {
        return this._http.delete(
            this.url + 'factura/' + id,
            { headers: this.getHeaders() }
        );
    }
}