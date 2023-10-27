import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicChartData, CountryName } from 'src/app/core/models/Olympic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<OlympicChartData[]> | undefined; // An Observable for Olympic data
  public countries: OlympicChartData[] = []; // An array to store transformed Olympic data
  public nbJO: number = 0; // A variable to store the number of Olympic participations

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    // When the component initializes, fetch Olympic data and transform it
    this.olympics$ = this.olympicService.getOlympicsCountriesChart();
  }

  ngAfterViewInit(): void {
    // After the view has initialized and data is available
    if (this.olympics$) {
      this.olympics$.subscribe((transformedData) => {
        this.countries = transformedData; // Store the transformed data in the 'countries' array
        this.nbJO = transformedData[0].nbJo; // Store the number of Olympic participations in 'nbJO'
      });
    } else {
      console.error('this.olympics$ is undefined'); // Log an error if 'olympics$' is undefined
    }
  }

  /**
   * Navigates to a detail page when a pie slice is selected based on country name.
   *
   * @param event - The event object containing information about the selected country.
   * @returns void
   */
  onPieSliceSelect(event: CountryName) {
    const data = event as CountryName;
    this.router.navigate(['/detail/' + data.name]); // Navigate to a detail page when a pie slice is selected
  }
}
