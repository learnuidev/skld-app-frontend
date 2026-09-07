import SettingsPage from "@/components/settings/settings-page";

type Tab = "account" | "premium" | "preferences";

function parseTab(value: string | undefined): Tab {
  if (value === "premium" || value === "preferences") return value;
  return "account";
}

export default async function Settings(props: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await props.searchParams;
  return <SettingsPage initialTab={parseTab(tab)} />;
}
