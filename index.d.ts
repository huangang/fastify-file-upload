import fileUpload, { UploadedFile } from 'express-fileupload';
import { FastifyPlugin } from 'fastify';

declare module 'http' {
    interface IncomingMessage {
        files?: fileUpload.UploadedFile[string];
    }
}

declare function fastifyUpload (fastify: FastifyInstance, options: fileUpload.Options = {}, done: () => void): void;

const fastifyUploadFile: FastifyPlugin<fileUpload.Options>;
export default fastifyUploadFile;