import { WebClient } from "@slack/web-api";

export default async function start() {// Create a new instance of the WebClient class with the token read from your environment variable
  const web = new WebClient(process.env.SLACK_TOKEN, {
    // LogLevel can be imported and used to make debugging simpler
    logLevel: "debug"
  });
  // The current date
  const currentTime = new Date().toTimeString();

  /*
  https://api.slack.com/reference/block-kit/blocks
  https://api.slack.com/reference/block-kit/block-elements
  */
  try {
    // Use the `chat.postMessage` method to send a message from this app
    await web.chat.postMessage({
      channel: 'C02U61FRXSR',
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
          "type": "input",
          "element": {
            "type": "plain_text_input",
            "multiline": true,
            "action_id": "plain_text_input-action"
          },
          "label": {
            "type": "plain_text",
            "text": "Label",
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
        },
        {
          "type": "divider"
        }
      ]
    });
    console.log('Message posted!');
  } catch (error) {
    console.log(error);
  }

}
