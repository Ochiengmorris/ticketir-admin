import { EventData } from "@/components/RenderEvent";
import { sampleEvents } from "@/constants/data";
import { COLORS, MARGIN } from "@/constants/sizes";
import { api } from "@/convex/_generated/api";
import { DateFormatter } from "@/utils/utils";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RenderEvents = ({ event }: { event: EventData }) => {
  return (
    <View
      key={event._id}
      style={{
        padding: MARGIN.large,
        backgroundColor: COLORS.white,
        borderRadius: MARGIN.medium * 1.1,
        marginBottom: MARGIN.medium,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: MARGIN.small,
            backgroundColor: COLORS.grey + "60",
            padding: MARGIN.small,
            borderRadius: MARGIN.small,
            alignItems: "center",
          }}
        >
          <Ionicons name="calendar" size={18} color={COLORS.primary} />
          <Text style={{ fontWeight: "800", fontSize: 14 }}>
            {DateFormatter({ date: event.eventDate })}
          </Text>
        </View>

        <MaterialCommunityIcons name="line-scan" size={18} />
      </View>

      {/* Event Name */}
      <Text
        style={{
          fontFamily: "PoppinsSemiBold",
          fontSize: 18,
          marginVertical: MARGIN.small,
        }}
      >
        {event.name}
      </Text>

      {/* manage button */}
      <TouchableOpacity
        style={{
          marginTop: MARGIN.small,
          alignItems: "center",
          backgroundColor: COLORS.primary + "18",
          padding: MARGIN.medium,
          borderRadius: MARGIN.small,
        }}
        activeOpacity={0.5}
        onPress={() => router.push(`/(event)/scan/${event._id}`)}
      >
        <Text
          style={{
            fontFamily: "PoppinsMedium",
            fontSize: 16,
            color: COLORS.primary,
          }}
        >
          Scan Tickets
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default function ScanTicketScreen() {
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
        <ActivityIndicator color={COLORS.primary} size={34} />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* A list of events for this user */}
      <FlatList
        data={events}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <RenderEvents event={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: MARGIN.medium,
    backgroundColor: COLORS.lightBlue,
    // alignItems: "center",
    justifyContent: "center",
    marginTop: MARGIN.large,
  },
});
