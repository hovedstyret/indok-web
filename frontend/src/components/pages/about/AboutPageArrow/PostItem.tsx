import { Avatar, CardActionArea, Stack, Typography } from "@mui/material";

import { NextLinkComposed } from "@/components/Link";

type Props = {
  coverImg?: string;
  title?: string;
  icon?: JSX.Element;
  href?: string;
  isNext?: boolean;
};

export const PostItem: React.FC<Props> = ({ coverImg, title, icon, href, isNext }) => {
  return (
    <CardActionArea sx={{ borderRadius: 2 }} {...(href && { component: NextLinkComposed, to: href })}>
      <Stack
        alignItems="center"
        direction={isNext ? "row-reverse" : "row"}
        spacing={2}
        sx={{
          p: 2.5,
          pl: 1,
          ...(isNext && {
            pr: 1,
          }),
        }}
      >
        {icon}
        <Avatar src={coverImg} sx={{ width: 64, height: 64 }} />
        <Stack
          spacing={0.5}
          sx={{
            ...(isNext && {
              textAlign: "right",
            }),
          }}
        >
          <Typography variant="overline" sx={{ color: "text.secondary" }}>
            Les mer
          </Typography>
          <Typography variant="subtitle1" component="span">
            {title}
          </Typography>
        </Stack>
      </Stack>
    </CardActionArea>
  );
};
