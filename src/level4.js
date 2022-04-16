import { test } from "tape-modern";
import getCards from "./lib/get-cards";
import { map, filter, reduce, compose, prop, propEq, or } from "ramda";
import pipe from "ramda/src/pipe";

export default function() {
  const ex1 = "Use map to transform list of card data to list of images";
  const exercise1 = _ => {
    const { cards } = getCards();
    const mapper = card => `<img src=${card.image} />`;
    const images = map(mapper, cards);
    console.log(images);
    return images;
  };

  const ex2 = "Use filter to filter list of cards of the suit clubs";
  const exercise2 = _ => {
    const { cards } = getCards();
    const clubs = propEq("suit", "CLUBS");
    const filterClubs = card => clubs(card);
    const allClubs = filter(filterClubs, cards);
    return allClubs;
  };

  const ex3 =
    "Use reduce and count the number of cards that have a value of 8 or value of 6";
  const exercise3 = _ => {
    const { cards } = getCards();
    const sixOrEight = (acc, val) =>
      val.value === "8" || val.value === "6" ? acc + 1 : acc;
    const reducer = reduce(sixOrEight, 0, cards);
    return reducer;
  };

  const ex4 = `Use map, filter and reduce with compose
    to show all cards as images that contain values of 8 or 6`;
  const exercise4 = _ => {
    const { cards } = getCards();

    // first, filter out all of the 8's and 6's
    const filterFn = card => card.value === "8" || card.value === "6";
    const filterer = filter(filterFn);

    // reduce filtered to just images
    const reducer = (acc, val) => acc + `${val}`;
    const reducedToImages = reduce(reducer, "");

    // second, map over the filtered cards and get just the images
    const mapper = card => `<img src=${card.image} />`;
    const mapImages = map(mapper);

    const composer = compose(
      reducedToImages,
      mapImages,
      filterer
    );

    const sixOrEightPics = composer(cards);

    console.log(sixOrEightPics);
    return sixOrEightPics;
  };

  /* tests to validate exercises go here */
  test("Level 4", assert => {
    assert.deepequals(
      exercise1(),
      [
        "<img src=http://deckofcardsapi.com/static/img/6H.png />",
        "<img src=http://deckofcardsapi.com/static/img/7H.png />",
        "<img src=http://deckofcardsapi.com/static/img/KS.png />",
        "<img src=http://deckofcardsapi.com/static/img/2D.png />",
        "<img src=http://deckofcardsapi.com/static/img/QS.png />",
        "<img src=http://deckofcardsapi.com/static/img/0C.png />",
        "<img src=http://deckofcardsapi.com/static/img/8H.png />",
        "<img src=http://deckofcardsapi.com/static/img/JD.png />",
        "<img src=http://deckofcardsapi.com/static/img/8C.png />"
      ],
      ex1
    );

    assert.deepequals(
      exercise2(),
      [
        {
          code: "0C",
          image: "http://deckofcardsapi.com/static/img/0C.png",
          images: {
            png: "http://deckofcardsapi.com/static/img/0C.png",
            svg: "http://deckofcardsapi.com/static/img/0C.svg"
          },
          suit: "CLUBS",
          value: "10"
        },
        {
          code: "8C",
          image: "http://deckofcardsapi.com/static/img/8C.png",
          images: {
            png: "http://deckofcardsapi.com/static/img/8C.png",
            svg: "http://deckofcardsapi.com/static/img/8C.svg"
          },
          suit: "CLUBS",
          value: "8"
        }
      ],
      ex2
    );
    assert.equal(exercise3(), 3, ex3);
    assert.equal(
      exercise4(),
      "<img src=http://deckofcardsapi.com/static/img/6H.png /><img src=http://deckofcardsapi.com/static/img/8H.png /><img src=http://deckofcardsapi.com/static/img/8C.png />",
      ex4
    );
  });
}
