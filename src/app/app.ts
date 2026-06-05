import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet,Router } from '@angular/router';
import { ChoferService } from './services/chofer.service';
import { TourService } from './services/tour.service';
import { VehiculoService } from './services/vehiculo.service';
import { GuiaService } from './services/guia.service';
import { UbicacionService } from './services/ubicacion.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  public choferes:any
  public tours:any
  public vehiculos:any
  public guias:any
  public ubicaciones:any
  protected readonly title = signal('TenorioNatureCenterWeb');
  public currentUser
  constructor(
    private choferService: ChoferService,
    private tourService: TourService,
    private vehiculoService: VehiculoService,
    private guiaService: GuiaService,
    private ubicacionService: UbicacionService,
    private _auth: AuthService,
    public authService: AuthService,
    public router:Router
  ){
    this.loadChoferes()
    this.loadTours()
    this.loadVehiculos()
    this.loadGuias()
    this.loadUbicaciones()
    this.currentUser = _auth.currentUser
  }


  loadChoferes(){
    this.choferService.getChoferes().subscribe({
      next:(response:any)=>{
        this.choferes = response
        console.log('Choferes --->', this.choferes)
      },
      error:(err:Error)=>{
        console.log('Error --->', err)
      }
    })
  }

  loadTours(){
    this.tourService.getTours().subscribe({
      next:(response:any)=>{
        this.tours = response
        console.log('Tours --->', this.tours)
      },
      error:(err:Error)=>{
        console.log('Error --->', err)
      }
    })
  }

  loadVehiculos(){
    this.vehiculoService.getVehiculos().subscribe({
      next:(response:any)=>{
        this.vehiculos = response
        console.log('Vehiculos --->', this.vehiculos)
      },
      error:(err:Error)=>{
        console.log('Error --->', err)
      }
    })
  }

  loadGuias(){
    this.guiaService.getGuias().subscribe({
      next:(response:any)=>{
        this.guias = response;
        console.log('Guias --->', this.guias);
      },
      error:(err:Error)=>{
        console.log('Error --->', err);
      }
    });

  }

  loadUbicaciones(){
    this.ubicacionService.getUbicaciones().subscribe({
      next:(response:any)=>{
        this.ubicaciones = response;
        console.log('Ubicaciones --->', this.ubicaciones);
      },
      error:(err:Error)=>{
        console.log('Error --->', err);
      }

     });
  }
  

}