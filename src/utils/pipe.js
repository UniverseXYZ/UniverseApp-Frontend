// compose(
//   reverse,
//   uppercase,
//   getName,
// )({ name: '3< gnimmargorp lanoitcnuf evol ew' });
// res: WE LOVE FUNCTIONAL PROGRAMMING <3
export const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((v, f) => f(v), x);

// pipe(
//   getName,
//   uppercase,
//   reverse
// )({ name: '3< gnimmargorp lanoitcnuf evol ew' });
// res: WE LOVE FUNCTIONAL PROGRAMMING <3
export const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x);
