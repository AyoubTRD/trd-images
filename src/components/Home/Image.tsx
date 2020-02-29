import React from "react";

import { MdFileDownload, MdWallpaper } from "react-icons/md/";
import { ImageI } from "../../classes/Api";

interface ImageProps {
  image: ImageI;
  setLoading: (loading: boolean) => void;
}

export class Image extends React.Component<ImageProps> {
  handleDownload = async (): Promise<void> => {
    this.props.setLoading(true);
    await window.api.downloadImage(this.props.image);
    this.props.setLoading(false);
  };
  handleWallpaper = async (): Promise<void> => {
    this.props.setLoading(true);
    await window.api.setWallpaper(this.props.image);
    this.props.setLoading(false);
  };

  render() {
    const { image } = this.props;

    return (
      <div className="image">
        <img src={image.webformatURL} alt={image.pageURL} />
        <div className="show-on-hover">
          <div className="icon-btns">
            <button
              onClick={this.handleDownload}
              className="btn btn-icon"
              title="Download Image"
            >
              <MdFileDownload fontSize="17px" />
            </button>

            <button
              onClick={this.handleWallpaper}
              className="btn btn-icon"
              title="Set Image as desktop background"
            >
              <MdWallpaper fontSize="17px" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
