export default function YhPage({ children }: { children: JSX.Element }) {
  return (
    <main className="flex bg-slate-100 box-border overflow-hidden p-3 h-screen">
      {children}
    </main>
  );
}
