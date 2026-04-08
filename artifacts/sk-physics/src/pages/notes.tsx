import { useListNotes } from "@workspace/api-client-react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, Download, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { format } from "date-fns";

export default function Notes() {
  const { data: notes, isLoading } = useListNotes();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = notes?.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    note.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-sky-50/30 pt-10 pb-24">
      {/* Page Header */}
      <div className="bg-sky-950 text-white py-16 md:py-24 mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Study Material</h1>
            <p className="text-lg text-sky-200">
              Access comprehensive physics notes for Class XI, XII, JEE, and NEET prepared by Shubham Kaushal.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12 relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400" size={20} />
            <Input
              type="text"
              placeholder="Search for topics, chapters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 pl-12 bg-white border-sky-200 text-sky-900 placeholder:text-sky-400 rounded-2xl shadow-sm focus-visible:ring-cyan-500 text-lg"
            />
          </div>
        </div>

        {/* Notes Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-sky-100/50 animate-pulse rounded-2xl border border-sky-100"></div>
            ))}
          </div>
        ) : filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <Card key={note.id} className="bg-white border-sky-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group flex flex-col h-full rounded-2xl overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-cyan-400 to-sky-400 w-full"></div>
                <CardHeader className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-cyan-50 rounded-xl text-cyan-600">
                      <FileText size={24} />
                    </div>
                    <span className="text-xs font-medium text-sky-500 bg-sky-50 px-2 py-1 rounded-md">
                      {format(new Date(note.updatedAt), "MMM d, yyyy")}
                    </span>
                  </div>
                  <CardTitle className="text-xl text-sky-950 mb-2 leading-tight">{note.title}</CardTitle>
                  <CardDescription className="text-sky-700 text-sm leading-relaxed">
                    {note.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-6 pb-6">
                  <Button asChild className="w-full bg-sky-50 text-cyan-700 hover:bg-cyan-600 hover:text-white transition-colors group-hover:bg-cyan-500 group-hover:text-white border-0">
                    <a href={note.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      <Download size={18} />
                      Download PDF
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-sky-100 shadow-sm max-w-2xl mx-auto">
            <BookOpen className="mx-auto h-16 w-16 text-sky-200 mb-6" />
            <h3 className="text-2xl font-bold text-sky-950 mb-2">No notes found</h3>
            <p className="text-sky-600 mb-6">
              {searchQuery ? "We couldn't find any notes matching your search." : "There are currently no notes available."}
            </p>
            {searchQuery && (
              <Button variant="outline" onClick={() => setSearchQuery("")} className="border-sky-200 text-sky-700">
                Clear Search
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}