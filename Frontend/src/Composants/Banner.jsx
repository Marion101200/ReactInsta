import Menu from "./Menu"
import styles from "../Css/Banner.module.css";


function Banner() {

  return (
    <header className={styles.banner}>
      <h1>Ma Boutique</h1>
      <Menu />
      </header>
  )
}

export default Banner
