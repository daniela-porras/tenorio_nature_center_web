import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ReservaService } from '../../../services/reserva.service';
import { ClienteService } from '../../../services/cliente.service';
import { EmpresaClienteService } from '../../../services/empresacliente.service';

import { TourService } from '../../../services/tour.service';
import { GuiaService } from '../../../services/guia.service';
import { ChoferService } from '../../../services/chofer.service';
import { UbicacionService } from '../../../services/ubicacion.service';
import { IdiomaService } from '../../../services/idioma.service';
import { EstadoReservaService } from '../../../services/estadoreserva.service';

@Component({
  selector: 'app-reservas-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reservas-admin.html',
  styleUrl: './reservas-admin.css'
})
export class ReservasAdmin implements OnInit {

  public reservas:any[] = [];

  public tours:any[] = [];
  public guias:any[] = [];
  public choferes:any[] = [];
  public ubicaciones:any[] = [];
  public idiomas:any[] = [];
  public estadosReserva:any[] = [];
  public empresas:any[] = [];

  public mensaje:string = '';

  public reserva:any = {

    idEmpresaCliente:null,

    nombreCliente:'',
    identificadorCliente:'',
    fechaNacCliente:'',
    telefonoCliente:'',
    nacionalidadCliente:'',

    idEstadoReserva:null,

    idTour:null,
    idGuia:null,
    idChofer:null,
    idUbicacion:null,
    idIdioma:null,

    fechaTour:'',
    precio:''
  };

  public participantes:any[] = [];

  constructor(
    private reservaService:ReservaService,
    private empresaService:EmpresaClienteService,

    private tourService:TourService,
    private guiaService:GuiaService,
    private choferService:ChoferService,
    private ubicacionService:UbicacionService,
    private idiomaService:IdiomaService,
    private estadoReservaService:EstadoReservaService
  ){}

  ngOnInit(): void {

    this.loadReservas();

    this.loadTours();
    this.loadGuias();
    this.loadChoferes();
    this.loadUbicaciones();
    this.loadIdiomas();
    this.loadEstadosReserva();
    this.loadEmpresas();

  }

  loadReservas(){

    this.reservaService.getReservas()
    .subscribe({
      next:(response:any)=>{
        this.reservas = response;
      },
      error:(err)=>{
        console.log(err);
      }
    });

  }

  loadTours(){
    this.tourService.getTours()
    .subscribe({
      next:(response:any)=>{
        this.tours = response;
      }
    });
  }

  loadGuias(){
    this.guiaService.getGuias()
    .subscribe({
      next:(response:any)=>{
        this.guias = response;
      }
    });
  }

  loadChoferes(){
    this.choferService.getChoferes()
    .subscribe({
      next:(response:any)=>{
        this.choferes = response;
      }
    });
  }

  loadUbicaciones(){
    this.ubicacionService.getUbicaciones()
    .subscribe({
      next:(response:any)=>{
        this.ubicaciones = response;
      }
    });
  }

  loadIdiomas(){
    this.idiomaService.getIdiomas()
    .subscribe({
      next:(response:any)=>{
        this.idiomas = response;
      }
    });
  }

  loadEstadosReserva(){
    this.estadoReservaService.getEstadosReserva()
    .subscribe({
      next:(response:any)=>{
        this.estadosReserva = response;
      }
    });
  }

  loadEmpresas(){
    this.empresaService.getEmpresasCliente()
    .subscribe({
      next:(response:any)=>{
        this.empresas = response;
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

  guardarReserva(){

    const payload = {

      ...this.reserva,

      participantes:this.participantes

    };

    this.reservaService.createReservaCompleta(payload)
    .subscribe({

      next:()=>{

        this.mensaje = 'Reserva creada correctamente';

        this.cancelar();

        this.loadReservas();

        setTimeout(()=>{
          this.mensaje='';
        },3000);

      },

      error:(err)=>{
        console.log(err);
      }

    });

  }

  cancelar(){

    this.reserva = {

      idEmpresaCliente:null,

      nombreCliente:'',
      identificadorCliente:'',
      fechaNacCliente:'',
      telefonoCliente:'',
      nacionalidadCliente:'',

      idEstadoReserva:null,

      idTour:null,
      idGuia:null,
      idChofer:null,
      idUbicacion:null,
      idIdioma:null,

      fechaTour:'',
      precio:''

    };

    this.participantes = [];

  }

}