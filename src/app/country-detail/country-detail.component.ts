import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent {
  countryName: string = '';
  public countryObservable: Observable<any> | undefined;
  public countryData: Olympic[] = [];

  constructor(private olympicService: OlympicService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.countryName = params['myGetParam'];
     })
    // Adapte le code ici pour récuperer uniquement les données du pays selon son nom
    this.countryObservable = this.olympicService.getOlympics().pipe(
      filter((data: Olympic[]) => !!data), // Wait for data to be defined
      map((data: Olympic[]) => {
        const countryData = data.find(item => item.country === this.countryName); // Trouvez le pays par son nom
        const valueData: any[] = countryData?.participations.map(participation => ({
          name: participation.year,
          series: [{
            name: participation.year,
            value: participation.medalsCount
          }]
        })) || [];
        return {
          name: countryData?.country || '', // Utilisez le nom du pays
          medalsCount: countryData?.participations.reduce((total, participation) => total + participation.medalsCount, 0),
          athleteCount: countryData?.participations.reduce((total, participation) => total + participation.athleteCount, 0),
          value: countryData?.participations,
          data: valueData,
        };
      })
    );
  }
}
