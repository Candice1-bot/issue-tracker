import NextLink from "next/link";
import { Link as ReadixLink } from "@radix-ui/themes";

interface Props {
  href: string;
  children: string;
}
const Link = ({ href, children }: Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <ReadixLink>{children}</ReadixLink>
    </NextLink>
  );
};

export default Link;
