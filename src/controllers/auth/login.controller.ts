import { NextFunction, Request, Response } from "express";
import { User } from "../../models/User.model";
import utils from "../../utils";

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  try {
    const authUser = await User.findOne({ username });
    if (!authUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isValid = utils.validPassword(password, authUser.hash, authUser.salt);
    if (isValid) {
      const tokenObject = utils.issueJWT({
        _id: authUser._id,
      });

      res.status(200).json({
        success: true,
        token: tokenObject.token,
        expiresIn: tokenObject.expires,
      });
    } else {
      res
        .status(401)
        .json({ success: false, message: "You entered the wrong password" });
    }
  } catch (error) {
    next(error);
  }
};

export default login;
