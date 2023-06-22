module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: "care@farmershaat.com",
        defaultReplyTo: "care@farmershaat.com",
      },
    },
  },
});
