import { Router } from "express";
var router = Router();

router.post('/', (req, res, next) => {
	console.log(req.body);
})

export default router;
