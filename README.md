# Desc DB

[![build status][travis-image]][travis-url]
[![coverage status][codecov-image]][codecov-url]

Lets store data in description fields.
Because we don't have a better place to put them.

```json
{
    "body": "Big description of\nsomething",
    "string": "data",
    "number": 123
}
```

Becomes:

> Big description of
> something
>
> string: "data"
> number: 123

## Installation

`npm i smujmaiku/body-meta`

## Methods

### `encode`

Encodes an Object into a single string placing the `body` value on top

### `decode`

Decodes a string into a single Object

## License

Copyright (c) 2016-2019, Michael Szmadzinski. (MIT License)

[travis-image]: https://travis-ci.org/smujmaiku/body-meta.svg?branch=master
[travis-url]: https://travis-ci.org/smujmaiku/body-meta
[codecov-image]: https://coveralls.io/repos/github/smujmaiku/body-meta/badge.svg
[codecov-url]: https://coveralls.io/github/smujmaiku/body-meta
