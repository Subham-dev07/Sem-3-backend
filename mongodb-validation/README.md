# Validation in a Mongoose + Express app

Reference code from class. Nothing here is imported by `index.js` — read it,
borrow from it, but the main app stays clean.

Validation can sit at three different depths. They are not alternatives; a
real project usually uses more than one, and each catches what the others
cannot.

| File | Level | What it guards |
| --- | --- | --- |
| `zodValidation.js` | Request | The incoming `req.body`, before any model or database call |
| `employeSchema.js` | Schema | The document, inside mongoose, before it reaches MongoDB |
| `bookingSchema.js` | Database | The collection itself, enforced by MongoDB for every client |

## How to think about the three

**Request level (zod)** is the cheapest and the most specific to an endpoint.
It knows about HTTP: strings arriving instead of numbers, extra fields a
client should not be sending. Reject here and you never touch the database.

**Schema level (mongoose)** describes your data model, not one endpoint, so
every route that saves an `Employee` gets the same rules for free. Watch out
for one trap: these validators run on `save()` and `create()`, but update
methods such as `findByIdAndUpdate` skip them unless you pass
`{ runValidators: true }`.

**Database level (`$jsonSchema`)** is the only one that still applies when the
write does not come from your application — Compass, the mongo shell, a
migration script, another service. Slowest to change, hardest to bypass.

## A note on `createBookingSchema()`

`db.createCollection()` only applies the validator when it creates the
collection, which is why the function swallows the "already exists" error.
Editing the rules in that file will not change a collection that already
exists; run the `collMod` command for that. The function used to be called
from `connect.js` once the connection was open, and that call has been
removed now that the app no longer uses it.
