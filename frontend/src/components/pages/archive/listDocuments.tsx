/* eslint-disable prettier/prettier */
import { useQuery } from "@apollo/client";
import Content from "@components/ui/Content";
import ImageCard from "@components/ui/ImageCard";
import { GET_DOCSBYTYPE } from "@graphql/archive/queries";
import { Document } from "@interfaces/archives";
import Button from "@material-ui/core/Button";
import GridList from "@material-ui/core/GridList";
import Typography from "@material-ui/core/Typography";
import GridListTile from "@material-ui/core/GridListTile";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
    },
    image: {
      width: "128px",
      height: "128px",
      alignItems: "start",
    },
    img: {
      maxWidth: "100%",
      maxHeight: "100%",
    },
    article: {
      width: "100%",
    },
    header: {
      width: "100%",
      fontSize: 10,
      padding: -10,
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
  if (loading) return <p style={{ textAlign: "center" }}>Laster...</p>;

  if (error) return <p style={{ textAlign: "center" }}> Feil: {error.message} </p>;

  return (
    <Content>
      <GridList cellHeight={256} className={classes.img} cols={4}>
        {data.archiveByType.length ? (
          data.archiveByType.map((doc: Document) => (
            <GridListTile key={0}>
              <Card className={classes.root} elevation={1}>
                <CardActionArea>
                  <Button
                    key={doc.id}
                    className={classes.article}
                    onClick={() => {
                      window.open(doc.url, "_blank");
                    }}
                  >
                    <CardMedia
                      key={doc.id}
                      className={classes.image}
                      component="img"
                      height="128"
                      image={doc.thumbnail}
                    />
                    <CardHeader
                      className={classes.header}
                      title={doc.title}
                      subheader={doc.typeDoc}
                      titleTypographyProps={{
                        variant: "heading",
                        component: "h2",
                        align: "left",
                      }}
                      subheaderTypographyProps={{
                        variant: "heading",
                        component: "h4",
                        align: "left",
                      }}
                    />
                    {/* <ImageCard key={doc.id} title={doc.title} subtitle={doc.typeDoc} imageUrl={doc.thumbnail} /> */}
                  </Button>
                </CardActionArea>
              </Card>
            </GridListTile>
          ))
        ) : (
          <Content>
            <Typography> Fant ingen dokumenter som passer søket ditt </Typography>
          </Content>
        )}
      </GridList>
    </Content>
  );
};

export default ListDocuments;
