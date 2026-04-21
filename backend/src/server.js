require('dotenv').config();

const app = require('./app');
const { testDatabaseConnection } = require('./config/db');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await testDatabaseConnection();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();
