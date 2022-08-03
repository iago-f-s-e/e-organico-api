import { createParamDecorator } from '@nestjs/common';
import { Request, Response } from 'express';

interface InputDecorator {
  args: [Request, Response];
}

export const Current = createParamDecorator<unknown, InputDecorator>((_, { args }) => {
  const [request] = args;

  return request.currentUser;
});
