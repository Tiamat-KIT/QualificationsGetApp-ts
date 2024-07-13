import fp from "fastify-plugin"
import OpenConvexClient from "../../utils/ConvexClient"
import { api } from "../../convex/_generated/api"
import type { Id } from "../../convex/_generated/dataModel"

const client = OpenConvexClient()

export default fp(async function(fastify,opts) {
    fastify.get("/exam",(_,rep) => {
        rep.send({
            message: "Work Server!"
        })
    })
    fastify.post("/exam/add" ,async(req,rep) =>{
        const {title,description} = req.headers
        if(title === undefined || description === undefined){
            rep.status(400)
            return rep.send({
                message: "Required Value Undefined"
            })
        }else if(title instanceof Array || description instanceof Array){
            rep.status(400)
            return rep.send({
                message: "Required Value Not Allow Array"
            })
        }

        try {
            const add_exam = await client.mutation(api.exam.AddExam,{
                title: title,
                description: description
            })
            return {
                result: add_exam
            }
        } catch(err){
            throw err
        }
        
    })
    fastify.get("/exam/list",async (req,rep) => {
        rep.type('application/json').code(200)
        try {
            const get_exam_all = await client.query(api.exam.getAllExams,{})
            return {
                result: get_exam_all
            }
        } catch(err) {
            throw err
        }
    })
    fastify.get("/exam/:exam_id",async(req,rep) => {
        rep.type("application/json").code(200)
        try {
            const get_exam = await client.query(api.exam.getExam,{
                id: (req.params as {[x in string]: string}).exam_id as Id<"exam">
            })
            return {
                result: get_exam
            }
        } catch(err) {
            throw err
        }
    })
})