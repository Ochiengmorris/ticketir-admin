import { sampleEvents } from "@/constants/data";
import { MARGIN } from "@/constants/sizes";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-expo";
import { EvilIcons, MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import RenderEVent, { EventData } from "./RenderEvent";

const EventList = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState<EventData[]>([]);

  if (!user) return null;

  const fetchedEvents = useQuery(api.events.getByUserId, { userId: user.id });

  useEffect(() => {
    if (fetchedEvents) {
      setEvents(fetchedEvents);
      setIsLoading(false);
    }
  }, [fetchedEvents]);

  // Mock data for demonstration purposes
  const data = sampleEvents;
  // console.log(data);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          marginTop: MARGIN.large * 2,
          alignItems: "center",
        }}
      >
        <EvilIcons
          name="spinner"
          size={34}
          color="black"
          className="animate-spin"
        />
      </View>
    );
  }

  return (
    <View
      style={{
        paddingHorizontal: MARGIN.medium,
        marginTop: MARGIN.medium,
        flex: 1,
      }}
    >
      <FlatList
        data={events}
        keyExtractor={(event) => event._id}
        renderItem={({ item }) => <RenderEVent event={item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              marginTop: MARGIN.large * 2,
              alignItems: "center",
            }}
          >
            <MaterialIcons name="event-busy" size={34} color="black" />
            <Text style={{ marginTop: MARGIN.small }}>No events found.</Text>
          </View>
        )}
      />
    </View>
  );
};
export default EventList;
