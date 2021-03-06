import Head from "next/head";
import { Header } from "../components/Header";
import { ArabicToRoman } from "../components/ArabicToRoman";
import { Footer } from "../components/Footer";

export default function Roman() {
  return (
    <>
      <Head>
        <title>Arabic To Roman</title>
      </Head>
      <Header />
      <ArabicToRoman />
      <Footer />
    </>
  );
}
