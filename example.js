'use strict'

const fastify = require('fastify')({ logger: true })
fastify.register(require('.'), {
  limits: { fileSize: 50 * 1024 * 1024 }
})

fastify.post('/upload', function (req, reply) {
  const files = req.raw.files
  console.log(files)
  const fileArr = []
  for (const key in files) {
    fileArr.push({
      name: files[key].name,
      mimetype: files[key].mimetype
    })
  }
  reply.send(fileArr)
})

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
    console.log(file)
    reply.send({ file })
  }
})

fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`server listening on ${address}`)
})
