import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAllExams = query({
    args: {},
    handler: async (ctx) => {
        return ctx.db.query("exam").collect()
    }
})

export const getExam = query({
    args: {
        id: v.id("exam")
    },
    handler: async(ctx,args) => {
        return await ctx.db.get(args.id)
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

export const DeleteExam = mutation({
    args: {id: v.id("exam")},
    handler: async(ctx,args) => {
        await ctx.db.delete(args.id)
    }
})

export const AddQuizInExam = mutation({
    args: {
        exam_id: v.id("exam"),
        quiz_id: v.id("quiz")
    },
    handler: async(ctx,args) => {
        const before = await ctx.db.get(args.exam_id)
        if(before === null) throw new Error("Fail Update...")
        await ctx.db.replace(args.exam_id,{
            title: before.title,
            description: before.description,
            _creationTime:before._creationTime,
            _id: before._id,
            quizes_ids: [...before.quizes_ids,args.quiz_id]
        })
    }
})

export const AddQuizesInExam = mutation({
    args: {
        exam_id: v.id("exam"),
        quiz_ids: v.array(v.id("quiz"))
    },
    handler: async(ctx,args) => {
        await ctx.db.patch(args.exam_id,{
            quizes_ids: args.quiz_ids
        })
    }
})

export const AllDeleteQuizInExam = mutation({
    args: {exam_id: v.id("exam")},
    handler: async(ctx,args) => {
        await ctx.db.patch(args.exam_id,{
            quizes_ids: []
        })
    }
})

export const DeleteQuizInExam = mutation({
    args: {
        exam_id: v.id("exam"),
        quiz_id: v.id("quiz")
    },
    handler: async(ctx,args) => {
        const before = await ctx.db.get(args.exam_id)
        if(before === null) throw new Error("Fail Update...")
        await ctx.db.replace(args.exam_id,{
            title: before.title,
            description: before.description,
            _creationTime:before._creationTime,
            _id: before._id,
            quizes_ids: [...before.quizes_ids.filter((val) => val !== args.quiz_id)]
        })
    }
})