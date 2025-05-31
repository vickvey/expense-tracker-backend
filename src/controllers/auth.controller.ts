import { Request, Response } from 'express';

const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
};
