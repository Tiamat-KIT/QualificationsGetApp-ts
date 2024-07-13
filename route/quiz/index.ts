import fp from "fastify-plugin"
import OpenConvexClient from "../../utils/ConvexClient"
import {api} from "../../convex/_generated/api"
import NotUndefinedChecker from "../../utils/NotUndefinedChecker"
import type { Id } from "../../convex/_generated/dataModel"
import NotStringArrayChecker from "../../utils/NotStringArrayChecker"

const client = OpenConvexClient()

export default fp(async function (fastify,opts) {
    fastify.get("/quiz",(_,rep) => {
        rep.send({
            message: "Work Server!"
        })
    })
    fastify.post("/quiz/add",async(req,rep) => {
        const {
            title,
            description,
            exam_id,
            selection,
            answer,
            answer_string
        } = req.headers
        const CheckResult = NotStringArrayChecker(NotUndefinedChecker({
            title,
            description,
            exam_id,
            selection,
            answer,
            answer_string
        }))

        try {
            await client.mutation(api.quiz.addQuiz,{
                title: CheckResult.title,
                description: CheckResult.description,
                exam_id: CheckResult.exam_id as Id<"exam">,
                selection: {
                    selection: CheckResult.selection,
                    answer: CheckResult.answer,
                    answer_string: CheckResult.answer_string
                }
            })
        } catch(err) {
            fastify.log.error(err)
        }
    })
})