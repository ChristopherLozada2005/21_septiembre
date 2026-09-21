import { gardenContent } from '../data/flowers';

export function Intro() {
  return (
    <div className="garden__intro">
      <p className="eyebrow">{gardenContent.eyebrow}</p>
      <h1>{gardenContent.title}</h1>
    </div>
  );
}
