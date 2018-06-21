// The old Matter Objects file that was reduced to single components.
// Right now we only use it for the bodyID singleton which is needed when creating objects.
export class MatterObjects {
}
// Global Body ID. Starts at 0 and gets iterated with each new body made.
MatterObjects.bodyID = 0;
