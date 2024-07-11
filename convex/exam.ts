import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAllExams = query({
    args: {},
    handler: async (ctx) => {
        return ctx.db.query("exam").collect()
    }
})

export const AddExam = mutation({
    args: {
        title: v.string(),
        description: v.string(),

    },
    handler: async(ctx,args) => {
        return await ctx.db.insert("exam",{
            title: args.title,
            description: args.description,
            quizes_ids: []
        })
    }
})


export const testAdd = mutation({
    args: {},
    handler: async(ctx) => {
        return await ctx.db.insert("exam",{
            title: "CG-ARTS Webデザイナー エキスパート",
            description: "Webデザインに関する試験です",
            quizes_ids: []
        })
    }
})