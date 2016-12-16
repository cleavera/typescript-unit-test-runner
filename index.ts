declare let require;

let glob = require('glob'),
    exec = require('child_process').exec;

export default function tsUnitTest(pathPattern, configObj) {
    configObj = configObj || {};

    let flags = '';
    if (configObj.project) {
        flags += '--project ' + configObj.project + ' ';
    }

    glob(pathPattern, {}, function(er, files) {
        if (er) {
            throw er;
        }

        files.forEach(function(fileName) {
            exec('ts-node ' + flags + fileName, function(error, stdout, stderr) {
                if (error) {
                    console.error(error);
                    return;
                }

                console.log(stdout, stderr);
            });
        });
    })
}
