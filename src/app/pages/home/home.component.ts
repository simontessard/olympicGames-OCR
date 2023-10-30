import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicChartData, CountryName } from 'src/app/core/models/Olympic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public countries!: OlympicChartData[]; // An array to store transformed Olympic data
  public nbJO!: number; // A variable to store the number of Olympic participations
  private olympicsDataSubscription!: Subscription;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    // When the component initializes, fetch Olympic data and transform it
    this.olympicsDataSubscription = this.olympicService
      .getOlympicsData()
      .subscribe((data) => {
        this.countries = data.chartData;
        this.nbJO = data.nbJo;
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.olympicsDataSubscription) {
      this.olympicsDataSubscription.unsubscribe();
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
