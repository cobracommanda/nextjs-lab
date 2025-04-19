import getDomain from "../lib/getDomain";

async function getData() {
  const domain = getDomain();
  const endpoint = `${domain}/api/post`;

  // quick sanity check
  console.log("⟢ fetching from:", endpoint);

  const res = await fetch(endpoint, { cache: "no-store" });
  if (!res.ok) {
    // log status + body to see what went wrong on the API side
    const text = await res.text().catch(() => "");
    console.error(`Fetch error ${res.status}: ${text}`);
    throw new Error(`Failed to fetch data (${res.status})`);
  }

  // correctly guard against non‑JSON payloads
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    console.warn("Unexpected content-type:", contentType);
    return { items: [] };
  }

  const data = await res.json();
  return data;
}

export default async function BlogPage() {
  const data = await getData();
  const items = Array.isArray(data.items) ? data.items : [];
  return (
    <main>
      <h1>Jungle Juice</h1>
      <ul>
        {items.map((item, idx) => (
          <li key={`post-${idx}`}>{item.title}</li>
        ))}
      </ul>
    </main>
  );
}
