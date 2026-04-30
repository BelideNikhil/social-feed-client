import { Outlet } from "react-router";
import { CreatePost } from "./CreatePost";
import { Header } from "./Header";
import { useModal } from "../context/modal.context";

export const DashboardLayout = () => {
  const { openModal } = useModal();
  return (
    <>
      <Header />
      <main>
        {openModal ? <CreatePost /> : null}
        <Outlet />
      </main>
      {/* footer */}
    </>
  );
};
