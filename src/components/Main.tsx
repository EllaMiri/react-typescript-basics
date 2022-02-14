import { Component } from "react";
import { isPropertySignature } from "typescript";
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
}

class Main extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { imagesData: [] };
  }

  async componentDidMount() {
    const url = "https://api.unsplash.com/search/photos?page=1&query=landscape";
    const response = await fetch(url, {
      headers: {
        Authorization: "Client-ID TnKitZsFZ1qy3JMh5uaJL3r8OJLDGGF3-FDxBdDcLOw",
      },
    });
    const data: ImageData[] = (await response.json()).results;

    this.setState({ imagesData: data });
  }

  render() {
    console.log(this.state);
    return (
      <main>
        {this.state.imagesData.map((imageData) => (
          <img
            key={imageData.id}
            src={imageData.urls.regular}
            alt={imageData.alt_description}
          />
        ))}
      </main>
    );
  }
}

export default Main;
