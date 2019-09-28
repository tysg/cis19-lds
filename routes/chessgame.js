import { Router } from "express";
var router = Router();

router.post('/chessgame', (req, res, next) => {
	console.log(req.body);
})
