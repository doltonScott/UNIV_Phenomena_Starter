// Build an apiRouter using express Router
const express = require("express");
const apiRouter = express();

// Import the database adapter functions from the db
const {} = require("../db/index");

/**
 * Set up a GET request for /reports*/
const {
  createReport,
  client,
  getOpenReports,
  _getReport,
  closeReport,
  createReportComment,
} = require("../db/index");

/*
 * - it should use an async function
 * - it should await a call to getOpenReports
 * - on success, it should send back an object like { reports: theReports }
 * - on caught error, call next(error)
 */

apiRouter.get("/reports", async (req, res, next) => {
  try {
    const openReports = await getOpenReports();

    res.send({
      reports: openReports,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Set up a POST request for /reports
 *
 * - it should use an async function
 * - it should await a call to createReport, passing in the fields from req.body
 * - on success, it should send back the object returned by createReport
 * - on caught error, call next(error)
 */

apiRouter.post("/reports", async (req, res) => {
  const { title, location, description, password } = req.body;
});

/**
 * Set up a DELETE request for /reports/:reportId
 *
 * - it should use an async function
 * - it should await a call to closeReport, passing in the reportId from req.params
 *   and the password from req.body
 * - on success, it should send back the object returned by closeReport
 * - on caught error, call next(error)
 */

/**
 * Set up a POST request for /reports/:reportId/comments
 *
 * - it should use an async function
 * - it should await a call to createReportComment, passing in the reportId and
 *   the fields from req.body
 * - on success, it should send back the object returned by createReportComment
 * - on caught error, call next(error)
 */

// Export the apiRouter

module.export = apiRouter;
