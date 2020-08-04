/*-----------------------------Preliminary Information-----------------------------*/

const Telegraf = require('telegraf');
const axios = require('axios');
const bot = new Telegraf('[API key here]');

// Whenever the bot is used
bot.use((ctx, next) => 
{
    if (ctx.updateSubTypes[0] == "text")
    {
        console.log("[" + ctx.from.first_name + "] has said: " + ctx.message.text);
    }
    else
    {
        console.log("[" + ctx.from.first_name + "] has sent a " + ctx.updateSubTypes[0]);
    }
    next();
})


/*-------------------------------Default commands----------------------------------*/

bot.start((ctx) => {
    ctx.reply("Hello there, " + ctx.from.first_name + "! Welcome to the first chatbot I have built!\n" +
    "To get help, type \"/help\"\nTo configure the settings, type \"/settings\"");
    ctx.state.apple = "Delicious"; // Creates a specific property for the ctx object
    console.log(ctx.state);
})

const helpMessage = `
                    The following is a list of commands to control the bot
                    /start - starts the bot
                    /help - shows the list of commands available
                    /settings - configure the settings of the bot
                    /updates - checks for the most recent updates
                    /echo - repeats what you have said
                    `;

bot.help((ctx) => {
    ctx.reply(helpMessage);
})

bot.settings((ctx) => {
    ctx.reply("You have entered the settings command.");
})


/*-----------------------------------Simple Functions-------------------------------*/

// Creates new commands for the bot
bot.command("updates", (ctx) => {
    ctx.reply("No updates are available at the moment.");
})

bot.command("echo", (ctx) => 
{
    let userInput = ctx.message.text;
    let userInputArray = userInput.split(" ");
    let message = "";

    if (userInputArray.length == 1)
    {
        message += "\"Cricket noises\"";
    } 
    else
    {
        for(let i = 1; i < userInputArray.length; i++)
        {
            message += userInputArray[i] + " ";
        }
    }
    ctx.reply(message);
})

// When that specific array of strings is encountered
bot.hears(["What is your name?", "Who are you?", "What are you?"], (ctx) => {
    ctx.reply("My name is Hyperion, the world's leading AI personality construct.");
})

// When a 'sticker' sub-type is encountered
bot.on("sticker", (ctx) => {
    ctx.reply("I can see that this is a low-level human communication tool, however my creator " + 
    "has not programmed discernible emotions into my core. Hence, entertain yourself with my" +
    "default expression:\nHa. Ha. Ha.");
})

// When the user mentions another user
/*bot.mention("Hyperion", (ctx) => {
    ctx.reply("You called?");
})*/

/*------------------------------------Search Functions----------------------------------*/


bot.on('inline_Query', async (ctx) => 
{
    console.log(ctx);
    ctx.reply("You searched \"" + ctx.inlineQuery.query + "\"");
    let response = await axios.get("https://en.wikipedia.org/w/api.php?format=JSON&action=opensearch&limit=50&search=" + ctx.inlineQuery.query);
    console.log(response.data);
})


bot.launch();
