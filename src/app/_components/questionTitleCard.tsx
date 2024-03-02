import Link from "next/link";

export default function QuestionTitleCard({
  link,
  children,
}: {
  link: string;
  children: string;
}): JSX.Element {
  return (
    <div
      className={
        "text-ellipsis break-words text-2xl box-content bg-white text-left rounded-lg my-3 p-2 hover:text-sky-500 shadow-md"
      }
    >
      <Link href={link}>{children}</Link>
    </div>
  );
}
