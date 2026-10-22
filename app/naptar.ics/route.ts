import { buildIcs } from "@/lib/ics";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildIcs(), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="7felev.ics"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
