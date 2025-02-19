import { onRequest } from "firebase-functions/v2/https";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

const client = new SecretManagerServiceClient();

export const getSecret = onRequest(async (req, res) => {
  try {
    const [version] = await client.accessSecretVersion({
      name: `projects/961812036412/secrets/GEMINI_API_KEY/versions/1`,
    });

    const secret = version.payload.data.toString("utf8");
    res.status(200).json({ apiKey: secret });

  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve secret", details: error.message });
  }
});
