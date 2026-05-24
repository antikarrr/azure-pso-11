import connectMongo from "../../../database/conn";

import {
  getUsers,
  postUser,
  putUser,
  deleteUser,
} from "../../../database/controller";

export default async function handler(req, res) {

  try {

    await connectMongo();

    const { method } = req;

    switch (method) {

      case "GET":

        return await getUsers(
          req,
          res
        );

      case "POST":

        return await postUser(
          req,
          res
        );

      case "PUT":

        return await putUser(
          req,
          res
        );

      case "DELETE":

        return await deleteUser(
          req,
          res
        );

      default:

        res.setHeader(
          "Allow",
          [
            "GET",
            "POST",
            "PUT",
            "DELETE",
          ]
        );

        return res
          .status(405)
          .json({
            error:
              `Method ${method} Not Allowed`,
          });

    }

  }

  catch (error) {

    return res
      .status(500)
      .json({
        error:
          "Database Connection Failed",
      });

  }

}