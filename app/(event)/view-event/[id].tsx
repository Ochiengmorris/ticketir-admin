import MoreButton from "@/components/MoreButton";
import { COLORS, MARGIN, PADDING } from "@/constants/sizes";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
  DateFormatterWithDay,
  FormatMoney,
  useStorageUrl,
} from "@/utils/utils";
import { Entypo, FontAwesome6, Fontisto } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EventDetails = () => {
  const { id } = useLocalSearchParams();

  // console.log(id);
  const event = useQuery(api.events.getById, {
    eventId: id as Id<"events">,
  });

  const availability = useQuery(api.events.getEventAvailability, {
    eventId: id as Id<"events">,
  });

  const eventIdtoButton = id as Id<"events">;

  const imageUrl = useStorageUrl(event?.imageStorageId);

  if (!event || !availability)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color={COLORS.primary} />
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: COLORS.black,
          height: 500,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: -1,
        }}
      />

      <Image
        source={{
          uri: imageUrl ?? event.imageStorageId,
        }}
        style={{
          backgroundColor: COLORS.black,
          height: 400,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
        }}
      />

      <View
        style={{
          paddingHorizontal: PADDING.medium * 1.1,
          paddingVertical: PADDING.large,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: MARGIN.small,
          zIndex: 2,
        }}
      >
        <Pressable
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.lightBlue,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 50,
          }}
          onPress={() => {
            router.back();
          }}
        >
          <FontAwesome6 name="chevron-left" size={20} color={COLORS.black} />
        </Pressable>

        <MoreButton Id={eventIdtoButton} />
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 20,
          paddingTop: PADDING.medium,
        }}
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: COLORS.lightBlue,

          paddingHorizontal: PADDING.medium * 1.1,
          zIndex: 10,
          borderTopRightRadius: 35,
          borderTopLeftRadius: 35,
          marginTop: 200,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",

            color: COLORS.primary,
          }}
        >
          {DateFormatterWithDay({ date: event.eventDate })}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontFamily: "PoppinsBold",
              color: COLORS.black,
            }}
            numberOfLines={1}
          >
            {event.name}
          </Text>

          <Text
            style={{
              marginTop: MARGIN.small,
              color: COLORS.black,
              fontSize: 30,
              fontWeight: "bold",
              flexShrink: 0,
            }}
          >
            <Text style={{ fontSize: 12, color: COLORS.primary }}>Ksh</Text>
            {FormatMoney(event.price)}
          </Text>
        </View>

        <View
          style={{
            marginTop: MARGIN.small,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Entypo name="location" size={16} color="black" />
            <Text
              style={{
                color: COLORS.black,
                fontSize: 16,
                fontFamily: "PoppinsSemiBold",
              }}
            >
              {event.location}
            </Text>
          </View>

          <Pressable>
            <Text
              style={{
                color: COLORS.black,
                fontFamily: "PoppinsSemiBold",
                fontSize: 16,
              }}
            >
              {event.is_cancelled ? "Cancelled" : "Valid"}
            </Text>
          </Pressable>
        </View>

        {/* description */}
        <View style={{ marginTop: MARGIN.small * 3 }}>
          <Text
            style={{
              color: COLORS.black,
              fontSize: 20,
              fontFamily: "PoppinsSemiBold",
            }}
          >
            Description
          </Text>
          <Text
            style={{
              color: COLORS.black,
              fontSize: 16,
              fontFamily: "PoppinsRegular",
            }}
          >
            {event.description}
          </Text>
        </View>

        {/* Information */}
        <View
          style={{
            marginTop: MARGIN.small * 2,
            padding: PADDING.medium,
            borderWidth: 1,
            borderColor: COLORS.black + "10",
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: COLORS.black,
              fontSize: 20,
              fontFamily: "PoppinsBold",
            }}
          >
            Event Information
          </Text>

          <View style={{ marginTop: MARGIN.small, gap: 5 }}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 16,
                fontFamily: "PoppinsRegular",
              }}
            >
              _ Please arrive 30 minutes before the event starts.
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 16,
                fontFamily: "PoppinsRegular",
              }}
            >
              _ Tickets are non-refundable.
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 16,
                fontFamily: "PoppinsRegular",
              }}
            >
              _ Age restriction: 18+.
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: MARGIN.small * 2,
            padding: PADDING.medium,
            borderWidth: 1,
            borderColor: COLORS.black + "10",
            borderRadius: 10,
          }}
        >
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
              <Text style={{ fontWeight: "700", fontSize: 21 }}>
                {availability.purchasedCount}
              </Text>
              <Text
                style={{
                  fontFamily: "PoppinsRegular",
                  fontSize: 16,
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
                {event.price * availability?.purchasedCount}
              </Text>
              <Text
                style={{
                  fontFamily: "PoppinsRegular",
                  fontSize: 16,
                  color: COLORS.black + "60",
                }}
              >
                REVENUE
              </Text>
            </View>
          </View>
        </View>

        {/* Remaining tickets */}
        <View
          style={{
            marginTop: MARGIN.small,
            padding: PADDING.small,
            borderWidth: 1,
            borderColor: COLORS.black + "10",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: MARGIN.small,
          }}
        >
          <Fontisto name="plane-ticket" size={18} color="black" />
          <Text
            style={{
              color: COLORS.black,
              fontSize: 16,
              fontFamily: "PoppinsBold",
            }}
          >
            Remaining tickets:{" "}
            {event.totalTickets - availability.purchasedCount}{" "}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default EventDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBlue,
    position: "relative",
  },
  header: {},
});
