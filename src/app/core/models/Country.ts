import { Participation } from './Participation';
import { LineChartData } from './LineChartData';

export interface CountryStatsData {
  name: string;
  medalsCount: number;
  athleteCount: number;
  value: Participation[];
  data: Array<LineChartData>;
}

export interface CountryName {
  name: string;
}
