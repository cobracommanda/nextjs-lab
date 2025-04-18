import getDomain from "../lib/getDomain";

async function getData() {
  const domain = getDomain();
  const endpoint = `${domain}/api/post`;
  const res = await fetch(endpoint);

  if (!res) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
  // return { items: [] };
}

export default async function BlogPage() {
  const data = await getData();
  const items = data && data.items ? [...data.items] : [];
  console.log(process.env.PUBLIC_DOMAIN);
  return (
    <main>
      <h1>Jungle Juice</h1>
      {items &&
        items.map((item, idx) => {
          return <li key={`post-${idx}`}>{item.title}</li>;
        })}
    </main>
  );
}
