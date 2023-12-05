import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return <div>Hello Qwik!</div>;
});

export const head: DocumentHead = {
  title: "Qwik City - List Client",
  meta: [{ name: "description", content: "Qwik City - List Client" }],
};
