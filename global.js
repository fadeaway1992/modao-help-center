var MyModule = (function () {
  'use strict';

  var fails = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  var descriptors = !fails(function () {
    return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
  });

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
  }

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  function getCjsExportFromNamespace (n) {
  	return n && n['default'] || n;
  }

  var O = 'object';
  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global_1 =
    // eslint-disable-next-line no-undef
    check(typeof globalThis == O && globalThis) ||
    check(typeof window == O && window) ||
    check(typeof self == O && self) ||
    check(typeof commonjsGlobal == O && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func
    Function('return this')();

  var isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var document$1 = global_1.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject(document$1) && isObject(document$1.createElement);

  var documentCreateElement = function (it) {
    return EXISTS ? document$1.createElement(it) : {};
  };

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine = !descriptors && !fails(function () {
    return Object.defineProperty(documentCreateElement('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var anObject = function (it) {
    if (!isObject(it)) {
      throw TypeError(String(it) + ' is not an object');
    } return it;
  };

  // `ToPrimitive` abstract operation
  // https://tc39.github.io/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var toPrimitive = function (input, PREFERRED_STRING) {
    if (!isObject(input)) return input;
    var fn, val;
    if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
    if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var nativeDefineProperty = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  var f = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPrimitive(P, true);
    anObject(Attributes);
    if (ie8DomDefine) try {
      return nativeDefineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var objectDefineProperty = {
  	f: f
  };

  var createPropertyDescriptor = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var hide = descriptors ? function (object, key, value) {
    return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var setGlobal = function (key, value) {
    try {
      hide(global_1, key, value);
    } catch (error) {
      global_1[key] = value;
    } return value;
  };

  var isPure = false;

  var shared = createCommonjsModule(function (module) {
  var SHARED = '__core-js_shared__';
  var store = global_1[SHARED] || setGlobal(SHARED, {});

  (module.exports = function (key, value) {
    return store[key] || (store[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.2.1',
    mode: isPure ? 'pure' : 'global',
    copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
  });
  });

  var hasOwnProperty = {}.hasOwnProperty;

  var has = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  var functionToString = shared('native-function-to-string', Function.toString);

  var WeakMap = global_1.WeakMap;

  var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(functionToString.call(WeakMap));

  var id = 0;
  var postfix = Math.random();

  var uid = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };

  var keys = shared('keys');

  var sharedKey = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys = {};

  var WeakMap$1 = global_1.WeakMap;
  var set, get, has$1;

  var enforce = function (it) {
    return has$1(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (nativeWeakMap) {
    var store = new WeakMap$1();
    var wmget = store.get;
    var wmhas = store.has;
    var wmset = store.set;
    set = function (it, metadata) {
      wmset.call(store, it, metadata);
      return metadata;
    };
    get = function (it) {
      return wmget.call(store, it) || {};
    };
    has$1 = function (it) {
      return wmhas.call(store, it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys[STATE] = true;
    set = function (it, metadata) {
      hide(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return has(it, STATE) ? it[STATE] : {};
    };
    has$1 = function (it) {
      return has(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has$1,
    enforce: enforce,
    getterFor: getterFor
  };
  var internalState_1 = internalState.set;
  var internalState_2 = internalState.get;
  var internalState_3 = internalState.has;
  var internalState_4 = internalState.enforce;
  var internalState_5 = internalState.getterFor;

  var redefine = createCommonjsModule(function (module) {
  var getInternalState = internalState.get;
  var enforceInternalState = internalState.enforce;
  var TEMPLATE = String(functionToString).split('toString');

  shared('inspectSource', function (it) {
    return functionToString.call(it);
  });

  (module.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    if (typeof value == 'function') {
      if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
      enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
    if (O === global_1) {
      if (simple) O[key] = value;
      else setGlobal(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple) O[key] = value;
    else hide(O, key, value);
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return typeof this == 'function' && getInternalState(this).source || functionToString.call(this);
  });
  });

  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
    // Chrome 38 Symbol has incorrect toString conversion
    // eslint-disable-next-line no-undef
    return !String(Symbol());
  });

  var Symbol$1 = global_1.Symbol;
  var store$1 = shared('wks');

  var wellKnownSymbol = function (name) {
    return store$1[name] || (store$1[name] = nativeSymbol && Symbol$1[name]
      || (nativeSymbol ? Symbol$1 : uid)('Symbol.' + name));
  };

  'use strict';


  // `RegExp.prototype.flags` getter implementation
  // https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
  var regexpFlags = function () {
    var that = anObject(this);
    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  'use strict';


  var nativeExec = RegExp.prototype.exec;
  // This always refers to the native implementation, because the
  // String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
  // which loads this file before patching the method.
  var nativeReplace = String.prototype.replace;

  var patchedExec = nativeExec;

  var UPDATES_LAST_INDEX_WRONG = (function () {
    var re1 = /a/;
    var re2 = /b*/g;
    nativeExec.call(re1, 'a');
    nativeExec.call(re2, 'a');
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  })();

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

  if (PATCH) {
    patchedExec = function exec(str) {
      var re = this;
      var lastIndex, reCopy, match, i;

      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

      match = nativeExec.call(re, str);

      if (UPDATES_LAST_INDEX_WRONG && match) {
        re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        nativeReplace.call(match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      return match;
    };
  }

  var regexpExec = patchedExec;

  'use strict';






  var SPECIES = wellKnownSymbol('species');

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
    // #replace needs built-in support for named groups.
    // #match works fine because it just return the exec results, even if it has
    // a "grops" property.
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = { a: '7' };
      return result;
    };
    return ''.replace(re, '$<a>') !== '7';
  });

  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  // Weex JS has frozen built-in prototypes, so use try / catch wrapper
  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
    var re = /(?:)/;
    var originalExec = re.exec;
    re.exec = function () { return originalExec.apply(this, arguments); };
    var result = 'ab'.split(re);
    return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
  });

  var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
    var SYMBOL = wellKnownSymbol(KEY);

    var DELEGATES_TO_SYMBOL = !fails(function () {
      // String methods call symbol-named RegEp methods
      var O = {};
      O[SYMBOL] = function () { return 7; };
      return ''[KEY](O) != 7;
    });

    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;
      re.exec = function () { execCalled = true; return null; };

      if (KEY === 'split') {
        // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.
        re.constructor = {};
        re.constructor[SPECIES] = function () { return re; };
      }

      re[SYMBOL]('');
      return !execCalled;
    });

    if (
      !DELEGATES_TO_SYMBOL ||
      !DELEGATES_TO_EXEC ||
      (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
      (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
    ) {
      var nativeRegExpMethod = /./[SYMBOL];
      var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      });
      var stringMethod = methods[0];
      var regexMethod = methods[1];

      redefine(String.prototype, KEY, stringMethod);
      redefine(RegExp.prototype, SYMBOL, length == 2
        // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
        // 21.2.5.11 RegExp.prototype[@@split](string, limit)
        ? function (string, arg) { return regexMethod.call(string, this, arg); }
        // 21.2.5.6 RegExp.prototype[@@match](string)
        // 21.2.5.9 RegExp.prototype[@@search](string)
        : function (string) { return regexMethod.call(string, this); }
      );
      if (sham) hide(RegExp.prototype[SYMBOL], 'sham', true);
    }
  };

  // `RequireObjectCoercible` abstract operation
  // https://tc39.github.io/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  // `SameValue` abstract operation
  // https://tc39.github.io/ecma262/#sec-samevalue
  var sameValue = Object.is || function is(x, y) {
    // eslint-disable-next-line no-self-compare
    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
  };

  var toString = {}.toString;

  var classofRaw = function (it) {
    return toString.call(it).slice(8, -1);
  };

  // `RegExpExec` abstract operation
  // https://tc39.github.io/ecma262/#sec-regexpexec
  var regexpExecAbstract = function (R, S) {
    var exec = R.exec;
    if (typeof exec === 'function') {
      var result = exec.call(R, S);
      if (typeof result !== 'object') {
        throw TypeError('RegExp exec method returned something other than an Object or null');
      }
      return result;
    }

    if (classofRaw(R) !== 'RegExp') {
      throw TypeError('RegExp#exec called on incompatible receiver');
    }

    return regexpExec.call(R, S);
  };

  'use strict';






  // @@search logic
  fixRegexpWellKnownSymbolLogic('search', 1, function (SEARCH, nativeSearch, maybeCallNative) {
    return [
      // `String.prototype.search` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.search
      function search(regexp) {
        var O = requireObjectCoercible(this);
        var searcher = regexp == undefined ? undefined : regexp[SEARCH];
        return searcher !== undefined ? searcher.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
      },
      // `RegExp.prototype[@@search]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
      function (regexp) {
        var res = maybeCallNative(nativeSearch, regexp, this);
        if (res.done) return res.value;

        var rx = anObject(regexp);
        var S = String(this);

        var previousLastIndex = rx.lastIndex;
        if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
        var result = regexpExecAbstract(rx, S);
        if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
        return result === null ? -1 : result.index;
      }
    ];
  });

  var es_string_search = {

  };

  'use strict';
  var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
  var f$1 = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
  } : nativePropertyIsEnumerable;

  var objectPropertyIsEnumerable = {
  	f: f$1
  };

  var split = ''.split;

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object;

  // toObject with fallback for non-array-like ES3 strings



  var toIndexedObject = function (it) {
    return indexedObject(requireObjectCoercible(it));
  };

  var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
  var f$2 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPrimitive(P, true);
    if (ie8DomDefine) try {
      return nativeGetOwnPropertyDescriptor(O, P);
    } catch (error) { /* empty */ }
    if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
  };

  var objectGetOwnPropertyDescriptor = {
  	f: f$2
  };

  var path = global_1;

  var aFunction = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn = function (namespace, method) {
    return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
      : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
  };

  var ceil = Math.ceil;
  var floor = Math.floor;

  // `ToInteger` abstract operation
  // https://tc39.github.io/ecma262/#sec-tointeger
  var toInteger = function (argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
  };

  var min = Math.min;

  // `ToLength` abstract operation
  // https://tc39.github.io/ecma262/#sec-tolength
  var toLength = function (argument) {
    return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var max = Math.max;
  var min$1 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
  var toAbsoluteIndex = function (index, length) {
    var integer = toInteger(index);
    return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
  };

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject($this);
      var length = toLength(O.length);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.includes
    includes: createMethod(true),
    // `Array.prototype.indexOf` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod(false)
  };
  var arrayIncludes_1 = arrayIncludes.includes;
  var arrayIncludes_2 = arrayIncludes.indexOf;

  var indexOf = arrayIncludes.indexOf;


  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (has(O, key = names[i++])) {
      ~indexOf(result, key) || result.push(key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys$1);
  };

  var objectGetOwnPropertyNames = {
  	f: f$3
  };

  var f$4 = Object.getOwnPropertySymbols;

  var objectGetOwnPropertySymbols = {
  	f: f$4
  };

  // all object keys, includes non-enumerable and symbols
  var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var copyConstructorProperties = function (target, source) {
    var keys = ownKeys(source);
    var defineProperty = objectDefineProperty.f;
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var replacement = /#|\.prototype\./;

  var isForced = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : typeof detection == 'function' ? fails(detection)
      : !!detection;
  };

  var normalize = isForced.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced.data = {};
  var NATIVE = isForced.NATIVE = 'N';
  var POLYFILL = isForced.POLYFILL = 'P';

  var isForced_1 = isForced;

  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global_1;
    } else if (STATIC) {
      target = global_1[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global_1[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        hide(sourceProperty, 'sham', true);
      }
      // extend global
      redefine(target, key, sourceProperty, options);
    }
  };

  // a string of all valid unicode whitespaces
  // eslint-disable-next-line max-len
  var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var whitespace = '[' + whitespaces + ']';
  var ltrim = RegExp('^' + whitespace + whitespace + '*');
  var rtrim = RegExp(whitespace + whitespace + '*$');

  // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
  var createMethod$1 = function (TYPE) {
    return function ($this) {
      var string = String(requireObjectCoercible($this));
      if (TYPE & 1) string = string.replace(ltrim, '');
      if (TYPE & 2) string = string.replace(rtrim, '');
      return string;
    };
  };

  var stringTrim = {
    // `String.prototype.{ trimLeft, trimStart }` methods
    // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
    start: createMethod$1(1),
    // `String.prototype.{ trimRight, trimEnd }` methods
    // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
    end: createMethod$1(2),
    // `String.prototype.trim` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.trim
    trim: createMethod$1(3)
  };
  var stringTrim_1 = stringTrim.start;
  var stringTrim_2 = stringTrim.end;
  var stringTrim_3 = stringTrim.trim;

  var non = '\u200B\u0085\u180E';

  // check that a method works with the correct list
  // of whitespaces and has a correct name
  var forcedStringTrimMethod = function (METHOD_NAME) {
    return fails(function () {
      return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
    });
  };

  'use strict';

  var $trim = stringTrim.trim;


  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  _export({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
    trim: function trim() {
      return $trim(this);
    }
  });

  var es_string_trim = {

  };

  // iterable DOM collections
  // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
  var domIterables = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
  };
  var domIterables_1 = domIterables.CSSRuleList;
  var domIterables_2 = domIterables.CSSStyleDeclaration;
  var domIterables_3 = domIterables.CSSValueList;
  var domIterables_4 = domIterables.ClientRectList;
  var domIterables_5 = domIterables.DOMRectList;
  var domIterables_6 = domIterables.DOMStringList;
  var domIterables_7 = domIterables.DOMTokenList;
  var domIterables_8 = domIterables.DataTransferItemList;
  var domIterables_9 = domIterables.FileList;
  var domIterables_10 = domIterables.HTMLAllCollection;
  var domIterables_11 = domIterables.HTMLCollection;
  var domIterables_12 = domIterables.HTMLFormElement;
  var domIterables_13 = domIterables.HTMLSelectElement;
  var domIterables_14 = domIterables.MediaList;
  var domIterables_15 = domIterables.MimeTypeArray;
  var domIterables_16 = domIterables.NamedNodeMap;
  var domIterables_17 = domIterables.NodeList;
  var domIterables_18 = domIterables.PaintRequestList;
  var domIterables_19 = domIterables.Plugin;
  var domIterables_20 = domIterables.PluginArray;
  var domIterables_21 = domIterables.SVGLengthList;
  var domIterables_22 = domIterables.SVGNumberList;
  var domIterables_23 = domIterables.SVGPathSegList;
  var domIterables_24 = domIterables.SVGPointList;
  var domIterables_25 = domIterables.SVGStringList;
  var domIterables_26 = domIterables.SVGTransformList;
  var domIterables_27 = domIterables.SourceBufferList;
  var domIterables_28 = domIterables.StyleSheetList;
  var domIterables_29 = domIterables.TextTrackCueList;
  var domIterables_30 = domIterables.TextTrackList;
  var domIterables_31 = domIterables.TouchList;

  var aFunction$1 = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    } return it;
  };

  // optional / simple context binding
  var bindContext = function (fn, that, length) {
    aFunction$1(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 0: return function () {
        return fn.call(that);
      };
      case 1: return function (a) {
        return fn.call(that, a);
      };
      case 2: return function (a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  // `ToObject` abstract operation
  // https://tc39.github.io/ecma262/#sec-toobject
  var toObject = function (argument) {
    return Object(requireObjectCoercible(argument));
  };

  // `IsArray` abstract operation
  // https://tc39.github.io/ecma262/#sec-isarray
  var isArray = Array.isArray || function isArray(arg) {
    return classofRaw(arg) == 'Array';
  };

  var SPECIES$1 = wellKnownSymbol('species');

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.github.io/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate = function (originalArray, length) {
    var C;
    if (isArray(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
      else if (isObject(C)) {
        C = C[SPECIES$1];
        if (C === null) C = undefined;
      }
    } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
  };

  var push = [].push;

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
  var createMethod$2 = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject($this);
      var self = indexedObject(O);
      var boundFunction = bindContext(callbackfn, that, 3);
      var length = toLength(self.length);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
      var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
      var value, result;
      for (;length > index; index++) if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
            case 3: return true;              // some
            case 5: return value;             // find
            case 6: return index;             // findIndex
            case 2: push.call(target, value); // filter
          } else if (IS_EVERY) return false;  // every
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$2(0),
    // `Array.prototype.map` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.map
    map: createMethod$2(1),
    // `Array.prototype.filter` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.filter
    filter: createMethod$2(2),
    // `Array.prototype.some` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.some
    some: createMethod$2(3),
    // `Array.prototype.every` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.every
    every: createMethod$2(4),
    // `Array.prototype.find` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.find
    find: createMethod$2(5),
    // `Array.prototype.findIndex` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$2(6)
  };
  var arrayIteration_1 = arrayIteration.forEach;
  var arrayIteration_2 = arrayIteration.map;
  var arrayIteration_3 = arrayIteration.filter;
  var arrayIteration_4 = arrayIteration.some;
  var arrayIteration_5 = arrayIteration.every;
  var arrayIteration_6 = arrayIteration.find;
  var arrayIteration_7 = arrayIteration.findIndex;

  'use strict';


  var sloppyArrayMethod = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !method || !fails(function () {
      // eslint-disable-next-line no-useless-call,no-throw-literal
      method.call(null, argument || function () { throw 1; }, 1);
    });
  };

  'use strict';
  var $forEach = arrayIteration.forEach;


  // `Array.prototype.forEach` method implementation
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  var arrayForEach = sloppyArrayMethod('forEach') ? function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  } : [].forEach;

  for (var COLLECTION_NAME in domIterables) {
    var Collection = global_1[COLLECTION_NAME];
    var CollectionPrototype = Collection && Collection.prototype;
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach) try {
      hide(CollectionPrototype, 'forEach', arrayForEach);
    } catch (error) {
      CollectionPrototype.forEach = arrayForEach;
    }
  }

  var web_domCollections_forEach = {

  };

  "use strict";







  // 进入页面后删除原生头部
  var tobeRemoved = document.querySelector('body>div:first-child');
  tobeRemoved && tobeRemoved.parentNode.removeChild(tobeRemoved); // 设置字体

  document.body.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Pingfang SC", "Microsoft Yahei", "WenQuanYi Micro Hei", sans-serif'; // 设置语言

  (function () {
    if (location.search.indexOf('lang=en') !== -1) {
      if (document.querySelector('.switch-lang .en').classList.contains('active')) return;
      document.querySelectorAll('.switch-lang a').forEach(function (element) {
        element.classList.remove('active');
      });
      document.querySelector('.switch-lang .en').classList.add('active');
    }
  })(); // 侧栏


  var addrPrifix = 'https://qiniu-test.modao.cc/';
  var cateIconAdress = {
    '设计原理': addrPrifix + 'sjyl.svg',
    '原型制作': addrPrifix + 'yxzz1.svg',
    '组件素材': addrPrifix + 'zjsc.svg',
    '交互效果': addrPrifix + 'jhxg1.svg',
    '设计稿交互': addrPrifix + 'sjgjh.svg',
    '演示分享': addrPrifix + 'ysfx.svg',
    '开发交付': addrPrifix + 'kfjf1.svg',
    '企业协作': addrPrifix + 'qyxz.svg',
    '项目管理': addrPrifix + 'khd1.svg'
  };
  var sideTree = document.querySelector('.side-tree');

  if (sideTree) {
    var tree = document.createElement('div');
    tree.innerHTML = "<div class=\"cate-wrap\"><h3 class=\"cate-name\"><img class=\"cate-title-icon\"></img><a href=\"/hc/kb/category/1031758/\">\u8BBE\u8BA1\u539F\u7406</a></h3><ul class=\"section-list\"><li class=\"section-item\"><a href=\"/hc/kb/section/1125839/\">\u8BBE\u8BA1</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125840/\">\u4EA7\u54C1</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125849/\">\u539F\u578B</a></li></ul></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><img class=\"cate-title-icon\"></img><a href=\"/hc/kb/category/1031748/\">\u539F\u578B\u5236\u4F5C</a></h3><ul class=\"section-list\"><li class=\"section-item\"><a href=\"/hc/kb/section/1125577/\">\u5FEB\u901F\u5165\u95E8</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125578/\">\u8BBE\u7F6E\u9875\u9762</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125579/\">\u7F16\u8F91\u7EC4\u4EF6</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125580/\">\u6DFB\u52A0\u8DF3\u8F6C</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125581/\">\u5176\u5B83\u64CD\u4F5C</a></li></ul></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><img class=\"cate-title-icon\"></img><a href=\"/hc/kb/category/1031749/\">\u7EC4\u4EF6\u7D20\u6750</a></h3><ul class=\"section-list\"><li class=\"section-item\"><a href=\"/hc/kb/section/1125582/\">\u57FA\u7840\u7EC4\u4EF6</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125583/\">\u5E73\u53F0\u7EC4\u4EF6</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125584/\">\u6211\u7684\u7EC4\u4EF6</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125585/\">\u56FE\u6807</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125586/\">\u6BCD\u7248</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125587/\">\u7D20\u6750\u5E93</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125588/\">\u6A21\u677F\u8D44\u6E90</a></li></ul></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><img class=\"cate-title-icon\"></img><a href=\"/hc/kb/category/1031751/\">\u4EA4\u4E92\u6548\u679C</a></h3><ul class=\"section-list\"><li class=\"section-item\"><a href=\"/hc/kb/section/1125593/\">\u72B6\u6001/\u52A8\u6001\u9762\u677F</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125594/\">\u6548\u679C\u6848\u4F8B</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125595/\">\u7F51\u9875\u5D4C\u5165</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125596/\">\u5176\u5B83\u6548\u679C</a></li></ul></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><img class=\"cate-title-icon\"></img><a href=\"/hc/kb/category/1031752/\">\u8BBE\u8BA1\u7A3F\u4EA4\u4E92</a></h3><ul class=\"section-list\"><li class=\"section-item\"><a href=\"/hc/kb/section/1125597/\">\u56FE\u7247\u8BBE\u8BA1\u7A3F</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125598/\">sketch\u8BBE\u8BA1\u7A3F</a></li></ul></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><img class=\"cate-title-icon\"></img><a href=\"/hc/kb/category/1031753/\">\u6F14\u793A/\u5206\u4EAB/\u4E0B\u8F7D</a></h3><ul class=\"section-list\"><li class=\"section-item\"><a href=\"/hc/kb/section/1125599/\">\u6F14\u793A\u9879\u76EE</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125600/\">\u5206\u4EAB\u9879\u76EE</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125601/\">\u4E0B\u8F7D\u9879\u76EE</a></li></ul></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><img class=\"cate-title-icon\"></img><a href=\"/hc/kb/category/1031754/\">\u5F00\u53D1\u4EA4\u4ED8</a></h3><ul class=\"section-list\"><li class=\"section-item\"><a href=\"/hc/kb/section/1125602/\">\u5BFC\u5165\u5207\u56FE</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125603/\">\u6807\u6CE8</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125604/\">\u5DE5\u4F5C\u6D41</a></li></ul></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><img class=\"cate-title-icon\"></img><a href=\"/hc/kb/category/1031756/\">\u9879\u76EE\u7BA1\u7406</a></h3><ul class=\"section-list\"><li class=\"section-item\"><a href=\"/hc/kb/section/1125609/\">\u521B\u5EFA/\u5220\u9664</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125610/\">\u8BBE\u7F6E</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125611/\">\u79FB\u52A8</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125612/\">\u7BA1\u7406</a></li></ul></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><img class=\"cate-title-icon\"></img><a href=\"/hc/kb/category/1031755/\">\u4F01\u4E1A\u534F\u4F5C</a></h3><ul class=\"section-list\"><li class=\"section-item\"><a href=\"/hc/kb/section/1125605/\">\u7BA1\u7406\u4F01\u4E1A</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125606/\">\u7BA1\u7406\u9879\u76EE\u7EC4</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125607/\">\u7BA1\u7406\u534F\u4F5C\u9879\u76EE</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125608/\">\u534F\u4F5C\u7F16\u8F91</a></li></ul></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><img class=\"cate-title-icon\"></img><a href=\"/hc/kb/category/1031757/\">\u5200\u53CB\u5206\u4EAB</a></h3></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><img class=\"cate-title-icon\"></img><a href=\"/hc/kb/category/1031759/\">\u57FA\u7840\u6559\u7A0B</a></h3></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><img class=\"cate-title-icon\"></img><a href=\"/hc/kb/category/1031760/\">\u4EA4\u4E92\u6559\u7A0B</a></h3></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><img class=\"cate-title-icon\"></img><a href=\"/hc/kb/category/1031761/\">\u534F\u4F5C\u6559\u7A0B</a></h3></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><img class=\"cate-title-icon\"></img><a href=\"/hc/kb/category/1031762/\">\u66F4\u65B0\u95EE\u9898</a></h3><ul class=\"section-list\"><li class=\"section-item\"><a href=\"/hc/kb/section/1125618/\">\u66F4\u65B0\u4ECB\u7ECD</a></li></ul></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><img class=\"cate-title-icon\"></img><a href=\"/hc/kb/category/1031764/\">\u4ED8\u8D39/\u53D1\u7968\u95EE\u9898</a></h3><ul class=\"section-list\"><li class=\"section-item\"><a href=\"/hc/kb/section/1125620/\">\u7248\u672C\u4ECB\u7ECD</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125621/\">\u8D2D\u4E70/\u4ED8\u8D39</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125622/\">\u7533\u8BF7\u53D1\u7968</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125623/\">\u5F00\u5177\u53D1\u7968</a></li></ul></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><img class=\"cate-title-icon\"></img><a href=\"/hc/kb/category/1031765/\">\u5E10\u53F7/\u5BC6\u7801\u95EE\u9898</a></h3><ul class=\"section-list\"><li class=\"section-item\"><a href=\"/hc/kb/section/1125726/\">\u8D26\u53F7</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125727/\">\u5BC6\u7801</a></li></ul></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><img class=\"cate-title-icon\"></img><a href=\"/hc/kb/category/1031766/\">\u4F7F\u7528\u95EE\u9898</a></h3><ul class=\"section-list\"><li class=\"section-item\"><a href=\"/hc/kb/section/1125714/\">\u7F16\u8F91\u76F8\u5173\u95EE\u9898</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125715/\">\u9879\u76EE\u76F8\u5173\u95EE\u9898</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125716/\">\u4E0B\u8F7D\u76F8\u5173\u95EE\u9898</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125717/\">\u6F14\u793A\u76F8\u5173\u95EE\u9898</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125718/\">\u534F\u4F5C\u76F8\u5173\u95EE\u9898</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125719/\">\u5176\u5B83\u95EE\u9898</a></li></ul></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><img class=\"cate-title-icon\"></img><a href=\"/hc/kb/category/1031767/\">\u5F02\u5E38\u95EE\u9898</a></h3><ul class=\"section-list\"><li class=\"section-item\"><a href=\"/hc/kb/section/1125624/\">\u6570\u636E\u4E0D\u89C1\u4E86</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125625/\">\u58A8\u5200\u6253\u4E0D\u5F00</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125626/\">\u9879\u76EE\u6253\u4E0D\u5F00</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125627/\">\u4E0B\u8F7D\u5F02\u5E38</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125628/\">\u6F14\u793A\u5206\u4EAB\u5F02\u5E38</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125629/\">\u5B89\u88C5\u5F02\u5E38</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125630/\">\u9879\u76EE\u590D\u5236\u5F02\u5E38</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125631/\">\u7F16\u8F91\u5F02\u5E38</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125632/\">\u5DE5\u4F5C\u6D41\u5F02\u5E38</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125633/\">sketch\u63D2\u4EF6\u5F02\u5E38</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125634/\">\u5176\u5B83\u5F02\u5E38</a></li></ul></div>";
    var breadcrumbs = document.querySelector('.sub-nav .breadcrumbs');
    var cate = breadcrumbs.querySelector('li:nth-child(2)').textContent.trim();
    var section = breadcrumbs.querySelector('li:nth-child(3)').textContent.trim();
    tree.querySelectorAll('.cate-wrap').forEach(function (item) {
      if (item.querySelector('h3.cate-name').textContent.trim() === cate) {
        item.querySelectorAll('ul.section-list>li').forEach(function (item) {
          if (item.textContent.trim() === section) {
            item.classList.add('active');
          }
        });
      } else {
        item.parentNode.removeChild(item);
      }
    });
    var cateTitleIcon = tree.querySelector('.cate-wrap .cate-title-icon');

    if (cateIconAdress[cate]) {
      // 有图标
      cateTitleIcon.src = cateIconAdress[cate];
    } else {
      // 没图标
      cateTitleIcon.parentNode.removeChild(cateTitleIcon);
    }

    sideTree.innerHTML = tree.innerHTML;
  } // $('.cate-wrap .cate-name').click(function(e) {
  //   let target = e.target.parentNode
  //   while (!target.classList.contains('cate-wrap')) {
  //     target = target.parentNode
  //   }
  //   target.classList.toggle('open')
  // })
  // 点击播放视频


  function playVideo(e) {
    var target = e.target;

    while (!target.classList.contains('img-wrap')) {
      target = target.parentNode;
    }

    var selector = target.dataset.play;
    var videoCover = document.querySelector("#".concat(selector));
    videoCover.style.display = 'flex';
    videoCover.querySelector('video').play();
  }

  var videos = document.querySelectorAll('.video-item .img-wrap');
  videos.length && videos.forEach(function (video) {
    video.addEventListener('click', playVideo);
  }); // 停止视频播放

  function closeVideo(e) {
    var videoBox = e.target.parentNode.parentNode;
    var video = videoBox.querySelector('video');
    video.pause();
    e.target.parentNode.parentNode.style.display = 'none';
  }

  var videoCloseIcons = document.querySelectorAll('.video-box .close-icon');
  videoCloseIcons.length && videoCloseIcons.forEach(function (button) {
    button.addEventListener('click', closeVideo);
  });
  /* 搜索结果页面 */

  if (location.href.indexOf('/search/results') !== -1) {
    var searchResultText = document.querySelector('.search-btitle').textContent;
    var regexp = /搜索到\s+(\d+)\s+条\s+"(.+)"/; // const [match, searchResultCount, keywords] = regexp.exec(searchResultText)

    var result = regexp.exec(searchResultText);
    var match = result[0];
    var searchResultCount = result[1];
    var keywords = result[2];
    document.querySelector('input[name=keyword]').value = keywords;

    if (searchResultCount === '0') {
      var footer = document.querySelector('.footer');
      footer.parentNode.removeChild(footer);
      var searchResultsList = document.querySelector('ul.search-results-list');
      searchResultsList.parentNode.removeChild(searchResultsList);
      var tobeInserted = "<h2 class=\"no-result-title\">\u62B1\u6B49,\u6CA1\u6709\u627E\u5230\u201C<span class=\"search-keyword\"></span>\u201D\u7684\u76F8\u5173\u7ED3\u679C</h2><p class=\"no-result-subtitle\">\u5C1D\u8BD5\u4FEE\u6539\u5173\u952E\u8BCD\u6216\u5C06\u60A8\u9700\u8981\u7684\u6559\u7A0B\u5177\u4F53\u5185\u5BB9<a href=\"https://jinshuju.net/f/rCYg0T\">\u544A\u8BC9\u6211\u4EEC</a>\uFF0C\u6211\u4EEC\u4F1A\u5B9A\u671F\u4F18\u5316</p><div class=\"tips-container\"><h3><img src=\"https://cdn.modao.cc/tips_icon.svg\" alt=\"\u641C\u7D22\u6280\u5DE7\" class=\"tips-icon\">\u641C\u7D22\u6280\u5DE7</h3><ul class=\"tips-list\"><li class=\"tips-items\"><span></span>\u4F7F\u7528\u66F4\u52A0\u7CBE\u7B80\u7684\u5173\u952E\u8BCD\u3002\u6BD4\u5982\u4F7F\u7528\u201C\u8F6C\u79FB\u201D\uFF0C\u800C\u4E0D\u662F\u201C\u600E\u4E48\u8F6C\u79FB\u9879\u76EE\u201D</li><li class=\"tips-items\"><span></span>\u68C0\u67E5\u662F\u5426\u6709\u9519\u522B\u5B57\u548C\u7279\u6B8A\u7B26\u53F7</li><li class=\"tips-items\"><span></span>\u5C1D\u8BD5\u6362\u4E00\u4E2A\u5173\u952E\u8BCD\u641C\u7D22\u3002\u6BD4\u5982\u641C\u7D22\u201C\u65F6\u95F4\u7EC4\u4EF6\u201D\u641C\u5230\u7684\u4E0D\u662F\u60F3\u8981\u7684\u5185\u5BB9\uFF0C\u6362\u6210\u201C\u65E5\u671F\u7EC4\u4EF6\u201D</li></ul></div>";
      var searchResultContainer = document.querySelector('section.no-result');
      searchResultContainer.innerHTML = tobeInserted;
      searchResultContainer.style.display = 'block';
      searchResultContainer.querySelector('.search-keyword').innerHTML = keywords;
    }
  }
  /* 返回顶部 */


  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  var toTop = document.getElementById('toTop');
  toTop && toTop.addEventListener('click', scrollToTop);
  /* 简单节流函数 */

  function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};

    var later = function later() {
      previous = options.leading === false ? 0 : Date.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

    return function () {
      var now = Date.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;

      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }

        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }

      return result;
    };
  }

  ;
  /* 首页 head bar 背景色 */

  var headBar = document.querySelector('#nav');

  if (location.pathname === '/hc/' || location.pathname === '/hc' || location.pathname === '/') {
    headBar.style.backgroundColor = '#FAFAFC';
  } else {
    headBar.style.backgroundColor = '#FFFFFF';
  }
  /* 侦听页面滚动 */


  function onScroll() {
    var clientHeight = window.innerHeight;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var toTop = document.getElementById('toTop');
    var headBar = document.querySelector('#nav');

    if (scrollTop === 0) {
      if (location.pathname === '/hc/' || location.pathname === '/hc' || location.pathname === '/') {
        headBar.style.backgroundColor = '#FAFAFC';
      } else {
        headBar.style.backgroundColor = '#FFFFFF';
      }

      headBar.style.boxShadow = 'none';
    } else {
      headBar.style.backgroundColor = '#FFFFFF';
      headBar.style.boxShadow = 'rgba(0,0,0,0.06) 0 6px 10px';
    }

    if (scrollTop < clientHeight) {
      toTop.style.display = 'none';
    } else {
      toTop.style.display = 'block';
    }
  }

  window.addEventListener('scroll', throttle(onScroll, 300, {
    leading: true,
    trailing: true
  }));
  /* 上一篇/下一篇 位置 */

  var nextPrevWrap = document.querySelectorAll('.next_prev_wrap');

  if (nextPrevWrap && nextPrevWrap.length === 1) {
    var articleLink = nextPrevWrap[0].querySelector('a');

    switch (articleLink.className) {
      case 'prev':
        nextPrevWrap[0].style["float"] = 'left';
        break;

      case 'next':
        nextPrevWrap[0].style["float"] = 'right';
        break;

      default:
        break;
    }
  }

  var bundle = {

  };

  return bundle;

}());
