const { React } = require('powercord/webpack');
const ExtendedPlugin = require('./lib/ExtendedPlugin');
const Settings = require("./Settings.jsx");

module.exports = class PowerFindAndReplace extends ExtendedPlugin {
    defaults = [
        [">:(", "😡"],
        [":)", "😄"],
        [":(", "😦"],
    ];

    startPlugin() {
        if(!this.settings.get("replacements")) this.settings.set("replacements", this.defaults);
        this.registerSettings('powerfnf', 'Find and Replace', () => React.createElement(Settings, {settings: this.settings}));
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