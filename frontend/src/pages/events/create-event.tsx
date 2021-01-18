import Navbar from "@components/navbar/Navbar";
import Button from "@components/ui/Button";
import { NextPage } from "next";
import React from "react";
import CreateEvent from "../../components/pages/events/createEvent";

const CreateEventsPage: NextPage = () => {
  return (
    <div>
      <Navbar />
      <Button back styling="primary" link="/events">
        Tilbake til arrangementer
      </Button>
      <div
        style={{
          border: "solid",
          borderRadius: "1em",
          padding: "2em",
          backgroundColor: "#fff",
          borderColor: "#6A9997",
          width: "450px",
          margin: "0 auto",
        }}
      >
        {" "}
        <div style={{ marginLeft: "auto", marginRight: "auto" }}>
          <CreateEvent />
        </div>
      </div>
    </div>
  );
};

export default CreateEventsPage;
