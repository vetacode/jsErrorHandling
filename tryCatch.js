'use strict';

//The “try…catch” syntax
try {
  // code...
} catch (err) {
  // error handling
}

//Example no runtime errors
try {
  console.log('Start of try runs'); // (1) <--

  // ...no errors here

  console.log('End of try runs'); // (2) <--
} catch (err) {
  console.log('Catch is ignored, because there are no errors'); // (3)
}

//Example with runtime errors
try {
  console.log('Start of try runs'); // (1) <--

  lalala; // error, variable is not defined!

  console.log('End of try (never reached)'); // (2) will not printed
} catch (err) {
  // builds err object
  console.log(`Error has occurred!`); // (3) <-- catch error messages
}

//NOTES: try...catch only works for runtime errors (the code must be runnable, no wrong syntax)
// try {
//   {{{{{{{{{{{{
// } catch (err) {
//   console.log("The engine can't understand this code, it's invalid");
// }

//NOTES: try...catch works synchronously. doesnt work in setTimeout
try {
  setTimeout(function () {
    // noSuchVariable; // script will die here
  }, 1000);
} catch (err) {
  console.log("won't work");
}
//Solution for setTimeout: put it inside the function
setTimeout(function () {
  try {
    noSuchVariable; // try...catch handles the error!
  } catch {
    console.log('error is caught here!');
  }
}, 1000);

//Error OBJECT
//has 2 main props: name and message
//additional prop: stack: a string with info of current call stack, use for debugging
try {
  lalala; // error, variable is not defined!
} catch (err) {
  console.log(err.name); // ReferenceError
  console.log(err.message); // lalala is not defined
  console.log(err.stack); // ReferenceError: lalala is not defined at (...call stack)

  // Can also show an error as a whole
  // The error is converted to string as "name: message"
  console.log(err); // ReferenceError: lalala is not defined
}

//Optional “catch” binding
try {
  // ...
} catch {
  // <-- without (err): if we dont need error details
  // ...
}

//USE CASES
let json = '{bad json files}';

try {
  let user = JSON.parse(json);
  console.log(user.name);
} catch (err) {
  console.log(err.name);
  console.log(err.message);
  console.log(`Maaf, terjadi error: ${err.name}, coba reload kembali`);
}

//Throwing our own errors
//SYNTAX: throw <error object>
{
  let json = '{ "age" : 25 }';

  try {
    let user = JSON.parse(json);

    if (!user.name) {
      throw new SyntaxError('Incomplete data: no name'); //error throws here coz no name props from JSON file
    }
    console.log(user.name); //this not runs
  } catch (err) {
    console.log(`JSON Error: ${err.message}`);
  }
}

//Rethrowing
//Check the ERROR TYPE using "instanceof"
try {
  user = {};
} catch (err) {
  if (err instanceof ReferenceError) {
    console.log('Reference Error');
  }
}

{
  let json = '{ "age": 30 }'; // incomplete data
  try {
    let user = JSON.parse(json);

    if (!user.name) {
      throw new SyntaxError('Incomplete data: no name');
    }

    blabla(); // unexpected error

    console.log(user.name);
  } catch (err) {
    if (err instanceof SyntaxError) {
      console.log('JSON Error: ' + err.message);
    } else {
      throw err; // rethrow (*)
    }
  }
}

//re-try..catch using readData at the outer env

{
  function readData() {
    let json = '{"umur": 20}';

    try {
      let user = JSON.parse(json);
      console.log(user);
      if (!user.umur) {
        throw new SyntaxError('Ada error Syntax' + err.name);
      }

      blablalba;
      console.log(user.name);
    } catch (err) {
      if (!(err instanceof SyntaxError)) throw err;
    }
  }
  try {
    readData();
  } catch (err) {
    console.log('External catch got: ' + err);
  }
}

//TRY..CATCH..FINALLY
/*
try {
   ... try to execute the code ...
} catch (err) {
   ... handle errors ...
} finally {
   ... execute always ...
}
*/

try {
  console.log('try');
  console.log('string' == true);
  if ('Make an error?' == true) BAD_CODE();
} catch (err) {
  console.log('catch');
} finally {
  console.log('finally');
}

//Fibonacci
let num = 3;

let diff, result;

function fib(n) {
  if (n < 0 || Math.trunc(n) != n) {
    throw new Error('Must not be negative, and also an integer.');
  }
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

let start = Date.now();

try {
  result = fib(num);
} catch (err) {
  console.log(err.message);
  result = 0;
} finally {
  diff = Date.now() - start;
}

console.log(result || 'error occurred');

console.log(`execution took ${diff}ms`);

//Fastest Fibo O(log n), big nums
function fib(n) {
  if (n < 0 || Math.trunc(n) !== n) {
    throw new Error('Invalid input');
  }

  function fibFast(n) {
    if (n === 0) return [0n, 1n];

    const [a, b] = fibFast(Math.floor(n / 2));
    const c = a * (2n * b - a);
    const d = a * a + b * b;

    if (n % 2 === 0) {
      return [c, d];
    } else {
      return [d, c + d];
    }
  }

  return fibFast(n)[0];
}

console.log(fib(111)); // Instant
console.log(fib(100000)); // Instant
console.log(fib(1000000)); // Still extremely fast

//Try..finally
function func() {
  // start doing something that needs completion (like measurements)
  try {
    // ...
  } finally {
    // complete that thing even if all dies
  }
}

/**TASK
 * Finally or just the code?
importance: 5
Compare the two code fragments.

The first one uses finally to execute the code after try...catch:

try {
  work work
} catch (err) {
  handle errors
} finally {
  cleanup the working space
}
The second fragment puts the cleaning right after try...catch:

try {
  work work
} catch (err) {
  handle errors
}

cleanup the working space
We definitely need the cleanup after the work, doesn’t matter if there was an error or not.

Is there an advantage here in using finally or both code fragments are equal? If there is such an advantage, then give an example when it matters.
 */

function f() {
  try {
    console.log('start');
    throw new Error('an error');
  } catch (err) {
    // ...
    console.log('string' == true);
    if ("can't handle the error") {
      //truthy
      console.log('runs');
      throw err;
    }
  } finally {
    console.log('cleanup!');
  }
}

f(); // cleanup!
