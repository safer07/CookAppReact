export default function SegmentedButton({
  buttons,
  handleClick,
  activeTabIndex,
}) {
  return (
    <div className={`segmented-button grid-cols-${buttons.length}`}>
      {buttons.map((tab, index) => (
        <button
          key={tab}
          className={`segment ${activeTabIndex === index ? "active" : ""}`}
          onClick={() => handleClick(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
