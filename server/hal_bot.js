shunt = require('shunting-yard-arbitrary-precision');

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

Hal.prototype.respond = function (message) {
    return {
        author: this.name,
        msg: message,
        source: 'bot'
    }
};

Hal.prototype.formalizeStringMessage = function (message) {
    return message.replace(/[^a-zA-Z0-9? ]/ig, '')
        .toLowerCase();
};

Hal.prototype.formalizeArithmeticExpression = function (message) {
    // must be a bug with the library, not recognizing parenthesis of different types
    return message.replace(/[\[\(\{]/ig, '(')
        .replace(/[\]\)\|]/ig, ')')
};

Hal.prototype.handleArithmeticExpression = function (message) {
    message = this.formalizeArithmeticExpression(message);
    try {
        return this.respond(shunt(message));
    } catch (err) {
        return this.respond('I may not be an abacus, but you should work on your math');
    }
};

Hal.prototype.handleStringExpression = function (message) {
    message = this.formalizeStringMessage(message);
    if (message.endsWith('?')) {
        if (message in this.knowledge) {
            return this.respond(this.knowledge[message]);
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

Hal.prototype.determineIfArithmeticExpression = function (message) {
    // CHECK:
    // 1. the message contains ONLY arithmetical characters
    // 2. the message contains at least one operator
    // 3. the message contains at least two numbers

    return message.match(/^[\d.+-/\*\(\)\[\]\{\}\s]+$/) &&
        message.match(/[+-/.\*)]/) &&
        message.match(/\d+/g) &&
        message.match(/\d+/g).length > 1;
};

Hal.prototype.eavesdrop = function (message) {
    if (this.determineIfArithmeticExpression(message)) {
        return this.handleArithmeticExpression(message);
    } else {
        return this.handleStringExpression(message);
    }
};

module.exports = Hal;

