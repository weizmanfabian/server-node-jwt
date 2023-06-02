import app from "./app.js"

app.listen(app.get('port'), () => console.log(`server running on port ${app.get('port')}`))