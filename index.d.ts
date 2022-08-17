declare module "fastify-file-upload" {
  import { FastifyInstance, FastifyPluginCallback, FastifyPluginOptions, FastifyRequest } from "fastify";
  import { Server } from "http";

  export function setMultipart(request: FastifyRequest, payload: any, done: () => void): void;
  export function fastifyUpload(fastify: FastifyInstance, options: any, done: () => void): void;

  const defaultValue: () => FastifyPluginCallback<FastifyPluginOptions, Server>;
  export default defaultValue
}

type UploadedFile = {
  /** file name */
  name: string;
  /** A function to move the file elsewhere on your server */
  mv(path: string, callback: (error: unknown) => void): void;
  mv(path: string): Promise<void>;
  /** Encoding type of the file */
  encoding: string;
  /** The mimetype of your file */
  mimetype: string;
  /** A buffer representation of your file, returns empty buffer in case useTempFiles option was set to true. */
  data: Buffer;
  /** A path to the temporary file in case useTempFiles option was set to true. */
  tempFilePath: string;
  /** A boolean that represents if the file is over the size limit */
  truncated: boolean;
  /** Uploaded size in bytes */
  size: number;
  /** MD5 checksum of the uploaded file */
  md5: string;
};

declare module "http" {
  interface IncomingMessage {
    files?: UploadedFile | UploadedFile[];
  }
}
