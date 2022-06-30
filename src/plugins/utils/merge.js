export default function (target) {
  if (!target) return;
  for (let i = 1; i < arguments.length; i++) {
    Object.assign(target, arguments[i]);
  }
  return target;
}
