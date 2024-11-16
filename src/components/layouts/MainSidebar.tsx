import Chat from "../Chat";

export default function MainSidebar() {
  return (
    <div className="min-w-[300px] max-h-[calc(100vh-80px)] sticky top-0 bg-background">
      <div className="h-full p-3">
        <Chat />
      </div>
    </div>
  );
}
