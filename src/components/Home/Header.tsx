import React, { SyntheticEvent } from "react";
import { GoSearch } from "react-icons/go";

interface Props {
  setQuery: (query: string) => void;
}

interface State {
  query: string;
}

export class Header extends React.Component<Props, State> {
  handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    const input = document.querySelector("input#query") as HTMLInputElement;
    this.props.setQuery(input.value);
    input.value = "";
  };

  render() {
    return (
      <div className="container">
        <header>
          <form className="search-form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="search for images..."
              id="query"
              name="query"
            />
            <button type="submit">
              <GoSearch />
            </button>
          </form>
        </header>
      </div>
    );
  }
}
