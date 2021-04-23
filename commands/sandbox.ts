// It is important for the command to works that executeCommand is imported first

import executeCommand from "./executer";

executeCommand(() => {
  // eslint-disable-next-line no-console
  console.log("Sandboxing..");
});
