import { WebClient } from "@slack/web-api";

export default async function start() {// Create a new instance of the WebClient class with the token read from your environment variable
  const web = new WebClient(process.env.SLACK_TOKEN, {
    // LogLevel can be imported and used to make debugging simpler
    logLevel: "debug"
  });
  // The current date
  const currentTime = new Date().toTimeString();

  try {
    // Use the `chat.postMessage` method to send a message from this app
    await web.chat.postMessage({
      channel: 'C02U61FRXSR',
      text: `The current time is ${currentTime}`,
    });
    console.log('Message posted!');
  } catch (error) {
    console.log(error);
  }

}
