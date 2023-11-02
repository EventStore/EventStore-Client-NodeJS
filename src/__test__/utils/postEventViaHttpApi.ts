import { request } from "https";
import { readFileSync } from "fs";
import { URL } from "url";

import type { EndPoint } from "../../types";

import type { Cluster } from "./Cluster";

interface Options {
  type: string;
  contentType: string;
  stream: string;
  data: unknown;
}

const convertEndpoint = (endpoint: string | EndPoint, stream: string) => {
  if (typeof endpoint === "string") {
    const url = new URL(endpoint);

    return {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
    };
  }

  return {
    hostname: endpoint.address,
    port: endpoint.port,
    path: `/streams/${stream}`,
  };
};

const post = (
  endpoint: string | EndPoint,
  cert: Buffer,
  options: Options,
): Promise<string> => {
  const { type, contentType, stream, data } = options;

  return new Promise((resolve, reject) => {
    const req = request(
      {
        ...convertEndpoint(endpoint, stream),
        method: "POST",
        headers: {
          "Content-Type": contentType,
          "ES-EventType": type,
        },
        ca: [cert],
        auth: "admin:changeit",
      },
      (res) => {
        if (res.statusCode === 307) {
          return resolve(post(res.headers.location!, cert, options));
        }

        let response = "";

        res.on("data", (d) => {
          response += d;
        });

        res.on("end", () => {
          return resolve(response);
        });
      },
    );

    req.on("error", (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
};

export const postEventViaHttpApi = (
  cluster: Cluster,
  options: Options,
): Promise<string> => {
  const [endpoint] = cluster.endpoints;
  const cert = readFileSync(cluster.certPath);
  return post(endpoint, cert, options);
};
