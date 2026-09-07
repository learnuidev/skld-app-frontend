import { redirect } from "next/navigation";

export default async function Welcome(props: {
  searchParams: Promise<{ persona?: "learner" | "parent_teacher" }>;
}) {
  const { persona } = await props.searchParams;
  redirect(`/courses${persona ? `?persona=${persona}` : ""}`);
}
