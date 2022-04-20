'use strict'
const test = require('tap').test
const path = require('path')
const FormData = require('form-data')
const http = require('http')
const fs = require('fs')
const filePath = path.join(__dirname, '../README.md')
const pump = require('pump')

test('upload file use schema', function (t) {
  const fastify = require('fastify')()
  t.teardown(fastify.close.bind(fastify))

  fastify.register(require('..'))

  fastify.post('/uploadSchema', {
    schema: {
      summary: 'upload file',
      body: {
        type: 'object',
        properties: {
          file: { type: 'object' }
        },
        required: ['file']
      }
    },
    handler: (request, reply) => {
      const file = request.body.file
      reply.send({ file })
    }
  })

  fastify.listen(0, err => {
    if (err) throw err
    console.log(`server listening on ${fastify.server.address().port}`)

    const form = new FormData()
    const opts = {
      protocol: 'http:',
      hostname: 'localhost',
      port: fastify.server.address().port,
      path: '/uploadSchema',
      headers: form.getHeaders(),
      method: 'POST'
    }

    const rs = fs.createReadStream(filePath)
    form.append('file', rs)

    const req = http.request(opts, (res) => {
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

test('upload file use schema error', function (t) {
  const fastify = require('fastify')()
  t.teardown(fastify.close.bind(fastify))

  fastify.register(require('..'))

  fastify.post('/uploadSchema', {
    schema: {
      summary: 'upload file',
      body: {
        type: 'object',
        properties: {
          file: { type: 'object' }
        },
        required: ['file']
      }
    },
    handler: (request, reply) => {
      const file = request.body.file
      reply.send({ file })
    }
  })

  fastify.listen(0, err => {
    if (err) throw err
    console.log(`server listening on ${fastify.server.address().port}`)

    const form = new FormData()
    const opts = {
      protocol: 'http:',
      hostname: 'localhost',
      port: fastify.server.address().port,
      path: '/uploadSchema',
      headers: form.getHeaders(),
      method: 'POST'
    }

    const rs = fs.createReadStream(filePath)
    form.append('files', rs)

    const req = http.request(opts, (res) => {
      t.equal(res.statusCode, 400)
      res.resume()
      res.on('end', () => {
        t.pass('res ended successfully')
        t.end()
      })
    })

    pump(form, req)
  })
})
