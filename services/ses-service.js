import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const client = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY_ID,
  },
});

export const triggerEmail = async (
  senderEmail,
  recipientEmails,
  subject,
  body,
  sourcePrefix
) => {
  const params = {
    Source: `${sourcePrefix} <${senderEmail}>`,
    Destination: {
      ToAddresses: recipientEmails,
    },

    Message: {
      Subject: {
        Data: subject,
        Charset: "UTF-8",
      },

      Body: {
        Html: {
          Data: body,
          Charset: "UTF-8",
        },
      },
    },
  };

  const command = new SendEmailCommand(params);
  console.log("### command", command);

  const res = await client.send(command);

  return res;
};
