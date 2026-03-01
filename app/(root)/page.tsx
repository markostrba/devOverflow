const HomePage = () => {
  return (
    <div className="flex gap-6 max-w-7xl mx-auto">
      <section className="flex-1">
        <h1 className="text-2xl font-bold text-foreground text-balance">
          All Questions
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          5000+ questions and growing
        </p>

        <div className="rounded-lg h-11.5 w-full border border-border p-1 my-6">
          QUESTION FILTER
        </div>

        <ul className="flex flex-col gap-6">
          <li className="group rounded-xl border border-border bg-card h-50 p-5 hover:border-accent/30"></li>
          <li className="group rounded-xl border border-border bg-card h-50 p-5 hover:border-accent/30"></li>
          <li className="group rounded-xl border border-border bg-card h-50 p-5 hover:border-accent/30"></li>
          <li className="group rounded-xl border border-border bg-card h-50 p-5 hover:border-accent/30"></li>
        </ul>
      </section>
      <aside className="hidden xl:flex xl:w-70 2xl:w-75 shrink-0 flex-col gap-5">
        <div className="rounded-xl border border-border p-5 bg-card">
          <h2>Hot Network</h2>
          <ul className="flex flex-col gap-3">
            <li>
              Would it be appropriate to point out an error in another paper
              during a review?
            </li>
            <li>How can an airconditioning machine exist?</li>
            <li>Interrogated every time crossing UK Border as citizen</li>
            <li>Low digit addition generator</li>
          </ul>
        </div>
        <div className="rounded-xl border border-border p-5 bg-card">
          <h2>Popular Tags</h2>
          <ul className="flex flex-col gap-3">
            <li>JavaScript</li>
            <li>TypeScript</li>
            <li>ReactJS</li>
            <li>NextJS</li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default HomePage;
