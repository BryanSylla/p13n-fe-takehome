function main() {
  var columns = document.getElementsByClassName("column");
  var Seen = { partial: {}, fiftyPercent: {}, fully: {} };
  window.addEventListener(
    "scroll",
    function(event) {
      for (var i = 0; i < columns.length; i++) {
        var id = columns[i].getAttribute("id").split(".")[0];
        if (!Seen.partial[id] && partiallyVisible(columns[i], id)) {
          Seen.partial[id] = true;
        } else if (!Seen.partial[id]) {
          //if not partially seen then no need to check for 50% or fully Seen
          continue;
        }
        if (!Seen.fiftyPercent[id] && fiftyPercentVisible(columns[i], id)) {
          Seen.fiftyPercent[id] = true;
        } else if (!Seen.fiftyPercent[id]) {
          //if not 50% seen then no need to check for fully visible
          continue;
        }
        if (!Seen.fully[id] && fullyVisible(columns[i], id)) {
          Seen.fully[id] = true;
        }
      }
    },
    false
  );
}

function fullyVisible(elem, id) {
  var bounding = elem.getBoundingClientRect();
  if (
    bounding.top >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight)
  ) {
    console.log("Column with id: " + id + " is now fully visible on the page.");
    return true;
  }
  return false;
}

function partiallyVisible(elem, id) {
  var bounding = elem.getBoundingClientRect();
  if (
    bounding.bottom >= 0 &&
    bounding.top <=
      (window.innerHeight || document.documentElement.clientHeight)
  ) {
    console.log(
      "Column with id: " + id + " started to become visible on the page."
    );
    return true;
  }
  return false;
}

function fiftyPercentVisible(elem, id) {
  var bounding = elem.getBoundingClientRect();
  boundingMiddle = (bounding.bottom - bounding.top) / 2 + bounding.top;
  if (
    bounding.bottom >= 0 &&
    boundingMiddle <=
      (window.innerHeight || document.documentElement.clientHeight)
  ) {
    console.log(
      "Column with id: " + id + " is now more than 50% visible on the page."
    );
    return true;
  }
  return false;
}

main();
