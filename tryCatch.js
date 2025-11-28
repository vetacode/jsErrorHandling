'use strict';

//The “try…catch” syntax
try {
  // code...
} catch (err) {
  // error handling
}

//Example no errors
try {
  console.log('Start of try runs'); // (1) <--

  // ...no errors here

  console.log('End of try runs'); // (2) <--
} catch (err) {
  console.log('Catch is ignored, because there are no errors'); // (3)
}

//Example with errors
try {
  console.log('Start of try runs'); // (1) <--

  lalala; // error, variable is not defined!

  console.log('End of try (never reached)'); // (2)
} catch (err) {
  console.log(`Error has occurred!`); // (3) <--
}
