var Hal = function () {
    this.knowledge = {};
    this.currentQuestion = '';
};

Hal.prototype.evesdrop = function (message) {
    if (message.endsWith('?')) {
        if (message in this.knowledge) {
            return this.knowledge[message];
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

