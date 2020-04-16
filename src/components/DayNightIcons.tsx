import React from "react";

interface DayNightProps {
  isDay: boolean,
  isNight: boolean
}

const DayNightIcons = ({isDay, isNight}: DayNightProps) => {
  return (<>{isDay && <span className={"day"} role="img" aria-label="day">🌇</span>}
  {isNight && <span className={"night"} role="img" aria-label="night">🌃</span>}</>)
}

export default DayNightIcons