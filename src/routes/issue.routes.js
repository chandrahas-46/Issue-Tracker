// 1. Import express.
import express from 'express';
import IssueController from '../controllers/issue.controller.js';

// 2. Initialize Express router.
const issueRouter = express.Router();
const issueController = new IssueController();

issueRouter.get('/', issueController.home);

issueRouter.post('/project/create', issueController.createProject);
issueRouter.get('/project/:id', issueController.getOneProject);
issueRouter.post('/project/:id', issueController.createIssue);
issueRouter.get('/project/delete/:id', issueController.deleteProject);

// module.exports = router;
export default issueRouter;
