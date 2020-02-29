import React from "react";
import { Image } from "./Image";
import { Loader } from "./Loader";
import { ImageI } from "../../classes/Api";

interface ImagesProps {
  images: ImageI[];
  loading: boolean;
  query: string;
  setLoading: (loading: boolean) => void;
}

export class Images extends React.Component<ImagesProps> {
  render() {
    const { images, loading, query, setLoading } = this.props;
    return (
      <>
        <div className="container">
          <p className="images-p">
            Search results for <b>{query}</b>
          </p>
          <div className="images-grid">
            {images.map(img => (
              <Image
                image={img}
                key={img.id + img.comments}
                setLoading={setLoading}
              />
            ))}
          </div>
        </div>
        <div
          className={`images-loading ${loading ? "" : "images-loading-hide"}`}
        >
          <Loader />
        </div>
      </>
    );
  }
}
