import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enviroment } from "../enviroments";

@Injectable({
    providedIn: 'root'
})
export class EmailClienteService {

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

    getEmailsByCliente(idCliente: number): Observable<any> {
        return this._http.get(this.url + 'emailcliente/cliente/' + idCliente);
    }

    getEmailById(id: number): Observable<any> {
        return this._http.get(this.url + 'emailcliente/' + id);
    }

    createEmail(data: any): Observable<any> {
        return this._http.post(
            this.url + 'emailcliente',
            data,
            { headers: this.getHeaders() }
        );
    }

    updateEmail(data: any): Observable<any> {
        return this._http.put(
            this.url + 'emailcliente',
            data,
            { headers: this.getHeaders() }
        );
    }

    deleteEmail(id: number): Observable<any> {
        return this._http.delete(
            this.url + 'emailcliente/' + id,
            { headers: this.getHeaders() }
        );
    }
}