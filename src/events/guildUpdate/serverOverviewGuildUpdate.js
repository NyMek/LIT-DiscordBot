const serverOverview = require('../../models/serverOverviewModel')
const formatDate = require('../../functions/formatDate')

module.exports = async (client) => {

    try {
            client.guilds.cache.forEach( async (guild) => {
                const today = formatDate(new Date())

                const fetchedServerOverview = await serverOverview.findOne({
                    guildId: guild.id,
                })

                console.log(guild.channels.cache.filter(channel => channel.type === 4).size)

                if(fetchedServerOverview) {

                    await serverOverview.findOneAndUpdate(
                        {
                            guildId: guild.id,
                            'dailyStats.date': today,
                        },
                        {
                            $set: {
                                'dailyStats.$.verificationLevel': guild.verificationLevel,
                            },
                        },
                        { new: true } 
                    );
                } else {
                    console.log('Serwera nie ma w bazie danych')
                    return;
                }
            });
            
    } catch (error) {
        console.log(`Wystąpił błąd podczas zapisu danych do Server Overview`)
    }
 
}




