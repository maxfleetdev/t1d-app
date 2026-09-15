import express, { Request, Response } from 'express';
import cors from 'cors';
import db from '../db/database'

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

/// AGREEMENT ENDPOINT ///
app.post('/api/agree', (req: Request, res: Response): void => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ error: 'Name is required' });
    return;
  }

  try {
    // Prepare and execute the SQL insert statement
    const insert = db.prepare('INSERT INTO users (name) VALUES (?)');
    const info = insert.run(name);

    // Return the newly created user ID to the frontend
    res.status(201).json({ 
      message: 'Agreement recorded', 
      userId: info.lastInsertRowid 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save to database' });
  }
});


/// QUIZ SCORE ENDPOINT ///
app.post('/api/score', (req: Request, res: Response): void => {
  const { score: score } = req.body;
  
  if (!score) {
    res.status(400).json({ error: 'Quiz score is required' });
    return;
  }

  try {
    // Prepare and execute the SQL insert statement
    const insert = db.prepare('INSERT INTO scores (score) VALUES (?)');
    const info = insert.run(score);

    // Return the newly created user ID to the frontend
    res.status(201).json({ 
      message: 'Quiz score recorded', 
      quizScore: info.lastInsertRowid 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save quiz score to database' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});