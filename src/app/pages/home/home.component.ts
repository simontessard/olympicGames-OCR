import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> | undefined;
  public countries2: any[] = [];
  

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics().pipe(
      filter((data: Olympic[]) => !!data), // Wait for data to be defined
      map((data: Olympic[]) => {
        return data.map((item: Olympic) => ({
          name: item.country,
          // Get sum of all medals won across all participations
          value: item.participations.reduce((total, participation) => total + participation.medalsCount, 0),
        }));
      })
    );
  }

  ngAfterViewInit(): void {
    // Now data has been loaded and olympics$ is defined
    if (this.olympics$) {
      this.olympics$.subscribe(transformedData => {
        this.countries2 = transformedData;
      });
    } else {
      console.error('this.olympics$ is undefined');
    }
  }
  onPieSliceSelect(event: MouseEvent){   
    const data = event as any; 
    console.log(data.name); 
  } 
}