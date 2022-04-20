import { Request, Response } from 'express';
import { NotFoundError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';

import asyncHandler from '../../helpers/asyncHandler';

export const leastCostRouting = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const { destination } = req.body;
    const role = req.query.role;

    // Validate user input
    if (!destination)
      throw new NotFoundError('Please provide a destination number');

    return new SuccessResponse('Success!', destination).send(res);
  }
);
