const Circles = ({circleNumber, current}) => {
  const rows = [];
  for (let i = 1; i <= circleNumber; i += 1) {
    rows.push(
      <div key={i} className="circleDiv">
        <div className={current > i-1 ? "circleActive" : "circle"}>{i}</div>
        <span className={`${i === circleNumber && "lastSpanHidden"} ${current > i ? "circleSpanActive" : "circleSpan"}`} />
      </div>
    );
  }
  return rows;
}

export default Circles;
