import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';

export const getEmissionClimatiq = async (
  label: string,
  httpService: HttpService,
  region: string,
): Promise<any> => {
  const { data } = await firstValueFrom(
    httpService
      .get(`${process.env.CLIMATIQ_URL}?query=${label}&region=${region}`)
      .pipe(
        catchError((error: AxiosError) => {
          console.log('Error', error);
          throw 'Error calling Climatiq';
        }),
      ),
  );

  if (data.results.length < 1)
    return {
      error: `No matches for ${label}`,
    };
  //console.log('factor', data.results);
  const result = {
    label: label,
    name: data.results[0].name,
    category: data.results[0].category,
    factor: data.results[0].factor,
    unit: data.results[0].unit,
    description: data.results[0].description,
  };
  return result;
};
