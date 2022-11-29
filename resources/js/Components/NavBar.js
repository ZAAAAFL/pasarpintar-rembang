import { Link, usePage } from "@inertiajs/inertia-react";
import BottNavBar from "./Header/BottNavBar";
import TopNavBar from "./Header/TopNavBar";

const NavBar = ({ appName, user }) => {
  const { url } = usePage();

  return (
    <>
      <TopNavBar appName={appName} user={user} url={url} />
      <BottNavBar url={url} user={user} />
    </>
  );
};

export default NavBar;
