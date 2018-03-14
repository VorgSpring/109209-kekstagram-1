const commandsManager = require(`./commands/index`);
require(`dotenv`).config();

const userCommand = process.argv[2];
commandsManager(userCommand);

