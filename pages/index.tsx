import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Component } from "react";
import styles from "../styles/Home.module.css";

type State = {
  locationName: string;
};

type Props = {};

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      locationName: "",
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((pos) => {
      fetch(
        `https://geo-info.co/${pos.coords.latitude},${pos.coords.longitude}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.setState({ locationName: data.city + ", " + data.state });
        });
    });
  }

  render() {
    const { locationName } = this.state;
    return (
      <div className={styles.main_container}>
        <Head>
          <title>Chat</title>
          <meta name="description" content="Chat app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {locationName ? (
          <p> You are located in {locationName} </p>
        ) : (
          <p> Finding your location </p>
        )}
      </div>
    );
  }
}
