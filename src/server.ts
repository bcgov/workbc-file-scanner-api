var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var csrf = require('csurf')
var bodyParser = require('body-parser')
var cors = require('cors')
const fileUpload = require('express-fileupload');

var origin = process.env.ORIGIN_URL || process.env.OPENSHIFT_NODEJS_ORIGIN_URL || "https://localhost:8000"

const corsOptions = {
    origin: origin,
    credentials: true,
    optionsSuccessStatus: 200
};

var fileScanRouter = require("./routes/FileScan.route");
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(helmet());
app.use(fileUpload());

app.use("/FileScan", fileScanRouter);

var port = process.env.PORT || '8000';
app.listen( port, () => {
  console.log( `server started at http://localhost:${ port }` );
} );

module.exports = app;
