import Sidebar from '../components/Sidebar';

export default function MainLayout({children}) {
  return (
      <div class="p-2 inline-flex bg-base-100 w-full h-screen">
        <Sidebar />
        {children}
      </div>
  );
}