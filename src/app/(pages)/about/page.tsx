"use client";
import BlurText from "@/components/ui/BlurText";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import DecryptedText from "@/components/ui/DecryptedText";
import { ShinyButton } from "@/components/magicui/shiny-button";
import Link from "next/link";

const testimonials = [
  {
    quote:
      "Notify is more than just a project—it's a mission to help every competitive programmer stay ahead. Building the backend for this platform has been a rewarding journey!",
    name: "Shaurya Rahlon",
    designation: "Backend Developer at Notify",
    src: "/shaurya.jpg",
  },
  {
    quote:
      "From seamless integrations to a robust full-stack architecture, Notify reflects our passion for clean code and real-world impact. Proud to be part of this team!",
    name: "Vansh Arora",
    designation: "Full Stack Developer at Notify",
    src: "/vansh.jpg",
  },
  {
    quote:
      "Designing and developing Notify's interface was all about making contest tracking effortless and beautiful. It's built by CPers, for CPers!",
    name: "Himanshu Singh",
    designation: "Full Stack Developer and UI/UX Designer at Notify",
    src: "/Himanshu.jpg",
  },
];
export default function AboutPage() {
  return (
    <>
      <div className="h-full w-full  px-2 sm:px-4 mt-28 flex flex-col items-center justify-center ">
        <BlurText text="About Us..." className="text-4xl sm:text-6xl font-bold " />
       

        <AnimatedTestimonials testimonials={testimonials} />

        <div className="w-full flex flex-col items-center justify-center gap-6 pb-20 mt-20">
          <BlurText 
            text="Ready to elevate your game?" 
            className="text-3xl font-semibold text-center" 
            delay={200}
          />
          
          <div className="flex flex-col items-center gap-2">
            <DecryptedText
              text="Join thousands of developers tracking their progress."
              speed={70}
              maxIterations={20}
              useOriginalCharsOnly={true}
              className="text-muted-foreground text-sm md:text-base text-center"
              revealDirection="center"
              animateOn="view"
            />
          </div>

          <div className="flex gap-4 mt-4">
             <Link href="/dashboard">
              <ShinyButton className="bg-primary/10">
                Start Tracking Now
              </ShinyButton>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}