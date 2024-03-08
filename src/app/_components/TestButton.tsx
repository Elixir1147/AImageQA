"use client";

export default function TestButton(props: any) {
  return (
    <button
      onClick={() => {
        console.debug(props);
      }}
    >
      Test
    </button>
  );
}
