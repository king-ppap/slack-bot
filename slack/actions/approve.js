export default {
  help: {
    id: "QTapprove",
    name: "Approve quotation",
    description: "Approve quotation",
  },
  handler: async ({ action, ack, respond }) => {
    console.log("approveapproveapproveapproveapproveapprove");
    await respond(JSON.stringify(action, null, "\t"));
    await ack();
  },
}