import * as fs from 'fs';
import * as path from 'path';

function concatAll(arrays) {
    return arrays.reduce((result, array) => (result.push.apply(result, array), result), []);
}

// acc stores files found so far and counts remaining paths to be processed
function dirFiles(dir, callback, acc = {files: [], remaining: 1}) {
    function done() {
        // decrement count and return if there are no more paths left to process
        if (!--acc.remaining) {
            callback(acc.files);
        }
    }

    fs.readdir(dir, (err, files) => {
        // if dir does not exist or is not a directory, bail
        // (this should not happen as long as calls do the necessary checks)
        if (err) throw err;

        acc.remaining += files.length;
        files.forEach(file => {
            let name = path.join(dir, file);
            fs.stat(name, (err, stats) => {
                if (err) {
                    // probably a symlink issue
                    process.stdout.write('Skipping path "' + name + '" which does not exist.\n');
                    done();
                } else if (stats.isDirectory()) {
                    dirFiles(name + '/', callback, acc);
                } else {
                    acc.files.push(name);
                    done();
                }
            });
        });
        done();
    });
}

export function getAllFiles(paths) {
    return Promise.all(
        paths.map(
            file =>
                new Promise(resolve => {
                    fs.lstat(file, (err, stat) => {
                        if (err) {
                            process.stderr.write(
                                'Skipping path ' + file + ' which does not exist. \n'
                            );
                            resolve();
                            return;
                        }

                        if (stat.isDirectory()) {
                            dirFiles(file, list => resolve(list));
                        } else {
                            resolve([file]);
                        }
                    });
                })
        )
    )
        .then(concatAll)
        .then(files =>
            files.filter(file => path.extname(file) === '.js' || path.extname(file) === '.jsx')
        );
}
