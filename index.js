const fs = require('fs');
// require the discord.js module
const Discord = require('discord.js');

const { prefix, token } = require('./config.json');

// create a new Discord client
const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting
client.on('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(' ');
	const commandName = args.shift().toLowerCase();
	
    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

	try {
    	command.execute(message, args);
	}
	catch (error) {
    	console.error(error);
    	message.reply('there was an error trying to execute that command!');
}
});



// login to Discord with your app's token
client.login(token);

