import dynamic from "next/dynamic";

const Playground = dynamic(() => import("./lexical-palyground/src/App"), {
  ssr: false,
});

export default function PlaygroundEditor(): JSX.Element {
  return <Playground />;
}
