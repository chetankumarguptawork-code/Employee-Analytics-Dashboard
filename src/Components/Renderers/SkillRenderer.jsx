export default function SkillRenderer(props) {
  const skills = props.value || [];

  if (!skills.length) return "-";

  return (
    <span className="skill-chip">
      {skills[0]}
      {skills.length > 1 && ` +${skills.length - 1}`}
    </span>
  );
}