import * as express from "express";
import * as fileScanController from "../controllers/FileScan.controller";
export const router = express.Router();

router.post("/", fileScanController.scan);

module.exports = router;