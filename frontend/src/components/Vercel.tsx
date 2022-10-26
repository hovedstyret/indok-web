import { Box, Link } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";

import poweredByVercel from "~/public/powered-vercel.svg";

export const Vercel: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <NextLink href="https://vercel.com/?utm_source=rubberdok&utm_campaign=oss" rel="noreferrer noopener" passHref>
      <Link>
        <Box>
          <Image src={poweredByVercel} alt="Powered by Vercel" height="32px" width="154px" layout="fixed" />
        </Box>
      </Link>
    </NextLink>
  );
};
