import { createContext, useContext, useState } from "react";

const ModalContext = createContext(null);
export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const openModalHandler = () => setOpenModal(true);
  const closeModalHandler = () => setOpenModal(false);
  const toggleModalHandler = () => setOpenModal((prev) => !prev);
  return (
    <ModalContext.Provider
      value={{
        openModal,
        setOpenModal,
        openModalHandler,
        closeModalHandler,
        toggleModalHandler,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
