// middlewares/ensureAuthenticated.js
const jwt = require('jsonwebtoken');

const ensureAuthenticated = async (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Extract the token from the Bearer format
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using your JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user data to the request object
    req.user = decoded;

    //
    // User.findOne({ email: req.body.email })
    //     .then((user) => {
    //         if (user) {
    //             res.status(400).json('User already exists')
    //         }
    //         else {
    //             const _user = new User({
    //                 firstName: req.body.firstName,
    //                 lastName: req.body.lastName,
    //                 email: req.body.email,
    //                 password: req.body.password,
    //                 username: Math.random().toString()
    //             })
    //             _user.save()
    //             res.status(200).json(_user)
    //         }
    //     })
    //     .catch((err) => {
    //         res.status(500).json("Something Went Wrong")
    //     })

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = ensureAuthenticated;
