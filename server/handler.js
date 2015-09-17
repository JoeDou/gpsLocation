var formidable = require('formidable');
var helper     = require('./helper.js');
var fs         = require('fs-extra');

var upload = function (req, res) {
    var form = new formidable.IncomingForm();
    var formData = {};
  
    form.parse(req, function(err, fields, files) {
        if (err){
            res.status(500).send('upload error');
        }
    });

    form.on('field', function(name, value) {
        formData[name] = value;
    });

    form.on('end', function(fields, files) {
        /* Temporary location of our uploaded file */
        var temp_path = this.openedFiles[0].path;
        console.log('temp path: ' + temp_path);

        fs.readFile(temp_path,'utf8', function (err, data) {
            if (err) {
                res.status(500).send('read error');
                return;
            }
            // console.log(data);
            var retArr = helper.parseData(data, formData);

            res.status(200).send(retArr);
        });
    });
};

exports.upload = upload;
