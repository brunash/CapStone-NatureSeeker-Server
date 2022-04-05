const dotenv =              require('dotenv');
const express =             require('express');
const mongoose  =           require('mongoose');
const app =                 express();
const cors =                require('cors');
dotenv.config();

mongoose
    .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((x) => console.log(`Connected to ${x.connections[0].name}`))
        .catch(() => console.error("Error connecting to Mongo"));
app.use(express.json());
app.use(
        cors({
            origin: ["http://localhost:3000", process.env.clientURL],
        })
);

app.use("/api", require("./routes.js"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`))