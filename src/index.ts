import "./main.scss";
const e = (a: number = 1, b: number = 5) => {
  return a + b;
};
document
  .querySelectorAll("#t1")
  .forEach((x) => (x.textContent = "changed bw js"));
