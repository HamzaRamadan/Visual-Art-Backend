// Middleware بدون التزام بالتوكن
export const protect = (req, res, next) => {
  req.user = {
    _id: '1',
    name: 'Admin',
    email: 'Info@visualart-iraq.com',
    role: 'admin',
  };
  next();
};

export const adminOnly = (req, res, next) => {
  next(); // كل المستخدمين يعتبروا admins
};
