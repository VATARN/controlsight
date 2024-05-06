import { Metadata } from "next";
import React from "react";
import Dashboard from "./Dashboard";

const Home = () => {
  return <Dashboard />;
};
export const dynamic = "force-dynamic";
export default Home;

export const metadata: Metadata = {
  title: "Control Sight - Dashboard",
  description: "Check the summary of project issues",
};
