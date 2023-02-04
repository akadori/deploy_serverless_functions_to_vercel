import { eventStore } from "../store";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default function (req: VercelRequest, res: VercelResponse) {
    eventStore.addEvent({
        createdAt: new Date(),
        payload: req.body
    }); 
}
