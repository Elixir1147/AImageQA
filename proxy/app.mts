"use strict";
import Fastify from "fastify";
import proxy from "@fastify/http-proxy";
import { verifyRequestOrigin } from "oslo/request";
import validateRequest from "./validateRequest.mjs";
import { FastifyRequest, FastifyReply } from "fastify";

const fastify = Fastify({
  logger: true,
});

const NEXT_BASE_URL = "http://localhost:3000";

fastify.register(proxy, {
  upstream: NEXT_BASE_URL,
  httpMethods: ["DELETE", "HEAD", "PATCH", "POST", "PUT", "OPTIONS"],
  preHandler: async (req: FastifyRequest, rep: FastifyReply) => {
    const originHeader = req.headers.origin;
    const hostHeader = req.headers.host;
    if (
      !originHeader ||
      !hostHeader ||
      !verifyRequestOrigin(originHeader, [hostHeader])
    ) {
      return rep.code(403);
    }
  },
});

fastify.register(proxy, {
  upstream: NEXT_BASE_URL,
  httpMethods: ["GET"],
});

fastify.register(proxy, {
  upstream: NEXT_BASE_URL,
  prefix: "/login",
  rewritePrefix: "/login",
  httpMethods: ["GET"],
  preHandler: async (req: FastifyRequest, rep: FastifyReply) => {
    const result = await validateRequest(req, rep);
    if (result.user) {
      console.log("redirect from login");
      return rep.redirect("/");
    }
    console.log("login");
  },
});

fastify.register(proxy, {
  upstream: NEXT_BASE_URL,
  prefix: "/signup",
  rewritePrefix: "/signup",
  httpMethods: ["GET"],
  preHandler: async (req: FastifyRequest, rep: FastifyReply) => {
    const result = await validateRequest(req, rep);
    if (result.user) {
      console.log("redirect from signup");
      return rep.redirect("/");
    }
    console.log("signup");
  },
});

fastify.register(proxy, {
  upstream: NEXT_BASE_URL,
  prefix: "/question",
  rewritePrefix: "/question",
  httpMethods: ["GET"],
  preHandler: async (req: FastifyRequest, rep: FastifyReply) => {
    const result = await validateRequest(req, rep);
    if (result.user) {
      console.log("redirect from question");
      return rep.redirect("/");
    }
    console.log("question");
  },
});

console.log(process.env.POSTGRES_USER);

fastify.listen({ port: 4000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
