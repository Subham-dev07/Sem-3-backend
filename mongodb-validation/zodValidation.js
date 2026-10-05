const { z } = require("zod");

/**
 * LEVEL 3 — Validation at the edge of the request
 *
 * This runs the moment the request arrives, before any model or database
 * call. It is the cheapest place to reject bad input, and it keeps your
 * route handlers honest: once the data is parsed, you know its shape.
 *
 * Why bother when mongoose already validates? Because zod validates the
 * request body, not the document. Use it to catch extra fields, wrong types
 * and missing values early, and let mongoose guard the data model itself.
 */
const employeeZodSchema = z.object({
  // Chain the rules you need. Each link is a separate check, and zod reports
  // all of the failures together rather than stopping at the first one.
  employeeName: z.string().min(3).max(30),

  // z.number() is strict: the JSON body must contain 2, not "2". Query
  // params and form data always arrive as strings, so reach for
  // z.coerce.number() there.
  age: z.number(),

  department: z.string(),
  isPermanent: z.boolean(),
  workEmail: z.string(),

  // JSON has no date type, so the value arrives as a string. coerce converts
  // it to a real Date for us and fails if the string is not a valid date.
  joinedOn: z.coerce.date(),
});

/**
 * Two ways to run it:
 *
 *   parse(data)      throws a ZodError when the data is invalid, so it needs
 *                    a try/catch around it.
 *   safeParse(data)  never throws. It returns { success, data, error } and
 *                    lets you branch on success yourself.
 *
 * Inside a route, parse reads well because the catch block is already there:
 *
 *   app.post("/employees", async function (req, res) {
 *     try {
 *       const validData = employeeZodSchema.parse(req.body);
 *       const employee = await Employee.create(validData);
 *       res.status(201).json(employee);
 *     } catch (error) {
 *       res.status(400).json({ message: error.message });
 *     }
 *   });
 *
 * Once you are comfortable with this, move it into a middleware so the
 * validation is not repeated in every handler.
 */
module.exports = employeeZodSchema;
