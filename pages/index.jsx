import Head from "next/head";
import { Header } from "../components/Header";
import { Body } from "../components/Body";
import { Footer } from "../components/Footer";

export default function Index() {
  return (
    <>
      <Head>
        <title>Roman Converter</title>
      </Head>
      <Header />
      <Body />
      <Footer />
    </>
  );
}
