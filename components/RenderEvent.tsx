import { COLORS, MARGIN, PADDING } from "@/constants/sizes";
import { DateFormatter } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export type EventData = {
  _id: string; // Unique event ID
  _creationTime: number; // Timestamp of event creation
  imageStorageId?: string; // Optional image storage ID
  is_cancelled?: boolean; // Optional flag for cancellation status
  name: string; // Event name
  description: string; // Event description
  location: string; // Event location
  eventDate: number; // Event date as a timestamp
  price: number; // Ticket price
  totalTickets: number; // Total number of tickets available
  userId: string; // ID of the user who created the event
};
const RenderEVent = ({ event }: { event: EventData }) => {
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

        <Ionicons name="trash-outline" size={18} />
      </View>

      {/* Event Name */}
      <Text
        style={{
          fontWeight: "700",
          fontSize: 18,
          marginVertical: MARGIN.small,
        }}
      >
        {event.name}
      </Text>

      {/* number of sold tickets */}
      <View style={{ flexDirection: "row", gap: MARGIN.small }}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderColor: COLORS.primary + "18",
            borderWidth: 2,
            borderRadius: MARGIN.small * 1.5,
            paddingVertical: PADDING.large,
            paddingHorizontal: PADDING.small,
            marginVertical: MARGIN.small,
          }}
        >
          <Text style={{ fontWeight: "700", fontSize: 21 }}>512</Text>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 13,
              color: COLORS.black + "60",
            }}
          >
            TICKETS SOLD
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderColor: COLORS.primary + "18",
            borderWidth: 2,
            borderRadius: MARGIN.small * 1.5,
            paddingVertical: PADDING.large,
            paddingHorizontal: PADDING.small,
            marginVertical: MARGIN.small,
          }}
        >
          <Text style={{ fontWeight: "700", fontSize: 21 }}>
            <Text
              style={{
                fontWeight: "700",
                fontSize: 12,
              }}
            >
              Ksh
            </Text>{" "}
            2,142
          </Text>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 13,
              color: COLORS.black + "60",
            }}
          >
            REVENUE
          </Text>
        </View>
      </View>

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
      >
        <Text
          style={{ fontWeight: "700", fontSize: 16, color: COLORS.primary }}
        >
          Manage Event
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default RenderEVent;
