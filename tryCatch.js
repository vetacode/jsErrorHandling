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
