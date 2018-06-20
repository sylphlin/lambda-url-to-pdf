# lambda-url-to-pdf
Convert URL to PDF based on wkhtmltopdf and AWS Lambda

## Install from Dist
* Upload zip file in `dist/` directly to AWS Lambda and start to use

## Install from Scratch
* Clone the repository
* Go to src folder by `cd src`
* Run `npm install` to get the package dependency
* Create the ZIP files for AWS Lambda `zip -r dist.zip index.js wkhtmltopdf node_modules`
* upload dist.zip to AWS Lambda and start to use it

## Usage
### Input
```
{ url: 'https://example.com/',
  options: 
   { enableJavascript: true,
     debugJavascript: true,
     javascriptDelay: 1000,
     ignore: [ 'libpng warning: iCCP: known incorrect sRGB profile' ],
     T: 15,
     L: 12,
     R: 12 },
  bucket: 'bucket-name' }
```

### Output
```
{
  "url": "https://s3.us-west-2.amazonaws.com/<bucket_name>/fd1869ab-2f91-487e-b655-75a634bf10be.pdf?AWSAccessKeyId=ASIAJWU2HLMFUZO6NITA&Expires=1524452676&Signature=13E84BjDQofdN2%2Frb3GfLy6UTIc%3D&x-amz-security-token=FQoDYXdzEDsaDEizbSEqFXaVYQ39WiLjASv381vKuZqyFxNUUz0z33AjJOScwutZ%2F2BGTIUzv2c2zIM%2F9HUSu2hX6OKl2tpJfEds9v8qh4r6cZCOmv8cw5LAVTETQ69%2BIlW5Yvxm2aww1pEbDbBov6UXpjdPNAMJeprLv493CtZbMISpDCORZcVRW8qcLVxIbHjbJuzouExG9bMy1MGLzLIRPtBgOph7rtFU9PUtoJO4AvXFhn2PJQTSgG1yKbxpoFfhzWd80FBWj4n3t2Q6RJdXWEvrar8SpExS0hTAMSaXpVNPxPG7VMJkofrEofaeK8zD%2BTwjZufCQB8tKLP89NYF"
}
```
