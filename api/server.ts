import express, { Request, Response } from 'express';
import cors from 'cors';
import db from './database'

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Endpoint to save a new user agreement
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});