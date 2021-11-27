function Search() {
  return <div className="bg-search-md bg xl:bg-search-wd " />;
}

function Map() {
  return <div className="bg-search-md bg xl:bg-other-wd" />;
}

function Result() {
  return <div className="bg-result" />;
}

export const Background = {
  Search,
  Map,
  Result,
};
