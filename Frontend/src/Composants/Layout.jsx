import { Outlet } from "react-router";
import Banner from "./Banner";
import Footer from "./Footer";
import Sidebargauche from "./Sidebargauche";
import Sidebardroite from "./Sidebardroite";
import Menu from "./Menu";
import styles from "../Css/Layout.module.css";

export default function Layout() {
  return (
    <div className={styles.layout}>
      <div style={{ gridArea: "banner" }}>
        <Banner />
      </div>


      <main style={{ gridArea: "content" }}>
        <Outlet />
      </main>



      <div style={{ gridArea: "footer" }}>
        <Footer />
      </div>
    </div>
  );
}
