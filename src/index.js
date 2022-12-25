const fs = require('fs');
const archiver = require('archiver');
const glob = require('glob');

// Root path.
const root = __dirname + "/../";

// Directory to be excluded from creating it's own directory.
const rootDir = "main";

// Output zip directory. 
const outputDir = root + "downloads";

// Directories to be included in zip.
const include = [
    "main",
    "example"
];

// Directories to be excluded from zip.
const exclude = [
    "dist/**",
    "node_modules/**",
];

// Main
(() => {
    // Create a file stream for the output archive.
    const output = fs.createWriteStream(outputDir + '/base-component-js.zip');

    // Create an archiver object
    const archive = archiver('zip', {
        zlib: { level: 9 } // Set the compression level.
    });
    
    // Pipe archive data to the file.
    archive.pipe(output);

    // Zip output files.
    let outputFiles = {}

    // Listen for all archive data to be written.
    include.forEach(dirName => {
        // Get files.
        const files = glob.sync('**/*', {
            cwd: dirName,
            ignore: exclude,
            dot: true,
        });

        // Insert each files into "outputFiles" object.
        files.forEach(function(file) { 
            const filePath = `${root}${dirName}/${file}`;

            // Proceed loop if file is not a directory.
            if (!fs.statSync(filePath).isDirectory()) {
                dirName === rootDir 
                    ? outputFiles[filePath] = file
                    : outputFiles[filePath] = `${dirName}/${file}`;
            }
        });
    });

    // Create output zip directory if its not exist.
    if (!fs.existsSync(outputDir)){
        fs.mkdirSync(outputDir);
    }
    
    // Archive files from "outputFiles" object.
    for (const [path, file] of Object.entries(outputFiles)) {
        archive.file(path, { name: file });
    }
    // Finalize the archive (end the stream).
    archive.finalize();
})();