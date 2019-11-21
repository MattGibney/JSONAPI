# JSONAPI Serialiser

Configured with a simple interface, this library converts POJOs into JSONAPI
and back again. This library is, by no means, complete. I'm mostly interested in
using it for my EmberJS apps. As a result, i'll only be adding the bare minimum 
functionality as and when I need it. PRs are very welcome, if you find an issue
or want some new functionality. Please contribute! :)

## Installation

This package is distributed via Github Packages.

```
npm install @moppler/jsonapi
```

## Usage

### Serialize

```
const jsonAPI = require('@moppler/jsonapi');

// POJO
const book = {
  bookId: 222,
  name: 'The wind in the willows',
  authorId: 1
}
const mapperObject = {
  id: 'bookId',
  type: 'books',
  attributes: {
    name: 'name'
  },
  relationships: {
    author: {
      type: 'author',
      id: 'authorId'
    }
  }
};

const output = jsonAPI.serialise(mapperObject, book)
// Output
{
  data: {
    id: 222,
    type: 'books',
    attributes: 'The wind in the willows',
    relationships: {
      author: {
        type: 'author',
        id: 1
      }
    }
  }
}
```