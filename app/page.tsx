import TaskHeader from "@/components/TaskHeader";
import TaskList from "@/components/TaskList";
import UserInfo from "@/components/UserInfo";

export default function Home() {

  return (
    <div className="h-full w-full py-4 px-8 flex items-start justify-center gap-4 overflow-hidden">
      <UserInfo />
      <div
        className="w-full max-w-2xl lg:max-w-3xl xl:max-w-5xl flex flex-col gap-4 items-start justify-start py-8 relative h-full"
      >
        <TaskHeader />
        <TaskList />
      </div>
    </div>
  );
}
