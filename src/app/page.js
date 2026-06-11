import NextLink from "next/link";
import {getEvents} from "@lib/actions/actions"
import EventsMasonaryComponent from "@/components/events_masonary"

export default async function Home() {
  const showEvents = await getEvents(0,6);

  async function loadMoreEvents(skip,limit){
    'use server'
    const nextEvents = await getEvents(skip,limit);

    return JSON.parse(JSON.stringify(nextEvents));
  }
  
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-4xl font-bold">Hello world!</h1>
       <EventsMasonaryComponent eventsData={JSON.parse(JSON.stringify(showEvents))} loadMore={loadMoreEvents} />
      <p className="max-w-xl text-foreground/70">
        The auth flow is wired up and the app is rendering with a stable client
        tree now.
      </p>
      <div className="flex gap-3">
        <NextLink
          href="/register"
          className="inline-flex h-10 items-center justify-center rounded-medium bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:opacity-85"
        >
          Open Register
        </NextLink>
        <NextLink
          href="/dashboard"
          className="inline-flex h-10 items-center justify-center rounded-medium border border-default-200 px-4 text-sm font-medium text-foreground transition hover:bg-default-100"
        >
          Open Dashboard
        </NextLink>
      </div>
    </main>
  );
}
