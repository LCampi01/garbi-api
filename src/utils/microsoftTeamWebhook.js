const axios = require('axios');

class MicrosoftTeamWebhook {
    async publishMessage(title, facts, tmx = false) {
        return await axios({
            url: tmx ? process.env.MS_WEBHOOK_NOTIFICATION_URL_TMX : process.env.MS_WEBHOOK_NOTIFICATION_URL,
            method: 'post', data: {
                summary: title,
                sections: [{
                    activityTitle: title,
                    facts: facts, markdown: true
                }]
            }, json: true
        });
    }
}

module.exports = new MicrosoftTeamWebhook();
