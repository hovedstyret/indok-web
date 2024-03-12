import { Button } from "@mui/material";

import { NextLinkComposed } from "@/components/Link";

type Props = {
  productId: string;
};

export const PurchaseButton: React.FC<Props> = ({ productId }) => {
  return (
    <Button
      disabled={true}
      component={NextLinkComposed}
      to={{
        pathname: "/ecommerce/checkout",
        query: { productId, quantity: 1 },
      }}
      color="inherit"
      size="large"
    >
      Kjøp nå!
    </Button>
  );
};