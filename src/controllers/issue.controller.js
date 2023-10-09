import projectModel from '../models/project.schema.js';
import issueModel from '../models/issue.schema.js';

export default class CSVController{
    // Get all project on home page
    async home(req, res){
        try{
            let projects = await projectModel.find({}).sort('-createdAt');
            // console.log("All projects: ", projects);
            return res.render('home', {
                title: 'Issue Tracker | Home',
                projects,
            });
        }
        catch(err){
            console.error(err);
            res.status(500).send('Internal server error.');
        }
    }

    // Create project
    async createProject(req, res){
        try{
            console.log("project data in req.body: ", req.body);
            await projectModel.create({
                name: req.body.name,
                description: req.body.description,
                author: req.body.author,
            });
            return res.redirect(`back`);
        }
        catch(err){
            console.error(err);
            res.status(500).send('Internal server error.');
        }
    }

    // Display details of a particulae project
    async getOneProject(req, res){
        try{
            let project = await projectModel.findById(req.params.id).populate({
                path: 'issues',
            });
            if (project) {
                return res.render('project-details', {
                    title: 'Project Page',
                    project,
                });
            }
            return res.redirect('back');
        }
        catch(err){
            console.error(err);
            res.status(500).send('Internal server error.');
        }
    }

    // Create an Issue
    async createIssue(req, res){
        try{
            let project = await projectModel.findById(req.params.id);
            if (project) {
                let issue = await issueModel.create({
                    title: req.body.title,
                    description: req.body.description,
                    labels: req.body.labels,
                    author: req.body.author,
                });
                project.issues.push(issue);

                await project.save();
                return res.redirect(`back`);
            } 
            else {
              return res.redirect('back');
            }
        } 
        catch(err){
            console.error(err);
            res.status(500).send('Internal server error.');
        }
    }

    // delete Project
    async deleteProject(req, res){
        let projectDetails = await projectModel.findById(req.params.id);
        if (projectDetails) {
            for(let i=0; i<projectDetails.issues.length; i++){
                let issueId = projectDetails.issues[i]._id;
                await issueModel.findByIdAndDelete(issueId);
            }
        } 
        await projectModel.findByIdAndDelete(req.params.id);
        return res.redirect(`back`);
    }

}



