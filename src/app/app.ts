import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { ChoferService } from './services/chofer.service';
import { TourService } from './services/tour.service';
import { VehiculoService } from './services/vehiculo.service';
import { GuiaService } from './services/guia.service';
import { UbicacionService } from './services/ubicacion.service';
import { AuthService } from './services/auth.service';
import { enviroment } from './enviroments';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  public choferes: any;
  public tours: any;
  public vehiculos: any;
  public guias: any;
  public ubicaciones: any;
  public currentUser: any;

  public url: string = enviroment.apiUrl;

  constructor(
    private choferService: ChoferService,
    private tourService: TourService,
    private vehiculoService: VehiculoService,
    private guiaService: GuiaService,
    private ubicacionService: UbicacionService,
    public authService: AuthService,
    public router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.loadChoferes();
    this.loadTours();
    this.loadVehiculos();
    this.loadGuias();
    this.loadUbicaciones();
    this.currentUser = this.authService.currentUser;
  }

  loadChoferes() {
    this.choferService.getChoferes().subscribe({
      next: (response: any) => {
        this.choferes = response;
        this.cdr.detectChanges(); 
        console.log('Choferes --->', this.choferes);
      },
      error: (err: Error) => {
        console.log('Error --->', err);
      }
    });
  }

  loadTours() {
    this.tourService.getTours().subscribe({
      next: (response: any) => {
        this.tours = response;
        this.cdr.detectChanges(); 
        console.log('Tours --->', this.tours);
      },
      error: (err: Error) => {
        console.log('Error --->', err);
      }
    });
  }

  loadVehiculos() {
    this.vehiculoService.getVehiculos().subscribe({
      next: (response: any) => {
        this.vehiculos = response;
        this.cdr.detectChanges(); 
        console.log('Vehiculos --->', this.vehiculos);
      },
      error: (err: Error) => {
        console.log('Error --->', err);
      }
    });
  }

  loadGuias() {
    this.guiaService.getGuias().subscribe({
      next: (response: any) => {
        this.guias = response;
        this.cdr.detectChanges();
        console.log('Guias --->', this.guias);
      },
      error: (err: Error) => {
        console.log('Error --->', err);
      }
    });
  }

  loadUbicaciones() {
    this.ubicacionService.getUbicaciones().subscribe({
      next: (response: any) => {
        this.ubicaciones = response;
        this.cdr.detectChanges(); 
        console.log('Ubicaciones --->', this.ubicaciones);
      },
      error: (err: Error) => {
        console.log('Error --->', err);
      }
    });
  }
}
