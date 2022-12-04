import express, { response } from "express"
import "./database";
import { routes } from "./routes";
import { createServer } from "http"
import {Server, Socket } from "socket.io"
import path from "path"


const app = express();

app.use(express.static(path.join(__dirname, "..", "public")))
app.set("views", path.join(__dirname, "..", "public"))
app.engine("html", require("ejs").renderFile)
app.set("view engine ", "html")

app.get("/pages/client", (request, response) => {
    return response.render("html/client.html")
})

app.get("/pages/admin", (request, response) => {
    return response.render("html/admin.html")
})

const http = createServer(app)
const io = new Server(http)

io.on("connection", (socket: Socket) => {
    console.log("Se conectou", socket.id)
})
app.use(express.json());

app.use(routes)

// app.get("/", (request, response) => {
//     // return response.send("Ola NLW 05");
//     // return response.json({
//         // message: "Olá NLO"
//     // })
//     response.send("teste")
// })

// app.post("/users", (request, response, next) => {
//     return response.json({
//         message: "Usuario salvo com sucesso"
//     })
// })

export { http, io }