import Link from "next/link";
import { useStyles } from "./styles";
import { useRouter } from "next/router";
import { NavbarLink } from "./links";

type ItemProps = {
  link: NavbarLink;
};

const NavbarItem: React.VFC<ItemProps> = ({ link }) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <div key={link.id} className={classes.nav}>
      <Link href={link.href}>
        <a
          className={[
            link.href === "/" + router.pathname.split("/")[1] ? "active" : "",
            classes.navItem,
            classes.nonUserNavItem,
          ].join(" ")}
        >
          {link.title}
        </a>
      </Link>
      {link.dropdown && (
        <div className={classes.dropdown}>
          {link.dropdown.map((dropItem) => (
            <Link key={dropItem.title} href={dropItem.href}>
              <a
                className={[
                  router.pathname === dropItem.href ? "active" : "",
                  classes.navItem,
                  classes.nonUserNavItem,
                ].join(" ")}
              >
                {dropItem.title}
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavbarItem;
