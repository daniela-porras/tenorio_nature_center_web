import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  public user: User;
  public status: number = -1;

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router
  ){
    this.user = new User(0, "", "", "", "", "user_role", "", "");
  }

  uploadImage(e: any){
    const file: File = e.target.files[0];
    if(file){
      const formData = new FormData();
      formData.append('file0', file);
      this._usuarioService.uploadImage(formData).subscribe({
        next:(response) => {
          this.user.imagen = response.filename;
        },
        error:(err:Error) => {
          console.log("Error al cargar imagen", err);
        }
      });
    }
  }

  onSubmit(form: any){
    const body = {
      nombre: this.user.nombre,
      apellido: this.user.apellido,
      correo: this.user.correo,
      contrasena: this.user.contrasena,
      rol: this.user.rol,
      descripcion: this.user.descripcion,
      imagen: this.user.imagen
    };

    this._usuarioService.createUsuario(body).subscribe({
      next:(response) => {
        console.log("Usuario creado", response);
        this.status = 1;
        this._router.navigate(['/login']);
      },
      error:(err:Error) => {
        console.log("Error", err);
        this.status = 0;
      }
    });
  }
}