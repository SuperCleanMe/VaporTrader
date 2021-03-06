const Discord = require('discord.js');
const axios = require('axios');
const info = {
    name: "sync",
    aliases: [],
    public: true,
    description: "Synchronize your configuration between Warframe Market and Vapor Trader (requires linked account)"
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
        let u = await dbm.getUserConfig(message.author);
        let embed = new Discord.MessageEmbed()
            .setColor(config.theme);
        if (u.WFMID !== undefined && u.WFMID !== null) {
            let profile = (await axios.get("https://api.warframe.market/v1/profile/" + u.ingameName)).data.payload.profile;
            dbm.pool.query(`UPDATE general.user_config SET platform = '${profile.platform}', region = '${profile.region.toUpperCase()}', lang='${profile.region.toLowerCase()}' WHERE id = ${message.author.id}`, async (err, data) => {
                if (err) throw err;
                let np = await pack.choosePack(dbm, message.author.id);
                embed
                    .setTitle(np.commands.sync.success.title)
                    .setDescription(np.commands.sync.success.description)
                message.channel.send(embed);
            })
        } else {
            embed
                .setTitle(pack.commands.sync.failure.title)
                .setDescription(pack.commands.sync.failure.description.replace("$PREFIX", config.prefix));
            await message.channel.send(embed);
        }
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
