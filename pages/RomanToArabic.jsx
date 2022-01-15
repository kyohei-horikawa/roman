import Head from "next/head";
import { Header } from "../components/Header";
import { RomanToArabic } from "../components/RomanToArabic";
import { Footer } from "../components/Footer";

export default function Roman() {
  return (
    <>
      <Head>
        <title>Roman To Arabic</title>
      </Head>
      <Header />
      <RomanToArabic />
      <Footer />
    </>
  );
}
