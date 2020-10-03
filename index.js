const { React } = require('powercord/webpack');
const ExtendedPlugin = require('./lib/ExtendedPlugin');
const Settings = require("./Settings.jsx");

module.exports = class PowerFindAndReplace extends ExtendedPlugin {
    
    startPlugin() {
        this.loadStylesheet('style.scss')
        powercord.api.settings.registerSettings('powerfnr', {
            category: this.entityID,
            label: 'Find and Replace',
            render: Settings
        });
    }

    pluginWillUnload () {
        powercord.api.settings.unregisterSettings('powerfnr');
    }

    onSendMessage(msg) {
        return this.process(msg);
    }

    process(text) {
        let replacements = this.settings.get("replacements");
        for (let i = 0; i < replacements.length; i++) {
            const replace = replacements[i];
            while (text.includes(replace.original)) text = text.replace(replace.original, replace.replacement);
        }

        return text;
    }
};
