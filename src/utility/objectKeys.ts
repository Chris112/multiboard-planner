/**
 * Get the keys of an object as an array of strings.
 * Fixes the issue where Object.keys() returns a string[] instead of inferring the type of the keys.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * const keys = objectKeys(obj); // ("a" | "b" | "c")[]
 */
export const objectKeys = <Obj extends Record<string, unknown>>(obj: Obj) =>
  Object.keys(obj) as (keyof Obj)[];
