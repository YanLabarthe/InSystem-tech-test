import axios from 'axios';
import { subMonths, format } from 'date-fns';

interface TemperatureResponse {
  resultat: number;
}

export const fetchTemperatureData = async (
  stationCode: string,
  startDate: Date,
): Promise<number[]> => {
  const url = 'https://hubeau.eaufrance.fr/api/v1/temperature/chronique';
  const params = {
    code_station: stationCode,
    date_debut_mesure: format(startDate, 'yyyy-MM-dd'),
    fields: 'resultat'
  };

  try {
    const response = await axios.get<{data: TemperatureResponse[]}>(url, { params });
    return response.data.data.map(item => item.resultat);
  } catch (error) {
    return [];
  }
};

const calculateAverage = (temperatures: number[]): number => 
  temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;

export const getAverageTemperatures = async (stationCode: string): Promise<{ [key: string]: number }> => {
  const today = new Date();
  const lastMonth = subMonths(today, 1);
  const last3Months = subMonths(today, 3);
  const last6Months = subMonths(today, 6);

  const temperaturesLastMonth = await fetchTemperatureData(stationCode, lastMonth);
  const temperaturesLast3Months = await fetchTemperatureData(stationCode, last3Months);
  const temperaturesLast6Months = await fetchTemperatureData(stationCode, last6Months);

  return {
    lastMonthAverage: calculateAverage(temperaturesLastMonth),
    last3MonthsAverage: calculateAverage(temperaturesLast3Months),
    last6MonthsAverage: calculateAverage(temperaturesLast6Months)
  };
};
