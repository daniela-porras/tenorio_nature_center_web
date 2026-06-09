import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enviroment } from "../enviroments";

@Injectable({
    providedIn: 'root'
})
export class FacturaParticipanteService {

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

    createFacturaParticipante(data: any): Observable<any> {
        return this._http.post(
            this.url + 'facturaparticipante',
            data,
            { headers: this.getHeaders() }
        );
    }
}