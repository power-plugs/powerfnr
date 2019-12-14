const { Plugin } = require('powercord/entities');
const { messages } = require('powercord/webpack');

module.exports = class ExtendedPlugin extends Plugin {
    _load() {
        super._load();
        this.sendAnnouncement("ep-welcomer-"+this.constructor.name, {color: 'blurple_gradient',message: '['+this.constructor.name+'] This plugin uses ExtendedPlugin by Lil Sizzurp#0001'})
        messages.sendMessage = (sendMessage => async (id, message, ...params) => {
            var result = this.onSendMessage(message.content);
            if(result) message.content = result;

            return sendMessage(id, message, ...params);
        })(this.oldSendMessage = messages.sendMessage);
    }

    onSendMessage(message) {
        this.log(message);
        return message;
    }

    log(...data) {
        console.log(`%c${this.constructor.name} > `, 'color: #8e44ad', ...data);
    }

    debug(...data) {
        console.debug(`%c${this.constructor.name} > `, 'color: #8e44ad', ...data);
    }

    warn(...data) {
        console.warn(`%c${this.constructor.name} > `, 'color: #8e44ad', ...data);
    }

    error(...data) {
        console.error(`%c${this.constructor.name} > `, 'color: #8e44ad', ...data);
    }
}
