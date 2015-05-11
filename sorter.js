function InvalidIndentationError () {
  this.message = "The indentation seems to be broken.";
}

var maxDepth = -2;
var depth = -2;

var indentations = function (text) {
  var lines = text.split("\n");
  var indentation_levels = [];
  lines.forEach(function (line) {
    var match = line.match(/^(\s+)/);
    var prefix = "";
    if (match !== null) {
      prefix = match[0];
    }
    if (indentation_levels.indexOf(prefix) === -1) {
      indentation_levels.push(prefix);
    }
  });
  return indentation_levels;
};

var smallestPrefix = function (indentations) {
  var sortedByLength = indentations.sort(function (a, b) {
    return a.length - b.length;
  });
  return sortedByLength[0];
};

var maxDepthFromIndentation = function (indentations) {
  return indentations.length;
};

var updateDepthSelection = function (maxDepth) {
  var depthSelection = document.getElementById("depth");
  emptyElement(depthSelection);
  var createOption = function (selection, value, text) {
    var option = document.createElement("option");
    option.value = value;
    if (value == depth) option.selected = true;
    option.appendChild(document.createTextNode(text));
    selection.appendChild(option);
  };
  for (val=1; val < maxDepth; val++) {
    createOption(depthSelection, val - 1, val);
  }
  createOption(depthSelection, -2, "unlimited");
};

var getSelectedDepth = function () {
  var depthSelection = document.getElementById("depth");
  return depthSelection[depthSelection.selectedIndex].value;
};

var emptyElement = function (element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

var clearMessages = function () {
  var messages = document.getElementById("messages");
  emptyElement(messages);
};

var showMessage = function (content, type) {
  if (typeof type == "undefined") {
    type = "info";
  }
  var messages = document.getElementById("messages");
  message = document.createElement("div");
  message.className = "ui message " + type;
  message.appendChild(document.createTextNode(content));
  messages.appendChild(message);
};

var getBlocks = function (lines, prefix) {
  var blocks = [];
  var currentblock = null;
  var sublines = null;
  var regex = RegExp("^" + prefix + "(\\S.*)$", "m");
  lines.forEach(function (line, num) {
    if (line.match(regex) !== null) {
      sublines = [];
      currentblock = {head: line, tail: sublines};
      blocks.push(currentblock);
    } else {
      if (line.match(/^\s*$/m)) {
        // Maybe maintain whitespace
      } else if (sublines === null) {
        throw new InvalidIndentationError();
      } else {
        sublines.push(line);
      }
    }
  });
  return blocks;
};

var sortText = function (text, depth) {
  if (!text) return "";
  if (depth == -1) return text;
  var lines = text.split("\n");
  var prefix = smallestPrefix(indentations(text));
  var blocks = getBlocks(lines, prefix);
  var sorted = blocks.sort(function (a, b) {
    return a.head.localeCompare(b.head);
  });
  return sorted.map(function (block) {
    var tail = sortText(block.tail.join("\n"), depth - 1);
    tail = tail.length ? "\n" + tail : "";
    return block.head + tail;
  }).join("\n");
};

var sort = function () {
  clearMessages();
  var input = document.getElementById("input").value;
  maxDepth = maxDepthFromIndentation(indentations(input));
  updateDepthSelection(maxDepth);
  depth = getSelectedDepth();
  try {
    var output = sortText(input, depth);
    document.getElementById("output").value = output;
  } catch (e) {
    if (e instanceof InvalidIndentationError) {
      showMessage(e.message, "negative");
    } else {
      showMessage("An error occurred: " + e.message, "negative");
      throw(e);
    }
    document.getElementById("output").value = "";
  }
};

var depthChanged = function () {
  depth = getSelectedDepth();
  sort();
};

document.getElementById("input-form").addEventListener("submit", function (ev) {
  ev.preventDefault();
});
document.getElementById("input").addEventListener("keyup", sort);
document.getElementById("depth").addEventListener("change", depthChanged);

showMessage("Welcome to sortr. Paste indented code (For example a YAML file) " +
            "into the left pane. Given the indentation is valid, you will " +
            "get a sorted output on the right.");
