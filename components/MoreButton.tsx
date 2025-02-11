import { COLORS } from "@/constants/sizes";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable } from "react-native";
import * as DropdownMenu from "zeego/dropdown-menu";
const MoreButton = ({ Id }: { Id: string }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Pressable
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.lightBlue,
            paddingHorizontal: 5,
            paddingVertical: 5,
            borderRadius: 50,
          }}
        >
          <Entypo name="dots-three-vertical" size={20} color={COLORS.black} />
        </Pressable>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item
          key="edit"
          onSelect={() => router.push(`/(event)/event/${Id}/edit`)}
          style={{ fontFamily: "PoppinsBold" }}
          textValue="Edit Event"
        >
          <DropdownMenu.ItemTitle>Edit Event</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
        <DropdownMenu.Item key="more" textValue="Do another thing">
          <DropdownMenu.ItemTitle>Do another thing</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
export default MoreButton;
