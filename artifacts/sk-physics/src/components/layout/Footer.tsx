import { Link } from "wouter";
import { BookOpen, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div>
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">
                <BookOpen size={18} />
              </div>
              SK Physics
            </div>
            <p className="text-white/70 leading-relaxed mb-6">
              Expert physics tutoring for Class XI, XII, JEE, and NEET by Shubham Kaushal. Building strong foundations for bright futures.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-white/70 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/notes" className="text-white/70 hover:text-white transition-colors">Study Material</Link></li>
              <li><Link href="/contact" className="text-white/70 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/admin" className="text-white/70 hover:text-white transition-colors text-sm mt-4 inline-block opacity-50">Admin Portal</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/70">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Near DPS Play School, Near Dr Manoj Jain,<br />Jawahar Ganj Railway Road,<br />Hapur - 245101, Shivpuri area</span>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>79062 77324</span>
              </li>
            </ul>
          </div>
          
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-white/50 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} SK Physics Classes. All rights reserved.</p>
          <p>Designed for Academic Excellence.</p>
        </div>
      </div>
    </footer>
  );
}