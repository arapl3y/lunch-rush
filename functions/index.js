const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const capitalizeSentence = require("capitalize-sentence");
const Filter = require("bad-words");
const badWordsFilter = new Filter();

// Moderates names by lowering all uppercase names and removing swearwords.
exports.moderator = functions.database
  .ref("/restaurants/{name}")
  .onWrite(event => {
    const name = event.data.val();

    if (name && !name.sanitized) {
      // Retrieved the name values.
      console.log("Retrieved name content: ", name);

      // Run moderation checks on on the name and moderate if needed.
      const moderatedName = moderateName(name.text);

      // Update the Firebase DB with checked name.
      console.log("Name has been moderated. Saving to DB: ", moderatedName);
      return event.data.adminRef.update({
        text: moderatedName,
        sanitized: true,
        moderated: name.text !== moderatedName
      });
    }
  });

// Moderates the given name if appropriate.
function moderateName(name) {
  // Re-capitalize if the user is Shouting.
  if (isShouting(name)) {
    console.log("User is shouting. Fixing sentence case...");
    name = stopShouting(name);
  }

  // Moderate if the user uses SwearWords.
  if (containsSwearwords(name)) {
    console.log("User is swearing. moderating...");
    name = moderateSwearwords(name);
  }

  return name;
}

// Returns true if the string contains swearwords.
function containsSwearwords(name) {
  return name !== badWordsFilter.clean(name);
}

// Hide all swearwords. e.g: Crap => ****.
function moderateSwearwords(name) {
  return badWordsFilter.clean(name);
}

// Detect if the current name is shouting. i.e. there are too many Uppercase
// characters or exclamation points.
function isShouting(name) {
  return (
    name.replace(/[^A-Z]/g, "").length > name.length / 2 ||
    name.replace(/[^!]/g, "").length >= 3
  );
}

// Correctly capitalize the string as a sentence (e.g. uppercase after dots)
// and remove exclamation points.
function stopShouting(name) {
  return capitalizeSentence(name.toLowerCase()).replace(/!+/g, ".");
}
