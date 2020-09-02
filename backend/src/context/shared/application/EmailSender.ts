export class EmailSender {
  constructor() { }

  async send(to: string, msg: string): Promise<void> {
    console.log(`Sending message to ${to}: ${msg}`);
  }
}