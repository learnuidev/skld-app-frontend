enum Persona {
  learner = "learner",
  parent_teacher = "parent_teacher",
}

export default async function Welcome(props: {
  searchParams: Promise<{ persona: Persona }>;
}) {
  const { persona } = await props.searchParams;

  if (persona === Persona.learner) {
    return (
      <div>
        <main>{JSON.stringify(persona, null, 4)}</main>
      </div>
    );
  }

  if (persona === Persona.parent_teacher) {
    return (
      <div>
        <main>{JSON.stringify(persona, null, 4)}</main>
      </div>
    );
  }
}
