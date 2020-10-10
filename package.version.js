const replace = require('replace-in-file');
const packageJSON = require("./package.json");
const buildVersion = packageJSON.version;
const d = new Date();
const buildDate = [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('-') + ' ' +
    [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
const options = {
  files: 'src/environments/environment.ts',
  from: [/appVersion: (.*)/g],
  to: ["appVersion: '"+ buildVersion +"-dev"+buildDate+"'"],
};

try {
  let changedFiles = replace.sync(options);
  if (!changedFiles) {
    throw "Please make sure that file '" + options.files + "' has \"version: ''\"";
  }
  console.log('Build version set: ' + buildVersion);
}
catch (error) {
  console.error('Error occurred:', error);
  throw error
}
