import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { IdiomaService } from '../../../services/idioma.service';

@Component({
  selector: 'app-idiomas-admin',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './idiomas-admin.html',
  styleUrl: './idiomas-admin.css',
})
export class IdiomasAdmin implements OnInit {

  public idiomas:any[] = [];
  public mensaje:string='';
  public idIdiomaEliminar:number = 0;

  public idioma:any = {
    nombre:''
  };

  public editando:boolean = false;

  constructor(
    private idiomaService:IdiomaService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {

    this.loadIdiomas();

  }

  loadIdiomas(){
    this.idiomaService.getIdiomas().subscribe({

      next:(response:any)=>{
        console.log('IDIOMAS RECARGADOS', response);
        this.idiomas = response;
        this.cdr.detectChanges();
      },

      error:(err)=>{

        console.log(err);

      }

    });

  }

  guardarIdioma(){
    if(this.editando){

      this.idiomaService.updateIdioma(this.idioma)
      .subscribe({

        next:()=>{
          this.mensaje='Idioma actualizado correctamente';

          this.cancelar();
          this.loadIdiomas();

          setTimeout(()=>{
            this.mensaje='';
          },3000);

        },
        error:(err)=>{
          console.log('ERROR UPDATE',err);
        }

      });

    }else{

      this.idiomaService.createIdioma(this.idioma)
      .subscribe({

        next:()=>{
          this.mensaje = 'Idioma creado correctamente';

          this.cancelar();
          this.loadIdiomas();

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

  editarIdioma(idioma:any){

    this.editando = true;

    this.idioma = {

      idIdioma: idioma.ididioma,
      nombre: idioma.nombre,
    };

  }

  seleccionarIdiomaEliminar(id:number){
    this.idIdiomaEliminar = id;
  }

  confirmarEliminarIdioma(){
    this.idiomaService.deleteIdioma(this.idIdiomaEliminar)
    .subscribe({
      next:()=>{
        this.mensaje = 'Idioma eliminado correctamente';
        this.loadIdiomas();
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

    this.idioma = {
      nombre:''
    };

  }
  

}