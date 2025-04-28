const router = require("express").Router();
let user = require("../models/user");

// Add a new user
router.route("/add").post((req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const homeAddress = req.body.homeAddress;
  const phoneNumber = req.body.phoneNumber;
  const role = req.body.role;
  const password = req.body.password;

  const newUser = new user({
    firstName,
    lastName,
    email,
    homeAddress,
    phoneNumber,
    role,
    password,
  });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get all users
router.route("/").get((req, res) => {
  user.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
}); 

//update user
router.route("/update/:id").put((req, res) => {
  user.findById(req.params.id)
    .then(user => {
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.email = req.body.email;
      user.homeAddress = req.body.homeAddress;
      user.phoneNumber = req.body.phoneNumber;
      user.role = req.body.role;
      user.password = req.body.password;

      user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//delete user
router.route("/delete/:id").delete((req, res) => {
  user.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get user by id
router.route("/get/:id").get((req, res) => {
  user.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get user by email
router.route("/getByEmail/:email").get((req, res) => {
  user.findOne({ email: req.params.email })
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get user by phone number
router.route("/getByPhoneNumber/:phoneNumber").get((req, res) => {
  user.findOne({ phoneNumber: req.params.phoneNumber })
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;