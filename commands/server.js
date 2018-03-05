const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);
const path = require('path');
const {promisify} = require(`util`);

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const readfile = promisify(fs.readFile);

const HOSTNAME = `127.0.0.1`;
const PORT = process.argv[3] || 3000;

const printDirectory = (pathname, files) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Directory content</title>
</head>
<body>
<ul>
    ${files.map((it) => `<li><a href="${path.join(pathname, it)}">${it}</a></li>`).join(``)}
</ul>
</body>
</html>`;
};

const fileType = new Map([
  [`.css`, `text/css`],
  [`.html`, `text/html`],
  [`.png`, `image/png`],
  [`.jpg`, `image/jpeg`],
  [`.ico`, `image/x-icon`],
]);

const readFile = async (filePath, res) => {
  const data = await readfile(filePath);
  const fileExtension = path.extname(filePath);
  res.setHeader(`content-type`, fileType.get(fileExtension));
  res.setHeader(`content-length`, Buffer.byteLength(data));
  res.end(data);
};

const readDir = async (filePath, pathname, res) => {
  const files = await readdir(filePath);
  res.setHeader(`content-type`, `text/html`);
  const content = printDirectory(pathname, files);
  res.setHeader(`content-length`, Buffer.byteLength(content));
  res.end(content);
};

const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname
  const absolutePath = `${process.cwd()}/static${pathname}`;

  (async () => {
    try {
      const pathStat = await stat(absolutePath);

      res.statusCode = 200;
      res.statusMessage = `OK`;

      if (pathStat.isDirectory()) {
        await readDir(absolutePath, pathname, res);
      } else {
        await readFile(absolutePath, res);
      }
    } catch (e) {
      res.writeHead(404, `Not Found`);
      res.end();
    }
  })().catch((e) => {
    res.writeHead(500, e.message, {
      'content-type': `text/plain`
    });
    res.end(e.message);
  });
});

const serverAddress = `http://${HOSTNAME}:${PORT}`;

module.exports = {
  name: `--server`,
  description: `запускает сервер`,
  execute() {
    server.listen(PORT, HOSTNAME, () => {
      console.log(`Server running at ${serverAddress}/`);
    });
  }
};
