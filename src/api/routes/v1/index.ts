import { Router } from 'express';
import { leastCostRouting } from '../../controllers';

const router = Router();

router.route('/lcr').post(leastCostRouting);


export default router;
