type ExamProp = {
    title: string | string[] | undefined,
    description: string | string[] | undefined,
    exam_id: string | string[] | undefined,
    selection: string | string[] | undefined,
    answer: string | string[] | undefined,
    answer_string: string | string[] | undefined
}

export type RemoveUndefinedExamProp = {
    title: string | string[],
    description: string | string[],
    exam_id: string | string[],
    selection: string | string[],
    answer: string | string[],
    answer_string: string | string[]
}
export default function NotUndefinedChecker(props: ExamProp){
    type PropsKey = typeof props
    type PropsUnion = keyof PropsKey
    const CheckNames = Object.keys(props) as PropsUnion[]
    let ResponseProp: RemoveUndefinedExamProp = {
        title: "",
        description: "",
        exam_id: "",
        selection: "",
        answer: "",
        answer_string: ""
    }

    for(let check of CheckNames){
        const checked = props[`${check}`]
        if(typeof checked === "undefined"){
            throw new Error("入力値の欠損が見られました")
        }else {
            ResponseProp[`${check}`] = checked
        }
    }
    return ResponseProp
}