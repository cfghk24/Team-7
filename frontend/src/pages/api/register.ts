import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { firstName, lastName, username, email, password, role } = req.body;

    if (firstName && lastName && username && email && password && role) {
      // Simulate successful registration
      return res.status(200).json({ message: 'Registration successful!' });
    } else {
      return res.status(400).json({ message: 'All fields are required' });
    }
  }

  res.status(405).json({ message: 'Method not allowed' });
}