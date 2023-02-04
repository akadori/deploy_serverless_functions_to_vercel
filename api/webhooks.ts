import { VercelRequest, VercelResponse } from "@vercel/node";


type GitHubWebhookEvent = {
    createdAt: Date;
    payload: any;
}

type EventStore =  {
    events: Array<GitHubWebhookEvent>;
    addEvent: (event: GitHubWebhookEvent) => void;
    listEvents: () => Array<GitHubWebhookEvent>;
}

const events: Array<GitHubWebhookEvent> = [];

export const eventStore: EventStore = {
    events,
    addEvent: (event: GitHubWebhookEvent) => {
        if(events.length > 10) {
            events.shift();
        }
        events.push(event);
    },
    listEvents: () => events
}


export default function (req: VercelRequest, res: VercelResponse) {
    const { command } = req.query;
    if(command === "list") {
        res.json(eventStore.listEvents());
        return;
    }else if(command === "add") {
    eventStore.addEvent({
        createdAt: new Date(),
        payload: req.body
    });
    res.status(200).send("OK");
    }else{
        res.status(200).send("no command");
    }
}
