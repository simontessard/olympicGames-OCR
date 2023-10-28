import { Participation } from './Participation';

export interface Olympic {
  id: number;
  country: string;
  participations: Participation[];
}

/*
example of an olympic country:
{
    id: 1,
    country: "Italy",
    participations: []
}
*/

export interface OlympicChartData {
  name: string;
  value: number;
}

export interface OlympicDataForCountry {
  name: string;
  medalsCount: number;
  athleteCount: number;
  value: Participation[];
  data: Array<any>;
}

export interface CountryName {
  name: string;
}
