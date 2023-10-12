import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
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
  public nbEntries: number = 0;
  public totalMedals: number = 0;
  public totalAthletes: number = 0;

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
        return {
          name: countryData?.country || '', // Utilisez le nom du pays
          value: countryData?.participations,
          medalsCount: countryData?.participations.reduce((total, participation) => total + participation.medalsCount, 0),
          athleteCount: countryData?.participations.reduce((total, participation) => total + participation.athleteCount, 0),
        };
      })
    );
  }
  ngAfterViewInit(): void {
    // Now data has been loaded and olympics$ is defined
    if (this.countryObservable) {
      this.countryObservable.subscribe(transformedData => {
        this.countryData = transformedData;
        console.log(transformedData)
        this.nbEntries = transformedData.value.length;
        this.totalMedals = transformedData.medalsCount;
        this.totalAthletes = transformedData.athleteCount;
        console.log(this.countryData)
      });
    } else {
      console.error('this.olympics$ is undefined');
    }
  }
}
