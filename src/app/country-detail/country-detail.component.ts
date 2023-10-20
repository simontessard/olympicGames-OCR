import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent {
  countryName: string = '';
  public countryObservable: Observable<any> | undefined;
  public countryData: Olympic[] = [];

  constructor(private olympicService: OlympicService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.countryName = params['myGetParam'];
     })
    // Get only data of the country by this name
    this.countryObservable = this.olympicService.getOlympics().pipe(
      filter((data: Olympic[]) => !!data), // Wait for data to be defined
      map((data: Olympic[]) => {
        const countryData = data.find(item => item.country === this.countryName); // Find the country by his name
        const valueData: any[] = countryData?.participations.map(participation => ({
          name: participation.year,
          series: [{
            name: participation.year,
            value: participation.medalsCount
          }]
        })) || [];
        return {
          name: countryData?.country,
          medalsCount: countryData?.participations.reduce((total, participation) => total + participation.medalsCount, 0),
          athleteCount: countryData?.participations.reduce((total, participation) => total + participation.athleteCount, 0),
          value: countryData?.participations,
          data: valueData,
        }; 
      })
    );
  }
  goHome() {
    this.router.navigate(['/']); // Redirige vers la page d'accueil
  }
}
