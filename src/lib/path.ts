import { join as JOIN } from "path";

/**
 * Resolves a given relative path from the current working directory.
 *
 * @param path - A relative file or directory path to be joined with the current working directory.
 * @returns The absolute path constructed from the current working directory and the given relative path.
 *
 * @example
 * ```ts
 * const absolutePath = join("src/index.ts");
 * // Returns something like: "/Users/username/project/src/index.ts"
 * ```
 */
export function join(path: string): string {
    return JOIN(process.cwd(), path);
}
