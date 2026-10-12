import cors from "cors";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { contactRouter } from "./app/contact.route.js";
// import { productsRouter } from "./app/products.route.js";
const app: Application = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      // "http://localhost:3001",
      "https://uenal-immobilien.de",
      "https://www.uenal-fm.de",
      "https://uenal-fm.de",
      "https://uenal-gutachten.de",
      // "https://alpa-second-frontend.vercel.app"
    ],
  }),
);
app.use(express.json());

app.use("/", contactRouter);
// app.use("/products", productsRouter);
app.use("/form", contactRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the alpa API world" });
});

export default app;
