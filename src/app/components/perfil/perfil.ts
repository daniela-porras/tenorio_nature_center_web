import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ClienteService } from '../../services/cliente.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {

  public usuario:any = {};
  public cliente:any = {};

  constructor(
    private authService: AuthService,
    private clienteService: ClienteService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {

    this.usuario = this.authService.currentUser();

    console.log('Usuario perfil:', this.usuario);
    if(this.usuario?.rol === 'Cliente'){

      this.loadCliente();

    }

  }

  loadCliente(){

    this.clienteService
      .getClienteByUsuario(this.usuario.idUsuario)
      .subscribe({

        next:(response:any)=>{

          this.cliente = response;

          this.cdr.detectChanges();

        }

      });

  }

}