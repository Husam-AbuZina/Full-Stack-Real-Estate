import express from 'express';
import { createUser, bookVisit, getAllBookings, cancelBooking, toFav, getAllFavorites } from '../controllers/userController.js';
import jwtCheck from '../config/auth0Config.js';

const router = express.Router()

router.post('/register', jwtCheck, createUser)
router.post('/bookVisit/:id', bookVisit)
router.get('/allBookings', getAllBookings)
router.post('/removeBooking/:id', cancelBooking)
router.post('/addToFavorites/:rid', toFav)
router.get('/allFav', getAllFavorites)



export {router as userRoute}