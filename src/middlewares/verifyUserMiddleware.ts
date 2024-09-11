import { Request, Response, NextFunction } from "express";

export const x9verify = async (req:Request, res:Response, next:NextFunction) => {
  const userAgent = req.headers['user-agent'];

  console.log(userAgent)
  next()
}