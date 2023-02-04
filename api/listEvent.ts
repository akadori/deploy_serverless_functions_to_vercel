import {
    VercelRequest,
    VercelResponse,
} from "@vercel/node";
import {
    eventStore,
} from "../store";

export default function (req: VercelRequest, res: VercelResponse) {
    res.json(eventStore.listEvents());
};