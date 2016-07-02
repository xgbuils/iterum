# Iterum delegation

After knowing the [Iterum API](#api), it is important to realize that Iterum instances do not produce Iterum instance values. For example, if we have a List Iterum instance with Range as a value of this list. This list **will not** produce a range value:

``` javascript
var list = List([1, Range(2, 4), 5])

var iterator = list.build()()
iterator.next() // {value: 1, done: false}
iterator.next() // {value: Range(2, 4), done: false} <- NEVER IT RETURNS THIS
iterator.next() // {value: undefined, done: false}
iterator.next() // {value: und, done: true}
```

Instead, Iterum instance delegates on inner Iterum instance an provides its values:

``` javascript
var iterator = list.build()()
iterator.next() // {value: 1, done: false}
iterator.next() // {value: 2, done: false} // delegates on Range(2, 4)
iterator.next() // {value: 3, done: false} // continues on Range(2, 4)
iterator.next() // {value: 3, done: false} // continues on Range(2, 4)
iterator.next() // {value: 5, done: false} // come back to outer Iterum instance 
iterator.next() // {value: undefined, done: true}
```

## Other examples

### Range repetition
``` javascript
var repeat = Repeat(Range(1, 3), 3)
var array = repeat.toArray() // [1, 2, 3, 1, 2, 3, 1, 2, 3]
```

### Iterum instance values inside array Cartesian parameters
``` javascript
var cartesian = Cartesian(
    [Range(1, 2)]
    [3, 4]
)
var iterator = cartesian.build()()
iterator.next() // {value: [1, 3], done: false}
iterator.next() // {value: [1, 4], done: false}
iterator.next() // {value: [2, 3], done: false}
iterator.next() // {value: [2, 4], done: false}
iterator.next() // {value: undefined, done: true}
```

### Concatenation using List
``` javascript
var list = List(Range(5, 1, -1), Value(10), Empty(), Repeat(2, 3))
var array = list.toArray() // [5, 4, 3, 2, 1, 10, 2, 2, 2]
```
