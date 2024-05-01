import AirtableFetcher from "airtable-fetcher";
const baseId = "appkEfTWO7B38MDOf";
const tableId = "tblBrUfD8LyFLR2AB";
const token = "patiflGyLcKd6rL4e.bf1e8bb4fc97aef9c9ed2946d64fe4d19b93b79c0b28039f5c9e36a914c33486";
async function getData(id) {
  const fetcher = new AirtableFetcher({ baseId, tableId, token });
  return await fetcher.get({ filter: `ID = '${id}'` });
}
export {
  getData as g
};
