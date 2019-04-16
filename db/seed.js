const mongoose = require("mongoose");
require("../src/models");
const Catalog = mongoose.model("Catalog");
const User = mongoose.model("User");
const Request = mongoose.model("Request");

mongoose.connect(
  "mongodb://localhost:27017/add-drop",
  { useNewUrlParser: true }
);

console.log("SEEDING...");

seedWithExplicitData()
  .then(console.log("Finished loading explicit data"))
  .then(() => process.exit(0))
  .then(e => console.log(e));

function seedWithExplicitData() {
  return Promise.all([
    User.remove({}, () =>
      User.insertMany([
        {
          firstName: "Test",
          lastName: "Subject",
          email: "test1@test.com",
          phoneNumber: "1111111111",
          requests: [],
          contactPref: "email"
        },
        {
          firstName: "John",
          lastName: "Doe",
          email: "test2@test.com",
          phoneNumber: "222222222",
          requests: [],
          contactPref: "email"
        },
        {
          firstName: "Bill",
          lastName: "Subject",
          email: "test3@test.com",
          phoneNumber: "3333333333",
          requests: [],
          contactPref: "email"
        },
        {
          firstName: "Yes",
          lastName: "No",
          email: "test4@test.com",
          phoneNumber: "4444444444",
          requests: [],
          contactPref: "email"
        }
      ])
    ),
    Request.remove({}, () => Request.insertMany([
      { department: "Test", section: "test", level: "test" }
    ]))
  ]);
}
