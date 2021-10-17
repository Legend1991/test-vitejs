import {history} from "../navigator";

export default function About(props) {
  console.log('[About] history:', history);
  return (
    <span className="text-lg font-bold">
      About
    </span>
  );
}