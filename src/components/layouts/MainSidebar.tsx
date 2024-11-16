import Chat from "../Chat";

export default function MainSidebar() {
  return (
    <div className="w-[300px] max-h-[calc(100vh-70px)] sticky bottom-0 bg-background border-r">
      <div className="h-full p-3">
        <Chat />
      </div>
    </div>
  );
}
