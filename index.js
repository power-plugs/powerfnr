const { React } = require('powercord/webpack');
const ExtendedPlugin = require('./lib/ExtendedPlugin');
const Settings = require("./Settings.jsx");

module.exports = class PowerFindAndReplace extends ExtendedPlugin {
    
    startPlugin() {
        powercord.api.settings.registerSettings('powerfnr', {
            category: this.entityID,
            label: 'Find and Replace',
            render: Settings
        });
    }

    pluginWillUnload () {
        powercord.api.settings.unregisterSettings('powerstatus');
    }

    onSendMessage(msg) {
        return this.process(msg);
    }

    process(text) {
        var replacements = this.settings.get("replacements", []);
        for (let i = 0; i < replacements.length; i++) {
            const replace = replacements[i];
            if (!replace[0].trim() == '')
                while (text.includes(replace[0])) text = text.replace(replace[0], replace[1]);
        }

        return text;
    }
};
