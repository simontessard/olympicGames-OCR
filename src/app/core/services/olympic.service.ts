import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  filter,
  first,
  map,
  mergeMap,
  tap,
} from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }
  // getOlympicsByCountryName(countryName: string | null) {
  //   return this.getOlympics().pipe(
  //     filter((data: Olympic[]) => !!data),
  //     mergeMap((data: Olympic[]) => data), // Wait for data to be defined
  //     distinctUntilChanged(),
  //     first((data: Olympic) => data.country === countryName),
  //     map((data: Olympic) => {
  //       return {
  //         name: data.country,
  //         medalsCount: data.participations.reduce(
  //           (total, participation) => total + participation.medalsCount,
  //           0
  //         ),
  //         athleteCount: data.participations.reduce(
  //           (total, participation) => total + participation.athleteCount,
  //           0
  //         ),
  //         value: data.participations,
  //         data: [
  //           {
  //             name: data.country,
  //             series:
  //               data.participations.map((participation) => ({
  //                 name: participation.year,
  //                 value: participation.medalsCount,
  //               })) || [],
  //           },
  //         ],
  //       };
  //     })
  //   );
  // }
}
