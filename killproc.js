const netstat = require('node-netstat');
const { exec } = require('child_process');

function getPIDByPort(port) {
    return new Promise((resolve, reject) => {
        const results = [];

        netstat({
            filter: {
                port: port,
                protocol: 'tcp'
            },
            done: function () {
                if (results.length > 0) {
                    resolve(results[0].pid);
                } else {
                    resolve(null);
                }
            }
        }, function (data) {
            results.push(data);
        });
    });
}

function killProcess(pid) {
    return new Promise((resolve, reject) => {
        exec(`sudo kill -9 ${pid}`, (error, stdout, stderr) => {
            if (error) {
                reject(`Error: ${stderr}`);
            } else {
                resolve(`Killed process with PID: ${pid}`);
            }
        });
    });
}

async function main(port) {
    try {
        const pid = await getPIDByPort(port);

        if (pid) {
            const message = await killProcess(pid);
            console.log(message);
        } else {
            console.log(`No process is listening on port ${port}.`);
        }
    } catch (error) {
        console.error(error);
    }
}

const args = process.argv.slice(2);
if (args.length !== 1) {
    console.log('Usage: node killProcess.js <port>');
    process.exit(1);
}

const port = parseInt(args[0], 10);
main(port);