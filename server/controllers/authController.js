const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authModel = require("../models/Auth");

//Register user
const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the required fields");
  }
  const userExists = await authModel.findOne({ email });

  //check if user account exists in the database
  if (userExists) {
    res.status(400);
    throw new Error("User already exists!");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = await authModel.create({
    email,
    firstname,
    lastname,
    password: hashedPassword,
  });

  if (user) {
    res.status(201);
    res.json({
      _id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//Log in user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all the required fields");
  }

  const user = await authModel.findOne({ email });

  //if the entered password and the one hashed in the database match, sign it using the JWT secret key and send it as a cookie
  //in the response and return other user details entered in json format
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("The credentials you entered are invalid");
  }
});

//forgot password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = authModel.findOne({ email });
    if (!userExists) {
      res.status(400).json({ message: `The user ${email} does not exist` });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = authModel.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } },
      { new: true }
    );
    res.status(200).json({
      message: "Password reset was successful",
      updatedUser,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// update user details
const updateUser = asyncHandler(async (req, res) => {
  const { user_id } = req.params;
  const { firstname, lastname, email, profilePic } = req.body;
  try {
    const userExists = await User.findById({ _id: user_id });
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: userExists._id,
      },
      {
        $set: { firstname, lastname, email, profilePic },
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "User details successfully updated", updatedUser });
  } catch (error) {
    res.status(500).json(error);
  }
});

const getCredentials = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  updateUser,
  getCredentials,
};
