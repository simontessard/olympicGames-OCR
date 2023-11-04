import { Participation } from './Participation';

export interface Olympic {
  id: number;
  country: string;
  participations: Participation[];
}

export interface OlympicChartData {
  name: string;
  value: number;
}

// Data format for line chart in country detail page
export interface OlympicCountryChartData {
  name: string;
  series: Array<object>;
}

export interface OlympicDataForCountry {
  name: string;
  medalsCount: number;
  athleteCount: number;
  value: Participation[];
  data: Array<OlympicCountryChartData>;
}

export interface CountryName {
  name: string;
}
