import { Link, usePage } from "@inertiajs/inertia-react";
import TopNavBar from "./Header/TopNavBar";
import MidNavBar from "./Header/MidNavBar";
import BottNavBar from "./Header/BottNavBar";

const NavBar = ({ appName, user }) => {
  const { url, props } = usePage();

  return (
    <>
      <TopNavBar user={user} />
      <MidNavBar appName={appName} user={user} props={props} currentUrl={url} />
    </>
  );
};

export default NavBar;
