import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { StyleSheet } from "react-native";
const getTicketDetails = async ({
  ticketId,
  eventId,
}: {
  ticketId: Id<"tickets">;
  eventId: string | string[];
}) => {
  const ticket = useQuery(api.tickets.getTicketWithDetails, {
    ticketId,
  });
  console.log(ticket);

  // const result = useQuery(api.tickets.getUserTicketForEvent, {
  //   ticketId,
  //   eventId,
  // });
  return null;
};
export default getTicketDetails;
const styles = StyleSheet.create({});
