import { FastifyInstance, FastifyPluginCallback, FastifyPluginOptions, FastifyRequest } from "fastify";
import { Server } from "http";

declare function setMultipart (request: FastifyRequest, payload: any, done: () => void): void;
declare function fastifyUpload (fastify: FastifyInstance, options: any, done: () => void): void;

declare export default (): FastifyPluginCallback<FastifyPluginOptions, Server> => {};