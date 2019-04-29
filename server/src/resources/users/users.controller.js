const getMe = (req, res) => {
  res.json({ method: req.method, data: "I am groot" });
};

const updateMe = (req, res) => {
  res.json({ method: req.method, data: "I am groot" });
};

module.exports = { getMe, updateMe };
