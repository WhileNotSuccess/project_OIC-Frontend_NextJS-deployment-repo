export default function extractImagesAndText(html: string): { text: string; images: string[] } {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const text = doc.body.textContent?.trim() || "";
  const images = Array.from(doc.querySelectorAll("img")).map((img) => img.src);
  return { text, images };
}
