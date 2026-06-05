import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { ParticipanteService } from '../../services/participante.service';
import { AuthService } from '../../services/auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reservas',
  standalone:true,
  imports: [DatePipe, RouterLink],
  templateUrl: './reservas.html',
  styleUrl: './reservas.css',
})
export class Reservas implements OnInit {

  public reservas:any[] = [];

  constructor(
    private clienteService: ClienteService,
    private participanteService: ParticipanteService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {

    this.loadReservas();

  }

  loadReservas(){

    const usuario = this.authService.currentUser();

    console.log('Usuario:', usuario);
    if(!usuario){
      return;
    }

    this.clienteService
      .getClienteByUsuario(usuario.idUsuario)
      .subscribe({

        next:(cliente:any)=>{
          console.log('Cliente encontrado:', cliente);

          this.participanteService
            .getReservasByCliente(cliente.idcliente)
            .subscribe({

              next:(response:any)=>{

                this.reservas = response;
                console.log('Reservas --->', this.reservas);

                this.cdr.detectChanges();
              }

            });
        }

      });

  }

}