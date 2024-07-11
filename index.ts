import fastify from "fastify";
import { ConvexClient } from "convex/browser";
import { api } from "./convex/_generated/api";

const server = fastify({
    logger: true
})

function OpenConvexClient() {
    return new ConvexClient(process.env["CONVEX_URL"]!)
    
}

server.get("/exam/list",async (req,rep) => {
    const client = OpenConvexClient()
    const get_exam_all = await client.query(api.exam.getAllExams,{})
    rep.type("application/json").code(200)
    return {
        result: get_exam_all
    }
})

server.listen(
    {
        port: 3000
    },
    (err,address) => {
        if(err) throw err
        console.log("Server Port: " + address)
    }
)