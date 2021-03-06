const express = require('express');

const newReleaseController = require('../controller/new-release-controller');
const router = express.Router();

// Set up multer for storing files
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './api/controller/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
const upload = multer({ storage: storage });

// new release route
router.get('/', newReleaseController.getAllNewReleases);
router.get('/:id', newReleaseController.getNewReleaseById);

// add/delete releases to/from the database
router.post('/', upload.single('poster'), newReleaseController.addNewRelease);
router.delete('/:id', newReleaseController.deleteNewRelease);

module.exports = router;