import {mutation,query} from "./_generated/server"
import {v} from "convex/values"

export const addSelection = mutation({
    args: {
        selection: v.array(v.string()),
        answer: v.string(),
        answer_string: v.string()
    },
    handler: async(ctx,args) => {
        if(args.selection.length !== 4){
            throw new Error("選択肢が多すぎます")
        }
        const result = await ctx.db.insert("selection",{
            selection: args.selection,
            answer: args.answer,
            answer_string: args.answer_string
        })
        return result
    }
})