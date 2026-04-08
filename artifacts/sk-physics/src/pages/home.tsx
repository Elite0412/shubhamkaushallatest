import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, Users, ArrowRight, Lightbulb, Activity, ArrowUpRight } from "lucide-react";
import heroImg from "../assets/hero.png";
import { useListNotes } from "@workspace/api-client-react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { format } from "date-fns";

export default function Home() {
  const { data: notes, isLoading } = useListNotes();
  const recentNotes = notes?.slice(0, 3) || [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-sky-50 overflow-hidden pt-20 pb-24 md:pt-32 md:pb-36 lg:pt-40 lg:pb-48">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImg} 
            alt="Physics Classroom" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sky-50 via-sky-50/90 to-sky-50/50"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-sm font-semibold mb-6">
              <BookOpen size={16} />
              <span>Admissions Open for 2024-25</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-sky-950 mb-6 leading-tight">
              Master Physics with <span className="text-cyan-600 block mt-2">Shubham Kaushal</span>
            </h1>
            
            <p className="text-lg md:text-xl text-sky-800 mb-8 max-w-2xl leading-relaxed">
              Expert tutoring for Class XI, XII, JEE, and NEET in Hapur. Build a strong foundation, crack competitive exams, and achieve academic excellence with proven teaching methodologies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="h-14 px-8 text-base bg-cyan-600 hover:bg-cyan-700">
                <Link href="/contact">
                  Enroll Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base border-cyan-200 text-cyan-800 hover:bg-cyan-50">
                <Link href="/notes">
                  View Study Material
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Features Bar */}
      <section className="bg-white border-b border-sky-100 py-12 -mt-8 relative z-20 mx-4 md:mx-auto md:w-[90%] rounded-2xl shadow-xl shadow-sky-900/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-sky-100">
            <div className="flex flex-col items-center p-4">
              <div className="w-12 h-12 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-600 mb-4">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-xl font-bold text-sky-950 mb-2">Expert Tutoring</h3>
              <p className="text-sky-700 text-sm">Specialized batches for XI, XII, JEE & NEET with personalized attention.</p>
            </div>
            
            <div className="flex flex-col items-center p-4 pt-8 md:pt-4">
              <div className="w-12 h-12 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-600 mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold text-sky-950 mb-2">Study Material</h3>
              <p className="text-sky-700 text-sm">Comprehensive, easy-to-understand notes covering the complete syllabus.</p>
            </div>
            
            <div className="flex flex-col items-center p-4 pt-8 md:pt-4">
              <div className="w-12 h-12 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-600 mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-sky-950 mb-2">Proven Results</h3>
              <p className="text-sky-700 text-sm">Consistent track record of students excelling in board and competitive exams.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Teacher Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden bg-sky-100 relative z-10 p-8">
                   <div className="w-full h-full border-4 border-dashed border-cyan-300 rounded-2xl flex items-center justify-center bg-white/50 backdrop-blur-sm">
                      <div className="text-center p-6">
                        <Activity className="w-16 h-16 text-cyan-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-sky-900 mb-2">SK Physics</h3>
                        <p className="text-sky-600 font-medium">Shubham Kaushal</p>
                      </div>
                   </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-cyan-50 rounded-full z-0 blur-2xl"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-sky-100 rounded-full z-0 blur-xl"></div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 text-cyan-600 font-semibold uppercase tracking-wider text-sm mb-4">
                <Lightbulb size={18} />
                <span>Meet Your Mentor</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-sky-950 mb-6">Demystifying the Universe, One Concept at a Time.</h2>
              <p className="text-lg text-sky-800 mb-6 leading-relaxed">
                Physics isn't just about memorizing equations—it's about understanding how the world works. At SK Physics, we break down complex concepts into simple, intuitive ideas that stick with you forever.
              </p>
              <p className="text-lg text-sky-800 mb-8 leading-relaxed">
                Located in the heart of Hapur, we provide an environment that fosters curiosity, critical thinking, and problem-solving skills essential for cracking JEE and NEET.
              </p>
              
              <ul className="space-y-4 mb-8">
                {["Focus on core fundamentals", "Regular mock tests and assessments", "Doubt clearing sessions", "Modern teaching aids"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sky-900 font-medium">
                    <div className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Notes Preview */}
      <section className="py-24 bg-sky-50/50 border-t border-sky-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-cyan-600 font-semibold uppercase tracking-wider text-sm mb-4">
                <BookOpen size={18} />
                <span>Free Resources</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-sky-950">Latest Study Material</h2>
            </div>
            <Button asChild variant="outline" className="border-sky-200 text-sky-700 hover:bg-sky-100">
              <Link href="/notes" className="flex items-center">
                View All Notes <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-sky-100/50 animate-pulse rounded-2xl border border-sky-100"></div>
              ))}
            </div>
          ) : recentNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentNotes.map((note) => (
                <Card key={note.id} className="bg-white border-sky-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-cyan-50 rounded-xl text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                        <BookOpen size={24} />
                      </div>
                      <span className="text-xs font-medium text-sky-500 bg-sky-50 px-2 py-1 rounded-md">
                        {format(new Date(note.updatedAt), "MMM d, yyyy")}
                      </span>
                    </div>
                    <CardTitle className="text-xl text-sky-950 line-clamp-1">{note.title}</CardTitle>
                    <CardDescription className="text-sky-700 line-clamp-2 mt-2">{note.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto pt-6">
                    <Button asChild variant="secondary" className="w-full bg-sky-50 text-sky-700 hover:bg-sky-100">
                      <a href={note.fileUrl} target="_blank" rel="noopener noreferrer">
                        Download PDF
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-sky-100">
              <BookOpen className="mx-auto h-12 w-12 text-sky-300 mb-4" />
              <h3 className="text-lg font-semibold text-sky-900 mb-1">No notes available yet</h3>
              <p className="text-sky-600">Check back later for new study materials.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-cyan-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-500 rounded-full blur-3xl opacity-50"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to excel in Physics?</h2>
          <p className="text-xl text-cyan-100 mb-10 leading-relaxed">
            Join SK Physics today and transform the way you learn. Limited seats available for the upcoming batches.
          </p>
          <Button asChild size="lg" className="h-14 px-8 text-lg bg-white text-cyan-700 hover:bg-sky-50">
            <Link href="/contact">
              Contact for Admission
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}