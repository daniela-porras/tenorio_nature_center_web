import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/usuario';
import { Router, RouterLink } from '@angular/router';
import { AuthService, LoginResponse } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  public status:number
  public user:User
  
  constructor(
    private _authService:AuthService,
    private _router:Router
  ){
    this.status=-1
    this.user=new User(1,"","","","","","","")
  }

  onSubmit(form:any){

    console.log("Formulario activado")

    this._authService.login(this.user).subscribe({

      next:(response:LoginResponse)=>{

        if(response.access_token.length > 0){

          console.log("Exito",response)

          // ADMIN
          if(response.payload.rol === 'admin_role'){

            this._router.navigate(['/admin'])

          }
          // CLIENTE
          else{

            this._router.navigate(['/'])

          }

        }else{

          this.status=0

        }

      },

      error:(err:Error)=>{

        console.log("Error Server")

        this.status=1

      }

    })

  }

}