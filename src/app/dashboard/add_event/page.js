import { connectToDatabase } from "@lib/db";
import Venue from "@lib/models/venue";
import Event from "@/lib/models/events";
import AddEventForm from "@components/forms/add_event_form";
import {revalidatePath} from 'next/cache'

const AddEvent = async () => {
  await connectToDatabase();
  const venues = await Venue.find({});
  async function addEvent(formData) {
    "use server";
    await connectToDatabase();

    try {
      const newEvent = new Event({ ...formData });
      await newEvent.save();
      revalidatePath('/dashboard/')
      revalidatePath('/')
      
      return {
        success: true,
        message: "Event added successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  return (
    <>
      <AddEventForm
        venuesList={JSON.parse(JSON.stringify(venues))}
        addEvent={addEvent}
      />
    </>
  );
};

export default AddEvent;
