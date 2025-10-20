const app = require("./src/app");
const connectDB = require("./src/config/db");
const { port } = require("./src/config/environments/config");

async function startServer() {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
startServer();
