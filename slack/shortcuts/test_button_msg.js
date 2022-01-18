export default {
  help: {
    id: "test_button_msg",
    name: "test",
    description: "Approve quotation",
  },
  handler: async ({ ack, client }) => {
    await ack();
    await client.chat.postMessage({
      channel: 'C02UHFK6EMA',
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
          ],

        }
      ]
    });
  },
}
