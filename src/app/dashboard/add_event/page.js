import { connectToDatabase } from "@lib/db";
import Venue from "@lib/models/venue";
import Event from "@/lib/models/events";
import AddEventForm from "@components/forms/add_event_form";

const AddEvent = async () => {
  await connectToDatabase();

  return (
    <>
      <AddEventForm />
    </>
  );
};

export default AddEvent;
