import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

export const DateFormatter = ({ date }: { date: number }) => {
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return formattedDate.replace(",", "").toUpperCase(); // To remove the comma and make it lowercase
};

export const DateFormatterWithDay = ({ date }: { date: number }) => {
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    weekday: "short", // Adds the day of the week (e.g., "Wed")
    day: "2-digit", // Day of the month (e.g., "01")
    month: "short", // Month abbreviation (e.g., "Jan")
    year: "numeric", // Year (e.g., "2023")
  });

  // Remove the comma and convert to uppercase
  return formattedDate.replace(",", "").toUpperCase();
};

export function useStorageUrl(storageId: Id<"_storage"> | undefined) {
  return useQuery(api.storage.getUrl, storageId ? { storageId } : "skip");
}

export const FormatMoney: (amount?: number) => string = (amount) => {
  if (amount === undefined) {
    return ""; // Or return "0" or any other default value you prefer
  }

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
