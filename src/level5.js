import {
  map,
  compose,
  filter,
  reduce,
  append,
  pluck,
  lt,
  __,
  join,
  prop,
  path,
  pipe
} from "ramda";
import { test } from "tape-modern";

/**
 * Level 5 - Ramda All The Things
 *
 * Results Data
 */

const data = {
  rows: [
    {
      key: "1",
      doc: {
        _id: "1",
        type: "movie",
        name: "Ghostbusters",
        year: "1984"
      }
    },
    {
      key: "2",
      doc: {
        _id: "2",
        type: "movie",
        name: "Caddyshack",
        year: "1980"
      }
    },
    {
      key: "2",
      doc: {
        _id: "3",
        type: "movie",
        name: "Groundhog Day",
        year: "1993"
      }
    }
  ]
};

/**
 * Level 5 - Challenge 1
 *
 * map through the data.rows array and return a list of movie docs.
 */
const challenge1 = () => {
  const { rows } = data;
  const mapper = movie => movie.doc;
  const movieDocs = map(mapper, rows);
  return movieDocs;
};

/** Level 5 = Challenge 2
 *
 * map through the data.rows array and then filter all movies that were
 * filmed before 1990
 *
 */
const challenge2 = () => {
  const { rows } = data;
  const filterer = doc => doc.year < 1990;
  const filteredMovies = filter(filterer);
  const mapper = movie => movie.doc;
  const mappedMovies = map(mapper);
  const composer = compose(
    filteredMovies,
    mappedMovies
  );
  const pre90sMovies = composer(rows);

  return pre90sMovies;
};

/** level 5 - Challenge 3
 *
 * Use reduce to group movies by decade 80s, 90s etc
 *  { '80s': [], '90s': [] }
 *
 * HINT: you will want to append each movie to the right group array
 * check out - append - http://ramdajs.com/docs/#append
 */
const challenge3 = () => {
  const { rows } = data;
  const reducer = reduce(
    (acc, val) => {
      if (val.year >= 1980 && val.year < 1990) {
        acc["80s"] = append(val, acc["80s"]);
      } else if (val.year > 1990 && val.year < 2000) {
        acc["90s"] = append(val, acc["90s"]);
      }
      return acc;
    },
    { "80s": [], "90s": [] },
    map(row => row.doc, rows)
  );

  return reducer;
};

/**
 * Level 5 - Challenge 4
 *
 * map over the rows and pick the movie documents
 * transform to an array of strings `[name] - [year]`
 * then transform to a set of list items - `<li>${movie}</li>`
 *
 * use the compose function to only map once.
 *
 */
const challenge4 = () => {
  const { rows } = data;
  const getDoc = row => row.doc;
  const mapper = doc => `${doc.name} - ${doc.year}`;
  const convertToLiItem = movie => `<li>${movie}</li>`;
  const piperFn = pipe(
    getDoc,
    mapper,
    convertToLiItem
  );
  const movieListItems = map(piperFn);

  return movieListItems(rows);
};

export default () => {
  test("Level 5 - Challenge 1", t => {
    t.deepequals(pluck("doc", data.rows), challenge1());
  });

  test("Level 5 - Challenge 2", t => {
    t.deepequals(
      filter(
        compose(
          lt(__, "1990"),
          prop("year")
        ),
        pluck("doc", data.rows)
      ),
      challenge2()
    );
  });

  test("Level 5 - Challenge 3", t => {
    t.deepequals(challenge3(), {
      "90s": [{ _id: "3", type: "movie", name: "Groundhog Day", year: "1993" }],
      "80s": [
        { _id: "1", type: "movie", name: "Ghostbusters", year: "1984" },
        { _id: "2", type: "movie", name: "Caddyshack", year: "1980" }
      ]
    });
  });

  test("Level 5 - Challenge 4", t => {
    t.equal(
      challenge4().join(""),
      "<li>Ghostbusters - 1984</li><li>Caddyshack - 1980</li><li>Groundhog Day - 1993</li>"
    );
  });
};
