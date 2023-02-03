// api/hello.ts
import { NowRequest, NowResponse } from "@vercel/node";

export default function (req: NowRequest, res: NowResponse) {
  console.log(Object.keys(req));
  console.log(Object.keys(req.body))
  const { name = "World" } = req.query;
  res.send(`Hello ${name}!`);
}