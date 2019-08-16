const packageJson = require("./package.json");
const exec = require("child_process").execSync;
const { https, port, host } = packageJson;

const command = [];

if (https) {
  command.push("HTTPS=true");
}
if (host) {
  command.push("HOST=" + host);
}
if (port) {
  command.push("PORT=" + port);
}

command.push("yarn start");

exec(command.join(" "));
