const errorHandler = (err, req, res, next) => {
  console.log("Error Name: ", err.name);
  // console.log(err);
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "EmailRequired":
      res.status(400).json({ message: "Please input your email" });
    case "PasswordRequired":
      res.status(400).json({ message: "Please input your password" });
      break;
    case "InvalidUser":
      res.status(401).json({ message: "Wrong Email/Password" });
      break;
    case "ProfileNotFound":
      res.status(404).json({ message: "Profile Not Found" });
      break;
    case "ListNotFound":
      res.status(404).json({ message: "Entry Not Found" });
      break;
    case "InvalidToken":
    case "JsonWebTokenError":
      res.status(401).json({ message: "Invalid Token. Please log in first" });
      break;
    case "Forbidden":
      res.status(403).json({ message: "Forbidden Access" });
      break;
    case "AxiosError":
    case "MangaNotFound":
      res.status(404).json({message: "Title not found in database"})
      break;

    default:
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }
};

module.exports = { errorHandler };
