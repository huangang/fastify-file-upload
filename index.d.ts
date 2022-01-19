import fileUpload from 'express-fileupload';
import { FastifyPlugin } from 'fastify';

declare module 'http' {
    interface IncomingMessage {
        files: Record<string, fileUpload.UploadedFile | fileUpload.UploadedFile[] | undefined>;
    }
}
declare module 'http2' {
    interface Http2ServerRequest {
        files: Record<string, fileUpload.UploadedFile | fileUpload.UploadedFile[] | undefined>;
    }
}

declare function fastifyUpload (fastify: FastifyInstance, options: fileUpload.Options = {}, done: () => void): void;

const fastifyUploadFile: FastifyPlugin<fileUpload.Options>;
export default fastifyUploadFile;