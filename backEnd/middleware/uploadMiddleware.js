const multer = require('multer');

// Set up storage engine for multer
const storage = multer.memoryStorage(); // Store image in memory as a buffer

// Initialize multer with storage and file size limit
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
}).single('cover_image'); // Expect a single file field named 'cover_image'

module.exports = upload;
