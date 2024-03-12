import { get } from "lodash";
import UserModel from "../database/model/User.model";
import { signWihtJWT, verifyJWT } from "./jwt";
import SessionModel from "../database/model/Session.model";

export const generateNewAccessToken = async (refreshToken: string) => {
  const { decoded, valid, expired } = verifyJWT(refreshToken);

  if (!valid) {
    if (expired) {
      return { token: null, error: "Expired refresh token" };
    }
    throw new Error("Invalid refresh token");
  }

  if (!decoded || !get(decoded, "session")) {
    throw new Error("Something went wrong");
  }

  const session = await SessionModel.findById(get(decoded, "session"));

  if (!session || !session.valid) {
    throw new Error("Invalid session");
  }

  const accessToken = signWihtJWT(
    { user: session.user, session: session._id },
    { expiresIn: 86400 }
  );

  return { token: accessToken, error: undefined };
};
