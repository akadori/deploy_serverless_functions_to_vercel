// api/hello.ts
import { NowRequest, NowResponse } from "@vercel/node";

export default function (req: NowRequest, res: NowResponse) {
  console.log("req:", Object.keys(req));
  console.log("typeof req.body", typeof req.body)
  const { name = "World" } = req.query;
  res.send(`Hello ${name}!`);
}