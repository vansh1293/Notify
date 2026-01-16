
import { Contest } from "@/model/Contest";

export const MOCK_CONTESTS: Contest[] = [
    {
        code: "LC-400",
        platform: "leetcode",
        name: "Weekly Contest 400",
        startTime: new Date(Date.now() + 86400000),
        endTime: new Date(Date.now() + 92400000),
        duration: 90,
        url: "https://leetcode.com/contest/weekly-contest-400",
    },
    {
        code: "CF-950",
        platform: "codeforces",
        name: "Codeforces Round 950 (Div. 2)",
        startTime: new Date(Date.now() + 172800000),
        endTime: new Date(Date.now() + 180000000),
        duration: 120,
        url: "https://codeforces.com/contest/1234",
    },
    {
        code: "CC-135",
        platform: "codechef",
        name: "Starters 135",
        startTime: new Date(Date.now() + 3600000),
        endTime: new Date(Date.now() + 14400000),
        duration: 180,
        url: "https://www.codechef.com/START135",
    },
    {
        code: "LC-BiWeekly-132",
        platform: "leetcode",
        name: "Biweekly Contest 132",
        startTime: new Date(Date.now() + 259200000),
        endTime: new Date(Date.now() + 264600000),
        duration: 90,
        url: "https://leetcode.com/contest/biweekly-contest-132",
    },
    {
        code: "CF-952",
        platform: "codeforces",
        name: "Codeforces Round 952 (Div. 4)",
        startTime: new Date(Date.now() + 432000000),
        endTime: new Date(Date.now() + 441000000),
        duration: 150,
        url: "https://codeforces.com/contest/1985",
    },
    {
        code: "ABC-357",
        platform: "atcoder",
        name: "AtCoder Beginner Contest 357",
        startTime: new Date(Date.now() + 120000000),
        endTime: new Date(Date.now() + 126000000),
        duration: 100,
        url: "https://atcoder.jp/contests/abc357",
    }
] as unknown as Contest[];
