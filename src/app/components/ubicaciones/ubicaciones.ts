import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UbicacionService } from '../../services/ubicacion.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-ubicaciones',
  standalone:true,
  imports: [RouterLink],
  templateUrl: './ubicaciones.html',
  styleUrl: './ubicaciones.css',
})
export class Ubicaciones implements OnInit {

  public idUbicacion:number = 0;

  public ubicacion:any = {};

  constructor(
    private route: ActivatedRoute,
    private ubicacionService: UbicacionService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.idUbicacion = Number(params['id']);

      this.loadUbicacion();

    });

  }

  loadUbicacion(){

    this.ubicacionService.getUbicacionById(this.idUbicacion)
      .subscribe({

        next:(response:any)=>{

          this.ubicacion = response;

          this.cdr.detectChanges();

        }

      });

  }

}