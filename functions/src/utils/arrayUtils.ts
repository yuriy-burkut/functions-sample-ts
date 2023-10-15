/**
 * Will divide original array into array of chunks
 * @param { Array } array
 * @param { number } chunkSize
 */
export function* chunks<T>(array: Array<T>, chunkSize: number): Generator<T[], void> {
  for (let i = 0; i < array.length; i += chunkSize) {
    yield array.slice(i, i + chunkSize);
  }
}
