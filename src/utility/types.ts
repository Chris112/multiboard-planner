/**
 * ExtractKeys
 * Extracts the keys of an array of objects
 * @param TArray - The array of objects
 * @param Key - The key to extract
 * @returns The union of the keys
 * @example
 * const testData = [{ label: "a" }, { label: "a" }, { label: "b" }] as const;
 * type ExtractLabels<T extends ReadonlyArray<{ label: string }>> =
 *  T[number]["label"];
 * = "a" | "b"
 *
 */
export type ExtractKeys<
  TArray extends ReadonlyArray<Record<Key, unknown>>,
  Key extends keyof TArray[number],
> = TArray[number][Key];

type UnionToIntersection<U> = (
  U extends never ? never : (arg: U) => never
) extends (arg: infer I) => void
  ? I
  : never;

export type UnionToTuple<T> =
  UnionToIntersection<T extends never ? never : (t: T) => T> extends (
    _: never
  ) => infer W
    ? [...UnionToTuple<Exclude<T, W>>, W]
    : [];
