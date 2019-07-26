const express = require("express");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static("static"))

app.listen(PORT, () => {
    console.log(`server is active on port ${PORT}`)
})