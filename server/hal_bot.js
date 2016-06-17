var Hal = function () {
    this.knowledge = {
        'what is the answer to life the universe and everything?': '42',
        'how much wood, would a woodchuck chuck, if a woodchuck could chuck wood?': 'none.',
        'why?': 'because.'
    };
    this.currentQuestion = '';
    this.name = 'HAL_BOT';
    console.log(this.name + ' AWAKEN');
};

Hal.prototype.formalizeMessage = function(message) {
    return message.replace(/[^a-zA-Z0-9? ]/ig, '')
        .toLowerCase();
};

Hal.prototype.eavesdrop = function (message) {
    message = this.formalizeMessage(message);
    if (message.endsWith('?')) {
        if (message in this.knowledge) {
            return {
                    author: this.name,
                    msg: this.knowledge[message],
                    source: 'bot'
                };
        } else {
            this.currentQuestion = message;
        }
    } else {
        if (this.currentQuestion) {
            console.log('KNOWLEDGE GAINED: ' + this.currentQuestion + ' -> ' + message);
            this.knowledge[this.currentQuestion] = message;
            this.currentQuestion = '';
        }
    }

    return '';
};

module.exports = Hal;

