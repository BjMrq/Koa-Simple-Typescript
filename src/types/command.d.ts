export type Command = () => Promise<void> | void;

export type CommandExecuter = (command: Command) => Promise<void> | void;
