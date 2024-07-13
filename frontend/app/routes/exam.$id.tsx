import { LoaderFunctionArgs } from "@remix-run/node"
import { json, useLoaderData} from "@remix-run/react"

export async function loader({params}:LoaderFunctionArgs) {
    const response = await fetch(`http://localhost:3000/exam/${params.id}`)
    const exam: {
        result: {
            title: string,
            quizes_ids: string[],
            description: string,
            _creationTime: number,
            _id: string
        }
    } = await response.json()
    return json({
        result: exam.result
    })
}

export default function ExamPage() {
    const exam = useLoaderData<typeof loader>().result
    return (
        <article>
            <h3 className="text-lg">{exam.title}</h3>
            <p className="text-sm">{exam.description}</p>
        </article>
    )
}