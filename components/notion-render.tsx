import { Fragment } from "react";
import Link from "next/link";

export function renderBlock(block: any) {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case "paragraph":
      return <p>{value.rich_text.map((text: any) => text.plain_text)}</p>;
    case "heading_1":
      return <h1>{value.rich_text.map((text: any) => text.plain_text)}</h1>;
    case "heading_2":
      return <h2>{value.rich_text.map((text: any) => text.plain_text)}</h2>;
    case "heading_3":
      return <h3>{value.rich_text.map((text: any) => text.plain_text)}</h3>;
    case "bulleted_list": {
      return <ul>{value.children.map((child: any) => renderBlock(child))}</ul>;
    }
    case "numbered_list": {
      return <ol>{value.children.map((child: any) => renderBlock(child))}</ol>;
    }
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li key={block.id}>
          {value.rich_text.map((text: any) => text.plain_text)}
          {/* eslint-disable-next-line no-use-before-define */}
          {!!value.children && renderNestedList(block)}
        </li>
      );
    case "to_do":
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{" "}
            {value.rich_text.map((text: any) => text.plain_text)}
          </label>
        </div>
      );
    case "toggle":
      return (
        <details>
          <summary>
            {value.rich_text.map((text: any) => text.plain_text)}
          </summary>
          {block.children?.map((child: any) => (
            <Fragment key={child.id}>{renderBlock(child)}</Fragment>
          ))}
        </details>
      );
    case "child_page":
      return (
        <div>
          <strong>{value?.title}</strong>
          {block.children.map((child: any) => renderBlock(child))}
        </div>
      );
    case "image": {
      const src =
        value.type === "external" ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure>
          <img src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    }
    case "divider":
      return <hr key={id} />;
    case "quote":
      return (
        <blockquote key={id}>
          {value.rich_text.map((text: any) => text.plain_text)}
        </blockquote>
      );
    case "code":
      return (
        <pre>
          <code key={id}>
            {value.rich_text.map((text: any) => text.plain_text)}
          </code>
        </pre>
      );
    case "file": {
      const srcFile =
        value.type === "external" ? value.external.url : value.file.url;
      const splitSourceArray = srcFile.split("/");
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const captionFile = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure>
          <div>
            📎{" "}
            <Link href={srcFile} passHref>
              <a>{lastElementInArray.split("?")[0]}</a>
            </Link>
          </div>
          {captionFile && <figcaption>{captionFile}</figcaption>}
        </figure>
      );
    }
    case "bookmark": {
      const href = value.url;
      return (
        <a href={href} target="_blank" rel="noreferrer noopener">
          {href}
        </a>
      );
    }
    case "table": {
      return (
        <table>
          <tbody>
            {block.children?.map((child: any, index: any) => {
              const RowElement =
                value.has_column_header && index === 0 ? "th" : "td";
              return (
                <tr key={child.id}>
                  {child.table_row?.cells?.map((cell: any, i: any) => (
                    <RowElement key={`${cell.plain_text}-${i}`}>
                      {cell.plain_text}
                    </RowElement>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    case "column_list": {
      return (
        <div>
          {block.children.map((childBlock: any) => renderBlock(childBlock))}
        </div>
      );
    }
    case "column": {
      return (
        <div>{block.children.map((child: any) => renderBlock(child))}</div>
      );
    }
    default:
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
}

export function renderNestedList(blocks: any) {
  const { type } = blocks;
  const value = blocks[type];
  if (!value) return null;

  const isNumberedList = value.children[0].type === "numbered_list_item";

  if (isNumberedList) {
    return <ol>{value.children.map((block: any) => renderBlock(block))}</ol>;
  }
  return <ul>{value.children.map((block: any) => renderBlock(block))}</ul>;
}
