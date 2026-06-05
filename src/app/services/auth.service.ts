import { Injectable, signal } from "@angular/core";
import { User } from "../models/usuario";
import { Observable, tap } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { enviroment } from "../enviroments";

export interface LoginResponse{
    access_token:string
    payload:any
}

@Injectable({
    providedIn:'root'
})
export class AuthService{
    private readonly url:string
    currentUser=signal<User|null>(null)
    constructor(private _http:HttpClient){
        this.url=enviroment.apiUrl
        const identity = sessionStorage.getItem('identity')

        if(identity){

            this.currentUser.set(JSON.parse(identity))

        }
    }
    login(credentials:User):Observable<LoginResponse>{
        let userJSON=JSON.stringify(credentials)
        let headers=new HttpHeaders().set('Content-Type','application/json')
        let options={headers}
        const body = {
    correo: credentials.correo,
    contrasena: credentials.contrasena
}

return this._http.post<LoginResponse>(
    this.url + "usuario/login",
    body,
    options
).pipe(
    tap(
        (response)=>{
            this.currentUser.set(response.payload)
            sessionStorage.setItem('token',response.access_token)
            sessionStorage.setItem('identity',JSON.stringify(response.payload))
        }
    )
)
    }
    logout():void{
        this.currentUser.set(null)
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('identity')
    }
    isAuthenticated():boolean{
        return !!sessionStorage.getItem('token')
    }
    isAdmin():boolean{

        return this.currentUser()?.rol === 'Admin'

    }

    isClient():boolean{

        return this.currentUser()?.rol === 'Cliente'

    }

}