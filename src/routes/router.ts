import { Request, Router, Response } from "express";

import User from "../models/User";
import { hash } from "bcrypt";

import { privateRoute } from "../config/passaport";
import { x9verify } from "../middlewares/verifyUserMiddleware";
import { produtos, quiz, roleta } from "../controllers/homeController";



const router = Router();



router.get('/', quiz)

router.get('/roleta', roleta)


router.get('/produtos', produtos)


router.get('/produto/iphone14', (req:Request, res:Response) => {
  res.render('pages/1') // check
})

router.get('/produto/iphone15', (req:Request, res:Response) => {
  res.render('pages/2')
})

router.get('/produto/xiaomi', (req:Request, res:Response) => {
  res.render('pages/3')
})

router.get('/produto/geladeira', (req:Request, res:Response) => {
  res.render('pages/4')
})

router.get('/produto/notebook', (req:Request, res:Response) => {
  res.render('pages/5')
})

router.get('/produto/tv', (req:Request, res:Response) => {
  res.render('pages/6')
})


router.get('/produto/s24', (req:Request, res:Response) => {
  res.render('pages/7')
})

router.get('/produto/jbl', (req:Request, res:Response) => {
  res.render('pages/8')
})

router.get('/produto/tramontina', (req:Request, res:Response) => {
  res.render('pages/9')
})
router.get('/produto/lavaeseca', (req:Request, res:Response) => {
  res.render('pages/10')
})


export default router;