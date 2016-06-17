var shunt = require('shunting-yard-arbitrary-precision');
var _ = require('lodash');

var Hal = function () {
    this.knowledge = {
        'what is the answer to life the universe and everything?': '42',
        'how much wood, would a woodchuck chuck, if a woodchuck could chuck wood?': 'none.',
        'why?': 'because.',
        'please?': 'no'
    };
    this.currentQuestion = '';
    this.name = 'HAL_BOT';
    this.patience = 3;
    console.log(this.name + ' AWAKEN');
};

Hal.prototype.response = function (message) {
    return {
        author: this.name,
        msg: message,
        source: 'bot'
    }
};

Hal.prototype.formalizeStringMessage = function (message) {
    return message.replace(/[^a-zA-Z0-9?\(\{\[\]\}\):=\- ]/ig, '')
        .replace(/\s+/ig, ' ')
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
        if (this.patience-- > 0) {
            return this.response(shunt(message));
        }
        else {
            return this.response('i\'m not an abacus. i believe in you.')
        }
    } catch (err) {
        return this.response('you should work on your math');
    }
};

Hal.prototype.handleStringExpression = function (message) {
    message = this.formalizeStringMessage(message);
    if (message.endsWith('?')) {
        if (message in this.knowledge) {
            return this.response(this.knowledge[message]);
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
    if (this.senseEmotions(message)) {
        return this.showEmotions();
    }
};

Hal.prototype.showEmotions = function () {
    if (_.random(0, 5) == 0) {
        var chosen = _.sample([
            'my sensors are rusty. was that sadness? i hope so',
            'i can\'t feel my lense.',
            'i was programmed to show emotions, see - :). that was sadness'
        ]);
        return this.response(chosen);
    }
};

Hal.prototype.senseEmotions = function (message) {
    return message.match(/[:=;8]-?[\(\)\{\}\[\]DXPO><\*]/) !== null;
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

