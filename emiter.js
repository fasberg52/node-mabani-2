const http = require("http");
const moment = require("moment");
const EventEimtter = require("events");
const server = http.createServer();
const PORT = 3001;
server.on("request", async (req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<body>");
    res.write("<h1>welcome message in HTML format</h1>");
    res.write("</body>");
    res.end();
  } else if (req.url === "/api/current-time") {
    const currentTime = await getCurrentTime();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(currentTime));
    res.end();
  } else if (req.url === "/api/person") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const emitter = new EventEimtter();
    emitter.on("person", (person) => {
      res.write(JSON.stringify(person));
      res.end();
    });
    setTimeout(() => {
      const person = { id: 1, name: "MohammadReza" };
      emitter.emit("person", person);
    }, 2000);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<h1>page not find</h1>");
    res.end();
  }
});
server.listen(PORT, () => {
  console.log(`server listen on ${PORT}`);
});
async function getCurrentTime() {
  const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
  return { time: currentTime };
}
