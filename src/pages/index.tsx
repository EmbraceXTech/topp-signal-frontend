import AppFooter from "@/components/AppFooter";
import MainLayout from "@/components/layouts/MainLayout";
import AppView from "@/views/AppView";

export default function Home() {
  return (
    <MainLayout>
      <AppView />
      <AppFooter />
    </MainLayout>
  );
}
