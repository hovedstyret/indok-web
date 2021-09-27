import Layout from "@components/Layout";
import { Box, Card, Chip, Container, Divider, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneIcon from "@material-ui/icons/Phone";
import { getPostBySlug, getPostsSlugs } from "@utils/posts";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";
import ReactMarkdown from "react-markdown";
import * as markdownComponents from "@components/markdown/components";
import { Post } from "src/types/posts";

type ArticleProps = {
  params: {
    slug: string;
  };
  post: {
    content: string;
    excerpt: string;
  };
  frontmatter: {
    description: string;
    title: string;
    logo?: string;
    alt?: string;
    image?: string;
    board: BoardMember[];
  };
  nextPost: Post | null;
  previousPost: Post | null;
};

type BoardMember = {
  name: string;
  mail: string;
  title: string;
  phoneNumber: string;
};

const useStyles = makeStyles(() => ({
  title: {
    color: "white",
    zIndex: -1,
  },
  titleImage: {
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  heroCard: {
    marginTop: -112,
    textAlign: "center",
  },
  logo: {
    height: 100,
  },
  avatar: {
    height: 100,
  },
}));

const Article: NextPage<ArticleProps> = ({ post, frontmatter }) => {
  const classes = useStyles();

  return (
    <Layout>
      <Box mt="-60px" position="relative" className={classes.title} height={350}>
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          className={classes.titleImage}
          style={{
            backgroundImage: `linear-gradient(to top, rgb(0 0 0 / 50%), rgb(0 0 0 / 60%)),
            url(${frontmatter.image})`,
          }}
        ></Box>
      </Box>

      <Container>
        <Grid justifyContent="center" container>
          <Grid item xs={10}>
            <Paper className={classes.heroCard}>
              <Box mb="56px" py="40px" px="56px" display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">{frontmatter.title}</Typography>
                <img className={classes.logo} alt={frontmatter.alt} src={frontmatter.logo}></img>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={8}>
            <ReactMarkdown components={markdownComponents}>{post.content}</ReactMarkdown>
          </Grid>
          <Grid item xs={4}>
            {frontmatter.board && (
              <>
                <Typography variant="h5" gutterBottom>
                  Styret
                </Typography>
                {frontmatter.board.map((member, index) => (
                  <>
                    {index != 0 && <Divider />}
                    <Card key={index}>
                      <Box p={4}>
                        <Typography variant="body2">{member.name}</Typography>
                        <Typography variant="caption" gutterBottom>
                          {member.title}
                        </Typography>
                        <br />
                        {member.mail && <Chip size="small" label={member.mail} icon={<MailOutlineIcon />} />}
                        {member.mail && member.phoneNumber && <br />}
                        {member.phoneNumber && <Chip size="small" label={member.phoneNumber} icon={<PhoneIcon />} />}
                      </Box>
                    </Card>
                  </>
                ))}
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPostsSlugs("organizations");

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params) {
    const { slug } = params;
    let postData = undefined;
    if (typeof slug === "string") {
      postData = getPostBySlug(slug, "organizations");
    } else if (Array.isArray(slug)) {
      postData = getPostBySlug(slug[0], "organizations");
    } else {
      return { notFound: true };
    }
    return { props: postData };
  }
  return { notFound: true };
};

export default Article;
