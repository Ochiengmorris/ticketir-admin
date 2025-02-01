import { ConvexProvider, ConvexReactClient } from "convex/react";

if (!process.env.EXPO_PUBLIC_CONVEX_URL) {
  throw new Error("Missing EXPO_PUBLIC_CONVEX_URL environment variable");
}
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL);

const ConvexClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
};
export default ConvexClientProvider;
