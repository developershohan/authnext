'use client'

import { useState } from "react"

import Link from "next/link"
import Image from "next/image"
import Masonry from "react-masonry-css"
import {Card, CardHeader, CardContent, CardFooter, Button} from "@heroui/react"



export default function EventsMasonaryComponent({eventsData,loadMore}) {
    const [events,setEvents] = useState(eventsData);
const [loadButton,setLoadButton] = useState(true);
    

    const breakpointColumnsObj = {
        default:3,
        1100:2,
        700:1,
        500:1
    }

    if(!events || events.length === 0){
        return <div>No events found</div>
    }

    async function loadMoreEvents(){
        setLoadButton(false);
        const newEvents = await loadMore(events.length,6);
        if(newEvents.length === 0){
            setLoadButton(false);
        }else{
            setLoadButton(true);
            setEvents([...events,...newEvents]);
        }
    }

    return (
        <div className="container mx-auto px-4">
           <Masonry
           breakpointCols={breakpointColumnsObj}
           className="my-masonry-grid"
           columnClassName="my-masonry-grid_column"
           >
            {events.map((event)=>(
                <Card
                key={event._id}
                className="mb-4"
                >
                    <CardHeader className="flex flex-col items-start gap-1">
                        <h3 className="text-lg font-bold">{event.artist}</h3>
                        <p className="text-sm text-foreground/60">
                            {event.venue?.name || 'Unknown Venue'}
                        </p>
                    </CardHeader>

                    <CardContent className="py-3">
                        <p className="text-sm text-foreground/80">{event.description}</p>
                        <p className="text-xs text-foreground/50 mt-2">
                            {new Date(event.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </CardContent>

                    <CardFooter>
                        <Button>
                            <Link href={`/events/${event.slug}`}>
                                View Event
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
                
            ))}
           </Masonry>
           {loadButton && (
            <Button onClick={loadMoreEvents}>Load More</Button>
           )}
        </div>
    )
}