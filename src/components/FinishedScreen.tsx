function FinishedScreen({ points, sumOfPoints }) {
  const percentage = (points / sumOfPoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🏆";
  if (percentage >= 80 && percentage < 100) emoji = "⭐";
  if (percentage >= 50 && percentage < 80) emoji = "😶‍🌫️";
  if (percentage >= 0 && percentage < 50) emoji = "⚡";
  if (percentage === 0) emoji = "❓";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        You're score <strong>{points}</strong> out of {sumOfPoints} (
        {Math.ceil(percentage)}%)
      </p>

      <p className="highscore">(Highscore: X points)</p>
    </>
  );
}

export default FinishedScreen;
