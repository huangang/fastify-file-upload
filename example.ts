import fastifyServer from "fastify"
import data from ".";

const fastify = fastifyServer();
fastify.register(data, {
  limits: { fileSize: 50 * 1024 * 1024 }
})

fastify.post('/upload', function (req, reply) {
  // @ts-ignore
  const files = Array(req.raw.files)

  // for fix error run yarn add @types/node or npm install @types/node
  console.log(files)
  const fileArr = []
  for (const key in files) {
    fileArr.push({
      name: files[key].name,
      mimetype: files[key].mimetype
    })
  }
  reply.send(fileArr)
});

fastify.post<{Body: {file?: any}}>('/uploadSchema', {
  schema: {
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

    // for fix error run yarn add @types/node or npm install @types/node
    console.log(file)
    reply.send({ file })
  }
})

fastify.listen(8080, '127.0.0.1', (err, address) => {
  if (err) throw err

  // for fix error run yarn add @types/node or npm install @types/node
  console.log(`server listening on ${address}`)
})
