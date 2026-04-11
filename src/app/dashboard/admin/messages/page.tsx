import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const MESSAGES = [
  {
    id: "msg-1",
    sender: "support@cinetube.com",
    subject: "Refund request for premium purchase",
    status: "Open",
  },
  {
    id: "msg-2",
    sender: "moderation@cinetube.com",
    subject: "Spoiler flag dispute on user review",
    status: "Pending",
  },
  {
    id: "msg-3",
    sender: "creator@cinetube.com",
    subject: "Feature request for nested comments",
    status: "Resolved",
  },
];

export default function AdminMessagesPage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-6">
        <p className="text-[10px] font-black uppercase tracking-[0.45em] text-primary">
          Inbox
        </p>
        <h1 className="mt-3 text-4xl font-black uppercase tracking-tight">
          User Messages
        </h1>
      </div>

      <div className="space-y-4">
        {MESSAGES.map((message) => (
          <div
            key={message.id}
            className="rounded-[1.5rem] border border-border bg-card/20 p-6"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-lg font-black uppercase tracking-tight text-foreground">
                  {message.subject}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  From {message.sender}
                </p>
              </div>
              <Badge>{message.status}</Badge>
            </div>
            <Link
              href={`mailto:${message.sender}`}
              className="mt-4 inline-flex text-[10px] font-black uppercase tracking-[0.35em] text-primary"
            >
              Reply by Email
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
