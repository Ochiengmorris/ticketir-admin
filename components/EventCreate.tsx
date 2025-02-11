import { COLORS } from "@/constants/sizes";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { DateFormatter, useStorageUrl } from "@/utils/utils";
import { useUser } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useMutation } from "convex/react";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { toast } from "sonner-native";
import * as z from "zod";

// Form Schema
const formSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  eventDate: z.date().min(new Date(), "Event date must be in the future"),
  price: z.number().min(0, "Price must be 0 or greater"),
  totalTickets: z.number().min(1, "Must have at least 1 ticket"),
});

type FormData = z.infer<typeof formSchema>;

interface InitialEventData {
  _id: Id<"events">;
  name: string;
  description: string;
  location: string;
  eventDate: number;
  price: number;
  totalTickets: number;
  imageStorageId?: Id<"_storage">;
}

interface EventFormProps {
  mode: "create" | "edit";
  initialData?: InitialEventData;
}
const EventForm = ({ mode, initialData }: EventFormProps) => {
  const { user } = useUser();
  const createEvent = useMutation(api.events.create);
  const updateEvent = useMutation(api.events.updateEvent);
  const updateEventImage = useMutation(api.storage.updateEventImage);
  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);
  const [isPending, setIsPending] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [removedCurrentImage, setRemovedCurrentImage] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { control, handleSubmit, setValue } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      description: initialData?.description ?? "",
      location: initialData?.location ?? "",
      eventDate: initialData ? new Date(initialData.eventDate) : new Date(),
      price: initialData?.price ?? 0,
      totalTickets: initialData?.totalTickets ?? 1,
    },
  });

  const handleImageUpload = async (file: string) => {
    try {
      const response = await fetch(file);
      const blob = await response.blob();
      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        headers: {
          "Content-Type": "image/jpeg",
        },
        body: blob,
      });
      const { storageId } = await result.json();

      return storageId;
    } catch (error) {
      console.error("Failed to upload image:", error);
      return null;
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const imageUrl = useStorageUrl(initialData?.imageStorageId);

  const onSubmit = async (data: FormData) => {
    if (!user) return;
    setIsPending(true);

    try {
      let imageStorageId = null;

      if (selectedImage) {
        imageStorageId = await handleImageUpload(selectedImage);
      }

      if (mode === "create") {
        const eventId = await createEvent({
          ...data,
          userId: user.id,
          eventDate: data.eventDate.getTime(),
        });

        if (imageStorageId) {
          await updateEventImage({
            eventId,
            storageId: imageStorageId as Id<"_storage">,
          });
        }

        toast.success("Event created successfully");
        router.replace(`/(tabs)/home`);
      } else {
        if (!initialData) {
          throw new Error("Initial event data is required for updates");
        }

        await updateEvent({
          eventId: initialData._id,
          ...data,
          eventDate: data.eventDate.getTime(),
        });

        if (imageStorageId || removedCurrentImage) {
          await updateEventImage({
            eventId: initialData._id,
            storageId: imageStorageId
              ? (imageStorageId as Id<"_storage">)
              : null,
          });
        }
        toast.success("Event updated successfully");
        router.back();
      }
    } catch (error) {
      console.error("Failed to handle event:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "There was a problem with your request.",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <View>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Event Name&#42;</Text>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              placeholder="Event Name"
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description&#42;</Text>
            <TextInput
              style={[styles.input, { alignItems: "flex-start" }]}
              value={value}
              onChangeText={onChange}
              placeholder="Description"
              multiline
              numberOfLines={4}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        )}
      />

      <Controller
        control={control}
        name="location"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Location&#42;</Text>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              placeholder="Location"
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        )}
      />

      <Controller
        control={control}
        name="eventDate"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Event Date&#42;</Text>
            {showDatePicker && (
              <DateTimePicker
                value={value}
                mode="date"
                display="default"
                onChange={(event, date) => {
                  setShowDatePicker(false); // Hide the picker after selection
                  onChange(date || value); // Update the form value
                }}
                minimumDate={new Date()}
              />
            )}
            <Pressable
              onPress={() => setShowDatePicker(true)}
              style={styles.input}
            >
              <Text style={{}}>
                {value && DateFormatter({ date: Number(value) })}
              </Text>
            </Pressable>
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        )}
      />

      <Controller
        control={control}
        name="price"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Price per Ticket&#42;</Text>
            <TextInput
              style={styles.input}
              value={value.toString()}
              onChangeText={(text) => onChange(Number(text))}
              placeholder="Price"
              keyboardType="numeric"
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        )}
      />

      <Controller
        control={control}
        name="totalTickets"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Total Tickets&#42;</Text>
            <TextInput
              style={styles.input}
              value={value.toString()}
              onChangeText={(text) => onChange(Number(text))}
              placeholder="Total Tickets"
              keyboardType="numeric"
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        )}
      />

      <View style={styles.imageContainer}>
        <Text style={styles.label}>Event Image</Text>
        {selectedImage ||
        (!removedCurrentImage && initialData?.imageStorageId) ? (
          <View style={styles.imagePreview}>
            <Image
              source={{ uri: selectedImage || initialData?.imageStorageId }}
              style={styles.image}
            />
            <Pressable
              style={styles.removeImageButton}
              onPress={() => {
                setSelectedImage(null);
                setRemovedCurrentImage(true);
              }}
            >
              <Text style={styles.removeImageText}>×</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable style={styles.uploadButton} onPress={pickImage}>
            <Text style={styles.uploadButtonText}>Upload Image</Text>
          </Pressable>
        )}
      </View>

      <Pressable
        style={styles.submitButton}
        onPress={handleSubmit(onSubmit)}
        disabled={isPending}
      >
        <Text style={styles.submitButtonText}>
          {isPending
            ? mode === "create"
              ? "Creating Event..."
              : "Updating Event..."
            : mode === "create"
              ? "Create Event"
              : "Update Event"}
        </Text>
      </Pressable>
    </View>
  );
};
export default EventForm;
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  toastButton: {
    marginTop: 16,
    backgroundColor: "green",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontFamily: "PoppinsBold",
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.black + "10",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: "PoppinsRegular",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 4,
  },
  imageContainer: {
    marginBottom: 16,
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  removeImageButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "red",
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  removeImageText: {
    color: "white",
    fontSize: 16,
    fontFamily: "PoppinsBold",
  },
  uploadButton: {
    backgroundColor: COLORS.black,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "40%",
    alignSelf: "flex-start",
  },
  uploadButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
  },
  submitButton: {
    backgroundColor: COLORS.black,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "PoppinsBold",
  },
});
