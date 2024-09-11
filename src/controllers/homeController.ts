import { Request, Response } from "express";




export const quiz = async (req:Request, res:Response) => {
  res.render('pages/quiz')
} 


export const roleta = async (req:Request, res:Response) => {
  res.render('pages/roleta')
}

export const produtos = async (req:Request, res:Response) => {
  res.render('pages/produtos')
}