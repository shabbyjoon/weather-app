const chalk = require('chalk');
const figlet = require('figlet');
const clear = require('clear');
const minimist = require('minimist');

clear();
console.log(
  chalk.blue(
    figlet.textSync('Gimme Weather', { horizontalLayout: 'full'})
  )
);

module.exports = () => {
  const args = minimist(process.argv.slice(2))

  let cmd = args._[0] || '--help'

  if (args.help || args.h) {
    cmd = '--help'
  }

  switch (cmd) {
    case 'token':
      require('./commands/token')(args);
      break;
    case '--help':
      require('./commands/help')(args);
      break;
    case 'getSummary':
      require('./commands/getSummary')(args);
      break;
    default:
      console.error(`"${cmd}" is not a valid command!`);
      break;
  }
}
