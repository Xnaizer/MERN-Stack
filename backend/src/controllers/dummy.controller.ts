import type { Request, Response } from "express";

export default {
  dummy(req: Request, res: Response) {
    res.status(200).json({
      status: "Success",
      message: "Success hit dummy API!",
      data: "OK",
    });
  },
};
