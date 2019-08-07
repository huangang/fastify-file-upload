'use strict'

const fp = require('fastify-plugin')
const kMultipart = Symbol('multipart')
const fileUpload = require('express-fileupload')

function setMultipart (req, done) {
  req[kMultipart] = true
  done()
}

function fastifyUpload (fastify, options, done) {
  fastify.addContentTypeParser('multipart', setMultipart)

  options = options || {}
  fastify.use(fileUpload(options))

  fastify.addHook('preValidation', (request, reply, done) => {
    if (request.raw && request.raw.files) {
      !request.body && (request.body = {})
      for (const key in request.raw.files) {
        request.body[key] = request.raw.files[key]
      }
    }
    done()
  })
  done()
}

module.exports = fp(fastifyUpload, {
  fastify: '>= 2.0.0',
  name: 'fastify-file-upload'
})
