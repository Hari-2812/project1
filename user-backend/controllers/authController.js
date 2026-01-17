const bcrypt = require("bcryptjs")

const hashedPassword = await bcrypt.hash(password, 10)

const user = new User({
  name,
  email,
  password: hashedPassword
})
