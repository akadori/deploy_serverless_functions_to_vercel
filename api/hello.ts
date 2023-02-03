// api/hello.ts
import { NowRequest, NowResponse } from "@vercel/node";

export default function (req: NowRequest, res: NowResponse) {
  // eslint-disable-next-line no-console
  console.log(`req: ${JSON.stringify(req)}`);
  const { name = "World" } = req.query;
  res.send(`Hello ${name}!`);
}