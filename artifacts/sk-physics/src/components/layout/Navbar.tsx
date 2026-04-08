import { Link, useLocation } from "wouter";
import { BookOpen, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdminRoute = location.startsWith("/admin");
  const isAuthenticated = typeof window !== "undefined" && !!localStorage.getItem("sk_admin_token");

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/notes", label: "Study Material" },
    { href: "/contact", label: "Contact Us" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("sk_admin_token");
    setLocation("/admin");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">
            <BookOpen size={18} />
          </div>
          SK Physics
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {!isAdminRoute ? (
            <>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location === link.href ? "text-primary" : "text-foreground/80"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild size="sm" className="ml-2 font-semibold">
                <Link href="/contact">Enroll Now</Link>
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/admin/dashboard"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === "/admin/dashboard" ? "text-primary" : "text-foreground/80"
                }`}
              >
                Dashboard
              </Link>
              {isAuthenticated && (
                <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 text-muted-foreground">
                  <LogOut size={16} /> Logout
                </Button>
              )}
            </>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 -mr-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-white py-4 px-4 flex flex-col gap-4 shadow-lg absolute w-full">
          {!isAdminRoute ? (
            <>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-medium py-2 ${
                    location === link.href ? "text-primary" : "text-foreground/80"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="w-full mt-2 font-semibold">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Enroll Now</Link>
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/admin/dashboard"
                className="text-base font-medium py-2 text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              {isAuthenticated && (
                <Button variant="outline" className="w-full justify-start gap-2 mt-2" onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>
                  <LogOut size={16} /> Logout
                </Button>
              )}
            </>
          )}
        </div>
      )}
    </header>
  );
}