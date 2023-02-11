const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authModel = require("../models/Auth");

//Register user
const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password, category } = req.body;

  if (!firstname || !lastname || !email || !password || !category) {
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
    category,
    password: hashedPassword,
  });

  if (user) {
    res.status(201);
    res.json({
      _id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      category: category,
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
const updateUser = asyncHandler( async( req, res ) => {
  const user = await authModel.findById(req.params.id);

  if(!user) {
      res.status(404);
      throw new Error("User not found");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const updatedUser = await authModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json({
    _id: updatedUser.id,
    firstname: updatedUser.firstname,
    lastname: updatedUser.lastname,
    password: hashedPassword,
    category: updatedUser.category,
    profilePic: updatedUser.profilePic
  });
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
