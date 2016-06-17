var Hal = function () {
    this.knowledge = {'what is the answer to life the universe and everything?': '42'};
    this.currentQuestion = '';
    this.name = 'HAL BOT'
};

Hal.prototype.evesdrop = function (message) {
    if (message.endsWith('?')) {
        if (message in this.knowledge) {
            return {
                    author: this.name,
                    msg: this.knowledge[message]
                };
        } else {
            this.currentQuestion = message;
        }
    } else {
        if (this.currentQuestion) {
            this.knowledge[this.currentQuestion] = message;
            this.currentQuestion = '';
        }
    }

    return '';
};

module.exports = Hal;

