const express = require("express");
const routerApi = require("./routes");
const { logErrors, errorHandler, boomErrorHandler } = require("./middlewares/error.handler");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.send("Hola mundo");
});
routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`App corriendo en localhost:${port}`);
});
