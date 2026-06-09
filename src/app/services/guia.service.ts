import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enviroment } from "../enviroments";

@Injectable({
    providedIn:'root'
})
export class GuiaService{

    private url:string;

    constructor(private _http:HttpClient){
        this.url = enviroment.apiUrl;
    }

    getGuias():Observable<any>{

        const token = sessionStorage.getItem('token');

        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        });

        return this._http.get(
            this.url + 'guia',
            { headers }
        );
    }

    getGuiaById(id:number):Observable<any>{

        const token = sessionStorage.getItem('token');

        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        });

        return this._http.get(
            this.url + 'guia/' + id,
            { headers }
        );
    }

    createGuia(data:any):Observable<any>{

    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + token
    });

    return this._http.post(
        this.url + 'guia',
        data,
        { headers }
    );
}

    updateGuia(data:any):Observable<any>{

    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + token
    });

    return this._http.put(
        this.url + 'guia',
        data,
        { headers }
    );
}

    deleteGuia(id:number):Observable<any>{

    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + token
    });

    return this._http.delete(
        this.url + 'guia/' + id,
        { headers }
    );
}

}
