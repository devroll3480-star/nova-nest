import { createMedusaContainer } from "@medusajs/framework";
import { Modules } from "@medusajs/framework/utils";

export default async function getApiKey({ container }: any) {
  try {
    const apiKeyModule = container.resolve(Modules.API_KEY);
    
    const apiKeys = await apiKeyModule.listApiKeys({
      type: "publishable"
    });
    
    if (apiKeys.length > 0) {
      console.log("Found publishable API key:");
      console.log(apiKeys[0].token);
      return apiKeys[0].token;
    } else {
      console.log("No publishable API keys found");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving API key:", error);
    return null;
  }
}
