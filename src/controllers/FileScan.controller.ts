import * as express from "express";
import * as fileScanService from "../services/FileScan.service";
const { Readable } = require('stream');


// Scan //
export const scan = async (req: any, res: express.Response) => {
    console.log("POST request received to " + req.get("host") + req.originalUrl);
    console.log("file name: " + req.files.file.name);
  
    try {
        const stream = Readable.from(req.files.file.data.toString());
        let result: boolean | undefined = await fileScanService.scan(stream);
        return await res.status(200).json({ infected: result });
  
    } catch(e) {
      console.log(e);
      return res.status(500).send("Internal Server Error");
    }
  };