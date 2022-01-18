import SlackBolt from "@slack/bolt";
const { App, LogLevel } = SlackBolt;
import readActionFiles from "./utilities/readActions.js";

export default async function start() {// Create a new instance of the WebClient class with the token read from your environment variable
  const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true,
    logLevel: LogLevel.DEBUG,
  });

  await app.start();
  console.log('⚡️ Bolt app started');

  // const actions = await readActionFiles("slack/actions");
  // console.log(actions);

  // await new Promise(
  //   (resolve, rejects) =>
  //     actions.forEach(async (action, index, array) => {
  //       console.log(action.handler);
  //       app.action(action.help.name, action.handler);

  //       if (index === array.length - 1) resolve();
  //     })
  // );

  app.action("QTapprove", async ({ body, ack }) => {
    console.log("QTAPPROVE", body);
    await ack();
  });

  try {
    // Use the `chat.postMessage` method to send a message from this app
    app.client.chat.postMessage({
      channel: 'C02U61FRXSR',
      "attachments": [
        {
          "color": "#F2C94C",
          "blocks": [
            {
              "type": "divider"
            },
            {
              "type": "header",
              "text": {
                "type": "plain_text",
                "text": `ใบเสนอราคาเลขที่ QT20220100019 ${new Date().toISOString()}`,
                "emoji": true
              }
            },
            {
              "type": "divider"
            },
            {
              "type": "actions",
              "elements": [
                {
                  "type": "button",
                  "style": "primary",
                  "text": {
                    "type": "plain_text",
                    "text": "Approve",
                    "emoji": true
                  },
                  "value": "idOfQt",
                  "action_id": "QTapprove"
                },
                {
                  "type": "button",
                  "style": "danger",
                  "text": {
                    "type": "plain_text",
                    "text": "Deny",
                    "emoji": true
                  },
                  "value": "idOfQt",
                  "action_id": "QTdeny"
                }
              ]
            },
            {
              "type": "divider"
            },
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": "เหตุที่ไม่ผ่าน"
              },
              "accessory": {
                "type": "static_select",
                "placeholder": {
                  "type": "plain_text",
                  "text": "Select an item",
                  "emoji": true
                },
                "options": [
                  {
                    "text": {
                      "type": "plain_text",
                      "text": "*this is plain_text text*",
                      "emoji": true
                    },
                    "value": "value-0"
                  },
                  {
                    "text": {
                      "type": "plain_text",
                      "text": "*this is plain_text text*",
                      "emoji": true
                    },
                    "value": "value-1"
                  },
                  {
                    "text": {
                      "type": "plain_text",
                      "text": "*this is plain_text text*",
                      "emoji": true
                    },
                    "value": "value-2"
                  }
                ],
                "action_id": "static_select-action"
              }
            },
            {
              "type": "divider"
            },
            {
              "type": "context",
              "elements": [
                {
                  "type": "image",
                  "image_url": "https://pbs.twimg.com/profile_images/625633822235693056/lNGUneLX_400x400.jpg",
                  "alt_text": "cute cat"
                },
                {
                  "type": "mrkdwn",
                  "text": "# Discord Bot Streaming Now\nBot for Streamer.\nWhen someone have role `streamer`, Voice channel name will change to\n```\n[On Air 🔴] - <Your voice channel name>\n```\n# TODO\n1. ✅ Use role streamer\n2. ⬜ Store data to file or database\n3. 🆗 Refactor!\n4. ⬜ Slash commands\n# Getting Started"
                }
              ]
            }
          ]
        }
      ]
    });
    console.log('Message posted!');
  } catch (error) {
    console.log(error);
  }

  app.error(({ error, logger, context, body }) => {
    // Log the error using the logger passed into Bolt
    logger.error(error);

    if (context.teamId) {
      // Do something with the team's ID for debugging purposes
    }
  });

  // The open_modal shortcut opens a plain old modal
  // Shortcuts require the command scope
  app.shortcut('open_modal', async ({ ack, payload, client }) => {
    // Acknowledge shortcut request
    ack();

    try {
      // Call the views.open method using the WebClient passed to listeners
      const result = await client.views.open({
        trigger_id: payload.trigger_id,
        view: {
          "type": "modal",
          "title": {
            "type": "plain_text",
            "text": "My App"
          },
          "close": {
            "type": "plain_text",
            "text": "Close"
          },
          "blocks": [
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": "About the simplest modal you could conceive of :smile:\n\nMaybe <https://api.slack.com/reference/block-kit/interactive-components|*make the modal interactive*> or <https://api.slack.com/surfaces/modals/using#modifying|*learn more advanced modal use cases*>."
              }
            },
            {
              "type": "context",
              "elements": [
                {
                  "type": "mrkdwn",
                  "text": "Psssst this modal was designed using <https://api.slack.com/tools/block-kit-builder|*Block Kit Builder*>"
                }
              ]
            }
          ]
        }
      });

      console.log(result);

    }
    catch (error) {
      console.error(error);
    }
  });
}
