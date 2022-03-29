import * as express from "express";
import { UploadedFile } from "express-fileupload";
import * as fileScanService from "../services/FileScan.service";
const { Readable } = require('stream');


// Scan //
export const scan = async (req: express.Request, res: express.Response) => {
    console.log("POST request received to " + req.get("host") + req.originalUrl);
    let f = req.files?.fileToScan as UploadedFile;
    if (f == null || f == undefined)
      return await res.status(400).send("file with key name fileToScan is required");
    try {
        const stream = Readable.from(f.data.toString());
        let result: boolean | undefined = await fileScanService.scan(stream);
        if (result === true) {
          console.log("VIRUS DETECTED!");
          console.log("File name: " + f.name);
        }
        return await res.status(200).json({ infected: result });
  
    } catch(e) {
      console.log(e);
      return res.status(500).send("Internal Server Error");
    }
};