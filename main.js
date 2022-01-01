import { makeNoise2D } from "https://cdn.skypack.dev/fast-simplex-noise";
import { h, render, Fragment } from "https://cdn.skypack.dev/preact";

const noise2D = makeNoise2D();

const circles = [];
const hue = Math.random() * 360;

for (let i = 0; i < 100; i++) {
  const cx = i % 10;
  const cy = Math.floor(i / 10);
  // around 10000000000000 you get straight rows
  const wowFactor = -100000000000000;
  const n = noise2D(cx * wowFactor, cy * wowFactor)
  const r = (n + 1) / 4;
  circles.push({ cx, cy, r, fill: `hsl(${hue * r} ${ 20 + n * 60 }% ${ 70 - n * 30 }%)` });
  console.log(cx, cy, r);
}

const CircleMatrix = () => {

  return h(
    "svg",
    { viewBox: "-1 -1 11 11" },
    circles.map((props) => h("circle", props))
  );
};

const App = () => h(
  Fragment,
  {},
  [...new Array(32)].map(_ => CircleMatrix()),
)

render(h(App), document.getElementById("app"));
