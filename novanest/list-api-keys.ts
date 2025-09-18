import { createMedusaContainer } from "@medusajs/framework";
import { Modules } from "@medusajs/framework/utils";

export default async function listApiKeys({ container }: any) {
  try {
    const apiKeyModule = container.resolve(Modules.API_KEY);
    
    const allKeys = await apiKeyModule.listApiKeys();
    
    console.log("All API Keys:");
    allKeys.forEach((key: any, index: number) => {
      console.log(`${index + 1}. Type: ${key.type}, Token: ${key.token}, Created: ${key.created_at}`);
    });
    
    const publishableKeys = allKeys.filter((key: any) => key.type === "publishable");
    console.log(`\nFound ${publishableKeys.length} publishable keys:`);
    publishableKeys.forEach((key: any, index: number) => {
      console.log(`${index + 1}. ${key.token}`);
    });
    
    return allKeys;
  } catch (error) {
    console.error("Error retrieving API keys:", error);
    return [];
  }
}
