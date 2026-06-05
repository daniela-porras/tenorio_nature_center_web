import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enviroment } from "../enviroments";

@Injectable({
    providedIn:'root'
})
export class TourService{

    private url:string;
    private headers:any;

    constructor(private _http:HttpClient){
        this.url = enviroment.apiUrl;
        this.headers = new HttpHeaders().set('Content-Type','application/json');
    }

    getTours():Observable<any>{

        const token = sessionStorage.getItem('token');

        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        });

        return this._http.get(
            this.url + 'tour',
            { headers }
        );
    }

    getTourById(id:number):Observable<any>{

        const token = sessionStorage.getItem('token');

        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        });

        return this._http.get(
            this.url + 'tour/' + id,
            { headers }
        );
    }

    createTour(data:any):Observable<any>{

    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + token
    });

    return this._http.post(
        this.url + 'tour',
        data,
        { headers }
    );
}

updateTour(data:any):Observable<any>{

    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + token
    });

    return this._http.put(
        this.url + 'tour',
        data,
        { headers }
    );
}

deleteTour(id:number):Observable<any>{

    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + token
    });

    return this._http.delete(
        this.url + 'tour/' + id,
        { headers }
    );
}

}