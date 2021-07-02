import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authorization = request.headers.authorization;
    const [, token] = authorization.split(' ');
    
    
    if(!token) {
        return response.status(401).end;
    }
    
    try {
        const authorized = verify(token, 'ae2774ab7bac678b3faa7381ce51238c');

        return next();
    } catch (error) {
        return response.status(401).end;
    }

}