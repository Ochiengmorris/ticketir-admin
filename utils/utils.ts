export const DateFormatter = ({ date }: { date: number }) => {
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return formattedDate.replace(",", "").toLowerCase(); // To remove the comma and make it lowercase
};
