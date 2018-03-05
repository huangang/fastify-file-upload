'use strict'

const fastify = require('fastify')()
fastify.register(require('.'), {
  limits: { fileSize: 50 * 1024 * 1024 },
})

fastify.post('/upload', function (req, reply) {
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