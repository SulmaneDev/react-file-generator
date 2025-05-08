import chalk from "chalk";
import { GENERATE } from "../lib/constants.js";
import { ERROR, INFO, WARN } from "../ui/prefixes.js";
import Action, { type ICommand } from "./types.js";
import Box from "../ui/box.js";
import { exists, ensureFile, ensureDir, remove } from "fs-extra";
import { join } from "../lib/path.js";

export default class Generate extends Action {
    async execute(
        cmd?: ICommand,
        flags?: ICommand,
        extra?: ICommand,
    ): Promise<void> {
        const paths =
            (cmd?.find((e) => e.name === GENERATE)?.value as string[]) ?? [];

        if (!paths.length) {
            console.log(`${WARN} No paths provided to generate.`);
            return;
        }

        console.log(`${INFO} Generating the following paths:`);
        const content = paths.map((p: string) => chalk.green(p)).join("\n");
        flags?.forEach((flag, i) => {
            console.log(
                `${INFO} ${chalk.green(flag.name)} option is enabled.${i + 1 == flags?.length ? "\n" : ""}`,
            );
        });

        Box(content, {
            borderColor: "green",
            padding: 1,
            title: chalk.bold.green("Files"),
        });

        if (!flags?.find((e) => e.name == "force")) {
            await this.validatePaths(paths);
        } else {
            await this.deleteFiles(paths);
        }
        await this.generatePaths(paths);

        console.log(
            `${INFO} Successfully generated ${chalk.cyan(paths.length)} file(s).`,
        );
    }

    async validatePaths(paths: string[]): Promise<void> {
        for (const rawPath of paths) {
            const fullPath = join(rawPath);
            if (await exists(fullPath)) {
                console.log(
                    `${WARN} Path already exists: ${chalk.yellow(fullPath)}`,
                );
                console.log(
                    `${INFO} Try using ${chalk.green("--force")} option to overwrite!`,
                );
                process.exit(1);
            }
        }
    }
    async deleteFiles(paths: string[]): Promise<void> {
        for (const rawPath of paths) {
            const fullPath = join(rawPath);
            if (await exists(fullPath)) {
                await remove(fullPath);
                console.log(`${INFO} Deleted File: ${fullPath}`);
            }
        }
    }

    async generatePaths(paths: string[]): Promise<void> {
        const tasks = paths.map(async (rawPath) => {
            const fullPath = join(rawPath);
            const isFile = fullPath.split("/").pop()?.includes(".");

            try {
                if (isFile) {
                    await ensureFile(fullPath);
                } else {
                    await ensureDir(fullPath);
                }
            } catch (err) {
                console.log(`${ERROR} Failed to create: ${rawPath}`);
            }
        });

        await Promise.all(tasks);
    }
}
