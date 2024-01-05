import { useState } from "react";
import classes from "./App.module.scss";
import { Link, Outlet } from "react-router-dom";
import Eye from "@/assets/eye.svg";
import Home from "@/assets/home.svg";
import sunFlower from "@/assets/Sunflower.jpg";
import virtus from "@/assets/Virtus.proLogo.png";

export const App = () => {
  const [count, setCount] = useState(0);
  console.log('__PLATFORM__', __PLATFORM__)
  const handle = () => setCount((prev) => prev + 1);
  const showNumber = (num: number ) => {
    console.log(num)
  }
  showNumber(23)

  return (
    <div>
      <div>
        <img width={100} src={sunFlower} /> <img width={100} src={virtus} />{" "}
        <Eye className={classes.color} width={100} height={100} />{" "}
        <Home width={100} height={100} className={classes.color}/>
      </div>

      <Link to={"/about"}>About</Link>
      <br />
      <Link to={"/shop"}>Shop</Link>
      <h1 className={classes.value}>{count}</h1>
      <button className={classes.button} onClick={handle}>
        press
      </button>
      <Outlet />
    </div>
  );
};
