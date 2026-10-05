const mongoose = require("mongoose");

/**
 * LEVEL 1 — Validation inside the database itself
 *
 * Here the rules live on the MongoDB collection, not in our Node code.
 * MongoDB checks every insert and update against them, so a bad document
 * is rejected no matter where it came from: our Express route, Compass,
 * the mongo shell, or a completely different service.
 *
 * Think of this as the last line of defence. Even if someone forgets the
 * validation in the application layer, the database still says no.
 */
async function createBookingSchema() {
  // mongoose.connection.db gives us the native MongoDB driver's db object.
  // We need it because createCollection is a driver feature, not a
  // mongoose-model feature. So call this only after the connection is open.
  const db = mongoose.connection.db;

  try {
    await db.createCollection("bookings", {
      validator: {
        // $jsonSchema is MongoDB's own schema language. Note that it uses
        // BSON types, not JavaScript types, so we write "string" and "int"
        // instead of String and Number.
        $jsonSchema: {
          bsonType: "object",

          // These three fields must be present in every document.
          // Any field not listed here stays optional.
          required: ["movieName", "customerName", "tickets"],

          properties: {
            movieName: { bsonType: "string" },
            customerName: { bsonType: "string" },

            // Careful: "int" is strict. A JavaScript number like 2.0 is a
            // double in BSON and will be rejected. Use "number" if you want
            // to accept any numeric type.
            tickets: { bsonType: "int" },
          },
        },
      },
    });
  } catch (error) {
    // createCollection throws if the collection already exists, which happens
    // on every restart after the first one. That is harmless, so we swallow it.
    //
    // Important limitation: because of this, changing the rules above will NOT
    // update an existing collection. To change rules on a live collection, run
    // the collMod command instead:
    //
    //   await db.command({ collMod: "bookings", validator: { ... } });
  }
}

module.exports = createBookingSchema;
