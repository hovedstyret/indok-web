import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import FilterButton from "./FilterButtons";
import ListDocuments from "./listDocuments";
import { ContentWrapper } from "./wrapper";

const ColoredLine = ({ color }: any) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 5,
      marginTop: 20,
    }}
  />
);

const DocumentListView: React.FC = () => {
  const [typeFilters, setTypeFilters] = useState<{ [key: string]: { active: boolean; title: string } }>({
    Budget: { active: false, title: "Budsjetter og regnskap" },
    Summary: { active: false, title: "Generalforsamling" },
    Yearbook: { active: false, title: "Årbøker" },
    Guidelines: { active: false, title: "Støtte fra HS" },
    Regulation: { active: false, title: "Foreningens lover" },
    Statues: { active: false, title: "Utveksling" },
    Others: { active: false, title: "Annet" },
  });

  return (
    <div>
      <ColoredLine color={1} />
      <div style={{ flex: "100%" }}>
        <Typography variant="h1" style={{ textAlign: "center" }}>
          Arkiv
        </Typography>
      </div>
      <ContentWrapper
        style={{ marginLeft: "80px", marginRight: "80px", justifyContent: "space-evenly", paddingBottom: "50px" }}
      >
        <FilterButton
          typeFilters={typeFilters}
          updateTypeFilters={(key) =>
            setTypeFilters({
              ...typeFilters,
              [key]: { active: !typeFilters[key].active, title: typeFilters[key].title },
            })
          }
        />
      </ContentWrapper>
      <ListDocuments
        document_types={Object.entries(typeFilters)
          .filter((key, _) => key[1].active)
          .map(([_, val]) => val.title)}
      />
    </div>
  );
};

export default DocumentListView;
