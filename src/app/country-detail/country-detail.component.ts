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
    this.countryObservable = this.olympicService.getOlympicDataByCountryName(
      this.countryName
    );
  }
  goHome() {
    this.router.navigate(['/']); // Redirect to home page
  }
}
