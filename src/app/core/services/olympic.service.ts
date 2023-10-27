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
import {
  Olympic,
  OlympicChartData,
  OlympicDataForCountry,
} from '../models/Olympic';
import { Observable } from 'rxjs';

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

  /**
   * Returns an observable that emits Olympic data.
   *
   * @returns An observable of Olympic data.
   */
  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  /**
   * Returns an observable that emits transformed Olympic data for a countries chart.
   *
   * @returns An observable of Olympic data transformed for a countries chart.
   */
  getOlympicsCountriesChart(): Observable<OlympicChartData[]> {
    return this.olympics$.asObservable().pipe(
      filter((data: Olympic[]) => !!data), // Ensure that data is defined
      map((data: Olympic[]) => {
        return data.map((item: Olympic) => ({
          name: item.country, // Extract the country name
          value: item.participations.reduce(
            (total, participation) => total + participation.medalsCount, // Calculate the total medals won
            0
          ),
          nbJo: item.participations.length, // Get the number of Olympic participations
        }));
      })
    );
  }
  /**
   * Retrieves Olympic data for a specific country by its name.
   *
   * @param countryName - The name of the country for which Olympic data is requested.
   * @returns An observable that emits Olympic data for the specified country.
   */
  getOlympicDataByCountryName(
    countryName: string | null
  ): Observable<OlympicDataForCountry> {
    return this.getOlympics().pipe(
      filter((data: Olympic[]) => !!data),
      mergeMap((data: Olympic[]) => data), // Wait for data to be defined
      distinctUntilChanged(),
      first((data: Olympic) => data.country === countryName),
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
}
