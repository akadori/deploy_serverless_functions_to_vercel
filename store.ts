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
