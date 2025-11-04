import type {Request, Response} from 'express';

export default {
    dummy(req:  Request, res: Response) {
        res.status(200).json({
            status: 'success',
            message: 'Success hit endpoint /dummy ! - hasil berubah',
            data: "OK"
        })
    },
};