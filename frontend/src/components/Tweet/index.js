import React, { Component } from "react";

import like from "../../like.svg";
import "./styles.css";
import api from "../../services/api";

export default class Tweet extends Component {
  handlelike = async () => {
    const { _id } = this.props.tweet;

    await api.post(`likes/${_id}`);
  };

  render() {
    const { tweet } = this.props;

    return (
      <li className="tweet">
        <strong>{tweet.author}</strong>
        <p>{tweet.content}</p>
        <button type="button" onClick={this.handlelike}>
          <img src={like} alt="Like" />
          {tweet.likes}
        </button>
      </li>
    );
  }
}
