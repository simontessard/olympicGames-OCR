import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { filter, mergeMap, map, first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
})
export class CountryDetailComponent {
  countryName: string | null = null;
  public countryObservable: Observable<any> | undefined;
  public countryData: Olympic[] = [];

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.countryName = this.route.snapshot.paramMap.get('id');
    // Get only data of the country by this name
    this.countryObservable = this.olympicService.getOlympics().pipe(
      filter((data: Olympic[]) => !!data),
      mergeMap((data: Olympic[]) => data), // Wait for data to be defined
      first((data: Olympic) => data.country === this.countryName),
      map((data: Olympic) => {
        return {
          name: data.country,
          medalsCount: data.participations.reduce(
            (total, participation) => total + participation.medalsCount,
            0
          ),
          athleteCount: data.participations.reduce(
            (total, participation) => total + participation.athleteCount,
            0
          ),
          value: data.participations,
          data: [
            {
              name: data.country,
              series:
                data.participations.map((participation) => ({
                  name: participation.year,
                  value: participation.medalsCount,
                })) || [],
            },
          ],
        };
      })
    );
  }
  goHome() {
    this.router.navigate(['/']); // Redirige vers la page d'accueil
  }
  // getOlympicsByCountryName$() {
  //   return this.olympicService.getOlympicsByCountryName(this.countryName);
  // }
}
