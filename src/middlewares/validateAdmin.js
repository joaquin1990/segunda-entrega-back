export default function validateAdmin(req, res, next) {
  if (req.body.admin === true) {
    next();
  } else {
    res.json({
      error: "Sorry, just admin user can access to this information",
    });
  }
}
