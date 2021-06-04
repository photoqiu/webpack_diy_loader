const assert = require('assert');
const defaultOptions = require('./lib/default-options');
let fs = require("fs");
let path = require("path");
let Client = require('ssh2-sftp-client');


async function main(srcDir, dstDir, config) {
    const client = new Client('upload-test');    
    try {
        await client.connect(config);
        client.on('upload', info => {
            console.log(`Listener: Uploaded ${info.source}`);
        });
        let rslt = await client.uploadDir(srcDir, dstDir);
        return rslt;
    } finally {
        client.end();
    }
}

        
class AsyncUploadersFiles {
    constructor(options) {
      this.options = Object.assign({}, defaultOptions, options);
    }

    getRemotePathList(remotePath) {
        let sftp = new Client();
        sftp.connect(this.options.connect).then(() => {
            return sftp.list(remotePath);
        }).then(data => {
            console.log(data);
        }).then(() => {
            sftp.end();
        }).catch(err => {
            console.error(err.message);
        });
    }

    getRemoteFloders() {
        let sftp = new Client();
        sftp.connect(this.options.connect).then(() => {
            return sftp.stat(this.options.remotePath);
        }).then(data => {
            console.log("datas:", data)
        }).then(() => {
            sftp.end();
        }).catch(err => {
            console.error(err.message);
        });
    }

    getFileList(dir) {
        let arr = fs.readdirSync(dir);
        let list = [];
        arr.forEach(function(item){
            let fullpath = path.join(dir, item);
            let stats = fs.statSync(fullpath);
            if(!!!stats.isDirectory()){
                //this.getFileList(fullpath);
                //ontinue();
                list.push(fullpath);
            }
        });
        console.log("file list:", list);
        return list;
    }

    apply(compiler) {
        //compiler.plugin('done', function(compilation, callback) {
        //compiler.hooks.make.tapPromise(
        compiler.hooks.done.tapAsync(
            "AsyncUploadersFiles",
            (compilation, callback) => {
                this.getRemotePathList(this.options.remotePath);
                setTimeout(()=> {
                    let filedatas = this.getFileList(this.options.localPath);
                    console.log("uploader FIles!", filedatas);
                    // for (var i = 0, lens = filedatas.length; i < lens; i++) {
                    //     let filesNames = filedatas[i];
                    //     let fullpath = path.join(this.options.remotePath, path.basename(filesNames));
                    //     console.log("the local files:", filesNames, "the remote files:", fullpath);
                    //     this.UploaderFiles(filesNames, fullpath);
                    // }
                    main(this.options.localPath, this.options.remotePath, this.options.connect).then(msg => {
                        console.log(msg);
                    }).catch(err => {
                        console.log(`main error: ${err.message}`);
                    });
                    this.getRemoteFloders();
                }, 1200)
            }
        );

        compiler.hooks.afterEmit.tap(
            "AsyncUploadersFiles",
            (compilation, callback) => {
                console.log("uploader FIles Process");
            }
        );

        compiler.hooks.failed.tap(
            "AsyncUploadersFiles",
            (compilation, callback) => {
                console.log("uploader FIles failed.");
            }
        );
    }
}

module.exports = AsyncUploadersFiles;