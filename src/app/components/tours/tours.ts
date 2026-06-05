import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TourService } from '../../services/tour.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tours.html',
  styleUrl: './tours.css',
})

export class Tours implements OnInit {

  public idTour:number = 0;

  public tour:any = {};

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.idTour = Number(params['id']);

      this.loadTour();

    });

  }

  loadTour(){

    this.tourService.getTourById(this.idTour)
      .subscribe({

        next:(response:any)=>{

          this.tour = response;

          this.cdr.detectChanges();

        }

      });

  }

}