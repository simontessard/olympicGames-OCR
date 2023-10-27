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
  countryName: string | null = null; // Initialize countryName as null
  public countryObservable: Observable<any> | undefined; // Initialize countryObservable as undefined
  public countryData: Olympic[] = []; // Initialize countryData as an empty array

  constructor(
    private olympicService: OlympicService, // Inject OlympicService
    private route: ActivatedRoute, // Inject ActivatedRoute
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.countryName = this.route.snapshot.paramMap.get('id'); // Get the 'id' parameter from the route's snapshot
    this.countryObservable = this.olympicService.getOlympics().pipe(
      // Using RxJS operators to process data
      filter((data: Olympic[]) => !!data), // Filter out any falsy data
      mergeMap((data: Olympic[]) => data), // Flatten the array of data
      first((data: Olympic) => data.country === this.countryName), // Take the first item with the matching country name
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
                })) || [], // Map participation data to a new format
            },
          ],
        };
      })
    );
  }
  goHome() {
    this.router.navigate(['/']); // Redirect to home page
  }
  // getOlympicsByCountryName$() {
  //   return this.olympicService.getOlympicsByCountryName(this.countryName);
  // }
}
