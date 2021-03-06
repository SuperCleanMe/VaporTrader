const Discord = require('discord.js');

const info = {
    name: "credits",
    aliases: ["c"],
    public: true,
    description: "The people who made this bot possible"
}

module.exports = {
    name: info.name,
    aliases: info.aliases,
    public: info.public,
    description: info.description,
    help: (message, client, config, pack) => {
        let embed = new Discord.MessageEmbed()
            .setColor(config.theme)
            .setTitle(info.name)
            .setDescription(info.description.split("$$PREFIX").join(config.prefix))
            .addField("Aliases:", `\`${info.name}\`, \`${info.aliases.join("`, `")}\``)
        message.channel.send(embed)
    },
    run: async (pack, message, args, client, dbm) => {
        let embed = new Discord.MessageEmbed()
            .setColor(config.theme)
            .setTitle(pack.commands.credits.titleText)
            .setDescription(pack.commands.credits.description)
            .addField(pack.commands.credits.field1, "REAPER_corp#8846", true)
            .addField(pack.commands.credits.field2, "Broken Cinder#2467\nZane#8888\nthefunniman#2388\nAshghj#6951\nSourdough#1759", true)
            .addField(pack.commands.credits.field3.title, pack.commands.credits.field3.description, true)
        message.channel.send(embed)
    },
    preflight: (message, args, client, dbm) => {
        return true;
    }
}

function formatNo(x) {
    let parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(",");
}
