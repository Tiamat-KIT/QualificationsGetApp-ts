import {mutation, query} from "./_generated/server"
import {v} from "convex/values"
import {hashSync,genSaltSync} from "bcrypt"

export const CreateUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        password: v.string()
    },
    handler: async (ctx,args) => {
        if(args.email.length >= 5){
            return "5文字以上は入力してください"
        }
        const identity = await ctx.auth.getUserIdentity()
        if(identity === null) throw new Error("Unauthenticated call to mutation")
        
            const ExistingUser = await ctx.db.query("admin_user")
                .withIndex("by_token",(q) => 
                    q.eq("tokenIdentifier",identity.tokenIdentifier)
                )
                .unique()

            const UserLength = (await ctx.db.query("admin_user")
                .collect()).length

            if(ExistingUser === null && UserLength === 0){

                return await ctx.db.insert("admin_user",{
                    name: args.name,
                    email: args.email,
                    password: hashSync(args.password,genSaltSync(10)),
                    tokenIdentifier: identity.tokenIdentifier
                })
            }else {
                return "もうAdmin権限を持つユーザは確定しています"
            }
    }
})

export const LoginUser = query({
    args: {
        email: v.string(),
        password: v.string()
    },
    handler: async(ctx,args) => {
        const LoginUserEmailExisting = await ctx.db.query("admin_user")
            .filter(q => q.eq(q.field("email"),args.email))
            .unique()

        const LoginUserPasswordExisting = await ctx.db.query("admin_user")
            .filter(q => q.eq(q.field("password"),hashSync(args.password,genSaltSync(10))))
            .unique()
        
        if(LoginUserEmailExisting === null && LoginUserPasswordExisting === null){
            return "登録情報がありません。新規登録してください"
        }else if(LoginUserEmailExisting && LoginUserPasswordExisting === null){
            return "パスワードが間違っています"
        }else if(LoginUserEmailExisting === null && LoginUserPasswordExisting){
            return "メールアドレスが間違っています"
        }else {
            return true
        }

    }
})