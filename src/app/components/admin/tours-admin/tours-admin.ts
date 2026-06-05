import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TourService } from '../../../services/tour.service';
import { RouterLink } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-tours-admin',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './tours-admin.html',
  styleUrl: './tours-admin.css',
})
export class ToursAdmin implements OnInit {

  public tours:any[] = [];
  public mensaje:string='';
  public idTourEliminar:number = 0;

  public tour:any = {
    nombre:'',
    descripcion:'',
    horario:'',
    duracion:null,
    cuposMaximos:null,
    precioBase:''
  };

  public editando:boolean = false;

  constructor(
    private tourService:TourService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {

    this.loadTours();

  }

  loadTours(){
    this.tourService.getTours().subscribe({

      next:(response:any)=>{
        console.log('TOURS RECARGADOS', response);
        this.tours = response;
        this.cdr.detectChanges();
      },

      error:(err)=>{

        console.log(err);

      }

    });

  }

  guardarTour(){
    if(this.editando){

      this.tourService.updateTour(this.tour)
      .subscribe({

        next:()=>{
          this.mensaje='Tour actualizado correctamente';

          this.cancelar();
          this.loadTours();

          setTimeout(()=>{
            this.mensaje='';
          },3000);

        },
        error:(err)=>{
          console.log('ERROR UPDATE',err);
        }

      });

    }else{

      this.tourService.createTour(this.tour)
      .subscribe({

        next:()=>{
          this.mensaje = 'Tour creado correctamente';

          this.cancelar();
          this.loadTours();

          setTimeout(()=>{
            this.mensaje = '';
          },3000);

        },
        error:(err)=>{
          console.log('ERROR CREATE', err);
        }

      });

    }

  }

  editarTour(tour:any){

    this.editando = true;

    this.tour = {

      idTour: tour.idtour,
      nombre: tour.nombre,
      descripcion: tour.descripcion,
      horario: tour.horario,
      duracion: tour.duracion,
      cuposMaximos: tour.cuposmaximos,
      precioBase: tour.preciobase

    };

  }

  seleccionarTourEliminar(id:number){
    this.idTourEliminar = id;
  }

  confirmarEliminarTour(){
    this.tourService.deleteTour(this.idTourEliminar)
    .subscribe({
      next:()=>{
        this.mensaje = 'Tour eliminado correctamente';
        this.loadTours();
        setTimeout(()=>{
          this.mensaje = '';
        },3000);

    },
    error:(err)=>{
      console.log('ERROR DELETE', err);
    }
    });
  }

  cancelar(){

    this.editando = false;

    this.tour = {
      nombre:'',
      descripcion:'',
      horario:'',
      duracion:null,
      cuposMaximos:null,
      precioBase:''
    };

  }
  

}