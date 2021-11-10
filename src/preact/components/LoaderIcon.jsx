export default function LoaderIcon(props) {
  return (
      <svg {...props} version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg"
           xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
           viewBox="0 0 24 24" enable-background="new 0 0 0 0"
           xml:space="preserve">
        <circle fill="none" stroke="#000" stroke-width="2" cx="12" cy="12"
                r="8"
                style="opacity:1;"/>
        <circle fill="#f9d72f" stroke="#f9d72f" stroke-width="2" cx="4" cy="12"
                r="2">
          <animateTransform
              attributeName="transform"
              dur="2s"
              type="rotate"
              from="0 12 12"
              to="360 12 12"
              repeatCount="indefinite"/>
        </circle>
      </svg>
  );
}