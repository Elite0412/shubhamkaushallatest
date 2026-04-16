import { useListNotes } from "@workspace/api-client-react";

export default function Notes() {
  const { data: notes, isLoading } = useListNotes();

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-2xl font-semibold">All Notes</h1>

      {isLoading ? (
        <p>Loading notes...</p>
      ) : !notes?.length ? (
        <p>No notes available.</p>
      ) : (
        <ul className="space-y-2">
          {notes.map((note, index) => (
            <li key={note.id} className="rounded border bg-white p-3">
              <p className="font-medium">{index + 1}. {note.title}</p>
              <p className="text-sm text-muted-foreground">{note.description}</p>
              <a href={note.fileUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                Open link
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
