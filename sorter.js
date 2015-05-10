function InvalidIndentation () {
  this.message = "The indentation seems to be broken.";
}

smallest_prefix = function (lines) {
  var prefixes = [];
  lines.forEach(function (line) {
    var match = line.match(/^(\s+)/);
    if (match) {
      prefixes.push(match[0]);
    } else {
      prefixes.push("");
    }
  });
  var sortedByLength = prefixes.sort(function (a, b) {
    return a.length - b.length;
  });
  return sortedByLength[0];
};

clearMessages = function () {
  var messages = document.getElementById("messages");
  while (messages.firstChild) {
    messages.removeChild(messages.firstChild);
  }
};

showMessage = function (content, type) {
  if (typeof type == "undefined") {
    type = "info";
  }
  var messages = document.getElementById("messages");
  message = document.createElement("div");
  message.className = "ui message " + type;
  message.appendChild(document.createTextNode(content));
  messages.appendChild(message);
};

getBlocks = function (lines, prefix) {
  var blocks = [];
  var currentblock = null;
  var sublines = null;
  var regex = RegExp("^" + prefix + "(\\S.*|$)", "m");
  lines.concat([prefix]).forEach(function (line, num) {
    if (line.match(regex) !== null) {
      if(currentblock !== null) {
        currentblock.tail = sublines.join("\n") || "";
      }
      currentblock = {"head": line};
      sublines = [];
      blocks.push(currentblock);
    } else {
      if(sublines === null) {
        throw InvalidIndentationError;
      } else {
        sublines.push(line);
      }
    }
  });
  return blocks.slice(0, -1);
};

sortText = function (text, depth) {
  if (!text.length || depth == -1) return text;
  var lines = text.split("\n");
  var prefix = smallest_prefix(lines);
  var blocks = getBlocks(lines, prefix);
  var sorted = blocks.sort(function (a, b) {
    return a.head.localeCompare(b.head);
  });
  return sorted.map(function (block) {
    var tail = sortText(block.tail, depth - 1);
    tail = tail.length ? "\n" + tail : "";
    return block.head + tail;
  }).join("\n");
};

sort = function () {
  clearMessages();
  var input = document.getElementById("input").value;
  try {
    var output = sortText(input, -2);
    document.getElementById("output").value = output;
  } catch (e) {
    showMessage(e.message, "negative");
    document.getElementById("output").value = "";
  }
};

document.getElementById("input-form").addEventListener("submit", function (ev) {
  ev.preventDefault();
});
document.getElementById("input").addEventListener("keyup", sort);

showMessage("Welcome to sortr. Paste indented code (For example a YAML file) into the left pane. Given the indentation is valid, you will get a sorted output on the right.");
