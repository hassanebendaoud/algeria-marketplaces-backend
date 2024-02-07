import { NextFunction, Request, Response } from 'express';
import { z, ZodSchema as zc } from 'zod';

const zodValidateMiddleware =
    (schema: zc) => (req: Request, res: Response, next: NextFunction) => {
        console.log({ body: req.body, query: req.query, params: req.params });
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });

            next();
        } catch (error: unknown) {
            if (error instanceof z.ZodError) {
                return res.status(400).send(error.errors);
            }
        }
    };

export default zodValidateMiddleware;
