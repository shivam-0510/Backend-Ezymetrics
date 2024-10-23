module.exports = {
  dbURI: "mongodb://localhost:27017/ezymetrics",
  smtpConfig: {
    host: "smtp.mailtrap.io", // or your SMTP provider
    port: 2525,
    auth: {
      user: "your_user",
      pass: "your_pass",
    },
  },
};
