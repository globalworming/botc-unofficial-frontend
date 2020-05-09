import React from "react";
import {useGlobalState} from "../state";

const DayNightIcons = () => {
  const [isDay] = useGlobalState("isDay");

  return (<>{isDay && <span className={"day"} role="img" aria-label="day">🌇</span>}
  {isDay || <span className={"night"} role="img" aria-label="night">🌃</span>}</>)
}

export default DayNightIcons