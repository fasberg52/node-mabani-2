const http = require("http");
const axios = require("axios");

async function getMobilePhone(id) {
  const url = `https://api.divar.ir/v8/web-search/mashhad/mobile-phones/${id}`;
  const response = await axios.get(url);
  return response.data;
}

const server = http.createServer(async (req, res) => {
  const parts = req.url.split("/");
  const id = parts[parts.length - 1];
  const mobilePhone = await getMobilePhone(id);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(mobilePhone));
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
