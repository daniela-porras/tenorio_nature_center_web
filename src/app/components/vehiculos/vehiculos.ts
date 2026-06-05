import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { VehiculoService } from '../../services/vehiculo.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './vehiculos.html',
  styleUrl: './vehiculos.css',
})

export class Vehiculos implements OnInit {

  public idVehiculo:number = 0;

  public vehiculo:any = {};

  constructor(
    private route: ActivatedRoute,
    private vehiculoService: VehiculoService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.idVehiculo = Number(params['id']);

      this.loadVehiculo();

    });

  }

  loadVehiculo(){

    this.vehiculoService.getVehiculoById(this.idVehiculo)
      .subscribe({

        next:(response:any)=>{

          this.vehiculo = response;

          this.cdr.detectChanges();

        }

      });

  }

}