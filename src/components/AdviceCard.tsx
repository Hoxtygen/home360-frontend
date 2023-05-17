import Link from "next/link";
import { AdviceProps } from "typedef";

type AdviceData = { data: AdviceProps };
export default function AdviceCard({ data }: AdviceData) {
  return (
    <div
      className="bg-[length:250px_300px] min-h-[300px] w-64 border bg-center"
      style={{ backgroundImage: `url(${data.backgroundImage})` }}
    >
      <Link href={data.href} className="h-32 text-center block">
        <h3 className="text-center border inline-block px-4 py-3">
          {data.title}
        </h3>
        <p className="text-center mt-[16px]">{data.lesson}</p>
      </Link>
    </div>
  );
}
