import * as express from "express"
import fileScanController from "../controllers/FileScan.controller"

const router = express.Router()

router.post("/", fileScanController)

export default router
