import express from 'express';
import { getJobs, addJob, deleteJob } from '../controllers/jobController.js';

const router = express.Router();

router.get('/jobs', getJobs);
router.post('/add-job', addJob);
router.delete('/delete-job/:id', deleteJob);

export default router;
