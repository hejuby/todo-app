/*
  Inspired by await-to-js
  https://github.com/scopsy/await-to-js
  // Usage
  const [err, data] = await to(myPromise());
  if (!data) throw new Error(err?.message);
  data.doSomething()
*/

export default async function to<T, E = Error>(
    promise: Promise<T>
): Promise<[E, null] | [null, T]> {
    try {
        const data = await promise;
        const result: [null, T] = [null, data];

        return result;
    } catch (error) {
        if (error instanceof Error) {
            return [error as E, null];
        }

        return [{ message: "알 수 없는 오류가 발생했습니다" } as E, null];
    }
}
