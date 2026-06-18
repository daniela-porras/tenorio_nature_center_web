import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { ReservaService } from '../../services/reserva.service';
import { ClienteService } from '../../services/cliente.service';
import { TourService } from '../../services/tour.service';
import { IdiomaService } from '../../services/idioma.service';
import { GuiaService } from '../../services/guia.service';
import { ChoferService } from '../../services/chofer.service';
import { UbicacionService } from '../../services/ubicacion.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reserva-publica',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './reserva-publica.html',
  styleUrl: './reserva-publica.css',
})
export class ReservaPublica implements OnInit {
  hoy: string = '';
  fechaMinima: string = '';

  public tours:any[] = [];
  public idiomas:any[] = [];
  public participantes:any[] = [];
  public guias:any[] = [];
  public choferes:any[] = [];
  public ubicaciones:any[] = [];
  public mensaje:string = '';
  public esInvitado:boolean = true;
  public mensajeError: string = '';

  public reserva:any = {
    idCliente:null,

    nombreCliente:'',
    identificadorCliente:'',
    fechaNacCliente:'',
    telefonoCliente:'',
    nacionalidadCliente:'',

    idTour:null,
    idGuia:null,
    idChofer:null,
    idUbicacion:null,
    idIdioma:null,

    fechaTour:'',
    precio:'',
    idEstadoReserva: 1

  };

  constructor(
    private cdr:ChangeDetectorRef,
    private reservaService:ReservaService,
    private tourService:TourService,
    private idiomaService:IdiomaService,
    private clienteService:ClienteService,
    private guiaService:GuiaService,
    private choferService:ChoferService,
    private ubicacionService:UbicacionService,
  ){}

  ngOnInit(): void {
    const ahora = new Date();
    this.hoy = ahora.toISOString().split('T')[0];

    const minima = new Date();
    minima.setFullYear(ahora.getFullYear() - 100);
    this.fechaMinima = minima.toISOString().split('T')[0];

    const identity = sessionStorage.getItem('identity');

    if(identity){

      this.esInvitado = false;

      this.loadClienteLogueado();

    }
    this.loadTours();
    this.loadIdiomas();
    this.loadGuias();
    this.loadChoferes();
    this.loadUbicaciones();

  }

  loadTours(){
    this.tourService.getTours()
    .subscribe({
      next:(response:any)=>{
        this.tours = response;
        this.cdr.detectChanges();
      }
    });
  }

  loadGuias(){
    this.guiaService.getGuias()
    .subscribe({
      next:(response:any)=>{
        this.guias = response;
        this.cdr.detectChanges();
      }
    });
  }

  loadChoferes(){
    this.choferService.getChoferes()
    .subscribe({
      next:(response:any)=>{
        this.choferes = response;
        this.cdr.detectChanges();
      }
    });
  }

  loadUbicaciones(){
    this.ubicacionService.getUbicaciones()
    .subscribe({
      next:(response:any)=>{
        this.ubicaciones = response;
        this.cdr.detectChanges();
      }
    });
  }

  loadIdiomas(){
    this.idiomaService.getIdiomas()
    .subscribe({
      next:(response:any)=>{
        this.idiomas = response;
        this.cdr.detectChanges();
      }
    });
  }

  loadClienteLogueado(){

    const identity = sessionStorage.getItem('identity');

    if(!identity) return;

    const user = JSON.parse(identity);

    console.log(user);

    this.clienteService
      .getClienteByUsuario(user.idUsuario)
      .subscribe({

        next:(cliente:any)=>{

          console.log('CLIENTE', cliente);

          this.reserva.idCliente = cliente.idcliente;

          this.reserva.nombreCliente = cliente.nombre;
          this.reserva.identificadorCliente = cliente.identificador;
          this.reserva.telefonoCliente = cliente.telefono;
          this.reserva.nacionalidadCliente = cliente.nacionalidad;
          this.reserva.fechaNacCliente =cliente.fechanac?.substring(0,10);
          this.cdr.detectChanges();

        },

        error:(err)=>{
          console.log(err);
        }

      });

  }

  agregarParticipante(){

    this.participantes.push({

      nombre:'',
      identificador:'',
      fechaNac:'',
      telefono:'',
      nacionalidad:''

    });

  }

  eliminarParticipante(index:number){

    this.participantes.splice(index,1);

  }

guardarReserva(form: NgForm){

  const tourSeleccionado = this.tours.find(
    t => t.idtour === this.reserva.idTour
  );

  const precioTour = tourSeleccionado
    ? tourSeleccionado.preciobase
    : '0';

  const payload: any = {

    idCliente: this.esInvitado
      ? null
      : this.reserva.idCliente,

    nombreCliente: this.reserva.nombreCliente,
    identificadorCliente: this.reserva.identificadorCliente,
    fechaNacCliente: this.reserva.fechaNacCliente,
    telefonoCliente: this.reserva.telefonoCliente,
    nacionalidadCliente: this.reserva.nacionalidadCliente,

    idEstadoReserva: 1,

    idTour: this.reserva.idTour,
    idGuia: this.reserva.idGuia,
    idChofer: this.reserva.idChofer,
    idUbicacion: this.reserva.idUbicacion,
    idIdioma: this.reserva.idIdioma,

    fechaTour: this.reserva.fechaTour,
    precio: precioTour,

    participantes: this.participantes.map(p => ({
      ...p,
      precioUnitario: precioTour
    }))

  };

  console.log('PAYLOAD ENVIADO:', JSON.stringify(payload, null, 2));

  this.reservaService
    .createReservaCompleta(payload)
    .subscribe({

      next:()=>{

        this.mensaje =
        'Reserva creada correctamente';

        this.limpiarFormulario();
        form.resetForm(this.reserva);

        this.cdr.detectChanges();

        setTimeout(()=>{
          this.mensaje='';
          this.cdr.detectChanges();
        },3000);

      },

      error:(err)=>{

        console.log(err);

        this.mensajeError =
        'Ocurrió un error al guardar la reserva';

        this.cdr.detectChanges();

        setTimeout(()=>{
          this.mensajeError='';
          this.cdr.detectChanges();
        },3000);

      }

    });

}

private limpiarFormulario(){

  this.reserva = {

    idCliente: this.esInvitado
      ? null
      : this.reserva.idCliente,

    nombreCliente:'',
    identificadorCliente:'',
    fechaNacCliente:'',
    telefonoCliente:'',
    nacionalidadCliente:'',

    idTour:null,
    idGuia:null,
    idChofer:null,
    idUbicacion:null,
    idIdioma:null,

    fechaTour:'',
    precio:'',
    idEstadoReserva: 1

  };

  this.participantes = [];

  if(!this.esInvitado){
    this.loadClienteLogueado();
  }

}
}
