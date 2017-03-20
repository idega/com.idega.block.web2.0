(function () {

var defs = {}; // id -> {dependencies, definition, instance (possibly undefined)}

// Used when there is no 'main' module.
// The name is probably (hopefully) unique so minification removes for releases.
var register_3795 = function (id) {
  var module = dem(id);
  var fragments = id.split('.');
  var target = Function('return this;')();
  for (var i = 0; i < fragments.length - 1; ++i) {
    if (target[fragments[i]] === undefined)
      target[fragments[i]] = {};
    target = target[fragments[i]];
  }
  target[fragments[fragments.length - 1]] = module;
};

var instantiate = function (id) {
  var actual = defs[id];
  var dependencies = actual.deps;
  var definition = actual.defn;
  var len = dependencies.length;
  var instances = new Array(len);
  for (var i = 0; i < len; ++i)
    instances[i] = dem(dependencies[i]);
  var defResult = definition.apply(null, instances);
  if (defResult === undefined)
     throw 'module [' + id + '] returned undefined';
  actual.instance = defResult;
};

var def = function (id, dependencies, definition) {
  if (typeof id !== 'string')
    throw 'module id must be a string';
  else if (dependencies === undefined)
    throw 'no dependencies for ' + id;
  else if (definition === undefined)
    throw 'no definition function for ' + id;
  defs[id] = {
    deps: dependencies,
    defn: definition,
    instance: undefined
  };
};

var dem = function (id) {
  var actual = defs[id];
  if (actual === undefined)
    throw 'module [' + id + '] was undefined';
  else if (actual.instance === undefined)
    instantiate(id);
  return actual.instance;
};

var req = function (ids, callback) {
  var len = ids.length;
  var instances = new Array(len);
  for (var i = 0; i < len; ++i)
    instances.push(dem(ids[i]));
  callback.apply(null, callback);
};

var ephox = {};

ephox.bolt = {
  module: {
    api: {
      define: def,
      require: req,
      demand: dem
    }
  }
};

var define = def;
var require = req;
var demand = dem;
// this helps with minificiation when using a lot of global references
var defineGlobal = function (id, ref) {
  define(id, [], function () { return ref; });
};
/*jsc
["tinymce.plugins.textpattern.Plugin","tinymce.core.dom.TreeWalker","tinymce.core.PluginManager","tinymce.core.util.Tools","tinymce.core.util.VK","global!tinymce.util.Tools.resolve"]
jsc*/
defineGlobal("global!tinymce.util.Tools.resolve", tinymce.util.Tools.resolve);
/**
 * ResolveGlobal.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.dom.TreeWalker',
  [
    'global!tinymce.util.Tools.resolve'
  ],
  function (resolve) {
    return resolve('tinymce.dom.TreeWalker');
  }
);

/**
 * ResolveGlobal.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.PluginManager',
  [
    'global!tinymce.util.Tools.resolve'
  ],
  function (resolve) {
    return resolve('tinymce.PluginManager');
  }
);

/**
 * ResolveGlobal.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.util.Tools',
  [
    'global!tinymce.util.Tools.resolve'
  ],
  function (resolve) {
    return resolve('tinymce.util.Tools');
  }
);

/**
 * ResolveGlobal.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.util.VK',
  [
    'global!tinymce.util.Tools.resolve'
  ],
  function (resolve) {
    return resolve('tinymce.util.VK');
  }
);

/**
 * Plugin.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This class contains all core logic for the code plugin.
 *
 * @class tinymce.textpattern.Plugin
 * @private
 */
define(
  'tinymce.plugins.textpattern.Plugin',
  [
    'tinymce.core.dom.TreeWalker',
    'tinymce.core.PluginManager',
    'tinymce.core.util.Tools',
    'tinymce.core.util.VK'
  ],
  function (TreeWalker, PluginManager, Tools, VK) {
    PluginManager.add('textpattern', function (editor) {
      var isPatternsDirty = true, patterns;

      patterns = editor.settings.textpattern_patterns || [
        { start: '*', end: '*', format: 'italic' },
        { start: '**', end: '**', format: 'bold' },
        { start: '#', format: 'h1' },
        { start: '##', format: 'h2' },
        { start: '###', format: 'h3' },
        { start: '####', format: 'h4' },
        { start: '#####', format: 'h5' },
        { start: '######', format: 'h6' },
        { start: '1. ', cmd: 'InsertOrderedList' },
        { start: '* ', cmd: 'InsertUnorderedList' },
        { start: '- ', cmd: 'InsertUnorderedList' }
      ];

      // Returns a sorted patterns list, ordered descending by start length
      function getPatterns() {
        if (isPatternsDirty) {
          patterns.sort(function (a, b) {
            if (a.start.length > b.start.length) {
              return -1;
            }

            if (a.start.length < b.start.length) {
              return 1;
            }

            return 0;
          });

          isPatternsDirty = false;
        }

        return patterns;
      }

      // Finds a matching pattern to the specified text
      function findPattern(text) {
        var patterns = getPatterns();

        for (var i = 0; i < patterns.length; i++) {
          if (text.indexOf(patterns[i].start) !== 0) {
            continue;
          }

          if (patterns[i].end && text.lastIndexOf(patterns[i].end) != text.length - patterns[i].end.length) {
            continue;
          }

          return patterns[i];
        }
      }

      // Finds the best matching end pattern
      function findEndPattern(text, offset, delta) {
        var patterns, pattern, i;

        // Find best matching end
        patterns = getPatterns();
        for (i = 0; i < patterns.length; i++) {
          pattern = patterns[i];
          if (pattern.end && text.substr(offset - pattern.end.length - delta, pattern.end.length) == pattern.end) {
            return pattern;
          }
        }
      }

      // Handles inline formats like *abc* and **abc**
      function applyInlineFormat(space) {
        var selection, dom, rng, container, offset, startOffset, text, patternRng, pattern, delta, format;

        function splitContainer() {
          // Split text node and remove start/end from text node
          container = container.splitText(startOffset);
          container.splitText(offset - startOffset - delta);
          container.deleteData(0, pattern.start.length);
          container.deleteData(container.data.length - pattern.end.length, pattern.end.length);
        }

        selection = editor.selection;
        dom = editor.dom;

        if (!selection.isCollapsed()) {
          return;
        }

        rng = selection.getRng(true);
        container = rng.startContainer;
        offset = rng.startOffset;
        text = container.data;
        delta = space ? 1 : 0;

        if (container.nodeType != 3) {
          return;
        }

        // Find best matching end
        pattern = findEndPattern(text, offset, delta);
        if (!pattern) {
          return;
        }

        // Find start of matched pattern
        // TODO: Might need to improve this if there is nested formats
        startOffset = Math.max(0, offset - delta);
        startOffset = text.lastIndexOf(pattern.start, startOffset - pattern.end.length - 1);

        if (startOffset === -1) {
          return;
        }

        // Setup a range for the matching word
        patternRng = dom.createRng();
        patternRng.setStart(container, startOffset);
        patternRng.setEnd(container, offset - delta);
        pattern = findPattern(patternRng.toString());

        if (!pattern || !pattern.end) {
          return;
        }

        // If container match doesn't have anything between start/end then do nothing
        if (container.data.length <= pattern.start.length + pattern.end.length) {
          return;
        }

        format = editor.formatter.get(pattern.format);
        if (format && format[0].inline) {
          splitContainer();
          editor.formatter.apply(pattern.format, {}, container);
          return container;
        }
      }

      // Handles block formats like ##abc or 1. abc
      function applyBlockFormat() {
        var selection, dom, container, firstTextNode, node, format, textBlockElm, pattern, walker, rng, offset;

        selection = editor.selection;
        dom = editor.dom;

        if (!selection.isCollapsed()) {
          return;
        }

        textBlockElm = dom.getParent(selection.getStart(), 'p');
        if (textBlockElm) {
          walker = new TreeWalker(textBlockElm, textBlockElm);
          while ((node = walker.next())) {
            if (node.nodeType == 3) {
              firstTextNode = node;
              break;
            }
          }

          if (firstTextNode) {
            pattern = findPattern(firstTextNode.data);
            if (!pattern) {
              return;
            }

            rng = selection.getRng(true);
            container = rng.startContainer;
            offset = rng.startOffset;

            if (firstTextNode == container) {
              offset = Math.max(0, offset - pattern.start.length);
            }

            if (Tools.trim(firstTextNode.data).length == pattern.start.length) {
              return;
            }

            if (pattern.format) {
              format = editor.formatter.get(pattern.format);
              if (format && format[0].block) {
                firstTextNode.deleteData(0, pattern.start.length);
                editor.formatter.apply(pattern.format, {}, firstTextNode);

                rng.setStart(container, offset);
                rng.collapse(true);
                selection.setRng(rng);
              }
            }

            if (pattern.cmd) {
              editor.undoManager.transact(function () {
                firstTextNode.deleteData(0, pattern.start.length);
                editor.execCommand(pattern.cmd);
              });
            }
          }
        }
      }

      function handleEnter() {
        var rng, wrappedTextNode;

        wrappedTextNode = applyInlineFormat();
        if (wrappedTextNode) {
          rng = editor.dom.createRng();
          rng.setStart(wrappedTextNode, wrappedTextNode.data.length);
          rng.setEnd(wrappedTextNode, wrappedTextNode.data.length);
          editor.selection.setRng(rng);
        }

        applyBlockFormat();
      }

      function handleSpace() {
        var wrappedTextNode, lastChar, lastCharNode, rng, dom;

        wrappedTextNode = applyInlineFormat(true);
        if (wrappedTextNode) {
          dom = editor.dom;
          lastChar = wrappedTextNode.data.slice(-1);

          // Move space after the newly formatted node
          if (/[\u00a0 ]/.test(lastChar)) {
            wrappedTextNode.deleteData(wrappedTextNode.data.length - 1, 1);
            lastCharNode = dom.doc.createTextNode(lastChar);

            if (wrappedTextNode.nextSibling) {
              dom.insertAfter(lastCharNode, wrappedTextNode.nextSibling);
            } else {
              wrappedTextNode.parentNode.appendChild(lastCharNode);
            }

            rng = dom.createRng();
            rng.setStart(lastCharNode, 1);
            rng.setEnd(lastCharNode, 1);
            editor.selection.setRng(rng);
          }
        }
      }

      editor.on('keydown', function (e) {
        if (e.keyCode == 13 && !VK.modifierPressed(e)) {
          handleEnter();
        }
      }, true);

      editor.on('keyup', function (e) {
        if (e.keyCode == 32 && !VK.modifierPressed(e)) {
          handleSpace();
        }
      });

      this.getPatterns = getPatterns;
      this.setPatterns = function (newPatterns) {
        patterns = newPatterns;
        isPatternsDirty = true;
      };
    });

    return function () { };
  }
);
dem('tinymce.plugins.textpattern.Plugin')();
})();
