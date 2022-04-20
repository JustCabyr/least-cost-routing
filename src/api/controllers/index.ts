import { Request, Response } from 'express';
import { NotFoundError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';
import { csvToArray } from '../../helpers/csvToArray';
import asyncHandler from '../../helpers/asyncHandler';

export const leastCostRouting = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const { destination } = req.body;

    if (!destination)
      throw new NotFoundError('Please provide a destination number');

    const IBASIS = await csvToArray('IBASIS');
    const ARIA = await csvToArray('ARIA');
    const TATA = await csvToArray('TATA');
    const WAVECREST = await csvToArray('WAVECREST');

    const allData = [ARIA, IBASIS, TATA, WAVECREST];

    function processData(destination: string, data: any[]) {

      let possibleMatches: any[] = [];
      // sort data for close match
      let sortedData = data.filter((item) => {
        if (
          destination.toString().startsWith(item.prefix)) {
          possibleMatches.push(item.prefix);
          return item;
        }
      });
      const match = Math.max(...possibleMatches);

      return sortedData.filter((item) => item.prefix === match.toString());
    }
    // get combined response for allData
    let response = [];
    for (let i = 0; i < allData.length; i++)
      response.push(processData(destination, allData[i]));
    response = response.flat();
    response = response.reduce((acc, curr) => {
      if (!acc.some((existing: any) => existing.trunk == curr.trunk) && curr.blocked === 'N') {
        acc.push(curr);
      }
      return acc;
    }, []);
    response = response.sort((a: any, b: any) => {
      return parseFloat(a.tariff) - parseFloat(b.tariff);
    });

    return new SuccessResponse('LCR service response', response).send(res);
  }
);
