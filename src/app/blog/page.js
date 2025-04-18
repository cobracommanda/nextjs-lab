async function getData() {
  // const endpoint = "http://localhost:3000/api/post";
  // const res = await fetch(endpoint);

  // if (!res) {
  //   throw new Error("Failed to fetch data");
  // }
  // return res.json();
  return { items: [] };
}

export default async function BlogPage() {
  const data = await getData();
  const items = data && data.items ? [...data.items] : [];

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
