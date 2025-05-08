import chalk from "chalk";

export const RFG = chalk.green("rfg");
export const ERROR = chalk.red(`\n ${RFG}  error - `);
export const SUCCESS = chalk.green(`\n ${RFG}  success - `);
export const WARN = chalk.yellow(`\n ${RFG}  warning - `);
export const INFO = chalk.blue(`\n ${RFG}  info - `);
export const HELP = chalk.white(`\n ${RFG}  help - `);
