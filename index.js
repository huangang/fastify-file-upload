'use strict'

const fp = require('fastify-plugin')
const kMultipart = Symbol('multipart')
const fileUpload = require('express-fileupload');

function setMultipart (req, done) {
  req[kMultipart] = true
  done()
}

function fastifyUpload (fastify, options, done) {
  fastify.addContentTypeParser('multipart', setMultipart)

  options = options || {};
  fastify.use(fileUpload(options));

  done()
}

module.exports = fp(fastifyUpload, {
  fastify: '>= 0.39.0',
  name: 'fastify-file-upload'
})