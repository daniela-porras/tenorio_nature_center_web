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

    createUsuario(user:any):Observable<any>{
        const headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(
            this.url + 'usuario',
            user,
            { headers }
        );
    }

    uploadImage(formData:FormData):Observable<any>{
        return this._http.post(
            this.url + 'usuario/upload',
            formData
        );
    }
}