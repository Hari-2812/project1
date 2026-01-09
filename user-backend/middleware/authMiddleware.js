import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
  try {
    // 1️⃣ Get token from Authorization header
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      })
    }

    // 2️⃣ Extract token
    const token = authHeader.split(' ')[1]

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // 4️⃣ Attach user info to request
    req.user = decoded

    // 5️⃣ Continue to next middleware / route
    next()

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    })
  }
}

export default authMiddleware
