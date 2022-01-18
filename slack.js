import SlackBolt from "@slack/bolt";
const { App } = SlackBolt;

export default async function start() {// Create a new instance of the WebClient class with the token read from your environment variable
  const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true,
    logLevel: "debug",
  });

  await app.start();
  console.log('⚡️ Bolt app started');

  app.action('approve', async ({ action, ack, respond }) => {
    console.log("approveapproveapproveapproveapproveapprove");
    await respond(JSON.stringify(action, null, "\t"));
    await ack();
    // Update the message to reflect the action
  });

  app.action('deny', async ({ action, ack, body, client }) => {
    try {
      // Call views.open with the built-in client
      const result = await client.views.open({
        // Pass a valid trigger_id within 3 seconds of receiving it
        trigger_id: body.trigger_id,
        // View payload
        view: {
          type: 'modal',
          // View identifier
          callback_id: 'view_1',
          title: {
            type: 'plain_text',
            text: 'Modal title'
          },
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: 'Welcome to a modal with _blocks_'
              },
              accessory: {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: 'Click me!'
                },
                action_id: 'button_abc'
              }
            },
            {
              type: 'input',
              block_id: 'input_c',
              label: {
                type: 'plain_text',
                text: 'What are your hopes and dreams?'
              },
              element: {
                type: 'plain_text_input',
                action_id: 'dreamy_input',
                multiline: true
              }
            }
          ],
          submit: {
            type: 'plain_text',
            text: 'Submit'
          }
        }
      });
      ack();
      console.log(result);
    }
    catch (error) {
      console.error(error);
    }
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
                "text": "ใบเสนอราคาเลขที่ QT20220100019",
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
                  "action_id": "approve"
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
                  "action_id": "deny"
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
