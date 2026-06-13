import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

import { VehiculoService } from '../../../services/vehiculo.service';
import { ChoferService } from '../../../services/chofer.service';

@Component({
  selector: 'app-vehiculos-admin',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './vehiculos-admin.html',
  styleUrl: './vehiculos-admin.css'
})
export class VehiculosAdmin implements OnInit {

  public vehiculos:any[] = [];
  public choferes:any[] = [];

  public mensaje:string = '';
  public editando:boolean = false;

  public idVehiculoEliminar:number = 0;

  public vehiculo:any = {

    idVehiculo:null,
    idChofer:null,
    matricula:'',
    capacidad:null,
    modelo:''

  };

  constructor(
    private vehiculoService:VehiculoService,
    private choferService:ChoferService,
    private cdr:ChangeDetectorRef
  ){}

  ngOnInit(): void {

    this.loadVehiculos();
    this.loadChoferes();

  }

  loadVehiculos(){

    this.vehiculoService.getVehiculos()
    .subscribe({

      next:(response:any)=>{

        this.vehiculos = response;
        this.cdr.detectChanges();

      },

      error:(err)=>{

        console.log(err);

      }

    });

  }

  loadChoferes(){

    this.choferService.getChoferes()
    .subscribe({

      next:(response:any)=>{

        this.choferes = response;
        this.cdr.detectChanges();

      },

      error:(err)=>{

        console.log(err);

      }

    });

  }

  guardarVehiculo(){

    if(this.editando){

      this.vehiculoService.updateVehiculo(this.vehiculo)
      .subscribe({

        next:()=>{

          this.mensaje =
          'Vehículo actualizado correctamente';

          this.cancelar();
          this.loadVehiculos();

          setTimeout(()=>{
            this.mensaje='';
          },3000);

        },

        error:(err)=>{

          console.log(err);

        }

      });

    }else{

      this.vehiculoService.createVehiculo(this.vehiculo)
      .subscribe({

        next:()=>{

          this.mensaje =
          'Vehículo creado correctamente';

          this.cancelar();
          this.loadVehiculos();

          setTimeout(()=>{
            this.mensaje='';
          },3000);

        },

        error:(err)=>{

          console.log(err);

        }

      });

    }

  }

  editarVehiculo(item:any){

    this.editando = true;

    this.vehiculo = {

      idVehiculo:item.idvehiculo,
      idChofer:item.idchofer,
      matricula:item.matricula,
      capacidad:item.capacidad,
      modelo:item.modelo

    };

  }

  seleccionarVehiculoEliminar(id:number){

    this.idVehiculoEliminar = id;

  }

  confirmarEliminarVehiculo(){

    this.vehiculoService
    .deleteVehiculo(this.idVehiculoEliminar)
    .subscribe({

      next:()=>{

        this.mensaje =
        'Vehículo eliminado correctamente';

        this.loadVehiculos();

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

    this.editando = false;

    this.vehiculo = {

      idVehiculo:null,
      idChofer:null,
      matricula:'',
      capacidad:null,
      modelo:''

    };

  }

}