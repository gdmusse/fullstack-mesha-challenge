import dotenv from "dotenv";
import { AddressInfo } from "net";
import express from "express";
import { collaboratorRouter } from "./routes/CollaboratorRouter";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({ origin: true }));

app.use(express.json());

app.use("/collaborator", collaboratorRouter);

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server running at http://localhost:${address.port}`);
  } else {
    console.error(`Failed to run server.`);
  }
});
