var AWS = require("aws-sdk");
var fs = require("fs");
var uuid = require("uuid");
var wkhtmltopdf = require("wkhtmltopdf");

var s3 = new AWS.S3();

process.env["PATH"] = process.env["PATH"] + ":" + process.env["LAMBDA_TASK_ROOT"];

exports.handler = function(event, context) {
  console.log(event);
  if (event.url) {
    var filename = uuid() + ".pdf";
    var output = "/tmp/" + filename;
    var writeStream = fs.createWriteStream(output);

    wkhtmltopdf(event.url, event.options, function(code, signal) {
      console.log("code: " + code);
      console.log("signal: " + signal);
      var params = {
        Bucket : event.bucket,
        Key : filename,
        Body : fs.createReadStream(output),
        ContentType : "application/pdf"
      }

      s3.putObject(params, function(error, data) {
          if (error != null) {
            context.fail("error: " + error);
          } else {
            var urlParams = { Bucket: event.bucket, Key: filename, Expires: 300 };
            var url = s3.getSignedUrl('getObject', urlParams);

            // return a signed url with 5 mins expiration time 
            context.succeed( {url} );
          }
        });
      }).pipe(writeStream);
  } else {
    context.fail("unable to render url");
  }
};
