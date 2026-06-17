import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
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
  public mensajeError: string = '';
  public cargando: boolean = false;

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router
  ){
    this.user = new User(0, "", "", "", "", "Cliente", "", "");
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

  onSubmit(form: NgForm){

    if (this.user.contrasena !== this.user.confirmarContrasena) {
      this.mensajeError = 'Las contraseñas no coinciden.';
      this.status = 0;
      return;
    }

    this.cargando = true;
    this.mensajeError = '';

    const body = {
      nombre: this.user.nombre,
      apellido: this.user.apellido,
      correo: this.user.correo,
      contrasena: this.user.contrasena,
      identificador: this.user.identificador,
      fechaNac: this.user.fechaNac,
      telefono: this.user.telefono,
      nacionalidad: this.user.nacionalidad
    };

    console.log('BODY FINAL A ENVIAR:', JSON.stringify(body));

    this._usuarioService.registrarCliente(body).subscribe({
      next:(response) => {
        console.log("Cliente registrado", response);
        this.cargando = false;
        this.status = 1;

        setTimeout(() => {
          this._router.navigate(['/login']);
        }, 1500);
      },
      error:(err:any) => {
        console.log("Error", err);
        this.cargando = false;
        this.status = 0;

        if (err.status === 409) {
          this.mensajeError = err.error?.error || 'El correo o la identificación ya están registrados.';
        } else {
          this.mensajeError = 'Ocurrió un error al registrar el usuario.';
        }
      }
    });
  }
}