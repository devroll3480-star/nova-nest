const { createMedusaContainer } = require("@medusajs/framework");
const { Modules } = require("@medusajs/framework/utils");

async function getApiKey() {
  const container = createMedusaContainer();
  const apiKeyModule = container.resolve(Modules.API_KEY);
  
  try {
    const apiKeys = await apiKeyModule.listApiKeys({
      type: "publishable"
    });
    
    if (apiKeys.length > 0) {
      console.log("Publishable API Key:", apiKeys[0].token);
    } else {
      console.log("No publishable API keys found");
    }
  } catch (error) {
    console.error("Error retrieving API key:", error);
  }
}

getApiKey();
