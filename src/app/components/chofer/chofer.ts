import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ChoferService } from '../../services/chofer.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-chofer',
  standalone:true,
  imports: [RouterLink],
  templateUrl: './chofer.html',
  styleUrl: './chofer.css',
})
export class Chofer implements OnInit {

  public idChofer: number = 0;

  public chofer:any={}

  constructor(
    private route: ActivatedRoute,
    private choferService: ChoferService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

  this.route.params.subscribe(params => {

    this.idChofer = Number(params['id']);

    this.loadChofer();

  });

}

  loadChofer(){
    this.chofer = {};
    this.choferService.getChoferById(this.idChofer)
      .subscribe({

        next:(response:any)=>{

          this.chofer = response;
          this.cdr.detectChanges();

        },

        error:(err:Error)=>{

          console.log(err);

        }

      });

  }

}

