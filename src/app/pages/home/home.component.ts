import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> | undefined; // An Observable for Olympic data
  public countries: Olympic[] = []; // An array to store transformed Olympic data
  public nbJO: number = 0; // A variable to store the number of Olympic participations

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    // When the component initializes, fetch Olympic data and transform it
    this.olympics$ = this.olympicService.getOlympics().pipe(
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

  onPieSliceSelect(event: MouseEvent) {
    const data = event as any;
    this.router.navigate(['/detail/' + data.name]); // Navigate to a detail page when a pie slice is selected
  }
}
