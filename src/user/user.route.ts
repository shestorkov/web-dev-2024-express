import express, { Request, Response } from 'express';
import { db } from '../database';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, universityId, subjectId } = req.body;
    const university = await db.models.University.findByPk(universityId); 

    if (!university) {
      res.status(404).json({ error: 'University not found' });
      return;
    }

    if (await db.models.User.findOne({ where: { email } })) {
      throw new Error("User already exists.")
    }

    const subject = await db.models.Subject.findByPk(subjectId);

    if (!subject) {
      res.status(404).json({ error: 'Subject not found' });
      return;
    }
    
    const user = await db.models.User.create({ name, email, universityId });
    await user.addSubject(subject);
    
    const userWithSubjects = await db.models.User.findOne({
      where: { id: user.id },
      include: {
        model: db.models.Subject,
        as: 'subjects',
      },
    });

    res.status(201).json(userWithSubjects);

  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/user', async (_req: Request, res: Response) => {
  try {
    const users = await db.models.User.findAll({
      include: [
        {
          model: db.models.University,
          as: 'university',
        },
        {
          model: db.models.Subject,
          as: 'subjects',
        },
      ], 
    });
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

//PUT 
router.put('/user/subject', async (req: Request, res: Response) => {
  try {
    const { userId, subjects } = req.body; 

    if (!Array.isArray(subjects)) {
      res.status(400).json({ error: 'Subjects must be an array of IDs.' });
      return;
    }

    const user = await db.models.User.findByPk(userId);

    if (!user) {
      res.status(404).json({ error: 'User was not found' });
      return;
    }

    const validSubjects = await db.models.Subject.findAll({
      where: {
        id: subjects,
      },
    });

    if (validSubjects.length !== subjects.length) {
      res.status(400).json({ error: 'Subjects were not found.' });
      return;
    }

    await user.setSubjects(validSubjects);

    const updatedUser = await db.models.User.findByPk(userId, {
      include: {
        model: db.models.Subject,
        as: 'subjects',
      },
    });

    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;