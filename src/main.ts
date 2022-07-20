import "dotenv/config";
import express from "express";
import "express-async-errors";
import { errorMiddleware } from "./middlewares/Error";
import { routes } from "./routes";
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(routes);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
