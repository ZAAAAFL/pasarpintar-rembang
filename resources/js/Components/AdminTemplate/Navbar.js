import { Link, usePage } from "@inertiajs/inertia-react";
import Navbar from "./template/Navbar";

const NavBar = ({ appName, user }) => {
  const { url } = usePage();

  return (
    <>
      <Navbar appName={appName} user={user} url={url} />
      {/* <BottNavBar /> */}
    </>
  );
};

export default NavBar;
