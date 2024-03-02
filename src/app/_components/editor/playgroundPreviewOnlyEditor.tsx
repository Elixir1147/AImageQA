import dynamic from "next/dynamic";

const Playground = dynamic(
  () => import("./lexical-palyground/src/PreviewOnlyApp"),
  {
    ssr: false,
  }
);

export default function PlaygroundPrivewOnlyEditor(): JSX.Element {
  return <Playground />;
}
