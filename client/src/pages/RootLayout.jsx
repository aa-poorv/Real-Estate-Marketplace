import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Flash from "../messages/Flash/Flash";
import { useSelector } from "react-redux";

const RootLayout = () => {
  const { flashInfo } = useSelector((state) => state.flash);
  return (
    <>
      <Header />
      <main>
        {flashInfo && (
          <Flash
            classes={
              flashInfo.effectClass === "fadeIn"
                ? "confirm-appear"
                : flashInfo.effectClass === "fadeOut"
                ? "confirm-disappear"
                : ""
            }
            message={flashInfo.message}
            extraMessage={flashInfo.extraMessage}
          />
        )}
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
