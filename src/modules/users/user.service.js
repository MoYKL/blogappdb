import userModel from "../../DB/models/user.model.js";
import { Op, Sequelize, UniqueConstraintError } from "sequelize";

const handleError = (
  res,
  error,
  message = "Controller error",
  statusCode = 500
) => {
  console.error(error); // Log the actual error for debugging
  return res.status(statusCode).json({ message, error: error.message });
};

//Register a new user

export const singUp = async (req, res, next) => {
  try {
    const { name, email, password, role, gender } = req.body;

    const existingUser = await userModel.findOne({ where: { u_email: email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const newUser = userModel.build({
      u_name: name,
      u_email: email,
      u_password: password,
      u_role: role,
      u_gender: gender,
    });
    await newUser.save();

    const userResponse = newUser.toJSON();

    delete userResponse.u_password;

    return res
      .status(201)
      .json({ message: "User created successfully", user: userResponse });
  } catch (error) {
    return handleError(res, error, "Error during sign-up");
  }
};

//Get a specific user by his ID

export const getProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByPk(id, {
      attributes: [
        ["u_id", "id"],
        ["u_name", "name"],
        ["u_email", "email"],
        "createdAt",
        "updatedAt",
      ],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return handleError(res, error, "Error fetching profile");
  }
};

export const getProfileByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await userModel.findOne({
      where: { u_email: email },
      attributes: [
        ["u_id", "id"],
        ["u_name", "name"],
        ["u_email", "email"],
        ['u_role','role'],
        "createdAt",
        "updatedAt",
      ],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return handleError(res, error, "Error fetching profile");
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { name, email, role } = req.body;

    await userModel.upsert(
      {
        u_id: id,
        u_name: name,
        u_email: email,
        u_role: role,
      },
      {
        skipValidation: true,
      }
    );

    return res
      .status(200)
      .json({ message: "User created or updated successfully" });
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      return res
        .status(409)
        .json({ message: "This email has already been used." });
    }

    // Handle all other potential errors
    console.error("Error during upsert:", error);
    return res
      .status(500)
      .json({ message: "Error during upsert", error: error.message });
  }
};
