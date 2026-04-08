import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app this would send to an API
    console.log(values);
    toast({
      title: "Message Sent Successfully",
      description: "Thank you for reaching out. We will get back to you soon.",
    });
    form.reset();
  }

  return (
    <div className="min-h-screen bg-sky-50/30 pt-10 pb-24">
      {/* Page Header */}
      <div className="bg-sky-950 text-white py-16 md:py-24 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-sky-200 max-w-2xl mx-auto">
            Have questions about admissions or batches? Get in touch with us.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-sky-950 mb-6">Get in Touch</h2>
              <p className="text-sky-700 mb-8 leading-relaxed">
                Whether you're looking to enroll in a new batch or have queries about our teaching methodology, we're here to help.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-sky-950 mb-1">Our Location</h3>
                  <p className="text-sky-700">
                    Near DPS Play School, Near Dr Manoj Jain,<br />
                    Jawahar Ganj Railway Road,<br />
                    Hapur - 245101, Shivpuri area
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-sky-950 mb-1">Phone Number</h3>
                  <p className="text-sky-700">79062 77324</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-sky-950 mb-1">Class Timings</h3>
                  <p className="text-sky-700">
                    Monday - Saturday<br />
                    Morning & Evening Batches Available
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-sky-900/5 border border-sky-100">
              <h3 className="text-2xl font-bold text-sky-950 mb-6">Send a Message</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sky-900">Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" className="bg-sky-50/50 border-sky-100 focus-visible:ring-cyan-500" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sky-900">Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 98765 43210" className="bg-sky-50/50 border-sky-100 focus-visible:ring-cyan-500" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sky-900">Email Address (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" className="bg-sky-50/50 border-sky-100 focus-visible:ring-cyan-500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sky-900">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about which class you're inquiring for..." 
                            className="min-h-[150px] bg-sky-50/50 border-sky-100 focus-visible:ring-cyan-500 resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full h-12 text-base bg-cyan-600 hover:bg-cyan-700 text-white shadow-md shadow-cyan-600/20">
                    <Send className="mr-2 h-5 w-5" /> Send Message
                  </Button>
                </form>
              </Form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}