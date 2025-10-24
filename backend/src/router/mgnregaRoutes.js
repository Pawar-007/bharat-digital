import { Router } from "express";
import { getMGNREGAData,getDistrictData} from "../controller/mgnregaController.js";
const router = Router();

router.get("/", getMGNREGAData);
router.get("/district/:stateName/:districtName",getDistrictData);
export default router;

