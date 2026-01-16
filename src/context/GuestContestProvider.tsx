"use client";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { Contest } from "@/model/Contest";
import { Reminder } from "@/model/Reminder";
import { MOCK_CONTESTS } from "@/lib/guest-data";

// Reuse existing context structure
const ContestContext = createContext<any>(null);

const GuestContestProvider = ({ children }: { children: ReactNode }) => {
  const [contest, setContest] = useState<Contest[]>([]);
  const [reminder, setReminder] = useState<Reminder[]>([]);
  const [contestLoading, setContestLoading] = useState<boolean>(true);
  const [reminderLoading, setReminderLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate API delay for realism
    setTimeout(() => {
      setContest(MOCK_CONTESTS);
      setContestLoading(false);
      
      setReminder([]); // Guests have no reminders
      setReminderLoading(false);
    }, 500);
  }, []);

  const getContest = async () => {}; // No-op for guest
  const getReminder = async () => {}; // No-op for guest

  return (
    <ContestContext.Provider value={{ contest, reminder, contestLoading, reminderLoading, getContest, getReminder, isGuest: true }}>
      {children}
    </ContestContext.Provider>
  );
};

export { ContestContext, GuestContestProvider };
