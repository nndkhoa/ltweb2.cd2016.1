var fs = require('fs');
var multer = require('multer');

module.exports = app => {
  // var storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, './public/imgs')
  //   },
  //   filename: function (req, file, cb) {
  //     cb(null, file.originalname)
  //   }
  // });

  // var uploadMultiple = multer({
  //   storage: storage
  // }).array('fuMain', 3);

  // var uploadSingle = multer({
  //   storage: storage
  // }).single('fuMain');

  var buildUploader = id => {
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        var path = `./public/imgs/${id}`;
        if (!fs.existsSync(path)) {
          // return cb(new Error('destination not exists.'), '');
          fs.mkdirSync(path, { recursive: true });
        }

        cb(null, `./public/imgs/${id}`);
      },
      filename: function (req, file, cb) {
        // cb(null, file.originalname)
        cb(null, 'main.jpg');
      }
    });

    return multer({ storage }).array('fuMain', 3);
  }

  app.post('/upload', (req, res, next) => {
    buildUploader(1)(req, res, err => {
      // console.log('req.files:', req.files);

      if (err) {
        return res.json({
          error: err.message,
        });
      }

      res.json({});
    })
  });
};
