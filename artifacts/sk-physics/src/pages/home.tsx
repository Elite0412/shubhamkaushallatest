import { Link } from "wouter";
import { useListNotes } from "@workspace/api-client-react";

export default function Home() {
  const { data: notes, isLoading } = useListNotes();

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-2 text-3xl font-bold">SK Physics</h1>
      <p className="mb-6 text-muted-foreground">Simple notes website.</p>

      <div className="mb-8 flex gap-3">
        <Link href="/notes" className="rounded border px-4 py-2">View all notes</Link>
        <Link href="/contact" className="rounded border px-4 py-2">Contact</Link>
      </div>

      <section className="rounded border bg-white p-4">
        <h2 className="mb-3 text-xl font-semibold">Notes</h2>
        {isLoading ? (
          <p>Loading notes...</p>
        ) : !notes?.length ? (
          <p>No notes yet.</p>
        ) : (
          <ol className="list-decimal space-y-2 pl-5">
            {notes.map((note) => (
              <li key={note.id}>
                <a className="underline" href={note.fileUrl} target="_blank" rel="noreferrer">
                  {note.title}
                </a>
                <span className="ml-2 text-sm text-muted-foreground">{note.description}</span>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
