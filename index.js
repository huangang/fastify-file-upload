'use strict'

const fp = require('fastify-plugin')
const kMultipart = Symbol('multipart')
const fileUpload = require('express-fileupload')

function setMultipart (request, payload, done) {
  request[kMultipart] = true
  done()
}

function fastifyUpload (fastify, options, done) {
  fastify.addContentTypeParser('multipart', setMultipart)

  options = options || {}
  try {
    fastify.use(fileUpload(options))
  } catch (e) {
    Promise.all([
      fastify.register(require('middie'))
    ]).then(() => {
      fastify.use(fileUpload(options))
    })
  }

  fastify.addHook('preValidation', (request, reply, done) => {
    if (request.raw) {
      !request.body && (request.body = request.raw.body || {})
      if (request.raw.files) {
        for (const key in request.raw.files) {
          request.body[key] = request.raw.files[key]
        }
      }
    }
    done()
  })
  done()
}

module.exports = fp(fastifyUpload, {
  fastify: '>=3.0.0',
  name: 'fastify-file-upload'
})
