import fileUpload from "express-fileupload";
import fastifyServer from "fastify"
import data from ".";

const fastify = fastifyServer();
fastify.register(data, {
  limits: { fileSize: 50 * 1024 * 1024 }
})

fastify.post('/upload', function (req, reply) {
  const fileArr = []
  for (const key in req.raw.files) {
    if(!req.raw.files[key]) continue;
    const file = req.raw.files[key];
    fileArr.push({
      name: file.name,
      mimetype: file.mimetype
    })
  }
  reply.send(fileArr)
});

fastify.post<{Body: {file?: fileUpload.UploadedFile}}>('/uploadSchema', {
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
    console.log(file)
    reply.send({ file })
  }
})

fastify.listen(3000, (err, address) => {
  if (err) throw err

  // for fix error run yarn add @types/node or npm install @types/node
  console.log(`server listening on ${address}`)
})
