import "./Settings.css";
import { AppLayout } from "../../components/AppLayout";
import { useAuth } from "../../context/AuthContext";
import { SettingsForm } from "./SettingsForm";

export default function Settings() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <AppLayout>
      <SettingsForm user={user} />
    </AppLayout>
  );
}
