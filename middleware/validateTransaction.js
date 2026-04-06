module.exports = (req, res, next) => {
  const { amount, type, category } = req.body;

  
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Amount must be greater than 0" });
  }

  
  if (!["income", "expense"].includes(type)) {
    return res.status(400).json({ message: "Type must be income or expense" });
  }

  
  if (!category) {
    return res.status(400).json({ message: "Category is required" });
  }

  next();
};