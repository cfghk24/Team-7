import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Simulate login validation with username
    if (username === 'testuser' && password === 'testpw') {
      // Successful login
      res.status(200).json({ message: 'Login successful!' });
    } else {
      // Invalid login
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}