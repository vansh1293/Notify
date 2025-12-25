"use client";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconBrandGithub, IconBrandLinkedin, IconCode } from "@tabler/icons-react";
import Link from "next/link";

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  github: string;
  linkedin?: string;
  codeforces?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Vansh",
    role: "Full Stack Developer",
    avatar: "https://github.com/vansh1293.png",
    github: "https://github.com/vansh1293",
  },
  {
    name: "Himanshu",
    role: "Full Stack Developer",
    avatar: "https://github.com/Himaanshuuuu04.png",
    github: "https://github.com/Himaanshuuuu04",
  },
  {
    name: "Shaurya",
    role: "Full Stack Developer",
    avatar: "https://github.com/ShauryaRahlon.png",
    github: "https://github.com/vansh1233",
    linkedin: "https://linkedin.com/in/shaurya-rahlon",
    codeforces: "https://codeforces.com/profile/Shaurya003",
  },
];

export function TeamSection() {
  return (
    <div className="w-full py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <BoxReveal boxColor={"#f88600"} duration={0.5}>
          <h2 className="text-4xl font-bold text-center mb-4">
            Meet Our <span className="text-[#f88600]">Team</span>
          </h2>
        </BoxReveal>
        <BoxReveal boxColor={"#f88600"} duration={0.5}>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Built with 💻 by competitive programming enthusiasts who understand
            the pain of missed contests.
          </p>
        </BoxReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <BoxReveal key={member.name} boxColor={"#f88600"} duration={0.5}>
              <Card className="overflow-hidden backdrop-blur-sm hover:shadow-lg transition-all duration-300 border-2 hover:border-[#f88600]/50">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-4 ring-2 ring-[#f88600]/20">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="text-2xl">
                        {member.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {member.role}
                    </p>
                    <div className="flex gap-3">
                      <Link
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-[#f88600]/10 transition-colors"
                      >
                        <IconBrandGithub className="h-5 w-5" />
                      </Link>
                      {member.linkedin && (
                        <Link
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full hover:bg-[#f88600]/10 transition-colors"
                        >
                          <IconBrandLinkedin className="h-5 w-5" />
                        </Link>
                      )}
                      {member.codeforces && (
                        <Link
                          href={member.codeforces}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full hover:bg-[#f88600]/10 transition-colors"
                        >
                          <IconCode className="h-5 w-5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </BoxReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
