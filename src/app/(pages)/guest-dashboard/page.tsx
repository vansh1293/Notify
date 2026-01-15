"use client";
import React from "react";
import BlurText from "@/components/ui/BlurText";
import QuickSection from "@/components/quick-section";
import FeaturedContests from "@/components/featured-contests";
import { Button } from "@/components/ui/button";
import { Bell, TrendingUp, Lock } from "lucide-react";
import Link from "next/link";
import { GuestContestProvider } from "@/context/GuestContestProvider";
import { Card, CardContent } from "@/components/ui/card";

export default function GuestDashboardPage() {
  return (
    <GuestContestProvider>
      <div className="fixed bottom-4 left-4 z-[5000] bg-yellow-500/90 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse pointer-events-none">
        Guest View (Demo Mode)
      </div>
      
      <div className="container mx-auto px-2 sm:px-4 py-8 mt-16 md:mt-10 space-y-10 ">
        {/* Hero Section */}
        <section className="text-center space-y-6 mt-10 ">
          <div className="flex items-center justify-center">
            <BlurText
              text="Effortlessly track coding contests. Stay updated, compete, and achieve your best!"
              delay={150}
              animateBy="words"
              direction="top"
              className="mb-8 text-2xl md:text-5xl lg:text-5xl font-bold text-center dark:text-white relative z-2 font-sans"
            />
          </div>
        </section>

        {/* Quick Stats - Reused as it uses Context which we mocked */}
        <QuickSection />

        {/* Featured Contests - Reused as it uses Context which we mocked */}
        <section className="space-y-6">
          <FeaturedContests />
        </section>

        {/* Friend Stalker Section - Placeholder for Guest */}
        <section>
          <Card className="border-dashed border-2 bg-muted/30">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-4">
              <div className="p-4 bg-muted rounded-full">
                <Lock className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Friend Stalker Unavailable</h3>
              <p className="text-muted-foreground max-w-md">
                Tracking friends requires a user account. Sign in to stalk your friends' progress on LeetCode and Codeforces.
              </p>
              <Button asChild>
                <Link href="/sign-in">Sign In to Access</Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Quick Actions */}
        <section >
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Ready to compete?</h3>
            <p className="text-muted-foreground">
              Sign up to set reminders and track your friends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button disabled className="opacity-70 cursor-not-allowed">
                  <Bell className="mr-2 h-4 w-4" />
                  Configure Reminders (Locked)
              </Button>
              <Button variant="outline" asChild className="shadow">
                <Link href="/contests">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Browse Contests
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </GuestContestProvider>
  );
}
