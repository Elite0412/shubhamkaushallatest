import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { getListNotesQueryKey, useCreateNote, useDeleteNote, useListNotes } from "@workspace/api-client-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const adminToken = typeof window !== "undefined" ? localStorage.getItem("sk_admin_token") : null;

  useEffect(() => {
    if (!adminToken) {
      setLocation("/admin");
    }
  }, [adminToken, setLocation]);

  const { data: notes, isLoading } = useListNotes();
  const createNote = useCreateNote();
  const deleteNote = useDeleteNote();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToken) return;

    try {
      const fileName = url.split("/").pop() || "note-link";
      await createNote.mutateAsync({
        data: {
          title,
          description,
          fileUrl: url,
          fileName,
          adminToken,
        },
      });

      toast({ title: "Added", description: "Note added successfully." });
      setTitle("");
      setDescription("");
      setUrl("");
      queryClient.invalidateQueries({ queryKey: getListNotesQueryKey() });
    } catch {
      toast({ variant: "destructive", title: "Error", description: "Failed to add note." });
    }
  };

  const handleDelete = async (id: number) => {
    if (!adminToken) return;

    try {
      await deleteNote.mutateAsync({ id, params: { adminToken } });
      toast({ title: "Deleted", description: "Note deleted." });
      queryClient.invalidateQueries({ queryKey: getListNotesQueryKey() });
    } catch {
      toast({ variant: "destructive", title: "Error", description: "Failed to delete note." });
    }
  };

  if (!adminToken) return null;

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-2xl font-semibold">Admin Notes</h1>

      <form onSubmit={handleAdd} className="mb-8 space-y-3 rounded border bg-white p-4">
        <h2 className="text-lg font-medium">Add Note</h2>
        <Input
          required
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          required
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          required
          type="url"
          placeholder="https://example.com/note"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button type="submit" disabled={createNote.isPending}>Add Note</Button>
      </form>

      <div className="rounded border bg-white p-4">
        <h2 className="mb-3 text-lg font-medium">Notes</h2>
        {isLoading ? (
          <p>Loading notes...</p>
        ) : !notes?.length ? (
          <p>No notes yet.</p>
        ) : (
          <ul className="space-y-2">
            {notes.map((note) => (
              <li key={note.id} className="flex items-start justify-between gap-3 rounded border p-3">
                <div>
                  <p className="font-medium">{note.title}</p>
                  <p className="text-sm text-muted-foreground">{note.description}</p>
                  <a href={note.fileUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-600 underline">
                    {note.fileUrl}
                  </a>
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  disabled={deleteNote.isPending}
                  onClick={() => handleDelete(note.id)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
