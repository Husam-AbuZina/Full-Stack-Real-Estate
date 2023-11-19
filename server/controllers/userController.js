import asyncHandler from 'express-async-handler'
import {prisma} from '../config/prismaConfig.js'

// POST create user
export const createUser = asyncHandler(async(req, res) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    console.log("creating a user");

    let {email} = req.body;
    const userExists = await prisma.user.findUnique({where: {email}})
    if(!userExists) {
        const user = await prisma.user.create({data: req.body})
        res.send({
            message:"user registered successfully",
            user: user,
        });
    } else {
        res.status(201).send({message: "User already registered"})
    }
})

// POST bookmark a residency
export const bookVisit = asyncHandler(async(req, res) => {
    const {email, date} = req.body
    const {id} = req.params
    try {
        const alreadyBooked = await prisma.user.findUnique({
            where: {email},
            select: {bookedVisits: true}
        })

        if(alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
            res.status(400).json({message: "This residency is already booked by you."})
        } else {
            await prisma.user.update({
                where: {email},
                data: {
                    bookedVisits: {push: {id, date}}
                }
            })
            res.send("your visit is booked successfully")
        }

    } catch (error) {
        throw new Error(error.message)
    }
})

// POST all bookings of a user
export const getAllBookings = asyncHandler (async(req, res) => {
    const {email} = req.body;
    try {
        const bookings = await prisma.user.findUnique({
            where: {email},
            select: {bookedVisits: true}
        })
        res.status(200).send(bookings)
    } catch (error) {
        throw new Error(error.message)
    }
})

// POST Cancel the booking
export const cancelBooking = asyncHandler(async(req, res) => {
    const {email} = req.body;
    const {id} = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { email },
            select: { bookedVisits: true }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const index = user.bookedVisits.findIndex((visit) => visit.id === id);

        if (index === -1) {
            res.status(404).json({ message: "Booking not found" });
        } else {
            user.bookedVisits.splice(index, 1);

            await prisma.user.update({
                where: { email },
                data: {
                    bookedVisits: user.bookedVisits
                }
            });

            res.status(200).send("Booking cancelled successfully");
        }
    } catch (error) {
        throw new Error(error.message);
    }
});

// POST Add Residency To Favorites
export const toFav = asyncHandler(async(req, res) => {
    const {email} = req.body;
    const {rid} = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: {email}
        })

        if(user.favResidenciesID.includes(rid)) {
            const updateUser = await prisma.user.update({
                where: {email},
                data: {
                    favResidenciesID: {
                        set: user.favResidenciesID.filter((id) => id !== rid)
                    }
                }
            });
            res.send({message: "Removed from favorites", user: updateUser})
        } else {
            const updateUser = await prisma.user.update({
                where: {email},
                data: {
                    favResidenciesID: {
                        push: rid
                    }
                }
            })
            res.status(200).send({message: "Updated favorites", user: updateUser})
        }
    } catch (error) {
        throw new Error(error.message)
    }
})

// GET All Favorites
export const getAllFavorites = asyncHandler(async(req, res) => {
    const {email} = req.body;

    try {
        const favResd = await prisma.user.findUnique({
            where: {email},
            select: {favResidenciesID: true},
        });
        res.status(200).send(favResd)
    } catch (error) {
        throw new Error(error.message)
    }
})