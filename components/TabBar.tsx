import { COLORS } from "@/constants/sizes";
import { AntDesign } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  interface IconProps {
    color: string;
  }

  interface Icons {
    [key: string]: (props: IconProps) => JSX.Element;
  }

  const icons: Icons = {
    home: (props: IconProps) => <AntDesign name="home" size={24} {...props} />,
    scan: (props: IconProps) => <AntDesign name="scan1" size={24} {...props} />,
    profile: (props: IconProps) => (
      <AntDesign name="user" size={24} {...props} />
    ),
  };

  const primaryColor = "#0891b2";
  const greyColor = "#737373";

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === "string"
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            style={styles.tabbarItem}
            onPress={onPress}
            onLongPress={onLongPress}
            accessibilityRole="button"
            testID={`tabBarButton-${route.name}`}
            accessibilityLabel={options.tabBarAccessibilityLabel}
          >
            {icons[route.name] &&
              icons[route.name]({
                color: isFocused ? primaryColor : greyColor,
              })}
            <Text
              style={{
                color: isFocused ? primaryColor : greyColor,
                fontSize: 11,
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
export default TabBar;
const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.grey + "40",
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    borderCurve: "continuous",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
});
