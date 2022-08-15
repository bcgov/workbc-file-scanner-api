import * as express from "express"
import { UploadedFile } from "express-fileupload"
import { Readable } from "stream"
import fileScanService from "../services/FileScan.service"

// Scan //
const scan = async (req: express.Request, res: express.Response) => {
    console.log(`POST request received to ${req.get("host")}${req.originalUrl}`)
    const f = req.files?.fileToScan as UploadedFile
    if (f == null) return res.status(400).send("file with key name fileToScan is required")
    try {
        const stream = Readable.from(f.data.toString())
        const result: boolean | undefined = await fileScanService(stream)
        if (result === true) {
            console.log("VIRUS DETECTED!")
            console.log(`File name: ${f.name}`)
        }
        return res.status(200).json({ infected: result })
    } catch (e) {
        console.log(e)
        return res.status(500).send("Internal Server Error")
    }
}

export default scan
