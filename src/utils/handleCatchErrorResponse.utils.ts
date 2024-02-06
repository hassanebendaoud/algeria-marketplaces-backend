import { Response } from 'express';

const handleCatchErrorResponse = (error: unknown, res: Response) => {
    if (typeof error === 'string') {
        console.log('error', error);
        return res.status(500).send({ message: error });
    } else if (error instanceof Error) {
        console.log('error', error.message);
        return res.status(500).send({ message: error.message });
    } else {
        console.log('error', 'An error occurred');
        return res.status(500).send({ message: 'An error occurred' });
    }
};

export default handleCatchErrorResponse;
