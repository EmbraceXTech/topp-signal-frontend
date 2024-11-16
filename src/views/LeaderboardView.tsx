import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Trophy } from "lucide-react";

const leaderboardData = [
  { rank: 1, walletAddress: "0x1234...5678", score: 1000 },
  { rank: 2, walletAddress: "0xabcd...efgh", score: 950 },
  { rank: 3, walletAddress: "0x9876...5432", score: 900 },
  { rank: 4, walletAddress: "0x9876...5432", score: 600 },
  { rank: 5, walletAddress: "0x9876...5432", score: 400 },
  { rank: 6, walletAddress: "0x9876...5432", score: 200 },
  { rank: 7, walletAddress: "0x9876...5432", score: 100 },
];

export default function LeaderboardView() {
  return (
    <div className="px-10 py-7">
      <p className="text-2xl font-bold mb-4">Leaderboard</p>
      <Table
        aria-label="Leaderboard table"
        isStriped
        classNames={{
          td: "py-3 text-center",
          th: "text-center",
        }}
      >
        <TableHeader>
          <TableColumn className="font-bold">RANK</TableColumn>
          <TableColumn className="font-bold">WALLET ADDRESS</TableColumn>
          <TableColumn className="font-bold">SCORE</TableColumn>
        </TableHeader>
        <TableBody>
          {leaderboardData.map((entry) => (
            <TableRow key={entry.rank}>
              <TableCell>
                <div className="flex items-center justify-center">
                  {entry.rank <= 3 && (
                    <Trophy
                      size={20}
                      className={`mr-2 ${
                        entry.rank === 1
                          ? "text-yellow-400"
                          : entry.rank === 2
                          ? "text-gray-400"
                          : "text-amber-600"
                      }`}
                    />
                  )}
                  <span>{entry.rank}</span>
                </div>
              </TableCell>
              <TableCell>{entry.walletAddress}</TableCell>
              <TableCell>{entry.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
