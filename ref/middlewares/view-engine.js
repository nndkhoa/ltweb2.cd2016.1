var exphbs = require('express-handlebars');
var hbs_sections = require('express-handlebars-sections');
var numeral = require('numeral');

var helpers = {

  section: hbs_sections(),

  format: (val, options) => numeral(val).format('0,0'),

  substr: (length, context, options) => {
    if (context.length > length) {
      return context.substring(0, length) + '...';
    }

    return context;
  },

  ifIn: (ele, list, options) => {
    if (list.includes(ele))
      return options.fn(this);

    return options.inverse(this);
  },

  xif: (v1, operator, v2, options) => {
    switch (operator) {
      case '==':
        return (v1 == v2) ? options.fn(this) : options.inverse(this);
      case '===':
        return (v1 === v2) ? options.fn(this) : options.inverse(this);
      case '!==':
        return (v1 !== v2) ? options.fn(this) : options.inverse(this);
      case '!=':
        return (v1 != v2) ? options.fn(this) : options.inverse(this);
      case '<':
        return (v1 < v2) ? options.fn(this) : options.inverse(this);
      case '<=':
        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
      case '>':
        return (v1 > v2) ? options.fn(this) : options.inverse(this);
      case '>=':
        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
      case '&&':
        return (v1 && v2) ? options.fn(this) : options.inverse(this);
      case '||':
        return (v1 || v2) ? options.fn(this) : options.inverse(this);
      default:
        return options.inverse(this);
    }
  },
};

module.exports = app => {
  app.engine('hbs', exphbs({
    layoutsDir: 'views/_layouts',
    defaultLayout: 'main.hbs',
    helpers
  }));
  app.set('view engine', 'hbs');
};
