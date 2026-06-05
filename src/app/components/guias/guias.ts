import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GuiaService } from '../../services/guia.service';
import { ChangeDetectorRef } from '@angular/core';
import { IdiomaGuiaService } from '../../services/idioma-guia.service';

@Component({
  selector: 'app-guias',
  standalone:true,
  imports: [RouterLink],
  templateUrl: './guias.html',
  styleUrl: './guias.css',
})
export class Guias implements OnInit {

  public idGuia:number = 0;
  public guia:any = {};
  public idiomas:any[] = [];

  constructor(
    private route: ActivatedRoute,
    private guiaService: GuiaService,
    private idiomaGuiaService: IdiomaGuiaService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.idGuia = Number(params['id']);

      this.loadGuia();

    });

  }

  loadGuia(){

    this.guiaService.getGuiaById(this.idGuia)
      .subscribe({

        next:(response:any)=>{

          this.guia = response;
          this.loadIdiomas();

          this.cdr.detectChanges();

        }

      });

  }

  loadIdiomas(){

  this.idiomaGuiaService
    .getIdiomasByGuia(this.idGuia)
    .subscribe({

      next:(response:any)=>{

        this.idiomas = response;
        this.cdr.detectChanges();

      }

    });

}

}