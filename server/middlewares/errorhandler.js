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
    case "EntryDuplicate":
      res.status(400).json({ message: "Title already in your list" });
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
    case "OrderNotFound":
      res.status(404).json({ message: "Order Not Found" });
      break;
    case "AlreadySupporter":
      res.status(400).json({ message: "You are already supporter" });
      break;
    case "AlreadyPaid":
      res.status(400).json({ message: "Order already paid" });
      break;
    case "MidtransError":
      res.status(400).json({ message: "pgrade Failed, please call our customer support" });
      break;
    case "InvalidToken":
    case "JsonWebTokenError":
      res.status(401).json({ message: "Invalid Token, Please log in first" });
      break;
    case "Forbidden":
      res.status(403).json({ message: "Forbidden Access" });
      break;
    case "AxiosError":
    case "MangaNotFound":
      res.status(404).json({message: "Title not found in database"})
      break;
    case "UpgradeRequired":
      res.status(403).json({message: "Be a supporter of this project to add more entry to your list"})
      break;
    case "MaximumReached":
      res.status(400).json({message: "You have reached the maximum entry available, Please manage your list"})
      break;

    default:
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }
};

module.exports = { errorHandler };
