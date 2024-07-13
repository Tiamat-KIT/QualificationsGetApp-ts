import type { RemoveUndefinedExamProp } from "./NotUndefinedChecker"

export type FinalExamProp = {
    title: string,
    description: string,
    exam_id: string,
    selection: string[],
    answer: string,
    answer_string: string
}

export default function NotStringArrayChecker(props: RemoveUndefinedExamProp){
    type PropsKey = typeof props
    type PropsUnion = keyof PropsKey
    const CheckNames = Object.keys(props) as PropsUnion[]
    let ResponseProp: FinalExamProp = {
        title: "",
        description: "",
        exam_id: "",
        selection: [""],
        answer: "",
        answer_string: ""
    }

    for(let check of CheckNames){
        const checked = props[`${check}`]
        if(check !== "selection") {
            if(checked instanceof Array){
                throw new Error("配列で与えてはならない値を配列で与えてしまっています")
            }else {
                ResponseProp[`${check}`] = checked
            }
        }
    }
    return ResponseProp
}