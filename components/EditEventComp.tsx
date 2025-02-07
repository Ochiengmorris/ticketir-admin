import { COLORS } from "@/constants/sizes";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import EventForm from "./EventCreate";
const EditEventComp = () => {
  const { id } = useLocalSearchParams();
  // console.log(id);
  const event = useQuery(api.events.getById, {
    eventId: id as Id<"events">,
  });

  if (!event)
    return (
      <View>
        <ActivityIndicator size={"large"} color={COLORS.primary} />
      </View>
    );
  return <EventForm mode="edit" initialData={event} />;
};
export default EditEventComp;
