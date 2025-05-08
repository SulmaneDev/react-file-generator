import { copy, exists } from "fs-extra";
import { join, relativeJoin } from "../lib/path.js";
import Action, { type ICommand } from "./types.js";
import { ERROR, INFO, SUCCESS } from "../ui/prefixes.js";
import chalk from "chalk";

export default class Init extends Action {
    async execute(): Promise<void> {
        await this.validatePath();
        await this.createConfigs();
    }
    async createConfigs(): Promise<void> {
        console.log(`${INFO} Creating configurations!`);
        await copy(
            relativeJoin("../../rfg.config.json"),
            join("rfg.config.json"),
        );
        await copy(relativeJoin("../templates"), join("templates"));
        console.log(`${SUCCESS} Operation Completed!`);

    }

    async validatePath(): Promise<void> {
        if (await exists(join("rfg.config.json"))) {
            await this.showError();
        }
    }
    async showError() {
        console.log(
            `${ERROR} React File Generator configuration already exists: ${chalk.green(join("rfg.config.json"))}`,
        );
        console.log(`${INFO} Exiting`);
        process.exit(1);
    }
}
