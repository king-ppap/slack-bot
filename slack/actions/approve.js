export default {
  help: {
    name: "QTapprove",
    description: "Approve quotation",
  },
  handler: async ({ action, ack, respond }) => {
    console.log("approveapproveapproveapproveapproveapprove");
    await respond(JSON.stringify(action, null, "\t"));
    await ack();
  },
}