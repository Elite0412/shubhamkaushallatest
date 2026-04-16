import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { 
  useListNotes, 
  useCreateNote, 
  useUpdateNote, 
  useDeleteNote, 
  useGetUploadUrl,
  getListNotesQueryKey
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { BookOpen, Plus, FileText, Pencil, Trash2, Upload, Link as LinkIcon, Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const [location, setLocation] = useLocation();
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
  const updateNote = useUpdateNote();
  const deleteNote = useDeleteNote();
  const getUploadUrl = useGetUploadUrl();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  // Create form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileMode, setFileMode] = useState<"upload" | "url">("upload");
  const [fileUrl, setFileUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Edit form state
  const [editId, setEditId] = useState<number | null>(null);

  const resetCreateForm = () => {
    setTitle("");
    setDescription("");
    setFileUrl("");
    setSelectedFile(null);
    setFileMode("upload");
    setIsUploading(false);
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToken) return;

    try {
      setIsUploading(true);
      let finalFileUrl = fileUrl;
      let finalFileName = fileMode === "upload" && selectedFile ? selectedFile.name : (fileUrl.split('/').pop() || "note.pdf");

      if (fileMode === "upload" && selectedFile) {
        const uploadRes = await getUploadUrl.mutateAsync({
          data: { fileName: selectedFile.name, adminToken }
        });

        await fetch(uploadRes.uploadUrl, {
          method: "PUT",
          body: selectedFile,
          headers: { "Content-Type": "application/pdf" },
        });

        finalFileUrl = uploadRes.fileUrl;
      }

      await createNote.mutateAsync({
        data: {
          title,
          description,
          fileUrl: finalFileUrl,
          fileName: finalFileName,
          adminToken
        }
      });

      toast({ title: "Success", description: "Note added successfully." });
      queryClient.invalidateQueries({ queryKey: getListNotesQueryKey() });
      setIsCreateOpen(false);
      resetCreateForm();
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Failed to add note." });
    } finally {
      setIsUploading(false);
    }
  };

  const openEditDialog = (note: any) => {
    setEditId(note.id);
    setTitle(note.title);
    setDescription(note.description);
    setIsEditOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToken || !editId) return;

    try {
      await updateNote.mutateAsync({
        id: editId,
        data: { title, description, adminToken }
      });
      toast({ title: "Success", description: "Note updated successfully." });
      queryClient.invalidateQueries({ queryKey: getListNotesQueryKey() });
      setIsEditOpen(false);
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Failed to update note." });
    }
  };

  const handleDelete = async (id: number) => {
    if (!adminToken) return;
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminToken }),
      });
      if (!res.ok) throw new Error("Delete failed");
      toast({ title: "Deleted", description: "Note removed successfully." });
      queryClient.invalidateQueries({ queryKey: getListNotesQueryKey() });
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Failed to delete note." });
    }
  };

  if (!adminToken) return null;

  return (
    <div className="min-h-screen bg-sky-50 pb-24">
      <div className="bg-sky-950 text-white py-12 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-sky-200">Manage study materials and resources</p>
            </div>
            
            <Dialog open={isCreateOpen} onOpenChange={(open) => {
              setIsCreateOpen(open);
              if (!open) resetCreateForm();
            }}>
              <DialogTrigger asChild>
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium shadow-md shadow-cyan-500/20">
                  <Plus className="mr-2 h-5 w-5" /> Add New Note
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] bg-white border-sky-100 rounded-3xl p-6 shadow-xl">
                <DialogHeader className="mb-4">
                  <DialogTitle className="text-2xl font-bold text-sky-950">Add Study Material</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-sky-900">Title</label>
                    <Input required value={title} onChange={e => setTitle(e.target.value)} className="bg-sky-50 border-sky-100" placeholder="e.g. Kinematics Part 1" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-sky-900">Description</label>
                    <Textarea required value={description} onChange={e => setDescription(e.target.value)} className="bg-sky-50 border-sky-100 resize-none h-24" placeholder="Brief description of the topics covered..." />
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    <label className="text-sm font-medium text-sky-900">File Source</label>
                    <div className="flex gap-2 bg-sky-50 p-1 rounded-xl">
                      <button type="button" onClick={() => setFileMode("upload")} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${fileMode === "upload" ? "bg-white text-cyan-600 shadow-sm" : "text-sky-600"}`}>
                        <Upload size={16} className="inline mr-2" /> Upload PDF
                      </button>
                      <button type="button" onClick={() => setFileMode("url")} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${fileMode === "url" ? "bg-white text-cyan-600 shadow-sm" : "text-sky-600"}`}>
                        <LinkIcon size={16} className="inline mr-2" /> External URL
                      </button>
                    </div>
                    
                    {fileMode === "upload" ? (
                      <Input type="file" accept=".pdf" required onChange={e => setSelectedFile(e.target.files?.[0] || null)} className="bg-sky-50 border-sky-100 file:bg-cyan-50 file:text-cyan-700 file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-4 file:font-medium" />
                    ) : (
                      <Input type="url" required value={fileUrl} onChange={e => setFileUrl(e.target.value)} placeholder="https://example.com/notes.pdf" className="bg-sky-50 border-sky-100" />
                    )}
                  </div>

                  <Button type="submit" disabled={isUploading || (!selectedFile && fileMode === "upload")} className="w-full bg-cyan-600 hover:bg-cyan-700 mt-6">
                    {isUploading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading & Saving...</> : "Save Note"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl border border-sky-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-sky-100 flex items-center justify-between bg-sky-50/50">
            <h2 className="text-xl font-bold text-sky-950 flex items-center gap-2">
              <FileText className="text-cyan-500" /> All Study Materials
            </h2>
            <span className="bg-sky-100 text-sky-700 text-xs font-bold px-3 py-1 rounded-full">
              {notes?.length || 0} Files
            </span>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-white">
                <TableRow className="border-sky-100 hover:bg-white">
                  <TableHead className="font-semibold text-sky-900 w-[30%]">Title</TableHead>
                  <TableHead className="font-semibold text-sky-900 hidden md:table-cell w-[40%]">Description</TableHead>
                  <TableHead className="font-semibold text-sky-900">Date Added</TableHead>
                  <TableHead className="font-semibold text-sky-900 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-32 text-center text-sky-400">
                      <Loader2 className="mx-auto h-6 w-6 animate-spin mb-2" />
                      Loading notes...
                    </TableCell>
                  </TableRow>
                ) : notes && notes.length > 0 ? (
                  notes.map((note) => (
                    <TableRow key={note.id} className="border-sky-50 hover:bg-sky-50/50 transition-colors">
                      <TableCell className="font-medium text-sky-950">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                            <FileText size={16} />
                          </div>
                          <span className="line-clamp-1">{note.title}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sky-700 hidden md:table-cell">
                        <span className="line-clamp-1">{note.description}</span>
                      </TableCell>
                      <TableCell className="text-sky-600 text-sm">
                        {format(new Date(note.createdAt), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="text-sky-500 hover:text-cyan-600 hover:bg-cyan-50" onClick={() => openEditDialog(note)}>
                            <Pencil size={18} />
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-sky-400 hover:text-red-600 hover:bg-red-50">
                                <Trash2 size={18} />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-white border-sky-100 rounded-3xl">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-sky-950">Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription className="text-sky-700">
                                  This will permanently delete the note "{note.title}". This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="border-sky-200 text-sky-800">Cancel</AlertDialogCancel>
                                <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={() => handleDelete(note.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-32 text-center text-sky-500">
                      No study materials found. Add your first note above.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white border-sky-100 rounded-3xl p-6 shadow-xl">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-bold text-sky-950">Edit Note</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-sky-900">Title</label>
              <Input required value={title} onChange={e => setTitle(e.target.value)} className="bg-sky-50 border-sky-100" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-sky-900">Description</label>
              <Textarea required value={description} onChange={e => setDescription(e.target.value)} className="bg-sky-50 border-sky-100 resize-none h-24" />
            </div>
            <Button type="submit" disabled={updateNote.isPending} className="w-full bg-cyan-600 hover:bg-cyan-700 mt-6">
              {updateNote.isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Update Note"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
}
