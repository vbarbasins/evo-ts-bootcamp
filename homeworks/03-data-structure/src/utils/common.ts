export const assertNever = (arg: never): never => {
  throw new Error(`Unexpected argument: ${arg}`);
};
