import asyncHandler from 'express-async-handler'

import {prisma} from '../config/prismaConfig.js'


// POST a residency
export const createResidency = asyncHandler(async (req, res) => {
    const {title, 
           description, 
           price, 
           address, 
           city, 
           country, 
           facilities, 
           image, 
           userEmail} = req.body.data;

    console.log(req.body.data)
    try {
        const residency = await prisma.residency.create({
            data: {
                title,
                description, 
                price, 
                address, 
                city, 
                country, 
                facilities, 
                image, 
                owner: {connect: {email: userEmail}}
            }
        })

        res.send({message: "Residency created successfully"})
    } catch (error) {
        if(error.code ==="P200"){
            throw new Error("A residency with address already there")
        }
        throw new Error(error.message)
    }

})

// GET all residencies
export const getAllResidencies = asyncHandler(async(req, res) => {
    const residencies = await prisma.residency.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
    res.send(residencies)
})

// GET residency by id
export const getResidency = asyncHandler(async(req, res) => {
    const {id} = req.params;

    try {
        const residency = await prisma.residency.findUnique({
            where: {id}
        })
        res.send(residency)
    } catch (error) {
        throw new Error(error.message)
    }
})