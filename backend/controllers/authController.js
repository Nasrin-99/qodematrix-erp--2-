import { loginUserService, registerUserService } from "../services/authService.js";

export const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const data = await loginUserService({ email, password });
    res.json(data);


  } catch (error) {

    res.status(400).json({ message: error.message });

  }
};


export const registerUser = async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    const user = await registerUserService({ name, email, password, role });

    res.status(201).json(user);

  } catch (error) {

    res.status(400).json({ message: error.message });

  }
};