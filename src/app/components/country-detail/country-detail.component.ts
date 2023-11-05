import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { CountryStatsData } from 'src/app/core/models/Country';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
})
export class CountryDetailComponent {
  countryName: string | null = null; // Initialize countryName as null
  public countryObservable!: Observable<CountryStatsData>; // Initialize countryObservable as undefined

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
