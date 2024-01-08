import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectDb from "./data-source";

connectDb
  .initialize()
  .then(() => {
    console.log(`Data Source has been initialized`);
    const PORT = parseInt(`${process.env.PORT || 3000}`);

    app.listen(PORT, () => console.log(`Server is running at ${PORT}.`));
  })
  .catch((err) => {
    console.error(`Data Source initialization error`, err);
  });
