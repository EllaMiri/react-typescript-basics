import { Component } from "react";
import { isPropertySignature } from "typescript";
import LikeableImage from "./LikeableImage";
import "./Main.css";

interface ImageData {
  id: string;
  alt_description: string;
  urls: {
    full: string;
    regular: string;
    small: string;
    small_s3: string;
    thumb: string;
  };
}

interface Props {}

interface State {
  imagesData: ImageData[];
  likedImages: string[];
}

class Main extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { imagesData: [], likedImages: [] };
  }

  async componentDidMount() {
    const url = "https://api.unsplash.com/search/photos?page=1&query=landscape";
    const response = await fetch(url, {
      headers: {
        Authorization: "Client-ID TnKitZsFZ1qy3JMh5uaJL3r8OJLDGGF3-FDxBdDcLOw",
      },
    });
    const data: ImageData[] = (await response.json()).results;

    const likedImages = JSON.parse(localStorage.likedImages || "[]");

    this.setState({ imagesData: data, likedImages: likedImages });
  }

  toggleLikedImage(id: string) {
    if (this.state.likedImages.includes(id)) {
      this.setState({
        likedImages: this.state.likedImages.filter((imageId) => imageId !== id),
      });
    } else {
      this.setState({ likedImages: [...this.state.likedImages, id] });
    }
  }

  componentDidUpdate() {
    localStorage.setItem("likedImages", JSON.stringify(this.state.likedImages));
  }

  render() {
    console.log(this.state);
    return (
      <main>
        {this.state.imagesData.map((imageData) => (
          <LikeableImage
            isLiked={this.state.likedImages.includes(imageData.id)}
            key={imageData.id}
            src={imageData.urls.regular}
            alt={imageData.alt_description}
            onToggleLiked={() => this.toggleLikedImage(imageData.id)}
          />
        ))}
      </main>
    );
  }
}

export default Main;
