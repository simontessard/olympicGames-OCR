import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { CountryStatsData } from 'src/app/core/models/Country';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
})
export class CountryDetailComponent {
  // Variable to hold the name of the country
  countryName: string | null = null;
  // Observable to hold the country statistics data
  public countryObservable!: Observable<CountryStatsData>;

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the 'id' parameter from the route's snapshot
    this.countryName = this.route.snapshot.paramMap.get('id');
    // Fetch the Olympic data for the country
    this.countryObservable = this.olympicService.getOlympicDataByCountryName(
      this.countryName
    );
  }
  goHome() {
    this.router.navigate(['/']); // Redirect to home page
  }
}
