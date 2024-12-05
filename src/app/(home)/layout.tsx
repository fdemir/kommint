import { AI } from "../ai";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AI>{children}</AI>;
}
