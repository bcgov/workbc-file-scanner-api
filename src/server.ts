import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import fileUpload from "express-fileupload"
import helmet from "helmet"
import fileScanRouter from "./routes/FileScan.route"

const origin = process.env.ORIGIN_URL || process.env.OPENSHIFT_NODEJS_ORIGIN_URL || "https://localhost:8000"

const corsOptions = {
    origin,
    credentials: true,
    optionsSuccessStatus: 200
}

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(helmet())
app.use(fileUpload())

app.use("/FileScan", fileScanRouter)

const port = process.env.PORT || "8000"
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})
