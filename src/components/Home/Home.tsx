import React from "react";
import { Header } from "./Header";
import { Images } from "./Images";
import { ImageI } from "../../classes/Api";

import { FaArrowUp } from "react-icons/fa";

interface State {
  query: string;
  images: ImageI[];
  loading: boolean;
  loadingMore: boolean;
}

interface Props {}

const queries = [
  "nature",
  "sky",
  "modern",
  "animal",
  "travel",
  "wallpaper",
  "person"
];

export class Home extends React.Component<Props, State> {
  state = {
    query: queries[Math.floor(Math.random() * queries.length)],
    images: [],
    loading: false,
    loadingMore: false
  };

  setQuery = (query: string): void => {
    this.setState({ query });
  };

  async componentDidMount(): Promise<void> {
    this.loadImages();
    window.onscroll = async (): Promise<void> => {
      const imagesGrid: Element = document.querySelector(".images-grid");
      if (
        window.scrollY >= imagesGrid.scrollHeight - 1000 &&
        !this.state.loadingMore
      ) {
        this.setState({ loadingMore: true });
        await this.loadMoreImages();
        this.setState({ loadingMore: false });
      }
    };
  }

  componentWillUnmount(): void {
    window.onscroll = () => {};
  }

  loadMoreImages = async (): Promise<void> => {
    const images = await window.api.loadMore(this.state.query);

    const newState = [...this.state.images, ...images];
    this.setState({ images: newState });
  };

  loadImages = async (): Promise<void> => {
    this.setState({ loading: true });
    const images = await window.api.getImages(this.state.query);
    this.setState({ images, loading: false });
  };

  componentDidUpdate(prevProps: Props, prevState: State): void {
    if (!(this.state.query === prevState.query)) {
      this.loadImages();
    }
  }

  setLoading = (loading: boolean): void => {
    this.setState({ loading });
  };

  scrollToTop = (): void => {
    const header = document.querySelector("header") as Element;
    header.scrollIntoView({ behavior: "smooth" });
  };

  render() {
    const { images, query, loading } = this.state;
    return (
      <>
        <Header setQuery={this.setQuery} />
        <Images
          images={images}
          loading={loading}
          query={query}
          setLoading={this.setLoading}
        />
        {window.scrollY >= 1000 ? (
          <button
            className="btn btn-icon btn-floating"
            onClick={this.scrollToTop}
          >
            <FaArrowUp fontSize="17px" />
          </button>
        ) : null}
      </>
    );
  }
}
