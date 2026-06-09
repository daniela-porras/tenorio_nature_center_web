import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
import { UsuarioService } from '../../../services/usuario.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reservas-admin',
  standalone: true,
  imports: [FormsModule, DatePipe, RouterLink],
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
  public modoCliente:string = 'existente';
  public clientes:any[] = [];
  public clienteSeleccionado:any = null;
   public usuarios:any[]=[];

  public mensaje:string = '';
  public idReservaEliminar:number=0;
  public editando:boolean = false;
  public idReservaEditar:number = 0;
  public idClienteEditar:number = 0;

  public reserva:any = {

  idCliente:null,
  idUsuario:null,

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
    private cdr:ChangeDetectorRef,
    private reservaService:ReservaService,
    private empresaService:EmpresaClienteService,

    private tourService:TourService,
    private guiaService:GuiaService,
    private choferService:ChoferService,
    private ubicacionService:UbicacionService,
    private idiomaService:IdiomaService,
    private estadoReservaService:EstadoReservaService,
    private clienteService:ClienteService,
    private usuarioService: UsuarioService
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
    this.loadClientes();
    this.loadUsuarios();
  }

  loadReservas(){

    this.reservaService.getReservasCompletas()
    .subscribe({
      next:(response:any)=>{
        this.reservas = response;
        this.cdr.detectChanges();
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

  loadEstadosReserva(){
    this.estadoReservaService.getEstadosReserva()
    .subscribe({
      next:(response:any)=>{
        console.log("ESTADOS", response);
        this.estadosReserva = response;
        this.cdr.detectChanges();
      }
    });
  }

  loadEmpresas(){
    this.empresaService.getEmpresasCliente()
    .subscribe({
      next:(response:any)=>{
        console.log('EMPRESAS', response);
        this.empresas = response;
        this.cdr.detectChanges();
      }
    });
  }

  loadClientes(){
    this.clienteService.getClientes()
    .subscribe({

      next:(response:any)=>{
        console.log('CLIENTES', response);
        this.clientes = response;
        this.cdr.detectChanges();
      },
      error:(err)=>{
        console.log(err);
      }

    });

  }

  loadUsuarios(){
    this.usuarioService.getUsuarios()
    .subscribe({
      next:(response:any)=>{
        this.usuarios = response;
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

  guardarReserva(){
    if(this.editando){
      this.reservaService
      .updateReservaCompleta(this.reserva)
      .subscribe({

        next:()=>{

          this.mensaje =
          'Reserva actualizada correctamente';

          this.loadReservas();

          this.cancelar();

        },

        error:(err)=>{
          console.log(err);
        }

      });

      return;
    }

    const payload:any = {

      idCliente:
        this.modoCliente === 'existente'
        ? this.reserva.idCliente
        : null,
      idEmpresaCliente:this.reserva.idEmpresaCliente,
      idUsuario:this.reserva.idUsuario,

      nombreCliente:this.reserva.nombreCliente,
      identificadorCliente:this.reserva.identificadorCliente,
      fechaNacCliente:this.reserva.fechaNacCliente,
      telefonoCliente:this.reserva.telefonoCliente,
      nacionalidadCliente:this.reserva.nacionalidadCliente,

      idEstadoReserva:this.reserva.idEstadoReserva,

      idTour:this.reserva.idTour,
      idGuia:this.reserva.idGuia,
      idChofer:this.reserva.idChofer,
      idUbicacion:this.reserva.idUbicacion,
      idIdioma:this.reserva.idIdioma,

      fechaTour:this.reserva.fechaTour,
      precio:String(this.reserva.precio),

      participantes:this.participantes

    };

    this.reservaService.createReservaCompleta(payload)
    .subscribe({
      next:()=>{
        this.mensaje = 'Reserva creada correctamente';
        this.loadReservas();
        this.cancelar();

        setTimeout(()=>{
          this.mensaje = '';
        },3000);

      },

      error:(err)=>{
        console.log(err);
        this.mensaje = 'Error al crear la reserva';

        setTimeout(()=>{
          this.mensaje = '';
        },3000);

      }

    });

  }



  cancelar(){

    this.reserva = {

      idEmpresaCliente:null,
      idUsuario:null,

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
    this.editando=false;

  }

  seleccionarReservaEliminar(id:number){
    this.idReservaEliminar = id;
  }

  confirmarEliminarReserva(){
    this.reservaService
    .deleteReserva(this.idReservaEliminar)
    .subscribe({
      next:()=>{
        this.mensaje ='Reserva eliminada correctamente';
        this.loadReservas();
        setTimeout(()=>{
          this.mensaje='';
        },3000);
        (document.activeElement as HTMLElement)?.blur();

      },
      error:(err)=>{
        console.log(err);
      }
    });

  }

  editarReserva(reserva:any){

  this.editando = true;

  this.reserva = {

    idReserva: reserva.idreserva,

    idEstadoReserva: reserva.idestadoreserva,

    idTour: reserva.idtour,
    idGuia: reserva.idguia,
    idChofer: reserva.idchofer,
    idUbicacion: reserva.idubicacion,
    idIdioma: reserva.ididioma,

    fechaTour: reserva.fechatour ? reserva.fechatour.toString().substring(0,10):'',
    precio: reserva.preciounitario

  };

}

}
