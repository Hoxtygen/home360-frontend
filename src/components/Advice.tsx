import Link from "next/link";
import { advice } from "constants/staticData";

export default function Advice() {
  return (
    <div className="content-center">
      <h1>Advice and Tips</h1>
      <p>Checklists, templates and much more</p>
      <div className="flex flex-wrap">
        {advice.map((advise, index) => (
          <Link href={advise.href} key={index} className="border h-32">
            <h2>{advise.title}</h2>
            <p>{advise.lesson}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
