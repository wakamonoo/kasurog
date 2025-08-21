export default function Loader() {
  return (
    <div className="animate-pulse flex flex-col items-center gap-4 w-full h-auto">
      <div>
        <div className="w-48 h-6 bg-panel rounded-md" />
        <div className="w-28 h-4 bg-panel mx-auto mt-3 rounded-md" />
      </div>
      <div className="h-7 bg-panel w-full rounded-md" />
      <div className="h-7 bg-panel w-full rounded-md" />
      <div className="h-7 bg-panel w-full rounded-md" />
      <div className="h-7 bg-panel w-1/2 rounded-md" />
    </div>
  );
}