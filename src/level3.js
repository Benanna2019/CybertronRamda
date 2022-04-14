import { test, assert } from 'tape-modern'
import { map, filter, reduce, compose, prop } from 'ramda'
import { propEq } from 'ramda'

const stars = [
  { first: 'elvis', last: 'presley', alive: false },
  { first: 'jim', last: 'morrison', alive: false },
  { first: 'bob', last: 'dylan', alive: true },
  { first: 'buddy', last: 'holly', alive: false }
]


const fullname = name => ({fullname: `${prop('first', name)} ${prop('last', name)}`})

const originalFullname = name => `${prop('first', name)} ${prop('last', name)}`

/* Level 3 - rockstars */

export default function() {
  const ex1 =
    'Use map to transform list of rockstar first,last name objects to objects with fullname'
  const exercise1 = _ => {
    const mappedStars = map(fullname, stars)
    console.log(mappedStars)
    return mappedStars
  }






  const ex2 = 'Use filter to filter list of rockstars that are still alive'
  const exercise2 = _ => {
    const alive = propEq('alive', true)
    const filterAlive = filter(alive, stars)
    console.log(filterAlive)
    return filterAlive
  }






  const ex3 =
    'Use reduce and count the number of stars that are no longer living'
  const exercise3 = _ => {
    const whoIsDead = reduce((acc, item) => item.alive === false ? acc + 1 : acc, 0, stars)
    return whoIsDead
  }






  const ex4 =
    'Use map, filter and reduce with compose show a concatenated string of the fullnames of each alive star'
  const exercise4 = _ => {
  
  
    const filterer = filter(propEq('alive', true))
    const mapper = map(fullname)

    const reducer = reduce((acc, val) => prop('fullname', val), [])

    const composer = compose(reducer, mapper, filterer)
    return composer(stars)
  }

  /* tests to validate exercises go here */
  test('Level 3', assert => {
    assert.deepequals(
      exercise1(),
      [
        { fullname: 'elvis presley' },
        { fullname: 'jim morrison' },
        { fullname: 'bob dylan' },
        { fullname: 'buddy holly' }
      ],
      ex1
    )

    assert.deepequals(
      exercise2(),
      [{ first: 'bob', last: 'dylan', alive: true }],
      ex2
    )
    assert.equal(exercise3(), 3, ex3)
    assert.equal(exercise4(), 'bob dylan', ex4)
  })
}
