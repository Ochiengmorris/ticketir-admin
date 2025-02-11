import { COLORS, MARGIN, PADDING } from "@/constants/sizes";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { DateFormatter } from "@/utils/utils";
import { useMutation, useQuery } from "convex/react";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScanTicket() {
  const { id } = useLocalSearchParams();
  // Implement QR code scanning functionality here
  const [permission, requestPermission] = useCameraPermissions();
  const [scanningEnabled, setScanningEnabled] = useState(true);
  const [scannedTicketId, setScannedTicketId] = useState<Id<"tickets"> | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const validateTicket = useMutation(api.tickets.validateTicket);

  const ticketDetail = useQuery(
    api.tickets.getTicketWithDetails,
    scannedTicketId ? { ticketId: scannedTicketId } : "skip"
  );

  const userdetails = useQuery(api.users.getUserById, {
    userId: ticketDetail?.userId ?? "",
  });

  useEffect(() => {
    if (ticketDetail) {
      if (ticketDetail.eventId !== id) {
        Alert.alert(
          "Invalid Event",
          "This ticket is not associated with the current event."
        );
        setScannedTicketId(null);
      }
      setScanningEnabled(true); // Re-enable scanning after checking the ticket
    }
  }, [ticketDetail]);

  const handleBarCodeScanned = (result: BarcodeScanningResult) => {
    if (!scanningEnabled) return;
    if (scannedTicketId) return;

    Vibration.vibrate();
    setScanningEnabled(false);

    const ticketId = result.data as Id<"tickets">;
    setScannedTicketId(ticketId);
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} color={COLORS.primary} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>Camera permission is required to scan tickets</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={{ color: COLORS.white, textAlign: "center" }}>
            Allow Camera
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleValidateTicket = async () => {
    if (!scannedTicketId) return;
    try {
      setIsLoading(true);
      const result = await validateTicket({ ticketId: scannedTicketId });
      if (result.success) {
        Alert.alert("Validation Success", result.message);
      } else {
        Alert.alert("Invalid Ticket", result.message);
      }
    } catch (error) {
      console.error("Error validating ticket", error);
      Alert.alert("Error", "Failed to validate ticket. Please try again.");
    } finally {
      setScannedTicketId(null);
      setScanningEnabled(true);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.camera}>
        <CameraView
          style={{ flex: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        />
      </View>
      <View
        style={{
          flex: 1,
          borderWidth: 1,
          marginBottom: 100,
          borderEndEndRadius: 10,
          borderBottomStartRadius: 10,
          borderColor: COLORS.primary,
          padding: PADDING.large,
        }}
      >
        {ticketDetail && userdetails ? (
          <>
            <Detail label="User's Name" value={userdetails.name} />
            <Detail
              label="Event Name"
              value={ticketDetail.event?.name ?? "N/A"}
            />
            <Detail
              label="Event Date"
              value={DateFormatter({ date: ticketDetail.purchasedAt })}
            />
            <Detail label="Ticket Type" value="Single" />
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  // justifyContent: "center",
                  backgroundColor: COLORS.primary,
                  borderWidth: 1,
                  borderColor: COLORS.primary,
                  padding: PADDING.medium,
                  borderRadius: 5,
                }}
                onPress={handleValidateTicket}
                activeOpacity={0.7}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color={COLORS.white} size={36} />
                ) : (
                  <Text style={{ color: COLORS.white, fontSize: 18 }}>
                    Validate Ticket
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                marginTop: 20,
                fontWeight: "bold",
              }}
            >
              Scan a ticket's qr-code to validate
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const Detail = ({ label, value }: { label: string; value: string }) => (
  <View style={{ marginTop: MARGIN.medium }}>
    <Text>{label}</Text>
    <Text style={{ fontWeight: "bold", fontSize: 20 }}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: MARGIN.medium,
    backgroundColor: COLORS.lightBlue,
    // alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  camera: {
    flex: 1,
    backgroundColor: "transparent",
    marginTop: 20,
  },
});
