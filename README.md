# fastify-file-upload

Fastify plugin to upload file.

[![Build Status](https://travis-ci.org/huangang/fastify-file-upload.svg?branch=master)](https://travis-ci.org/huangang/fastify-file-upload)
[![NPM version](https://img.shields.io/npm/v/fastify-file-upload.svg?style=flat)](https://www.npmjs.com/package/fastify-file-upload)
## Install
```
npm i fastify-file-upload --save
```
## Usage

```js
'use strict'

const fastify = require('fastify')()
const fileUpload = require('fastify-file-upload')

fastify.register(fileUpload)

fastify.post('/upload', function (req, reply) {
  // some code to handle file
  const files = req.raw.files
  console.log(files)
  let fileArr = []
  for(let key in files){
    fileArr.push({
      name: files[key].name,
      mimetype: files[key].mimetype
    })
  }
  reply.send(fileArr)
})

fastify.listen(3000, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
```

## Using Busboy Options
```js
fastify.register(fileUpload, {
  limits: { fileSize: 50 * 1024 * 1024 },
});
```
### [Available Options](https://github.com/richardgirges/express-fileupload#available-options)
