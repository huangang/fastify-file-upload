'use strict'
const test = require('tap').test
const path = require('path')
const FormData = require('form-data')
const http = require('http')
const fs = require('fs')
const filePath = path.join(__dirname, 'README.md')
const pump = require('pump')


test('upload file', function (t) {
  const fastify = require('fastify')()
  t.tearDown(fastify.close.bind(fastify))

  fastify.register(require('.'))

  fastify.post('/upload', function (req, reply) {
    const files = req.raw.files
    if (!files) {
      return reply.code(400).send('No files were uploaded.');
    }else {
      let testFile = files.testFile;

      t.equal(testFile.name , 'README.md')

      return reply.send('file upload success')
    }
  })

  fastify.listen(0, err => {
    if (err) throw err
    console.log(`server listening on ${fastify.server.address().port}`)


    let form = new FormData()
    let opts = {
      protocol: 'http:',
      hostname: 'localhost',
      port: fastify.server.address().port,
      path: '/upload',
      headers: form.getHeaders(),
      method: 'POST',
    }


    let rs = fs.createReadStream(filePath)
    form.append('testFile', rs)
    form.append('hello', 'world')

    let req = http.request(opts, (res) => {
      t.equal(res.statusCode, 200)
      res.resume()
      res.on('end', () => {
        t.pass('res ended successfully')
        t.end()
      })
    })

    pump(form, req)

  })


})

