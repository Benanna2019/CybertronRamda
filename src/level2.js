import { test } from "tape-modern";
import hex2color from "./lib/hex2color";
import { map, filter, reduce, compose, includes } from "ramda";

export default function() {
  /* Level 2 - colors */

  const ex1 =
    "Use map and the hex2color function to convert list of hex values to list of colors";
  const exercise1 = _ => {
    const hexes = ["#0000ff", "#f5f5dc", "#cd853f", "#663399", "#ffa500"];
    const mapArray = array => map(hex2color, array);
    const mappedHexes = mapArray(hexes);
    console.log(mappedHexes);
    return mappedHexes;
  };

  const ex2 =
    "Use filter and the hex2color function to filter list of hex values to only list colors that are not blue, red, or green";
  const exercise2 = _ => {
    const hexes = ["#0000ff", "#f5f5dc", "#cd853f", "#663399", "#ffa500"];
    const notRGB = val => {
      const color = hex2color(val);
      return color !== "red" && color !== "blue" && color !== "green";
    };

    const filteredHexes = filter(notRGB, hexes);

    return filteredHexes;
  };

  const ex3 =
    "Use reduce and the hex2color function to count list of hex values than have r in their name";
  const exercise3 = _ => {
    const hexes = ["#0000ff", "#f5f5dc", "#cd853f", "#663399", "#ffa500"];
    const reducer = (acc, val) => {
      const color = hex2color(val);
      if (color.indexOf("r") > -1) {
        acc++;
      }
      return acc;
    };
    return reduce(reducer, 0, hexes);
  };

  const ex4 =
    'Use map, filter and reduce with compose to convert all hex codes to colors then filter out (blue, red, green) and count all the colors that contain a "b"';
  const exercise4 = _ => {
    const hexes = ["#0000ff", "#f5f5dc", "#cd853f", "#663399", "#ffa500"];
    const convert2color = map(hex2color);
    const notRGB = val => {
      const color = val;
      return color !== "red" && color !== "blue" && color !== "green";
    };
    const filterRGB = filter(notRGB);
    const counter = (acc, value) => {
      if (value.includes("b")) {
        acc = acc + 1;
      }
      return acc;
    };
    const countColorsWithBlue = reduce(counter, 0);
    const answer = compose(
      countColorsWithBlue,
      filterRGB,
      convert2color
    )(hexes);
    console.log(answer);
    return answer;
  };

  /* tests to validate exercises go here */
  test("Level 2", assert => {
    assert.deepequals(
      exercise1(),
      ["blue", "beige", "peru", "rebeccapurple", "orange"],
      ex1
    );
    assert.deepequals(
      exercise2(),
      ["#f5f5dc", "#cd853f", "#663399", "#ffa500"],
      ex2
    );
    assert.equal(exercise3(), 3, ex3);
    assert.equal(exercise4(), 2, ex4);
  });
}
