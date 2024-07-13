import { json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export const loader = async() => {
  const response = await fetch("http://localhost:3000/exam/list")
  const exams: {
    result: [
      {
        title: string,
        quizes_ids: string[],
        description: string,
        _creationTime: number,
        _id: string
      }
    ]
  } = await response.json()
  return json({
    result: exams.result
  })
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const exams = useLoaderData<typeof loader>()
  console.log(exams)
  return (
    <main className="p-3">
      <h1 className="text-2xl text-center font-bold font-sans m-3">
        資格とろうくん
      </h1>
      <div className="grid grid-cols-2">
        {exams.result.map(val => 
        <article key={val._id} className="card relative w-[36rem]">
          <h3 className="text-xl">{val.title}</h3>
          <p className="text-sm">{val.description}</p>
          <Link className="absolute left-[29rem] bottom-4" to={`exam/${val._id}`}>勉強する！</Link>
        </article>)}
      </div>
    </main>
  );
}
