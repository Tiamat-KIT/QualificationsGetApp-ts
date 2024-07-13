import fastify from "fastify";
import ExamRoute from "./route/exam/index"
import QuizRoute from "./route/quiz/index"

const server = fastify({
    logger: true
})

server.get("/",(_,rep) => {
    rep.send("Hello!")
})

server.register(ExamRoute,{
    prefix: "/exam",
    logLevel: "debug"
})

server.register(QuizRoute,{
    prefix: "/quiz",
    logLevel: "debug"
})


const start = async () => {
    try {
        await server.listen({ port: 3000 })
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}
start()