import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enviroment } from "../enviroments";

@Injectable({
    providedIn:'root'
})
export class UsuarioService{

    private url:string;

    constructor(private _http:HttpClient){
        this.url = enviroment.apiUrl;
    }

    getUsuarios():Observable<any>{
        const token = sessionStorage.getItem('token');
        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        });
        return this._http.get(this.url + 'usuario', { headers });
    }

    createUsuario(user:any):Observable<any>{
        const headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url + 'usuario', user, { headers });
    }

    updateUsuario(user:any):Observable<any>{
        const token = sessionStorage.getItem('token');
        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        });
        return this._http.put(this.url + 'usuario', user, { headers });
    }

    deleteUsuario(id:number):Observable<any>{
        const token = sessionStorage.getItem('token');
        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        });
        return this._http.delete(this.url + 'usuario/' + id, { headers });
    }

    registrarCliente(body: any) {
        return this._http.post(`${this.url}registro-cliente`, body);
    }

    uploadImage(formData:FormData):Observable<any>{
        return this._http.post(this.url + 'usuario/upload', formData);
    }
}