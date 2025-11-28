'use strict';

//EXTENDING ERRORS

class Error {
  constructor(message) {
    this.message = message;
    this.name = 'Error';
    // this.stack = <call stack />;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Usage
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new ValidationError('No field: age');
  }
  if (!user.name) {
    throw new ValidationError('No field: name');
  }

  return user;
}

// Working example with try..catch

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
    console.log('Invalid data: ' + err.message); // Invalid data: No field: name
  } else if (err instanceof SyntaxError) {
    // (*)
    console.log('JSON Syntax Error: ' + err.message);
  } else {
    throw err; // unknown error, rethrow it (**)
  }
}

//FURTHER INHERITANCE
{
  class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ValidationError';
    }
  }

  class PropertyRequiredError extends ValidationError {
    constructor(property) {
      super('No property: ' + property);
      this.name = 'PropertyRequiredError';
      this.property = property;
    }
  }

  // Usage
  function readUser(json) {
    let user = JSON.parse(json);

    if (!user.age) {
      throw new PropertyRequiredError('age');
    }
    if (!user.name) {
      throw new PropertyRequiredError('name');
    }

    return user;
  }

  // Working example with try..catch

  try {
    let user = readUser('{ "age": 25 }');
  } catch (err) {
    if (err instanceof ValidationError) {
      console.log('Invalid data: ' + err.message); // Invalid data: No property: name
      console.log(err.name); // PropertyRequiredError
      console.log(err.property); // name
    } else if (err instanceof SyntaxError) {
      console.log('JSON Syntax Error: ' + err.message);
    } else {
      throw err; // unknown error, rethrow it
    }
  }
}

{
  //AUTONAMING THE ERROR NAME CLASS
  class MyError extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name; // use this.constructor.name
    }
  }

  class ValidationError extends MyError {}

  class PropertyRequiredError extends ValidationError {
    constructor(property) {
      super('No property: ' + property);
      this.property = property;
    }
  }

  // name is correct
  console.log(new PropertyRequiredError('field').name); // PropertyRequiredError
}

//WRAPPING EXCEPTIONS: In order to have a way to get the error details, but only if we need to.
{
  class ReadError extends Error {
    constructor(message, cause) {
      super(message);
      this.cause = cause;
      this.name = 'ReadError';
    }
  }

  class ValidationError extends Error {
    /*...*/
  }
  class PropertyRequiredError extends ValidationError {
    /* ... */
  }

  function validateUser(user) {
    if (!user.age) {
      throw new PropertyRequiredError('age');
    }

    if (!user.name) {
      throw new PropertyRequiredError('name');
    }
  }

  function readUser(json) {
    let user;

    try {
      user = JSON.parse(json);
    } catch (err) {
      if (err instanceof SyntaxError) {
        throw new ReadError('Syntax Error', err);
      } else {
        throw err;
      }
    }

    try {
      validateUser(user);
    } catch (err) {
      if (err instanceof ValidationError) {
        throw new ReadError('Validation Error', err);
      } else {
        throw err;
      }
    }
  }

  try {
    readUser('{bad json}');
  } catch (e) {
    if (e instanceof ReadError) {
      console.log(e);
      // Original error: SyntaxError: Unexpected token b in JSON at position 1
      console.log('Original error: ' + e.cause);
    } else {
      throw e;
    }
  }
}

/**TASK
 * Inherit from SyntaxError
importance: 5
Create a class FormatError that inherits from the built-in SyntaxError class.

It should support message, name and stack properties.

Usage example:

let err = new FormatError("formatting error");

alert( err.message ); // formatting error
alert( err.name ); // FormatError
alert( err.stack ); // stack

alert( err instanceof FormatError ); // true
alert( err instanceof SyntaxError ); // true (because inherits from SyntaxError)
 */
{
  class SyntaxError extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
      // this.stack = 'stack';
    }
  }

  class FormatError extends SyntaxError {
    constructor(message) {
      super(message);
      this.name = 'Format Error';
    }
  }

  let err = new FormatError('formatting error');

  console.log(err.message); // formatting error
  console.log(err.name); // FormatError
  console.log(err.stack); // in node.js shows undefined

  console.log(err instanceof FormatError); // true
  console.log(err instanceof SyntaxError); // true (because inherits from SyntaxError)
}
