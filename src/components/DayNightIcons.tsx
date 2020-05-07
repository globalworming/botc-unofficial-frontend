import React from "react";

interface DayNightProps {
  isDay: boolean,
}

const DayNightIcons = ({isDay}: DayNightProps) => {
  return (<>{isDay && <span className={"day"} role="img" aria-label="day">🌇</span>}
  {isDay || <span className={"night"} role="img" aria-label="night">🌃</span>}</>)
}

export default DayNightIcons