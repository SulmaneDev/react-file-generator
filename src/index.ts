import { Command } from "commander";

/**
 * Initializes and parses command-line arguments using the Commander library.
 * This serves as the entry point for setting up CLI commands and options.
 */
async function bootstrap() {
    const cmd = new Command();
    cmd.parseAsync(process.argv);
}
await bootstrap();
