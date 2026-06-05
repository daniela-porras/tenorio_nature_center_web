import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enviroment } from "../enviroments";

@Injectable({
    providedIn:'root'
})
export class EmpresaClienteService{

    private url:string;
    private headers:any;

    constructor(private _http:HttpClient){
        this.url = enviroment.apiUrl;
        this.headers = new HttpHeaders().set('Content-Type','application/json');
    }

    getEmpresasCliente():Observable<any>{

        return this._http.get(
            this.url + 'empresacliente'
        );
    }

    getEmpresaClienteById(id:number):Observable<any>{

        return this._http.get(
            this.url + 'empresacliente/' + id
        );
    }

    createEmpresaCliente(data:any):Observable<any>{

        const token = sessionStorage.getItem('token');

        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        });

        return this._http.post(
            this.url + 'empresacliente',
            data,
            { headers }
        );
    }

    updateEmpresaCliente(data:any):Observable<any>{

        const token = sessionStorage.getItem('token');

        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        });

        return this._http.put(
            this.url + 'empresacliente',
            data,
            { headers }
        );
    }

    deleteEmpresaCliente(id:number):Observable<any>{

        const token = sessionStorage.getItem('token');

        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        });

        return this._http.delete(
            this.url + 'empresacliente/' + id,
            { headers }
        );
    }

}