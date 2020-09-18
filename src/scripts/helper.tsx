export const slugify = (str: string) => {
  if (str !== null) {
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    return str;
  } else {
    return;
  }
};

export const githubIssue = (hit: any) => {
  let url;
  url = `${process.env.REACT_APP_REPO_URL}issues/new?labels=${
    hit.type.includes("animal-") ? hit.type.replace("animal-", "") : hit.type
  }&title=Missing%20or%20incorrect%20data%20for%3A%20${
    hit.name
  }&body=%23%23%23%20Missing%20or%20incorrect%20data%20for%3A%20__%22${
    hit.name
  }%22__%0A%0AType:${
    hit.type.includes("animal-") ? hit.type.replace("animal-", "") : hit.type
  }%0A%0A---------------%0A%0A%23%23%23%20Available%20data%3A%0A%60%60%60json%0A${JSON.stringify(
    hit,
    null,
    2
  )}%0A%60%60%60%0A---------------%0A%23%23%23%20Missing%20or%20incorrect%20data%3A%0A%0A-%20%5B%20%5D%20Photo%0A-%20%5B%20%5D%20Icon%0A-%20%5B%20%5D%20Description%0A-%20%5B%20%5D%20Map%20location%0A-%20%5B%20%5D%20Other%3F%20Please%20describe%20in%20the%20issue.%0A%0A%2AI%27m%20an%20automated%20message%2C%20if%20you%20have%20anything%20more%20to%20add%2C%20please%20do%20so%2C%20thank%20you%21%2A`;
  return url;
};

export const getUrlParameters = (url: string) => {
  var params = {} as any;
  var parser = document.createElement("a");
  parser.href = url;
  var query = parser.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
};
