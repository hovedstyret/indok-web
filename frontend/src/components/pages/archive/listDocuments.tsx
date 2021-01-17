/* eslint-disable prettier/prettier */
import { useQuery } from "@apollo/client";
import Content from "@components/ui/Content";
import ImageCard from "@components/ui/ImageCard";
import { Paragraph } from "@components/ui/Typography";
import { GET_DOCSBYTYPE } from "@graphql/archive/queries";
import { Document } from "@interfaces/archives";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
    },
  })
);

interface ListDocumentsProps {
  document_types: string[];
}

const ListDocuments: React.FC<ListDocumentsProps> = ({ document_types }) => {
  const { refetch, loading, data, error } = useQuery(GET_DOCSBYTYPE, { variables: { document_types } });

  useEffect(() => {
    refetch({ document_types });
  }, [document_types]);

  const classes = useStyles();
  if (loading) return <p>Laster...</p>;

  if (error) return <p> Feil: {error.message} </p>;

  return (
    <Grid container className={classes.root} justify="center" spacing={2}>
      <Grid item xs>
        <Grid container className={classes.img} justify="center" spacing={2}>
          {data.archiveByType.length ? (
            data.archiveByType.map((doc: Document) => (
              <Button
                key={doc.id}
                onClick={() => {
                  window.open(doc.url, "_blank");
                }}
              >
                <ImageCard key={doc.id} title={doc.title} subtitle={doc.typeDoc} imageUrl={doc.thumbnail} />
              </Button>
            ))
          ) : (
            <Content>
              <Paragraph> Fant ingen dokumenter for de gitte filtrene</Paragraph>
            </Content>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ListDocuments;
