import { useAuth } from "../context/auth.context";
import { useModal } from "../context/modal.context";

export const Header = () => {
  const { logoutHandler } = useAuth();
  const { openModalHandler } = useModal();

  return (
    <nav className="header">
      <h3>InstaKiloGram</h3>
      <div className="header-buttons">
        <button onClick={openModalHandler}>Create Post</button>
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </nav>
  );
};
