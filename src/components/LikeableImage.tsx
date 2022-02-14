import "./LikeableImage.css";

interface Props {
  src: string;
  alt: string;
  onToggleLiked: () => void;
  isLiked: boolean;
}

function LikeableImage(props: Props) {
  return (
    <div className="root">
      <img className="image" src={props.src} alt={props.alt} />
      <i
        className={"icon " + (props.isLiked ? "liked" : "")}
        onClick={props.onToggleLiked}
      >
        ♥
      </i>
    </div>
  );
}

export default LikeableImage;
