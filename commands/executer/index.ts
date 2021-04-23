/* eslint-disable no-console */
import { addPath } from "app-module-path";

import { CommandExecuter } from "types";

addPath("/usr/src/app/dist/src");

const tearDown = (exitCode: number) => {
  process.exit(exitCode);
};

const executeCommand: CommandExecuter = async (command) => {
  try {
    await command();
  } catch (error) {
    console.error("\n ❌ Error:");
    console.error(error);
    tearDown(1);
  }

  console.log("\n 🤟 Done!\n");
  tearDown(0);
};

const [commandToExecute] = process.argv.slice(2);

try {
  import(`../${commandToExecute}.js`);
} catch {
  console.error(` ❌ Could not import: ${commandToExecute}
 Are you sure it is the right command name?\n`);
}

export default executeCommand;
