import app from "./server/index.js";
import { checkDatabase } from "./storage/index.js";

async function main() {
  try {
    await checkDatabase();
    app.listen(app.settings.port);
    console.log(`Server running ➜ PORT: ${app.settings.port}`);
  } catch (err) {
    console.error(err);
  }
}

main();
