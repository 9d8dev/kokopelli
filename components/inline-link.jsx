import Link from "next/link";

const InlineLink = ({ children, className, href }) => {
  if (typeof href !== "string" && typeof href !== "object") {
    console.error(
      "Invalid prop `href` supplied to `Link`. Expected `string` or `object`, got `undefined`."
    );
    return null;
  }

  return (
    <Link
      href={href}
      className={`${className} transition-all hover:opacity-70`}
    >
      {children}
    </Link>
  );
};

export default InlineLink;
