(() => {
  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Interpolation/errors.js
  var InvalidTemplateException = class {
    constructor(text2) {
      this.text = text2;
    }
  };

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Interpolation/definition.js
  var InterpolationSym = Symbol.for("@effect/html/data/Interpolation");
  var PREFIX = "is\xB5";
  var Interpolation = {
    $: {},
    InvalidTemplateException
  };

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Placeholder/definition.js
  var GenericSym = Symbol.for("@effect/html/data/Placeholder/Generic");
  var _R = Symbol.for("@effect/html/data/Placeholder/Generic/R");

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Interpolation/operations/_internal/InternalInterpolation.js
  var _a;
  var _b;
  var InternalInterpolation = class {
    constructor(type3, template, values2) {
      this.type = type3;
      this.template = template;
      this.values = values2;
      this[_a] = InterpolationSym;
      this[_b] = GenericSym;
    }
  };
  _a = InterpolationSym, _b = GenericSym;

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Interpolation/operations/make.js
  function make(type3, template, values2) {
    return new InternalInterpolation(type3, template, values2.toArray);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/mutable/Array/from.mjs
  function from(data) {
    return Array.from(data);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/utilities/RandomPCG.mjs
  function isNothing(value) {
    return value === void 0 || value === null;
  }
  var defaultIncHi = 335903614;
  var defaultIncLo = 4150755663;
  var MUL_HI = 1481765933 >>> 0;
  var MUL_LO = 1284865837 >>> 0;
  var BIT_53 = 9007199254740992;
  var BIT_27 = 134217728;
  var RandomPCG = class {
    constructor(seedHi, seedLo, incHi, incLo) {
      if (isNothing(seedLo) && isNothing(seedHi)) {
        seedLo = Math.random() * 4294967295 >>> 0;
        seedHi = 0;
      } else if (isNothing(seedLo)) {
        seedLo = seedHi;
        seedHi = 0;
      }
      if (isNothing(incLo) && isNothing(incHi)) {
        incLo = this._state ? this._state[3] : defaultIncLo;
        incHi = this._state ? this._state[2] : defaultIncHi;
      } else if (isNothing(incLo)) {
        incLo = incHi;
        incHi = 0;
      }
      this._state = new Int32Array([0, 0, incHi >>> 0, ((incLo || 0) | 1) >>> 0]);
      this._next();
      add64(this._state, this._state[0], this._state[1], seedHi >>> 0, seedLo >>> 0);
      this._next();
      return this;
    }
    getState() {
      return [this._state[0], this._state[1], this._state[2], this._state[3]];
    }
    setState(state) {
      this._state[0] = state[0];
      this._state[1] = state[1];
      this._state[2] = state[2];
      this._state[3] = state[3] | 1;
    }
    _next() {
      const oldHi = this._state[0] >>> 0;
      const oldLo = this._state[1] >>> 0;
      mul64(this._state, oldHi, oldLo, MUL_HI, MUL_LO);
      add64(this._state, this._state[0], this._state[1], this._state[2], this._state[3]);
      let xsHi = oldHi >>> 18;
      let xsLo = (oldLo >>> 18 | oldHi << 14) >>> 0;
      xsHi = (xsHi ^ oldHi) >>> 0;
      xsLo = (xsLo ^ oldLo) >>> 0;
      const xorshifted = (xsLo >>> 27 | xsHi << 5) >>> 0;
      const rot = oldHi >>> 27;
      const rot2 = (-rot >>> 0 & 31) >>> 0;
      return (xorshifted >>> rot | xorshifted << rot2) >>> 0;
    }
    integer(max) {
      if (!max) {
        return this._next();
      }
      max = max >>> 0;
      if ((max & max - 1) === 0) {
        return this._next() & max - 1;
      }
      let num = 0;
      const skew = (-max >>> 0) % max >>> 0;
      for (num = this._next(); num < skew; num = this._next()) {
      }
      return num % max;
    }
    number() {
      const hi = (this._next() & 67108863) * 1;
      const lo = (this._next() & 134217727) * 1;
      return (hi * BIT_27 + lo) / BIT_53;
    }
  };
  function mul64(out, aHi, aLo, bHi, bLo) {
    let c1 = (aLo >>> 16) * (bLo & 65535) >>> 0;
    let c0 = (aLo & 65535) * (bLo >>> 16) >>> 0;
    let lo = (aLo & 65535) * (bLo & 65535) >>> 0;
    let hi = (aLo >>> 16) * (bLo >>> 16) + ((c0 >>> 16) + (c1 >>> 16)) >>> 0;
    c0 = c0 << 16 >>> 0;
    lo = lo + c0 >>> 0;
    if (lo >>> 0 < c0 >>> 0) {
      hi = hi + 1 >>> 0;
    }
    c1 = c1 << 16 >>> 0;
    lo = lo + c1 >>> 0;
    if (lo >>> 0 < c1 >>> 0) {
      hi = hi + 1 >>> 0;
    }
    hi = hi + Math.imul(aLo, bHi) >>> 0;
    hi = hi + Math.imul(aHi, bLo) >>> 0;
    out[0] = hi;
    out[1] = lo;
  }
  function add64(out, aHi, aLo, bHi, bLo) {
    let hi = aHi + bHi >>> 0;
    const lo = aLo + bLo >>> 0;
    if (lo >>> 0 < aLo >>> 0) {
      hi = hi + 1 | 0;
    }
    out[0] = hi;
    out[1] = lo;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/utilities/Guards.mjs
  function isDefined(value) {
    return value !== void 0;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/structure/Hash.mjs
  var isHash = isHash_1;
  var optimize = optimize_1;
  var hashUnknown = hashUnknown_1;
  var hashRandom = hashRandom_1;
  var Hash = {
    sym: /* @__PURE__ */ Symbol.for("tsplus/Hash")
  };
  function isHash_1(u) {
    return typeof u === "object" && u !== null && Hash.sym in u;
  }
  function optimize_1(n) {
    return n & 3221225471 | n >>> 1 & 1073741824;
  }
  function hashUnknown_1(arg) {
    return optimize_1(_hash(arg));
  }
  function hashArray(arr) {
    return optimize_1(_hashArray(arr));
  }
  function combine(a, b) {
    return optimize_1(_combineHash(a, b));
  }
  function hashIterator(it) {
    return optimize_1(_hashIterator(it));
  }
  function hashNumber(n) {
    return optimize_1(_hashNumber(n));
  }
  function hashString(str) {
    return optimize_1(_hashString(str));
  }
  function hashRandom_1() {
    return optimize_1(randomInt());
  }
  function isZero(value) {
    return value === null || value === void 0 || value === false;
  }
  var RANDOM = /* @__PURE__ */ new RandomPCG(/* @__PURE__ */ Math.random() * 4294967296 >>> 0);
  var CACHE = /* @__PURE__ */ new WeakMap();
  function randomInt() {
    return RANDOM.integer(2147483647);
  }
  function _hash(arg) {
    if (isZero(arg))
      return 0;
    if (typeof arg.valueOf === "function" && arg.valueOf !== Object.prototype.valueOf) {
      arg = arg.valueOf();
      if (isZero(arg))
        return 0;
    }
    switch (typeof arg) {
      case "number":
        return _hashNumber(arg);
      case "string":
        return _hashString(arg);
      case "function":
        return _hashMiscRef(arg);
      case "object":
        return _hashObject(arg);
      case "boolean":
        return arg === true ? 1 : 0;
      case "symbol":
        return _hashString(String(arg));
      case "bigint":
        return _hashString(arg.toString(10));
      case "undefined": {
        return 0;
      }
    }
  }
  function _hashArray(arr) {
    let h = 6151;
    for (let i = 0; i < arr.length; i++) {
      h = _combineHash(h, _hash(arr[i]));
    }
    return h;
  }
  function _combineHash(a, b) {
    return a * 53 ^ b;
  }
  function _hashObject(value) {
    let h = CACHE.get(value);
    if (isDefined(h))
      return h;
    if (isHash_1(value)) {
      h = value[Hash.sym]();
    } else {
      h = hashRandom_1();
    }
    CACHE.set(value, h);
    return h;
  }
  function _hashMiscRef(o) {
    let h = CACHE.get(o);
    if (isDefined(h))
      return h;
    h = randomInt();
    CACHE.set(o, h);
    return h;
  }
  function _hashIterator(it) {
    let h = 6151;
    let current;
    while (!(current = it.next()).done) {
      h = _combineHash(h, hashUnknown_1(current.value));
    }
    return h;
  }
  function _hashNumber(n) {
    if (n !== n || n === Infinity)
      return 0;
    let h = n | 0;
    if (h !== n)
      h ^= n * 4294967295;
    while (n > 4294967295)
      h ^= n /= 4294967295;
    return n;
  }
  function _hashString(str) {
    let h = 5381, i = str.length;
    while (i)
      h = h * 33 ^ str.charCodeAt(--i);
    return h;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/structure/Equals.mjs
  var Equals = {
    sym: /* @__PURE__ */ Symbol.for("tsplus/Equals")
  };
  function isEquals_1(u) {
    return isHash(u) && Equals.sym in u;
  }
  function sameValueZeroEqual_1(a, b) {
    return a === b || a !== a && b !== b;
  }
  function equals(a, b) {
    if (a === b) {
      return true;
    }
    if (!sameValueZeroEqual_1(hashUnknown(a), hashUnknown(b))) {
      return false;
    } else if (isEquals_1(a)) {
      return a[Equals.sym](b);
    } else if (isEquals_1(b)) {
      return b[Equals.sym](a);
    }
    return sameValueZeroEqual_1(a, b);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/data/Maybe/definition.mjs
  var _noneHash = /* @__PURE__ */ hashString("Maybe/None");
  var _someHash = /* @__PURE__ */ hashString("Maybe/Some");
  var None = class {
    constructor() {
      this._tag = "None";
    }
    [Equals.sym](that) {
      return that instanceof None;
    }
    [Hash.sym]() {
      return _noneHash;
    }
  };
  var Some = class {
    constructor(value) {
      this.value = value;
      this._tag = "Some";
    }
    [Equals.sym](that) {
      return that instanceof Some && equals(this.value, that.value);
    }
    [Hash.sym]() {
      return combine(_someHash, hashUnknown(this.value));
    }
  };
  var none_1 = /* @__PURE__ */ new None();
  var none = none_1;
  function emptyOf() {
    return none_1;
  }
  function some(a) {
    return new Some(a);
  }
  function isNone(fa) {
    return fa._tag === "None";
  }
  function isSome(fa) {
    return fa._tag === "Some";
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/definition/base.mjs
  var Effect = {
    $: {},
    Error: class EffectError extends Error {
      constructor(exit2, trace) {
        super();
        this.exit = exit2;
        this.trace = trace;
        this._tag = "EffectError";
      }
    }
  };
  var Base = class {
  };

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/definition/primitives.mjs
  var IFlatMap = class extends Base {
    constructor(effect2, k, trace) {
      super();
      this.effect = effect2;
      this.k = k;
      this.trace = trace;
      this._tag = "FlatMap";
    }
    apply(a) {
      return this.k(a);
    }
    unsafeLog() {
      return `${this._tag} at ${this.trace}`;
    }
  };
  var ISucceedNow = class extends Base {
    constructor(value, trace) {
      super();
      this.value = value;
      this.trace = trace;
      this._tag = "SucceedNow";
    }
    unsafeLog() {
      return `${this._tag} at ${this.trace}`;
    }
  };
  var ISucceed = class extends Base {
    constructor(effect2, trace) {
      super();
      this.effect = effect2;
      this.trace = trace;
      this._tag = "Succeed";
    }
    unsafeLog() {
      return `${this._tag} at ${this.trace}`;
    }
  };
  var ISuspend = class extends Base {
    constructor(make23, trace) {
      super();
      this.make = make23;
      this.trace = trace;
      this._tag = "Suspend";
    }
    unsafeLog() {
      return `${this._tag} at ${this.trace}`;
    }
  };
  var ISuspendWith = class extends Base {
    constructor(make23, trace) {
      super();
      this.make = make23;
      this.trace = trace;
      this._tag = "SuspendWith";
    }
    unsafeLog() {
      return `${this._tag} at ${this.trace}`;
    }
  };
  var IAsync = class extends Base {
    constructor(register, blockingOn, trace) {
      super();
      this.register = register;
      this.blockingOn = blockingOn;
      this.trace = trace;
      this._tag = "Async";
    }
    unsafeLog() {
      return `${this._tag} at ${this.trace}`;
    }
  };
  var IFold = class extends Base {
    constructor(effect2, failure, success, trace) {
      super();
      this.effect = effect2;
      this.failure = failure;
      this.success = success;
      this.trace = trace;
      this._tag = "Fold";
    }
    apply(a) {
      return this.success(a);
    }
    unsafeLog() {
      return `${this._tag} at ${this.trace}`;
    }
  };
  var IFork = class extends Base {
    constructor(effect2, scope, trace) {
      super();
      this.effect = effect2;
      this.scope = scope;
      this.trace = trace;
      this._tag = "Fork";
    }
    unsafeLog() {
      return `${this._tag} at ${this.trace}`;
    }
  };
  var IInterruptStatus = class extends Base {
    constructor(effect2, flag, trace) {
      super();
      this.effect = effect2;
      this.flag = flag;
      this.trace = trace;
      this._tag = "InterruptStatus";
    }
    unsafeLog() {
      return `${this._tag} at ${this.trace}`;
    }
  };
  var ICheckInterrupt = class extends Base {
    constructor(k, trace) {
      super();
      this.k = k;
      this.trace = trace;
      this._tag = "CheckInterrupt";
    }
    unsafeLog() {
      return `${this._tag} at ${this.trace}`;
    }
  };
  var IFail = class extends Base {
    constructor(cause, trace) {
      super();
      this.cause = cause;
      this.trace = trace;
      this._tag = "Fail";
    }
    unsafeLog() {
      return `${this._tag} at ${this.trace}`;
    }
  };
  var IDescriptor = class extends Base {
    constructor(f, trace) {
      super();
      this.f = f;
      this.trace = trace;
      this._tag = "Descriptor";
    }
    unsafeLog() {
      return `${this._tag} at ${this.trace}`;
    }
  };
  var IFiberRefModifyAll = class extends Base {
    constructor(f, trace) {
      super();
      this.f = f;
      this.trace = trace;
      this._tag = "FiberRefModifyAll";
    }
    unsafeLog() {
      return `${this._tag} at ${this.trace}`;
    }
  };
  var IFiberRefModify = class extends Base {
    constructor(fiberRef, f, trace) {
      super();
      this.fiberRef = fiberRef;
      this.f = f;
      this.trace = trace;
      this._tag = "FiberRefModify";
    }
    unsafeLog() {
      return `${this._tag} at ${this.trace}`;
    }
  };
  var IFiberRefLocally = class extends Base {
    constructor(localValue, fiberRef, effect2, trace) {
      super();
      this.localValue = localValue;
      this.fiberRef = fiberRef;
      this.effect = effect2;
      this.trace = trace;
      this._tag = "FiberRefLocally";
    }
    unsafeLog() {
      return `${this._tag} at ${this.trace}`;
    }
  };
  var IFiberRefWith = class extends Base {
    constructor(fiberRef, f, trace) {
      super();
      this.fiberRef = fiberRef;
      this.f = f;
      this.trace = trace;
      this._tag = "FiberRefWith";
    }
    unsafeLog() {
      return `${this._tag} at ${this.trace}`;
    }
  };
  var IRaceWith = class extends Base {
    constructor(left2, right2, leftWins, rightWins, trace) {
      super();
      this.left = left2;
      this.right = right2;
      this.leftWins = leftWins;
      this.rightWins = rightWins;
      this.trace = trace;
      this._tag = "RaceWith";
    }
    unsafeLog() {
      return `${this._tag} at ${this.trace}`;
    }
  };
  var IGetForkScope = class extends Base {
    constructor(f, trace) {
      super();
      this.f = f;
      this.trace = trace;
      this._tag = "GetForkScope";
    }
    unsafeLog() {
      return `${this._tag} at ${this.trace}`;
    }
  };
  var IOverrideForkScope = class extends Base {
    constructor(effect2, forkScope, trace) {
      super();
      this.effect = effect2;
      this.forkScope = forkScope;
      this.trace = trace;
      this._tag = "OverrideForkScope";
    }
    unsafeLog() {
      return `${this._tag} at ${this.trace}`;
    }
  };
  var IEnsuring = class extends Base {
    constructor(effect2, finalizer, trace) {
      super();
      this.effect = effect2;
      this.finalizer = finalizer;
      this.trace = trace;
      this._tag = "Ensuring";
    }
    unsafeLog() {
      return `${this._tag} at ${this.trace}`;
    }
  };

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/succeedNow.mjs
  function succeedNow(value, __tsplusTrace) {
    return new ISucceedNow(value, __tsplusTrace);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/mutable/Array/alloc.mjs
  function alloc(length2) {
    return new Array(length2);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/data/AtomicReference.mjs
  var AtomicReference = class {
    constructor(initial3) {
      this.initial = initial3;
      this.current = initial3;
    }
    get get() {
      return this.current;
    }
    getAndSet(value) {
      const old = this.current;
      this.set(value);
      return old;
    }
    set(value) {
      this.current = value;
    }
    compareAndSet(old, value) {
      if (this.get === old) {
        this.set(value);
        return true;
      }
      return false;
    }
  };

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/data/AtomicNumber.mjs
  var AtomicNumber = class extends AtomicReference {
    constructor(n) {
      super(n);
      this.incrementAndGet = this.incrementAndGet.bind(this);
      this.decrementAndGet = this.decrementAndGet.bind(this);
    }
    incrementAndGet() {
      this.set(this.get + 1);
      return this.get;
    }
    decrementAndGet() {
      this.set(this.get - 1);
      return this.get;
    }
    getAndIncrement() {
      const ret = this.get;
      this.set(this.get + 1);
      return ret;
    }
  };

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/exceptions/Exception.mjs
  var Exception = class {
  };

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/exceptions/IndexOutOfBounds.mjs
  var IndexOutOfBoundsTag = "IndexOutOfBounds";
  var IndexOutOfBounds = class extends Exception {
    constructor(index, min, max) {
      super();
      this.index = index;
      this.min = min;
      this.max = max;
      this._tag = IndexOutOfBoundsTag;
      this.message = `${this.index} is out of bounds (min ${this.min}, max ${this.max})`;
    }
  };

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/exceptions/NoSuchElement.mjs
  var NoSuchElementTag = "NoSuchElement";
  var NoSuchElement = class {
    constructor() {
      this._tag = NoSuchElementTag;
    }
  };

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/definition.mjs
  var _a2;
  var corresponds_ = corresponds_1;
  var BufferSize = 64;
  var ChunkTypeId = /* @__PURE__ */ Symbol.for("@tsplus/collections/Chunk");
  var alloc2 = typeof Buffer !== "undefined" ? Buffer.alloc : (n) => new Uint8Array(n);
  function isByte(u) {
    return typeof u === "number" && Number.isInteger(u) && u >= 0 && u <= 255;
  }
  var ChunkInternal = class {
    constructor() {
      this[_a2] = ChunkTypeId;
    }
    _arrayLike() {
      if (this.arrayLikeCache) {
        return this.arrayLikeCache;
      }
      const arr = this.binary ? alloc2(this.length) : alloc(this.length);
      this._copyToArray(0, arr);
      this.arrayLikeCache = arr;
      return arr;
    }
    _array() {
      if (this.arrayCache) {
        return this.arrayCache;
      }
      const arr = alloc(this.length);
      this._copyToArray(0, arr);
      this.arrayCache = arr;
      return arr;
    }
    [(_a2 = ChunkTypeId, Equals.sym)](that) {
      return isChunk_1(that) && corresponds_1(this, that, equals);
    }
    [Hash.sym]() {
      return hashIterator(this[Symbol.iterator]());
    }
    toString() {
      return `Chunk(${this._array().join(", ")})`;
    }
    toJSON() {
      return this._array();
    }
    _buckets() {
      return {
        [Symbol.iterator]: () => this._arrayLikeIterator()
      };
    }
    _reverseBuckets() {
      return {
        [Symbol.iterator]: () => this._reverseArrayLikeIterator()
      };
    }
    _reverse() {
      const arr = this._arrayLike();
      return {
        [Symbol.iterator]: () => {
          let i = arr.length - 1;
          return {
            next: () => {
              if (i >= 0 && i < arr.length) {
                const k = arr[i];
                i--;
                return {
                  value: k,
                  done: false
                };
              }
              return {
                value: arr.length,
                done: true
              };
            }
          };
        }
      };
    }
    _materialize() {
      void 0;
      switch (this._typeId) {
        case EmptyTypeId: {
          return this;
        }
        case ArrTypeId: {
          return this;
        }
        default: {
          return array_(this._arrayLike());
        }
      }
    }
    _append(a1) {
      const binary = this.binary && isByte(a1);
      const buffer = this.binary && binary ? alloc2(BufferSize) : alloc(BufferSize);
      buffer[0] = a1;
      return new AppendN(this, buffer, 1, new AtomicNumber(1), this.binary && binary);
    }
    _prepend(a1) {
      const binary = this.binary && isByte(a1);
      const buffer = this.binary && binary ? alloc2(BufferSize) : alloc(BufferSize);
      buffer[BufferSize - 1] = a1;
      return new PrependN(this, buffer, 1, new AtomicNumber(1), this.binary && binary);
    }
    _take(n) {
      void 0;
      if (n <= 0) {
        return _Empty;
      } else if (n >= this.length) {
        return this;
      } else {
        switch (this._typeId) {
          case EmptyTypeId: {
            return _Empty;
          }
          case SliceTypeId: {
            if (n >= this.length) {
              return this;
            } else {
              return new Slice(this.chunk, this.offset, n);
            }
          }
          case SingletonTypeId: {
            return this;
          }
          default: {
            return new Slice(this, 0, n);
          }
        }
      }
    }
    _concat(that) {
      void 0;
      void 0;
      if (this._typeId === EmptyTypeId) {
        return that;
      }
      if (that._typeId === EmptyTypeId) {
        return this;
      }
      if (this._typeId === AppendNTypeId) {
        const chunk = array_(this.buffer)._take(this.bufferUsed);
        return this.start._concat(chunk)._concat(that);
      }
      if (that._typeId === PrependNTypeId) {
        const chunk = array_(that.bufferUsed === 0 ? [] : that.buffer.slice(-that.bufferUsed));
        return this._concat(chunk)._concat(that.end);
      }
      const diff3 = that.depth - this.depth;
      if (Math.abs(diff3) <= 1) {
        return new Concat(this, that);
      } else if (diff3 < -1) {
        if (this.left.depth >= this.right.depth) {
          const nr = this.right._concat(that);
          return new Concat(this.left, nr);
        } else {
          const nrr = this.right.right._concat(that);
          if (nrr.depth === this.depth - 3) {
            const nr = new Concat(this.right.left, nrr);
            return new Concat(this.left, nr);
          } else {
            const nl = new Concat(this.left, this.right.left);
            return new Concat(nl, nrr);
          }
        }
      } else {
        if (this.right.depth >= that.left.depth) {
          const nl = this._concat(that.left);
          return new Concat(nl, that.right);
        } else {
          const nll = this._concat(that.left.left);
          if (nll.depth === that.depth - 3) {
            const nl = new Concat(nll, that.left.right);
            return new Concat(nl, that.right);
          } else {
            const nr = new Concat(that.left.right, that.right);
            return new Concat(nll, nr);
          }
        }
      }
    }
  };
  var EmptyTypeId = /* @__PURE__ */ Symbol.for("@effect-ts/core/collection/immutable/Chunk/Empty");
  var Empty = class extends ChunkInternal {
    constructor() {
      super();
      this.depth = 0;
      this._typeId = EmptyTypeId;
      this.left = this;
      this.right = this;
      this.binary = true;
      this.length = 0;
    }
    _get(n) {
      throw new IndexOutOfBounds(n, 0, this.length - 1);
    }
    _materialize() {
      return array_([]);
    }
    _copyToArray(_n, _array) {
    }
    [Symbol.iterator]() {
      return {
        next: () => ({
          value: 0,
          done: true
        })
      };
    }
    _arrayLikeIterator() {
      return {
        next: () => ({
          value: 0,
          done: true
        })
      };
    }
    _reverseArrayLikeIterator() {
      return {
        next: () => ({
          value: 0,
          done: true
        })
      };
    }
  };
  var _Empty = /* @__PURE__ */ new Empty();
  var AppendNTypeId = /* @__PURE__ */ Symbol.for("@effect-ts/core/collection/immutable/Chunk/AppendN");
  var AppendN = class extends ChunkInternal {
    constructor(start, buffer, bufferUsed, chain, binary) {
      super();
      this.start = start;
      this.buffer = buffer;
      this.bufferUsed = bufferUsed;
      this.chain = chain;
      this.binary = binary;
      this._typeId = AppendNTypeId;
      this.depth = 0;
      this.left = _Empty;
      this.right = _Empty;
      this.length = this.start.length + this.bufferUsed;
    }
    _get(n) {
      if (n < this.start.length) {
        return this.start._get(n);
      }
      const k = n - this.start.length;
      if (k >= this.buffer.length || k < 0) {
        throw new IndexOutOfBounds(n, 0, this.length - 1);
      }
      return this.buffer[k];
    }
    _append(a1) {
      const binary = this.binary && isByte(a1);
      if (this.bufferUsed < this.buffer.length && this.chain.compareAndSet(this.bufferUsed, this.bufferUsed + 1)) {
        if (this.binary && !binary) {
          const buffer = alloc(BufferSize);
          for (let i = 0; i < BufferSize; i++) {
            buffer[i] = this.buffer[i];
          }
          buffer[this.bufferUsed] = a1;
          return new AppendN(this.start, buffer, this.bufferUsed + 1, this.chain, this.binary && binary);
        }
        this.buffer[this.bufferUsed] = a1;
        return new AppendN(this.start, this.buffer, this.bufferUsed + 1, this.chain, this.binary && binary);
      } else {
        const buffer = this.binary && binary ? alloc2(BufferSize) : alloc(BufferSize);
        buffer[0] = a1;
        const chunk = array_(this.buffer)._take(this.bufferUsed);
        return new AppendN(this.start._concat(chunk), buffer, 1, new AtomicNumber(1), this.binary && binary);
      }
    }
    _copyToArray(n, array) {
      this.start._copyToArray(n, array);
      _copy(this.buffer, 0, array, this.start.length + n, this.bufferUsed);
    }
    [Symbol.iterator]() {
      const k = this._arrayLike();
      return k[Symbol.iterator]();
    }
    _arrayLikeIterator() {
      const array = this._arrayLike();
      let done6 = false;
      return {
        next: () => {
          if (!done6) {
            done6 = true;
            return {
              value: array,
              done: false
            };
          } else {
            return {
              value: 1,
              done: true
            };
          }
        }
      };
    }
    _reverseArrayLikeIterator() {
      const array = this._arrayLike();
      let done6 = false;
      return {
        next: () => {
          if (!done6) {
            done6 = true;
            return {
              value: array,
              done: false
            };
          } else {
            return {
              value: 1,
              done: true
            };
          }
        }
      };
    }
  };
  var ArrTypeId = /* @__PURE__ */ Symbol.for("@effect-ts/core/collection/immutable/Chunk/Arr");
  var Arr = class extends ChunkInternal {
    constructor() {
      super(...arguments);
      this._typeId = ArrTypeId;
    }
  };
  var PlainArr = class extends Arr {
    constructor(array) {
      super();
      this.array = array;
      this.depth = 0;
      this.left = _Empty;
      this.right = _Empty;
      this.length = array.length;
    }
    get binary() {
      if (typeof this.isBytes !== "undefined") {
        return this.isBytes;
      }
      this.isBytes = this.array.every(isByte);
      return this.isBytes;
    }
    _get(n) {
      if (n >= this.length || n < 0) {
        throw new IndexOutOfBounds(n, 0, this.length - 1);
      }
      return this.array[n];
    }
    _arrayLike() {
      if (!this.binary) {
        return this.array;
      }
      if (this.arrayLikeCache) {
        return this.arrayLikeCache;
      }
      const arr = alloc2(this.length);
      this._copyToArray(0, arr);
      this.arrayLikeCache = arr;
      return arr;
    }
    _array() {
      return this.array;
    }
    _materialize() {
      return this;
    }
    _copyToArray(n, array) {
      _copy(this.array, 0, array, n, this.length);
    }
    [Symbol.iterator]() {
      return this.array[Symbol.iterator]();
    }
    _arrayLikeIterator() {
      let done6 = false;
      return {
        next: () => {
          if (!done6) {
            done6 = true;
            return {
              value: this.array,
              done: false
            };
          } else {
            return {
              value: 1,
              done: true
            };
          }
        }
      };
    }
    _reverseArrayLikeIterator() {
      let done6 = false;
      return {
        next: () => {
          if (!done6) {
            done6 = true;
            return {
              value: this.array,
              done: false
            };
          } else {
            return {
              value: 1,
              done: true
            };
          }
        }
      };
    }
  };
  var Uint8Arr = class extends Arr {
    constructor(array) {
      super();
      this.array = array;
      this.depth = 0;
      this.left = _Empty;
      this.right = _Empty;
      this.binary = true;
      this.length = array.length;
    }
    _arrayLike() {
      return this.array;
    }
    _get(n) {
      if (n >= this.length || n < 0) {
        throw new IndexOutOfBounds(n, 0, this.length - 1);
      }
      return this.array[n];
    }
    _materialize() {
      return this;
    }
    _copyToArray(n, array) {
      _copy(this.array, 0, array, n, this.length);
    }
    [Symbol.iterator]() {
      return this.array[Symbol.iterator]();
    }
    _arrayLikeIterator() {
      let done6 = false;
      return {
        next: () => {
          if (!done6) {
            done6 = true;
            return {
              value: this.array,
              done: false
            };
          } else {
            return {
              value: 1,
              done: true
            };
          }
        }
      };
    }
    _reverseArrayLikeIterator() {
      let done6 = false;
      return {
        next: () => {
          if (!done6) {
            done6 = true;
            return {
              value: this.array,
              done: false
            };
          } else {
            return {
              value: 1,
              done: true
            };
          }
        }
      };
    }
  };
  var SliceTypeId = /* @__PURE__ */ Symbol.for("@effect-ts/core/collection/immutable/Chunk/Slice");
  var Slice = class extends ChunkInternal {
    constructor(chunk, offset, length2) {
      super();
      this.chunk = chunk;
      this.offset = offset;
      this.length = length2;
      this.depth = 0;
      this.left = _Empty;
      this.right = _Empty;
      this._typeId = SliceTypeId;
      this.binary = this.chunk.binary;
    }
    _get(n) {
      return this.chunk._get(n + this.offset);
    }
    _copyToArray(n, array) {
      let i = 0;
      let j = n;
      while (i < this.length) {
        array[j] = this._get(i);
        i += 1;
        j += 1;
      }
    }
    [Symbol.iterator]() {
      const k = this._arrayLike();
      return k[Symbol.iterator]();
    }
    _arrayLikeIterator() {
      const array = this._arrayLike();
      let done6 = false;
      return {
        next: () => {
          if (!done6) {
            done6 = true;
            return {
              value: array,
              done: false
            };
          } else {
            return {
              value: 1,
              done: true
            };
          }
        }
      };
    }
    _reverseArrayLikeIterator() {
      const array = this._arrayLike();
      let done6 = false;
      return {
        next: () => {
          if (!done6) {
            done6 = true;
            return {
              value: array,
              done: false
            };
          } else {
            return {
              value: 1,
              done: true
            };
          }
        }
      };
    }
  };
  var SingletonTypeId = /* @__PURE__ */ Symbol.for("@effect-ts/core/collection/immutable/Chunk/Singleton");
  var Singleton = class extends ChunkInternal {
    constructor(a) {
      super();
      this.a = a;
      this.depth = 0;
      this.left = _Empty;
      this.right = _Empty;
      this.length = 1;
      this._typeId = SingletonTypeId;
      this.binary = isByte(a);
    }
    _get(n) {
      if (n === 0) {
        return this.a;
      }
      throw new IndexOutOfBounds(n, 0, this.length - 1);
    }
    _copyToArray(n, array) {
      array[n] = this.a;
    }
    [Symbol.iterator]() {
      const k = this._arrayLike();
      return k[Symbol.iterator]();
    }
    _arrayLikeIterator() {
      let done6 = false;
      return {
        next: () => {
          if (!done6) {
            done6 = true;
            return {
              value: this._arrayLike(),
              done: false
            };
          } else {
            return {
              value: 1,
              done: true
            };
          }
        }
      };
    }
    _reverseArrayLikeIterator() {
      let done6 = false;
      return {
        next: () => {
          if (!done6) {
            done6 = true;
            return {
              value: this._arrayLike(),
              done: false
            };
          } else {
            return {
              value: 1,
              done: true
            };
          }
        }
      };
    }
  };
  var PrependNTypeId = /* @__PURE__ */ Symbol.for("@effect-ts/core/collection/immutable/Chunk/PrependN");
  var PrependN = class extends ChunkInternal {
    constructor(end, buffer, bufferUsed, chain, binary) {
      super();
      this.end = end;
      this.buffer = buffer;
      this.bufferUsed = bufferUsed;
      this.chain = chain;
      this.binary = binary;
      this.depth = 0;
      this.left = _Empty;
      this.right = _Empty;
      this._typeId = PrependNTypeId;
      this.length = this.end.length + this.bufferUsed;
    }
    _get(n) {
      if (n < this.bufferUsed) {
        const k = BufferSize - this.bufferUsed + n;
        if (k >= this.buffer.length || k < 0) {
          throw new IndexOutOfBounds(n, 0, this.length - 1);
        }
        return this.buffer[k];
      }
      return this.end._get(n - this.bufferUsed);
    }
    _copyToArray(n, array) {
      const length2 = Math.min(this.bufferUsed, Math.max(array.length - n, 0));
      _copy(this.buffer, BufferSize - this.bufferUsed, array, n, length2);
      this.end._copyToArray(n + length2, array);
    }
    prepend(a1) {
      const binary = this.binary && isByte(a1);
      if (this.bufferUsed < this.buffer.length && this.chain.compareAndSet(this.bufferUsed, this.bufferUsed + 1)) {
        if (this.binary && !binary) {
          const buffer = alloc(BufferSize);
          for (let i = 0; i < BufferSize; i++) {
            buffer[i] = this.buffer[i];
          }
          buffer[BufferSize - this.bufferUsed - 1] = a1;
          return new PrependN(this.end, buffer, this.bufferUsed + 1, this.chain, false);
        }
        this.buffer[BufferSize - this.bufferUsed - 1] = a1;
        return new PrependN(this.end, this.buffer, this.bufferUsed + 1, this.chain, this.binary && binary);
      } else {
        const buffer = binary ? alloc2(BufferSize) : alloc(BufferSize);
        buffer[BufferSize - 1] = a1;
        const chunk = array_("subarray" in this.buffer ? this.buffer.subarray(this.buffer.length - this.bufferUsed) : this.buffer.slice(this.buffer.length - this.bufferUsed));
        return new PrependN(chunk._concat(this.end), buffer, 1, new AtomicNumber(1), this.binary && binary);
      }
    }
    [Symbol.iterator]() {
      const k = this._arrayLike();
      return k[Symbol.iterator]();
    }
    _arrayLikeIterator() {
      let done6 = false;
      return {
        next: () => {
          if (!done6) {
            done6 = true;
            return {
              value: this._arrayLike(),
              done: false
            };
          } else {
            return {
              value: 1,
              done: true
            };
          }
        }
      };
    }
    _reverseArrayLikeIterator() {
      let done6 = false;
      return {
        next: () => {
          if (!done6) {
            done6 = true;
            return {
              value: this._arrayLike(),
              done: false
            };
          } else {
            return {
              value: 1,
              done: true
            };
          }
        }
      };
    }
  };
  function _copy(src, srcPos, dest, destPos, len) {
    for (let i = srcPos; i < Math.min(src.length, srcPos + len); i++) {
      dest[destPos + i - srcPos] = src[i];
    }
    return dest;
  }
  var ConcatTypeId = /* @__PURE__ */ Symbol.for("@effect-ts/core/collection/immutable/Chunk/Concat");
  var Concat = class extends ChunkInternal {
    constructor(left2, right2) {
      super();
      this.left = left2;
      this.right = right2;
      this._typeId = ConcatTypeId;
      this.depth = 1 + Math.max(this.left.depth, this.right.depth);
      this.length = this.left.length + this.right.length;
      this.binary = this.left.binary && this.right.binary;
    }
    _get(n) {
      return n < this.left.length ? this.left._get(n) : this.right._get(n - this.left.length);
    }
    _copyToArray(n, array) {
      this.left._copyToArray(n, array);
      this.right._copyToArray(n + this.left.length, array);
    }
    [Symbol.iterator]() {
      const k = this._arrayLike();
      return k[Symbol.iterator]();
    }
    _arrayLikeIterator() {
      let it = this.left._arrayLikeIterator();
      let i = 0;
      let n = it.next();
      let j = 0;
      return {
        next: () => {
          j++;
          if (i === 0 && n.done) {
            it = this.right._arrayLikeIterator();
            const k = it.next();
            if (k.done) {
              return {
                value: j,
                done: true
              };
            }
            i++;
            n = it.next();
            return k;
          } else {
            if (n.done) {
              return {
                value: j,
                done: true
              };
            }
            const k = n;
            n = it.next();
            return k;
          }
        }
      };
    }
    _reverseArrayLikeIterator() {
      let it = this.right._arrayLikeIterator();
      let i = 0;
      let n = it.next();
      let j = 0;
      return {
        next: () => {
          j++;
          if (i === 0 && n.done) {
            it = this.left._arrayLikeIterator();
            const k = it.next();
            if (k.done) {
              return {
                value: j,
                done: true
              };
            }
            i++;
            n = it.next();
            return k;
          } else {
            if (n.done) {
              return {
                value: j,
                done: true
              };
            }
            const k = n;
            n = it.next();
            return k;
          }
        }
      };
    }
  };
  function isChunk_1(u) {
    return typeof u === "object" && u != null && ChunkTypeId in u;
  }
  function array_(array) {
    if (isChunk_1(array)) {
      void 0;
      return array;
    }
    if (array instanceof Uint8Array) {
      return new Uint8Arr(array);
    }
    return new PlainArr(Array.isArray(array) ? array : Array.from(array));
  }
  function from2(array) {
    return array_(array);
  }
  function corresponds_1(self2, that, f) {
    if (self2.length !== that.length) {
      return false;
    }
    const leftIterator = self2._arrayLikeIterator();
    const rightIterator = that._arrayLikeIterator();
    let i = 0;
    let j = 0;
    let equal = true;
    let done6 = false;
    let leftLength = 0;
    let rightLength = 0;
    let left2 = void 0;
    let right2 = void 0;
    let leftNext;
    let rightNext;
    while (equal && !done6) {
      if (i < leftLength && j < rightLength) {
        if (!f(left2[i], right2[j])) {
          equal = false;
        }
        i++;
        j++;
      } else if (i === leftLength && (leftNext = leftIterator.next()) && !leftNext.done) {
        left2 = leftNext.value;
        leftLength = left2.length;
        i = 0;
      } else if (j === rightLength && (rightNext = rightIterator.next()) && !rightNext.done) {
        right2 = rightNext.value;
        rightLength = right2.length;
        j = 0;
      } else if (i === leftLength && j === rightLength) {
        done6 = true;
      } else {
        equal = false;
      }
    }
    return equal;
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/flatMap.mjs
  function flatMap_(self2, f, __tsplusTrace) {
    return new IFlatMap(self2, f, __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/map.mjs
  function map_(self2, f, __tsplusTrace) {
    return flatMap_(self2, (a) => succeedNow(f(a), __tsplusTrace), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/suspendSucceed.mjs
  function suspendSucceed(effect2, __tsplusTrace) {
    return new ISuspend(effect2, __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/succeed.mjs
  function succeed(f, __tsplusTrace) {
    return new ISucceed(f, __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/zipRight.mjs
  function zipRight_(self2, that, __tsplusTrace) {
    return flatMap_(self2, that, __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/unit.mjs
  var fileName_1 = "(@effect/core) _src/io/Effect/operations/unit.ts";
  var unit_1 = /* @__PURE__ */ succeedNow(void 0, fileName_1 + ":6:66");
  var unit = unit_1;
  function unit_(self2, __tsplusTrace) {
    return zipRight_(self2, () => unit_1, __tsplusTrace);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/data/Maybe/fold.mjs
  function fold_(ma, onNone, onSome) {
    return isNone(ma) ? onNone() : onSome(ma.value);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/data/Function.mjs
  function constFalse() {
    return false;
  }
  function constVoid() {
    return;
  }
  function identity(a) {
    return a;
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberRef/definition.mjs
  var FiberRefSym = /* @__PURE__ */ Symbol.for("@effect/core/io/FiberRef");

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberRef/operations/_internal/FiberRefInternal.mjs
  var _a3;
  var FiberRefInternal = class {
    constructor(_initial, _diff, _combine, _patch, _fork) {
      this._initial = _initial;
      this._diff = _diff;
      this._combine = _combine;
      this._patch = _patch;
      this._fork = _fork;
      this[_a3] = FiberRefSym;
    }
  };
  _a3 = FiberRefSym;

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberRef/operations/unsafeMakePatch.mjs
  function unsafeMakePatch(initial3, diff3, combine3, patch, fork) {
    return new FiberRefInternal(initial3, diff3, combine3, patch, fork);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberRef/operations/unsafeMake.mjs
  function unsafeMake(initial3, fork = identity, join2 = (_, a) => a) {
    return unsafeMakePatch(initial3, (_, newValue) => () => newValue, (first, second) => (value) => second(first(value)), (patch) => (value) => join2(value, patch(value)), fork);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/data/LazyValue.mjs
  var LazyValue = class {
    constructor(__lazy) {
      this.__lazy = __lazy;
    }
    get value() {
      const computed = this.__lazy();
      Object.defineProperty(this, "value", {
        value: computed
      });
      return computed;
    }
  };
  LazyValue.make = (f) => new LazyValue(f);

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberRef/operations/currentParallelism.mjs
  var currentParallelism = /* @__PURE__ */ LazyValue.make(() => unsafeMake(none));

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/data/Tuple/definition.mjs
  var _a4;
  var TupleSym = /* @__PURE__ */ Symbol.for("tsplus/Tuple");
  var Tuple = class {
    constructor(tuple) {
      this.tuple = tuple;
      this[_a4] = TupleSym;
    }
    [(_a4 = TupleSym, Symbol.iterator)]() {
      return this.tuple[Symbol.iterator]();
    }
    [Hash.sym]() {
      return hashArray(this.tuple);
    }
    [Equals.sym](that) {
      if (isTuple_1(that)) {
        return this.tuple.length === that.tuple.length && this.tuple.every((v, i) => equals(v, that.tuple[i]));
      }
      return false;
    }
    get(i) {
      return this.tuple[i];
    }
  };
  function isTuple_1(self2) {
    return typeof self2 === "object" && self2 != null && TupleSym in self2;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/data/Tuple/make.mjs
  function make2(...args) {
    return new Tuple(args);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberRef/operations/modify.mjs
  function modify_(self2, f, __tsplusTrace) {
    return new IFiberRefModify(self2, f, __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberRef/operations/get.mjs
  function get(self2, __tsplusTrace) {
    return modify_(self2, (a) => make2(a, a), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberRef/operations/getWith.mjs
  function getWith_(self2, f, __tsplusTrace) {
    return new IFiberRefWith(self2, f, __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberRef/operations/locally.mjs
  function locally_(self2, value, __tsplusTrace) {
    return (use) => new IFiberRefLocally(value, self2, use, __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/parallelism.mjs
  function parallelismWith(f, __tsplusTrace) {
    return getWith_(currentParallelism.value, f, __tsplusTrace);
  }
  function withParallelism_(self2, n, __tsplusTrace) {
    return suspendSucceed(() => locally_(currentParallelism.value, some(n), __tsplusTrace)(self2), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Collection/functions.mjs
  var map_2 = map_1;
  function* genMap(iterator, mapping) {
    let n = -1;
    while (true) {
      const result = iterator.next();
      if (result.done) {
        break;
      }
      n += 1;
      yield mapping(result.value, n);
    }
  }
  function map_1(i, f) {
    return {
      [Symbol.iterator]: () => genMap(i[Symbol.iterator](), f)
    };
  }
  function skip_(a, n) {
    return {
      *[Symbol.iterator]() {
        let i = 0;
        for (const x of a) {
          if (i++ >= n) {
            yield x;
          }
        }
      }
    };
  }
  var never = {
    *[Symbol.iterator]() {
    }
  };
  function reduce_(self2, b, f) {
    let res = b;
    const iterator = self2[Symbol.iterator]();
    while (true) {
      const result = iterator.next();
      if (result.done) {
        break;
      }
      res = f(res, result.value);
    }
    return res;
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Cause/errors.mjs
  var _a5;
  var _b2;
  var _c;
  var _d;
  var _e;
  var _f;
  var FiberFailureSymbol = /* @__PURE__ */ Symbol.for("@effect/core/Cause/errors/FiberFailure");
  _a5 = FiberFailureSymbol;
  var RuntimeErrorSymbol = /* @__PURE__ */ Symbol.for("@effect/core/Cause/errors/Runtime");
  var RuntimeError = class {
    constructor(message) {
      this.message = message;
      this[_b2] = "RuntimeError";
    }
  };
  _b2 = RuntimeErrorSymbol;
  var ChannelErrorSymbol = /* @__PURE__ */ Symbol.for("@effect/core/Cause/errors/Channel");
  _c = ChannelErrorSymbol;
  var InterruptedSymbol = /* @__PURE__ */ Symbol.for("@effect/core/Cause/errors/Interrupted");
  var InterruptedException = class extends Error {
    constructor(message) {
      super(message);
      this[_d] = "InterruptedException";
      this.name = this[InterruptedSymbol];
    }
  };
  _d = InterruptedSymbol;
  var IllegalStateExceptionSymbol = /* @__PURE__ */ Symbol.for("@effect/core/Cause/errors/IllegalState");
  var IllegalStateException = class extends Error {
    constructor(message) {
      super(message);
      this[_e] = "IllegalStateException";
      this.name = this[IllegalStateExceptionSymbol];
    }
  };
  _e = IllegalStateExceptionSymbol;
  var IllegalArgumentExceptionSymbol = /* @__PURE__ */ Symbol.for("@effect/core/Cause/errors/IllegalArgument");
  var IllegalArgumentException = class extends Error {
    constructor(message) {
      super(message);
      this[_f] = "IllegalArgumentException";
      this.name = this[IllegalArgumentExceptionSymbol];
    }
  };
  _f = IllegalArgumentExceptionSymbol;

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/data/Stack.mjs
  var Stack = class {
    constructor(value, previous) {
      this.value = value;
      this.previous = previous;
    }
  };

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/io/Eval/run.mjs
  function run(self2) {
    let stack = void 0;
    let a = void 0;
    let curIO = self2;
    while (curIO != null) {
      switch (curIO._tag) {
        case "FlatMap": {
          switch (curIO.value._tag) {
            case "Succeed": {
              curIO = curIO.cont(curIO.value.a());
              break;
            }
            default: {
              stack = new Stack(curIO.cont, stack);
              curIO = curIO.value;
            }
          }
          break;
        }
        case "Suspend": {
          curIO = curIO.f();
          break;
        }
        case "Succeed": {
          a = curIO.a();
          if (stack) {
            curIO = stack.value(a);
            stack = stack.previous;
          } else {
            curIO = void 0;
          }
          break;
        }
      }
    }
    return a;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/io/Eval/definition.mjs
  var _a6;
  var _b3;
  var _c2;
  var EvalSym = /* @__PURE__ */ Symbol.for("@tsplus/stdlib/io/Eval");
  var Succeed = class {
    constructor(a) {
      this.a = a;
      this._tag = "Succeed";
      this[_a6] = EvalSym;
    }
  };
  _a6 = EvalSym;
  var Suspend = class {
    constructor(f) {
      this.f = f;
      this._tag = "Suspend";
      this[_b3] = EvalSym;
    }
  };
  _b3 = EvalSym;
  var FlatMap = class {
    constructor(value, cont) {
      this.value = value;
      this.cont = cont;
      this._tag = "FlatMap";
      this[_c2] = EvalSym;
    }
  };
  _c2 = EvalSym;

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/io/Eval/succeed.mjs
  function succeed2(a) {
    return new Succeed(a);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/io/Eval/suspend.mjs
  function suspend(f) {
    return new Suspend(f);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/io/Eval/flatMap.mjs
  function flatMap_2(self2, f) {
    return new FlatMap(self2, f);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/io/Eval/map.mjs
  function map_3(self2, f) {
    return flatMap_2(self2, (a) => succeed2(() => f(a)));
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/io/Eval/zipWith.mjs
  function zipWith_(self2, that, f) {
    return flatMap_2(self2, (a) => map_3(that(), (b) => f(a, b)));
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/io/Eval/gen.mjs
  var GenEval = class {
    constructor(io) {
      this.io = io;
    }
    *[Symbol.iterator]() {
      return yield this;
    }
  };
  function adapter(_) {
    return new GenEval(_);
  }
  function run_(state, iterator) {
    if (state.done) {
      return succeed2(() => state.value);
    }
    return flatMap_2(state.value["io"], (val) => {
      const next2 = iterator.next(val);
      return run_(next2, iterator);
    });
  }
  function gen(f) {
    return suspend(() => {
      const iterator = f(adapter);
      const state = iterator.next();
      return run_(state, iterator);
    });
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashMap/definition.mjs
  var HashMapSym = /* @__PURE__ */ Symbol.for("@tsplus/stdlib/collection/HashMap");
  function isHashMap(u) {
    return typeof u === "object" && u != null && HashMapSym in u;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashMap/_internal/config.mjs
  var SIZE = 5;
  var BUCKET_SIZE = /* @__PURE__ */ Math.pow(2, SIZE);
  var MASK = BUCKET_SIZE - 1;
  var MAX_INDEX_NODE = BUCKET_SIZE / 2;
  var MIN_ARRAY_NODE = BUCKET_SIZE / 4;

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashMap/_internal/bitwise.mjs
  function popcount(x) {
    x -= x >> 1 & 1431655765;
    x = (x & 858993459) + (x >> 2 & 858993459);
    x = x + (x >> 4) & 252645135;
    x += x >> 8;
    x += x >> 16;
    return x & 127;
  }
  function hashFragment(shift, h) {
    return h >>> shift & MASK;
  }
  function toBitmap(x) {
    return 1 << x;
  }
  function fromBitmap(bitmap, bit) {
    return popcount(bitmap & bit - 1);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashMap/_internal/array.mjs
  function arrayUpdate(mutate, at, v, arr) {
    let out = arr;
    if (!mutate) {
      const len = arr.length;
      out = alloc(len);
      for (let i = 0; i < len; ++i)
        out[i] = arr[i];
    }
    out[at] = v;
    return out;
  }
  function arraySpliceOut(mutate, at, arr) {
    const newLen = arr.length - 1;
    let i = 0;
    let g = 0;
    let out = arr;
    if (mutate) {
      i = g = at;
    } else {
      out = alloc(newLen);
      while (i < at)
        out[g++] = arr[i++];
    }
    ;
    ++i;
    while (i <= newLen)
      out[g++] = arr[i++];
    if (mutate) {
      out.length = newLen;
    }
    return out;
  }
  function arraySpliceIn(mutate, at, v, arr) {
    const len = arr.length;
    if (mutate) {
      let i2 = len;
      while (i2 >= at)
        arr[i2--] = arr[i2];
      arr[at] = v;
      return arr;
    }
    let i = 0, g = 0;
    const out = alloc(len + 1);
    while (i < at)
      out[g++] = arr[i++];
    out[at] = v;
    while (i < len)
      out[++g] = arr[i++];
    return out;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashMap/_internal/node.mjs
  var EmptyNode = class {
    constructor() {
      this._tag = "EmptyNode";
    }
    modify(edit, _shift, f, hash, key, size5) {
      const v = f(none);
      if (isNone(v))
        return new EmptyNode();
      ++size5.value;
      return new LeafNode(edit, hash, key, v);
    }
  };
  function isEmptyNode(a) {
    return a instanceof EmptyNode;
  }
  function isLeafNode(node) {
    return isEmptyNode(node) || node._tag === "LeafNode" || node._tag === "CollisionNode";
  }
  function canEditNode(node, edit) {
    return isEmptyNode(node) ? false : edit === node.edit;
  }
  var LeafNode = class {
    constructor(edit, hash, key, value) {
      this.edit = edit;
      this.hash = hash;
      this.key = key;
      this.value = value;
      this._tag = "LeafNode";
    }
    modify(edit, shift, f, hash, key, size5) {
      if (equals(key, this.key)) {
        const v2 = f(this.value);
        if (v2 === this.value)
          return this;
        else if (isNone(v2)) {
          ;
          --size5.value;
          return new EmptyNode();
        }
        if (canEditNode(this, edit)) {
          this.value = v2;
          return this;
        }
        return new LeafNode(edit, hash, key, v2);
      }
      const v = f(none);
      if (isNone(v))
        return this;
      ++size5.value;
      return mergeLeaves(edit, shift, this.hash, this, hash, new LeafNode(edit, hash, key, v));
    }
  };
  var CollisionNode = class {
    constructor(edit, hash, children) {
      this.edit = edit;
      this.hash = hash;
      this.children = children;
      this._tag = "CollisionNode";
    }
    modify(edit, shift, f, hash, key, size5) {
      if (hash === this.hash) {
        const canEdit = canEditNode(this, edit);
        const list = this.updateCollisionList(canEdit, edit, this.hash, this.children, f, key, size5);
        if (list === this.children)
          return this;
        return list.length > 1 ? new CollisionNode(edit, this.hash, list) : list[0];
      }
      const v = f(none);
      if (isNone(v))
        return this;
      ++size5.value;
      return mergeLeaves(edit, shift, this.hash, this, hash, new LeafNode(edit, hash, key, v));
    }
    updateCollisionList(mutate, edit, hash, list, f, key, size5) {
      const len = list.length;
      for (let i = 0; i < len; ++i) {
        const child = list[i];
        if ("key" in child && equals(key, child.key)) {
          const value = child.value;
          const newValue2 = f(value);
          if (newValue2 === value)
            return list;
          if (isNone(newValue2)) {
            ;
            --size5.value;
            return arraySpliceOut(mutate, i, list);
          }
          return arrayUpdate(mutate, i, new LeafNode(edit, hash, key, newValue2), list);
        }
      }
      const newValue = f(none);
      if (isNone(newValue))
        return list;
      ++size5.value;
      return arrayUpdate(mutate, len, new LeafNode(edit, hash, key, newValue), list);
    }
  };
  var IndexedNode = class {
    constructor(edit, mask, children) {
      this.edit = edit;
      this.mask = mask;
      this.children = children;
      this._tag = "IndexedNode";
    }
    modify(edit, shift, f, hash, key, size5) {
      const mask = this.mask;
      const children = this.children;
      const frag = hashFragment(shift, hash);
      const bit = toBitmap(frag);
      const indx = fromBitmap(mask, bit);
      const exists = mask & bit;
      const current = exists ? children[indx] : new EmptyNode();
      const child = current.modify(edit, shift + SIZE, f, hash, key, size5);
      if (current === child)
        return this;
      const canEdit = canEditNode(this, edit);
      let bitmap = mask;
      let newChildren;
      if (exists && isEmptyNode(child)) {
        bitmap &= ~bit;
        if (!bitmap)
          return new EmptyNode();
        if (children.length <= 2 && isLeafNode(children[indx ^ 1])) {
          return children[indx ^ 1];
        }
        newChildren = arraySpliceOut(canEdit, indx, children);
      } else if (!exists && !isEmptyNode(child)) {
        if (children.length >= MAX_INDEX_NODE) {
          return expand(edit, frag, child, mask, children);
        }
        bitmap |= bit;
        newChildren = arraySpliceIn(canEdit, indx, child, children);
      } else {
        newChildren = arrayUpdate(canEdit, indx, child, children);
      }
      if (canEdit) {
        this.mask = bitmap;
        this.children = newChildren;
        return this;
      }
      return new IndexedNode(edit, bitmap, newChildren);
    }
  };
  var ArrayNode = class {
    constructor(edit, size5, children) {
      this.edit = edit;
      this.size = size5;
      this.children = children;
      this._tag = "ArrayNode";
    }
    modify(edit, shift, f, hash, key, size5) {
      let count = this.size;
      const children = this.children;
      const frag = hashFragment(shift, hash);
      const child = children[frag];
      const newChild = (child || new EmptyNode()).modify(edit, shift + SIZE, f, hash, key, size5);
      if (child === newChild)
        return this;
      const canEdit = canEditNode(this, edit);
      let newChildren;
      if (isEmptyNode(child) && !isEmptyNode(newChild)) {
        ;
        ++count;
        newChildren = arrayUpdate(canEdit, frag, newChild, children);
      } else if (!isEmptyNode(child) && isEmptyNode(newChild)) {
        ;
        --count;
        if (count <= MIN_ARRAY_NODE) {
          return pack(edit, count, frag, children);
        }
        newChildren = arrayUpdate(canEdit, frag, new EmptyNode(), children);
      } else {
        newChildren = arrayUpdate(canEdit, frag, newChild, children);
      }
      if (canEdit) {
        this.size = count;
        this.children = newChildren;
        return this;
      }
      return new ArrayNode(edit, count, newChildren);
    }
  };
  function pack(edit, count, removed, elements2) {
    const children = alloc(count - 1);
    let g = 0;
    let bitmap = 0;
    for (let i = 0, len = elements2.length; i < len; ++i) {
      if (i !== removed) {
        const elem = elements2[i];
        if (elem && !isEmptyNode(elem)) {
          children[g++] = elem;
          bitmap |= 1 << i;
        }
      }
    }
    return new IndexedNode(edit, bitmap, children);
  }
  function expand(edit, frag, child, bitmap, subNodes) {
    const arr = [];
    let bit = bitmap;
    let count = 0;
    for (let i = 0; bit; ++i) {
      if (bit & 1)
        arr[i] = subNodes[count++];
      bit >>>= 1;
    }
    arr[frag] = child;
    return new ArrayNode(edit, count + 1, arr);
  }
  function mergeLeavesInner(edit, shift, h1, n1, h2, n2) {
    if (h1 === h2)
      return new CollisionNode(edit, h1, [n2, n1]);
    const subH1 = hashFragment(shift, h1);
    const subH2 = hashFragment(shift, h2);
    if (subH1 === subH2) {
      return (child) => new IndexedNode(edit, toBitmap(subH1) | toBitmap(subH2), [child]);
    } else {
      const children = subH1 < subH2 ? [n1, n2] : [n2, n1];
      return new IndexedNode(edit, toBitmap(subH1) | toBitmap(subH2), children);
    }
  }
  function mergeLeaves(edit, shift, h1, n1, h2, n2) {
    let stack = void 0;
    let currentShift = shift;
    while (true) {
      const res = mergeLeavesInner(edit, currentShift, h1, n1, h2, n2);
      if (typeof res === "function") {
        stack = new Stack(res, stack);
        currentShift = currentShift + SIZE;
      } else {
        let final = res;
        while (stack != null) {
          final = stack.value(final);
          stack = stack.previous;
        }
        return final;
      }
    }
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashMap/_internal/hashMap.mjs
  var _a7;
  var getHash_ = getHash_1;
  var HashMapInternal = class {
    constructor(_editable, _edit, _root, _size) {
      this._editable = _editable;
      this._edit = _edit;
      this._root = _root;
      this._size = _size;
      this[_a7] = HashMapSym;
    }
    [(_a7 = HashMapSym, Symbol.iterator)]() {
      return new HashMapIterator(this, identity);
    }
    [Hash.sym]() {
      let hash = hashString("HashMap");
      for (const item of this) {
        hash ^= combine(hashUnknown(item.get(0)), hashUnknown(item.get(1)));
      }
      return optimize(hash);
    }
    [Equals.sym](that) {
      if (isHashMap(that)) {
        void 0;
        if (that._size !== this._size) {
          return false;
        }
        for (const item of this) {
          const elem = getHash_1(that, item.get(0), hashUnknown(item.get(0)));
          if (isNone(elem)) {
            return false;
          } else {
            if (!equals(item.get(1), elem.value)) {
              return false;
            }
          }
        }
        return true;
      }
      return false;
    }
  };
  var HashMapIterator = class {
    constructor(map, f) {
      this.map = map;
      this.f = f;
      this.v = visitLazy(this.map._root, this.f, void 0);
    }
    next() {
      if (isNone(this.v)) {
        return {
          done: true,
          value: void 0
        };
      }
      const v0 = this.v.value;
      this.v = applyCont(v0.cont);
      return {
        done: false,
        value: v0.value
      };
    }
    [Symbol.iterator]() {
      return new HashMapIterator(this.map, this.f);
    }
  };
  function applyCont(cont) {
    return cont ? visitLazyChildren(cont[0], cont[1], cont[2], cont[3], cont[4]) : none;
  }
  function visitLazy(node, f, cont = void 0) {
    switch (node._tag) {
      case "LeafNode": {
        return isSome(node.value) ? some({
          value: f(make2(node.key, node.value.value)),
          cont
        }) : applyCont(cont);
      }
      case "CollisionNode":
      case "ArrayNode":
      case "IndexedNode": {
        const children = node.children;
        return visitLazyChildren(children.length, children, 0, f, cont);
      }
      default: {
        return applyCont(cont);
      }
    }
  }
  function visitLazyChildren(len, children, i, f, cont) {
    while (i < len) {
      const child = children[i++];
      if (child && !isEmptyNode(child)) {
        return visitLazy(child, f, [len, children, i, f, cont]);
      }
    }
    return applyCont(cont);
  }
  function getHash_1(self2, key, hash) {
    void 0;
    let node = self2._root;
    let shift = 0;
    while (true) {
      switch (node._tag) {
        case "LeafNode": {
          return equals(key, node.key) ? node.value : none;
        }
        case "CollisionNode": {
          if (hash === node.hash) {
            const children = node.children;
            for (let i = 0, len = children.length; i < len; ++i) {
              const child = children[i];
              if ("key" in child && equals(key, child.key))
                return child.value;
            }
          }
          return none;
        }
        case "IndexedNode": {
          const frag = hashFragment(shift, hash);
          const bit = toBitmap(frag);
          if (node.mask & bit) {
            node = node.children[fromBitmap(node.mask, bit)];
            shift += SIZE;
            break;
          }
          return none;
        }
        case "ArrayNode": {
          node = node.children[hashFragment(shift, hash)];
          if (node) {
            shift += SIZE;
            break;
          }
          return none;
        }
        default:
          return none;
      }
    }
  }
  function has_(self2, key) {
    return isSome(getHash_1(self2, key, hashUnknown(key)));
  }
  function equals_(self2, that) {
    return equals(self2, that);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashMap/size.mjs
  function size(self2) {
    void 0;
    return self2._size;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashMap/keys.mjs
  function keys(self2) {
    void 0;
    return new HashMapIterator(self2, ({
      tuple: [key]
    }) => key);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashSet/definition.mjs
  var HashSetSym = /* @__PURE__ */ Symbol.for("@tsplus/stdlib/collections/HashSet");
  function isHashSet(u) {
    return typeof u === "object" && u != null && HashSetSym in u;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashSet/_internal/hashSet.mjs
  var _a8;
  var HashSetInternal = class {
    constructor(_keyMap) {
      this._keyMap = _keyMap;
      this[_a8] = HashSetSym;
    }
    [(_a8 = HashSetSym, Symbol.iterator)]() {
      return keys(this._keyMap);
    }
    [Hash.sym]() {
      return combine(hashString("HashSet"), hashUnknown(this._keyMap));
    }
    [Equals.sym](that) {
      if (isHashSet(that)) {
        void 0;
        return size(this._keyMap) === size(that._keyMap) && equals_(this._keyMap, that._keyMap);
      }
      return false;
    }
  };

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashSet/equals.mjs
  function equals_2(self2, that) {
    if (self2 === that) {
      return true;
    }
    void 0;
    void 0;
    if (size(self2._keyMap) !== size(that._keyMap)) {
      return false;
    }
    let eq = true;
    for (const vx of self2) {
      if (!has_(that._keyMap, vx)) {
        eq = false;
        break;
      }
    }
    return eq;
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberId/definition.mjs
  var _a9;
  var _b4;
  var _c3;
  var FiberIdSym = /* @__PURE__ */ Symbol.for("@effect/core/io/FiberId");
  var None2 = class {
    constructor() {
      this._tag = "None";
      this[_a9] = FiberIdSym;
    }
    [(_a9 = FiberIdSym, Hash.sym)]() {
      return hashString(this._tag);
    }
    [Equals.sym](that) {
      if (isFiberId_1(that)) {
        void 0;
        return that._tag === "None";
      }
      return false;
    }
  };
  var RuntimeFiberId = class {
    constructor(id, startTimeSeconds, location) {
      this.id = id;
      this.startTimeSeconds = startTimeSeconds;
      this.location = location;
      this._tag = "Runtime";
      this[_b4] = FiberIdSym;
    }
    [(_b4 = FiberIdSym, Hash.sym)]() {
      return combine(hashString(this._tag), combine(hashNumber(this.id), combine(hashNumber(this.startTimeSeconds), hashUnknown(this.location))));
    }
    [Equals.sym](that) {
      return isFiberId_1(that) && this[Hash.sym]() === that[Hash.sym]();
    }
  };
  var CompositeFiberId = class {
    constructor(fiberIds) {
      this.fiberIds = fiberIds;
      this._tag = "Composite";
      this[_c3] = FiberIdSym;
    }
    [(_c3 = FiberIdSym, Hash.sym)]() {
      return combine(hashString(this._tag), hashUnknown(this.fiberIds));
    }
    [Equals.sym](that) {
      if (isFiberId_1(that)) {
        void 0;
        return that._tag === "Composite" && equals_2(this.fiberIds, that.fiberIds);
      }
      return false;
    }
  };
  function isFiberId_1(self2) {
    return typeof self2 === "object" && self2 != null && FiberIdSym in self2;
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberId/operations/none.mjs
  var none2 = /* @__PURE__ */ new None2();

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/empty.mjs
  function empty() {
    return _Empty;
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Trace/definition.mjs
  var Trace = class {
    constructor(fiberId2, stackTrace) {
      this.fiberId = fiberId2;
      this.stackTrace = stackTrace;
    }
  };
  function make3(fiberId2, stackTrace) {
    return new Trace(fiberId2, stackTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Trace/operations/none.mjs
  var none3 = /* @__PURE__ */ make3(none2, /* @__PURE__ */ empty());

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/List/definition.mjs
  var _a10;
  var _b5;
  var isNil = isNil_1;
  var length = length_1;
  var ListTypeId = /* @__PURE__ */ Symbol.for("@tsplus/collections/List");
  var Cons = class {
    constructor(head3, tail) {
      this.head = head3;
      this.tail = tail;
      this._tag = "Cons";
      this[_a10] = ListTypeId;
    }
    [(_a10 = ListTypeId, Symbol.iterator)]() {
      let done6 = false;
      let these = this;
      return {
        next() {
          if (done6) {
            return this.return();
          }
          if (these._tag === "Nil") {
            done6 = true;
            return this.return();
          }
          const value = these.head;
          these = these.tail;
          return {
            done: done6,
            value
          };
        },
        return(value) {
          if (!done6) {
            done6 = true;
          }
          return {
            done: true,
            value
          };
        }
      };
    }
    [Hash.sym]() {
      return hashIterator(this[Symbol.iterator]());
    }
    [Equals.sym](that) {
      return that instanceof Cons && equalsWith_1(this, that, equals);
    }
  };
  var Nil = class {
    constructor() {
      this._tag = "Nil";
      this[_b5] = ListTypeId;
    }
    [(_b5 = ListTypeId, Symbol.iterator)]() {
      return {
        next() {
          return {
            done: true,
            value: void 0
          };
        }
      };
    }
    [Hash.sym]() {
      return hashIterator(this[Symbol.iterator]());
    }
    [Equals.sym](that) {
      return that instanceof Nil;
    }
  };
  var _Nil = /* @__PURE__ */ new Nil();
  function nil() {
    return _Nil;
  }
  function cons(head3, tail) {
    return new Cons(head3, tail);
  }
  function isNil_1(self2) {
    return self2._tag === "Nil";
  }
  function length_1(self2) {
    let these = self2;
    let len = 0;
    while (!isNil_1(these)) {
      len += 1;
      these = these.tail;
    }
    return len;
  }
  function equalsWith_1(self2, that, f) {
    if (self2 === that) {
      return true;
    } else if (length_1(self2) !== length_1(that)) {
      return false;
    } else {
      const i0 = self2[Symbol.iterator]();
      const i1 = that[Symbol.iterator]();
      let a;
      let b;
      while (!(a = i0.next()).done && !(b = i1.next()).done) {
        if (!f(a.value, b.value)) {
          return false;
        }
      }
      return true;
    }
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/List/unsafeHead.mjs
  function unsafeHead(self2) {
    if (isNil(self2)) {
      return void 0;
    }
    return self2.head;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/List/unsafeTail.mjs
  function unsafeTail(self2) {
    if (isNil(self2)) {
      return void 0;
    }
    return self2.tail;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/List/prepend.mjs
  function prepend_(self2, elem) {
    return cons(elem, self2);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashMap/setTree.mjs
  function setTree_(self2, newRoot, newSize) {
    void 0;
    if (self2._editable) {
      self2._root = newRoot;
      self2._size = newSize;
      return self2;
    }
    return newRoot === self2._root ? self2 : new HashMapInternal(self2._editable, self2._edit, newRoot, newSize);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashMap/modifyHash.mjs
  function modifyHash_(self2, key, hash, f) {
    void 0;
    const size5 = {
      value: self2._size
    };
    const newRoot = self2._root.modify(self2._editable ? self2._edit : NaN, 0, f, hash, key, size5);
    return setTree_(self2, newRoot, size5.value);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashMap/modify.mjs
  function modify_2(self2, key, f) {
    return modifyHash_(self2, key, hashUnknown(key), f);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashMap/set.mjs
  function set_(self2, key, value) {
    return modify_2(self2, key, () => some(value));
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashSet/add.mjs
  function add_(self2, value) {
    void 0;
    return self2._keyMap._editable ? (set_(self2._keyMap, value, true), self2) : new HashSetInternal(set_(self2._keyMap, value, true));
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/List/empty.mjs
  function empty2() {
    return nil();
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashMap/empty.mjs
  function empty3() {
    return new HashMapInternal(false, 0, new EmptyNode(), 0);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashSet/empty.mjs
  function empty4() {
    return new HashSetInternal(empty3());
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashMap/beginMutation.mjs
  function beginMutation(self2) {
    void 0;
    return new HashMapInternal(true, self2._edit + 1, self2._root, self2._size);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashSet/beginMutation.mjs
  function beginMutation2(self2) {
    void 0;
    return new HashSetInternal(beginMutation(self2._keyMap));
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashSet/endMutation.mjs
  function endMutation(self2) {
    void 0;
    void 0;
    self2._keyMap._editable = false;
    return self2;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashSet/make.mjs
  function make4(...elements2) {
    const set2 = beginMutation2(empty4());
    for (const v of elements2) {
      add_(set2, v);
    }
    return endMutation(set2);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashMap/node.mjs
  var isEmptyNode2 = isEmptyNode;

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashMap/reduceWithIndex.mjs
  function reduceWithIndex_(self2, z, f) {
    void 0;
    const root = self2._root;
    if (root._tag === "LeafNode") {
      return isSome(root.value) ? f(z, root.key, root.value.value) : z;
    }
    if (root._tag === "EmptyNode") {
      return z;
    }
    const toVisit = [root.children];
    let children;
    while (children = toVisit.pop()) {
      for (let i = 0, len = children.length; i < len; ) {
        const child = children[i++];
        if (child && !isEmptyNode2(child)) {
          if (child._tag === "LeafNode") {
            if (isSome(child.value)) {
              z = f(z, child.key, child.value.value);
            }
          } else
            toVisit.push(child.children);
        }
      }
    }
    return z;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashMap/forEachWithIndex.mjs
  function forEachWithIndex_(self2, f) {
    reduceWithIndex_(self2, void 0, (_, key, value) => f(key, value));
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashSet/forEach.mjs
  function forEach_(self2, f) {
    void 0;
    forEachWithIndex_(self2._keyMap, (k) => {
      f(k);
    });
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashSet/mutate.mjs
  function mutate_(self2, f) {
    const transient = beginMutation2(self2);
    f(transient);
    return endMutation(transient);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashSet/union.mjs
  function union_(self2, that) {
    const set2 = empty4();
    return mutate_(set2, (_) => {
      forEach_(self2, (a) => {
        add_(_, a);
      });
      for (const a of that) {
        add_(_, a);
      }
    });
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/List/prependAll.mjs
  function prependAll_(self2, prefix) {
    if (isNil(self2)) {
      return prefix;
    } else if (isNil(prefix)) {
      return self2;
    } else {
      const result = cons(prefix.head, self2);
      let curr = result;
      let that = prefix.tail;
      while (!isNil(that)) {
        const temp = cons(that.head, self2);
        curr.tail = temp;
        curr = temp;
        that = that.tail;
      }
      return result;
    }
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/List/concat.mjs
  function concatOperator(self2, that) {
    return prependAll_(that, self2);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/List/reduce.mjs
  function reduce_2(self2, b, f) {
    let acc = b;
    let these = self2;
    while (!isNil(these)) {
      acc = f(acc, these.head);
      these = these.tail;
    }
    return acc;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashSet/size.mjs
  function size2(self2) {
    void 0;
    return size(self2._keyMap);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/List/reverse.mjs
  function reverse(self2) {
    let result = empty2();
    let these = self2;
    while (!isNil(these)) {
      result = prepend_(result, these.head);
      these = these.tail;
    }
    return result;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/List/from.mjs
  var from3 = from_1;
  function from_1(prefix) {
    const iter = prefix[Symbol.iterator]();
    let a;
    if (!(a = iter.next()).done) {
      const result = cons(a.value, nil());
      let curr = result;
      while (!(a = iter.next()).done) {
        const temp = cons(a.value, nil());
        curr.tail = temp;
        curr = temp;
      }
      return result;
    } else {
      return nil();
    }
  }
  function make5(...prefix) {
    return from_1(prefix);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/io/Eval/succeedNow.mjs
  function succeedNow2(a) {
    return new Succeed(() => a);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Cause/definition.mjs
  var _a11;
  var _b6;
  var _c4;
  var _d2;
  var _e2;
  var _f2;
  var _g;
  var isEmpty = isEmpty_1;
  var CauseSym = /* @__PURE__ */ Symbol.for("@effect/core/io/Cause");
  function isEmptyType_1(cause) {
    void 0;
    return cause._tag === "Empty";
  }
  function isDieType(cause) {
    void 0;
    return cause._tag === "Die";
  }
  function isFailType(cause) {
    void 0;
    return cause._tag === "Fail";
  }
  function isInterruptType(cause) {
    void 0;
    return cause._tag === "Interrupt";
  }
  function isStacklessType_1(cause) {
    void 0;
    return cause._tag === "Stackless";
  }
  function isThenType_1(cause) {
    void 0;
    return cause._tag === "Then";
  }
  function isBothType_1(cause) {
    void 0;
    return cause._tag === "Both";
  }
  var Empty2 = class {
    constructor() {
      this._tag = "Empty";
      this[_a11] = CauseSym;
    }
    [(_a11 = CauseSym, Hash.sym)]() {
      return _emptyHash;
    }
    [Equals.sym](that) {
      return isCause_1(that) && run(this.__equalsSafe(that));
    }
    __equalsSafe(that) {
      void 0;
      switch (that._tag) {
        case "Empty": {
          return succeed2(() => true);
        }
        case "Both":
        case "Then": {
          return zipWith_(suspend(() => this.__equalsSafe(that.left)), () => suspend(() => this.__equalsSafe(that.right)), (a, b) => a && b);
        }
        case "Stackless": {
          return suspend(() => this.__equalsSafe(that.cause));
        }
        default: {
          return succeed2(() => false);
        }
      }
    }
  };
  var Fail = class {
    constructor(value, trace) {
      this.value = value;
      this.trace = trace;
      this._tag = "Fail";
      this[_b6] = CauseSym;
    }
    [(_b6 = CauseSym, Hash.sym)]() {
      return combine(hashString(this._tag), hashUnknown(this.value));
    }
    [Equals.sym](that) {
      return isCause_1(that) && run(this.__equalsSafe(that));
    }
    __equalsSafe(that) {
      void 0;
      switch (that._tag) {
        case "Fail": {
          return succeed2(() => equals(this.value, that.value));
        }
        case "Both":
        case "Then": {
          return suspend(() => sym(zero)(this, that));
        }
        case "Stackless": {
          return suspend(() => this.__equalsSafe(that.cause));
        }
        default: {
          return succeed2(() => false);
        }
      }
    }
  };
  var Die = class {
    constructor(value, trace) {
      this.value = value;
      this.trace = trace;
      this._tag = "Die";
      this[_c4] = CauseSym;
    }
    [(_c4 = CauseSym, Hash.sym)]() {
      return combine(hashString(this._tag), hashUnknown(this.value));
    }
    [Equals.sym](that) {
      return isCause_1(that) && run(this.__equalsSafe(that));
    }
    __equalsSafe(that) {
      void 0;
      switch (that._tag) {
        case "Die": {
          return succeed2(() => equals(this.value, that.value));
        }
        case "Both":
        case "Then": {
          return suspend(() => sym(zero)(this, that));
        }
        case "Stackless": {
          return suspend(() => this.__equalsSafe(that.cause));
        }
        default: {
          return succeed2(() => false);
        }
      }
    }
  };
  var Interrupt = class {
    constructor(fiberId2, trace) {
      this.fiberId = fiberId2;
      this.trace = trace;
      this._tag = "Interrupt";
      this[_d2] = CauseSym;
    }
    [(_d2 = CauseSym, Hash.sym)]() {
      return combine(hashString(this._tag), hashUnknown(this.fiberId));
    }
    [Equals.sym](that) {
      return isCause_1(that) && run(this.__equalsSafe(that));
    }
    __equalsSafe(that) {
      void 0;
      switch (that._tag) {
        case "Interrupt": {
          return succeed2(() => equals(this.fiberId, that.fiberId));
        }
        case "Both":
        case "Then": {
          return suspend(() => sym(zero)(this, that));
        }
        case "Stackless": {
          return suspend(() => this.__equalsSafe(that.cause));
        }
        default: {
          return succeed2(() => false);
        }
      }
    }
  };
  var Stackless = class {
    constructor(cause, stackless2) {
      this.cause = cause;
      this.stackless = stackless2;
      this._tag = "Stackless";
      this[_e2] = CauseSym;
    }
    [(_e2 = CauseSym, Hash.sym)]() {
      return this.cause[Hash.sym]();
    }
    [Equals.sym](that) {
      return isCause_1(that) && run(this.__equalsSafe(that));
    }
    __equalsSafe(that) {
      void 0;
      void 0;
      return that._tag === "Stackless" ? this.cause.__equalsSafe(that.cause) : this.cause.__equalsSafe(that);
    }
  };
  var Then = class {
    constructor(left2, right2) {
      this.left = left2;
      this.right = right2;
      this._tag = "Then";
      this[_f2] = CauseSym;
    }
    [(_f2 = CauseSym, Hash.sym)]() {
      return hashCode(this);
    }
    [Equals.sym](that) {
      return isCause_1(that) && run(this.__equalsSafe(that));
    }
    __equalsSafe(that) {
      const self2 = this;
      return gen(function* (_) {
        void 0;
        if (that._tag === "Stackless") {
          return yield* _(self2.__equalsSafe(that.cause));
        }
        return (yield* _(self2.eq(that))) || (yield* _(sym(associativeThen)(self2, that))) || (yield* _(sym(distributiveThen)(self2, that))) || (yield* _(sym(zero)(self2, that)));
      });
    }
    eq(that) {
      const self2 = this;
      void 0;
      if (that._tag === "Then") {
        return gen(function* (_) {
          void 0;
          void 0;
          return (yield* _(self2.left.__equalsSafe(that.left))) && (yield* _(self2.right.__equalsSafe(that.right)));
        });
      }
      return succeed2(() => false);
    }
  };
  var Both = class {
    constructor(left2, right2) {
      this.left = left2;
      this.right = right2;
      this._tag = "Both";
      this[_g] = CauseSym;
    }
    [(_g = CauseSym, Hash.sym)]() {
      return hashCode(this);
    }
    [Equals.sym](that) {
      return isCause_1(that) && run(this.__equalsSafe(that));
    }
    __equalsSafe(that) {
      const self2 = this;
      return gen(function* (_) {
        void 0;
        if (that._tag === "Stackless") {
          return yield* _(self2.__equalsSafe(that.cause));
        }
        return (yield* _(self2.eq(that))) || (yield* _(sym(associativeBoth)(self2, that))) || (yield* _(sym(distributiveBoth)(self2, that))) || (yield* _(commutativeBoth(self2, that))) || (yield* _(sym(zero)(self2, that)));
      });
    }
    eq(that) {
      const self2 = this;
      void 0;
      if (that._tag === "Both") {
        return gen(function* (_) {
          void 0;
          void 0;
          return (yield* _(self2.left.__equalsSafe(that.left))) && (yield* _(self2.right.__equalsSafe(that.right)));
        });
      }
      return succeed2(() => false);
    }
  };
  var empty5 = /* @__PURE__ */ new Empty2();
  function die(defect, trace = none3) {
    return new Die(defect, trace);
  }
  function fail(error, trace = none3) {
    return new Fail(error, trace);
  }
  function interrupt(fiberId2, trace = none3) {
    return new Interrupt(fiberId2, trace);
  }
  function stackless(cause) {
    return new Stackless(cause, true);
  }
  function combineSeq(left2, right2) {
    return isEmpty_1(left2) ? right2 : isEmpty_1(right2) ? left2 : new Then(left2, right2);
  }
  function combinePar(left2, right2) {
    return isEmpty_1(left2) ? right2 : isEmpty_1(right2) ? left2 : new Both(left2, right2);
  }
  function isCause_1(self2) {
    return typeof self2 === "object" && self2 != null && CauseSym in self2;
  }
  function isEmpty_1(cause) {
    if (isEmptyType_1(cause) || isStacklessType_1(cause) && isEmptyType_1(cause.cause)) {
      return true;
    }
    let causes = void 0;
    void 0;
    let current = cause;
    while (current) {
      switch (current._tag) {
        case "Die":
          return false;
        case "Fail":
          return false;
        case "Interrupt":
          return false;
        case "Then": {
          causes = new Stack(current.right, causes);
          void 0;
          current = current.left;
          break;
        }
        case "Both": {
          causes = new Stack(current.right, causes);
          void 0;
          current = current.left;
          break;
        }
        case "Stackless": {
          void 0;
          current = current.cause;
          break;
        }
        default: {
          current = void 0;
        }
      }
      if (!current && causes) {
        void 0;
        current = causes.value;
        causes = causes.previous;
      }
    }
    return true;
  }
  var _emptyHash = /* @__PURE__ */ optimize(/* @__PURE__ */ hashRandom());
  function stepLoop(cause, stack, parallel, sequential2) {
    while (1) {
      void 0;
      switch (cause._tag) {
        case "Empty": {
          if (length(stack) === 0) {
            return make2(parallel, sequential2);
          } else {
            cause = unsafeHead(stack);
            const tail = unsafeTail(stack);
            stack = tail == null ? nil() : tail;
          }
          break;
        }
        case "Then": {
          const left2 = cause.left;
          const right2 = cause.right;
          void 0;
          switch (left2._tag) {
            case "Empty": {
              cause = cause.right;
              break;
            }
            case "Then": {
              cause = new Then(left2.left, new Then(left2.right, right2));
              break;
            }
            case "Both": {
              cause = new Both(new Then(left2.left, right2), new Then(left2.right, right2));
              break;
            }
            case "Stackless": {
              cause = new Then(left2.cause, right2);
              break;
            }
            default: {
              cause = left2;
              sequential2 = prepend_(sequential2, right2);
            }
          }
          break;
        }
        case "Both": {
          stack = prepend_(stack, cause.right);
          cause = cause.left;
          break;
        }
        case "Stackless": {
          cause = cause.cause;
          break;
        }
        default: {
          if (length(stack) === 0) {
            return make2(add_(parallel, cause), sequential2);
          } else {
            parallel = add_(parallel, cause);
            cause = unsafeHead(stack);
            const tail = unsafeTail(stack);
            stack = tail == null ? nil() : tail;
            break;
          }
        }
      }
    }
    throw new Error("Bug");
  }
  function step(self2) {
    return stepLoop(self2, empty2(), make4(), empty2());
  }
  function flattenCauseLoop(causes, flattened) {
    while (1) {
      const {
        tuple: [parallel, sequential2]
      } = reduce_2(causes, make2(empty4(), empty2()), ({
        tuple: [parallel2, sequential3]
      }, cause) => {
        const {
          tuple: [set2, seq]
        } = step(cause);
        return make2(union_(parallel2, set2), concatOperator(sequential3, seq));
      });
      const updated = size2(parallel) > 0 ? prepend_(flattened, parallel) : flattened;
      if (length(sequential2) === 0) {
        return reverse(updated);
      } else {
        causes = sequential2;
        flattened = updated;
      }
    }
    throw new Error("Bug");
  }
  function flattenCause(self2) {
    return flattenCauseLoop(make5(self2), empty2());
  }
  function hashCode(self2) {
    const flat = flattenCause(self2);
    const size5 = length(flat);
    let head3;
    if (size5 === 0) {
      return _emptyHash;
    } else if (size5 === 1 && (head3 = unsafeHead(flat)) && size2(head3) === 1) {
      return unsafeHead(from3(head3))[Hash.sym]();
    } else {
      return flat[Hash.sym]();
    }
  }
  function sym(f) {
    return (l, r) => zipWith_(f(l, r), () => f(r, l), (a, b) => a || b);
  }
  function zero(self2, that) {
    if (isThenType_1(self2) && isEmptyType_1(self2.right)) {
      void 0;
      return self2.left.__equalsSafe(that);
    }
    if (isThenType_1(self2) && isEmptyType_1(self2.left)) {
      void 0;
      return self2.right.__equalsSafe(that);
    }
    if (isBothType_1(self2) && isEmptyType_1(self2.right)) {
      void 0;
      return self2.left.__equalsSafe(that);
    }
    if (isBothType_1(self2) && isEmptyType_1(self2.left)) {
      void 0;
      return self2.right.__equalsSafe(that);
    }
    return succeedNow2(false);
  }
  function associativeThen(self2, that) {
    return gen(function* (_) {
      if (isThenType_1(self2) && isThenType_1(self2.left) && isThenType_1(that) && isThenType_1(that.right)) {
        const al = self2.left.left;
        const bl = self2.left.right;
        const cl = self2.right;
        const ar = that.left;
        const br = that.right.left;
        const cr = that.right.right;
        void 0;
        void 0;
        void 0;
        return (yield* _(al.__equalsSafe(ar))) && (yield* _(bl.__equalsSafe(br))) && (yield* _(cl.__equalsSafe(cr)));
      }
      return false;
    });
  }
  function distributiveThen(self2, that) {
    return gen(function* (_) {
      if (isThenType_1(self2) && isBothType_1(self2.right) && isBothType_1(that) && isThenType_1(that.left) && isThenType_1(that.right)) {
        const al = self2.left;
        const bl = self2.right.left;
        const cl = self2.right.right;
        const ar1 = that.left.left;
        const br = that.left.right;
        const ar2 = that.right.left;
        const cr = that.right.right;
        void 0;
        void 0;
        void 0;
        void 0;
        if ((yield* _(ar1.__equalsSafe(ar2))) && (yield* _(al.__equalsSafe(ar1))) && (yield* _(bl.__equalsSafe(br))) && (yield* _(cl.__equalsSafe(cr)))) {
          return true;
        }
      }
      if (isThenType_1(self2) && isBothType_1(self2.left) && isBothType_1(that) && isThenType_1(that.left) && isThenType_1(that.right)) {
        const al = self2.left.left;
        const bl = self2.left.right;
        const cl = self2.right;
        const ar = that.left.left;
        const cr1 = that.left.right;
        const br = that.right.left;
        const cr2 = that.right.right;
        void 0;
        void 0;
        void 0;
        void 0;
        if ((yield* _(cr1.__equalsSafe(cr2))) && (yield* _(al.__equalsSafe(ar))) && (yield* _(bl.__equalsSafe(br))) && (yield* _(cl.__equalsSafe(cr1)))) {
          return true;
        }
      }
      return false;
    });
  }
  function associativeBoth(self2, that) {
    return gen(function* (_) {
      if (isBothType_1(self2) && isBothType_1(self2.left) && isBothType_1(that) && isBothType_1(that.right)) {
        const al = self2.left.left;
        const bl = self2.left.right;
        const cl = self2.right;
        const ar = that.left;
        const br = that.right.left;
        const cr = that.right.right;
        void 0;
        void 0;
        void 0;
        return (yield* _(al.__equalsSafe(ar))) && (yield* _(bl.__equalsSafe(br))) && (yield* _(cl.__equalsSafe(cr)));
      }
      return false;
    });
  }
  function distributiveBoth(self2, that) {
    return gen(function* (_) {
      if (isBothType_1(self2) && isThenType_1(self2.left) && isThenType_1(self2.right) && isThenType_1(that) && isBothType_1(that.right)) {
        const al1 = self2.left.left;
        const bl = self2.left.right;
        const al2 = self2.right.left;
        const cl = self2.right.right;
        const ar = that.left;
        const br = that.right.left;
        const cr = that.right.right;
        void 0;
        void 0;
        void 0;
        if ((yield* _(al1.__equalsSafe(al2))) && (yield* _(al1.__equalsSafe(ar))) && (yield* _(bl.__equalsSafe(br))) && (yield* _(cl.__equalsSafe(cr)))) {
          return true;
        }
      }
      if (isBothType_1(self2) && isThenType_1(self2.left) && isThenType_1(self2.right) && isThenType_1(that) && isBothType_1(that.left)) {
        const al = self2.left.left;
        const cl1 = self2.left.right;
        const bl = self2.right.left;
        const cl2 = self2.right.right;
        const ar = that.left.left;
        const br = that.left.right;
        const cr = that.right;
        void 0;
        void 0;
        void 0;
        if ((yield* _(cl1.__equalsSafe(cl2))) && (yield* _(al.__equalsSafe(ar))) && (yield* _(bl.__equalsSafe(br))) && (yield* _(cl1.__equalsSafe(cr)))) {
          return true;
        }
      }
      return false;
    });
  }
  function commutativeBoth(self2, that) {
    return gen(function* (_) {
      if (isBothType_1(that)) {
        void 0;
        void 0;
        return (yield* _(self2.left.__equalsSafe(that.right))) && (yield* _(self2.right.__equalsSafe(that.left)));
      }
      return false;
    });
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/failCause.mjs
  function failCause(cause, __tsplusTrace) {
    return new IFail(cause, __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/dieMessage.mjs
  function dieMessage(message, __tsplusTrace) {
    return failCause(() => stackless(die(new RuntimeError(message()))), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/size.mjs
  function size3(self2) {
    return self2.length;
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/tap.mjs
  function tap_(self2, f, __tsplusTrace) {
    return flatMap_(self2, (a) => map_(f(a), () => a, __tsplusTrace), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/get.mjs
  function get_(self2, n) {
    return !Number.isInteger(n) || n < 0 || n >= self2.length ? none : some(self2._get(n));
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/head.mjs
  function head(self2) {
    return get_(self2, 0);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/append.mjs
  function append_(self2, a) {
    return self2._append(a);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/range.mjs
  function range(min, max) {
    let builder2 = empty();
    for (let i = min; i <= max; i++) {
      builder2 = append_(builder2, i);
    }
    return builder2;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/map.mjs
  function map_4(self2, f) {
    void 0;
    if (self2._typeId === SingletonTypeId) {
      return new Singleton(f(self2.a));
    }
    let r = empty();
    for (const k of self2) {
      r = append_(r, f(k));
    }
    return r;
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/replicate.mjs
  function replicate_1(n, effect2) {
    return map_4(range(0, n - 1), effect2);
  }
  function replicateNow_(self2, n) {
    return replicate_1(n, () => self2);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/zipWithIndexOffset.mjs
  function zipWithIndexOffset_(self2, offset) {
    const iterator = self2._arrayLikeIterator();
    let next2;
    let i = offset;
    let builder2 = empty();
    while ((next2 = iterator.next()) && !next2.done) {
      const array = next2.value;
      const len = array.length;
      let j = 0;
      while (j < len) {
        const a = array[j];
        builder2 = append_(builder2, make2(a, i));
        j++;
        i++;
      }
    }
    return builder2;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/zipWithIndex.mjs
  function zipWithIndex(self2) {
    return zipWithIndexOffset_(self2, 0);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Deferred/_internal/DeferredState.mjs
  var Pending = class {
    constructor(joiners) {
      this.joiners = joiners;
      this._tag = "Pending";
    }
  };
  var Done = class {
    constructor(value) {
      this.value = value;
      this._tag = "Done";
    }
  };
  function pending(joiners) {
    return new Pending(joiners);
  }
  function done(value) {
    return new Done(value);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/data/Either/definition.mjs
  var _leftHash = /* @__PURE__ */ hashString("Either/Left");
  var _rightHash = /* @__PURE__ */ hashString("Either/Right");
  var Left = class {
    constructor(left2) {
      this.left = left2;
      this._tag = "Left";
    }
    [Equals.sym](that) {
      return that instanceof Left && equals(this.left, that.left);
    }
    [Hash.sym]() {
      return combine(_leftHash, hashUnknown(this.left));
    }
  };
  var Right = class {
    constructor(right2) {
      this.right = right2;
      this._tag = "Right";
    }
    [Equals.sym](that) {
      return that instanceof Right && equals(this.right, that.right);
    }
    [Hash.sym]() {
      return combine(_rightHash, hashUnknown(this.right));
    }
  };
  function isLeft(ma) {
    return ma._tag === "Left";
  }
  function right(a) {
    return new Right(a);
  }
  function left(e) {
    return new Left(e);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/asyncInterrupt.mjs
  function asyncInterrupt(register, __tsplusTrace) {
    return suspendSucceed(() => new IAsync(register, () => none2, __tsplusTrace), __tsplusTrace);
  }
  function asyncInterruptBlockingOn(register, blockingOn, __tsplusTrace) {
    return suspendSucceed(() => new IAsync(register, blockingOn, __tsplusTrace), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Exit/definition.mjs
  var Success = class {
    constructor(value) {
      this.value = value;
      this._tag = "Success";
    }
    [Hash.sym]() {
      return hashUnknown(this.value);
    }
    [Equals.sym](that) {
      return that instanceof Success && equals(this.value, that.value);
    }
  };
  var Failure = class {
    constructor(cause) {
      this.cause = cause;
      this._tag = "Failure";
    }
    [Hash.sym]() {
      return hashUnknown(this.cause);
    }
    [Equals.sym](that) {
      return that instanceof Failure && equals(this.cause, that.cause);
    }
  };

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Exit/operations/failCause.mjs
  function failCause2(cause) {
    return new Failure(cause);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Exit/operations/succeed.mjs
  function succeed3(a) {
    return new Success(a);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/exit.mjs
  function exit(self2, __tsplusTrace) {
    return new IFold(self2, (cause) => succeedNow(failCause2(cause), __tsplusTrace), (success) => succeedNow(succeed3(success), __tsplusTrace), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/descriptorWith.mjs
  function descriptorWith(f, __tsplusTrace) {
    return new IDescriptor(f, __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/descriptor.mjs
  var fileName_12 = "(@effect/core) _src/io/Effect/operations/descriptor.ts";
  var descriptor = /* @__PURE__ */ descriptorWith(succeedNow, fileName_12 + ":6:88");

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/fiberId.mjs
  var fileName_13 = "(@effect/core) _src/io/Effect/operations/fiberId.ts";
  var fiberId = /* @__PURE__ */ map_(descriptor, (descriptor2) => descriptor2.id, fileName_13 + ":7:76");

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/InterruptStatus/definition.mjs
  var InterruptStatusImpl = class {
    constructor(isInterruptible) {
      this.isInterruptible = isInterruptible;
    }
    get isUninterruptible() {
      return !this.isInterruptible;
    }
    get toBoolean() {
      return this.isInterruptible;
    }
    [Hash.sym]() {
      return hashUnknown(this.isInterruptible);
    }
    [Equals.sym](u) {
      return u instanceof InterruptStatusImpl && this.isInterruptible === u.isInterruptible;
    }
  };
  var Interruptible_1 = /* @__PURE__ */ new InterruptStatusImpl(true);
  var Interruptible = Interruptible_1;
  var Uninterruptible_1 = /* @__PURE__ */ new InterruptStatusImpl(false);
  var Uninterruptible = Uninterruptible_1;
  function fromBoolean(b) {
    return b ? Interruptible_1 : Uninterruptible_1;
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Exit/operations/interrupt.mjs
  function interrupt2(fiberId2) {
    return failCause2(interrupt(fiberId2));
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Fiber/definition.mjs
  var _a12;
  var FiberSym = /* @__PURE__ */ Symbol.for("@effect/core/io/Fiber");
  _a12 = FiberSym;

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Fiber/operations/interruptAs.mjs
  function interruptAsNow_(self2, fiberId2, __tsplusTrace) {
    void 0;
    return self2._interruptAs(fiberId2);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/RuntimeConfig/Flag.mjs
  var _a13;
  var _b7;
  var _c5;
  var _d3;
  var _e3;
  var RuntimeConfigFlagSym = /* @__PURE__ */ Symbol.for("@effect/core/io/RuntimeConfig/Flag");
  var EnableCurrentFiber = class {
    constructor() {
      this._tag = "EnableCurrentFiber";
      this[_a13] = RuntimeConfigFlagSym;
    }
    [(_a13 = RuntimeConfigFlagSym, Hash.sym)]() {
      return hashString(this._tag);
    }
    [Equals.sym](that) {
      return isRuntimeConfigFlag_1(that) && this._tag === that._tag;
    }
  };
  var LogRuntime = class {
    constructor() {
      this._tag = "LogRuntime";
      this[_b7] = RuntimeConfigFlagSym;
    }
    [(_b7 = RuntimeConfigFlagSym, Hash.sym)]() {
      return hashString(this._tag);
    }
    [Equals.sym](that) {
      return isRuntimeConfigFlag_1(that) && this._tag === that._tag;
    }
  };
  var SuperviseOperations = class {
    constructor() {
      this._tag = "SuperviseOperations";
      this[_c5] = RuntimeConfigFlagSym;
    }
    [(_c5 = RuntimeConfigFlagSym, Hash.sym)]() {
      return hashString(this._tag);
    }
    [Equals.sym](that) {
      return isRuntimeConfigFlag_1(that) && this._tag === that._tag;
    }
  };
  var TrackRuntimeMetrics = class {
    constructor() {
      this._tag = "TrackRuntimeMetrics";
      this[_d3] = RuntimeConfigFlagSym;
    }
    [(_d3 = RuntimeConfigFlagSym, Hash.sym)]() {
      return hashString(this._tag);
    }
    [Equals.sym](that) {
      return isRuntimeConfigFlag_1(that) && this._tag === that._tag;
    }
  };
  var EnableFiberRoots = class {
    constructor() {
      this._tag = "EnableFiberRoots";
      this[_e3] = RuntimeConfigFlagSym;
    }
    [(_e3 = RuntimeConfigFlagSym, Hash.sym)]() {
      return hashString(this._tag);
    }
    [Equals.sym](that) {
      return isRuntimeConfigFlag_1(that) && this._tag === that._tag;
    }
  };
  var enableCurrentFiber = /* @__PURE__ */ new EnableCurrentFiber();
  var logRuntime = /* @__PURE__ */ new LogRuntime();
  var superviseOperations = /* @__PURE__ */ new SuperviseOperations();
  var trackRuntimeMetrics = /* @__PURE__ */ new TrackRuntimeMetrics();
  var enableFiberRoots = /* @__PURE__ */ new EnableFiberRoots();
  function isRuntimeConfigFlag_1(self2) {
    return typeof self2 === "object" && self2 != null && RuntimeConfigFlagSym in self2;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashSet/has.mjs
  function has_2(self2, value) {
    void 0;
    return has_(self2._keyMap, value);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/RuntimeConfig/Flags/operations/isEnabled.mjs
  function isEnabled_(self2, flag) {
    return has_2(self2.flags, flag);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberScope/definition.mjs
  var Global = class {
    constructor() {
      this.fiberId = none2;
    }
    unsafeAdd(runtimeConfig, child, __tsplusTrace) {
      if (isEnabled_(runtimeConfig.value.flags, enableFiberRoots)) {
        _roots_1.value.add(child);
        child.unsafeOnDone(() => {
          _roots_1.value.delete(child);
        });
      }
      return true;
    }
  };
  var Local = class {
    constructor(fiberId2, parent) {
      this.fiberId = fiberId2;
      this.parent = parent;
    }
    unsafeAdd(_runtimeConfig, child, __tsplusTrace) {
      const parent = this.parent;
      return parent != null && parent.unsafeAddChild(child);
    }
  };
  var globalScope = /* @__PURE__ */ LazyValue.make(() => new Global());
  function unsafeMake2(fiber) {
    return new Local(fiber.fiberId, fiber);
  }
  var _roots_1 = /* @__PURE__ */ LazyValue.make(() => new Set());

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/forkDaemon.mjs
  function forkDaemon(self2, __tsplusTrace) {
    return suspendSucceed(() => new IFork(self2, () => some(globalScope.value), __tsplusTrace), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/failCauseNow.mjs
  function failCauseNow(cause, __tsplusTrace) {
    return new IFail(() => cause, __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/done.mjs
  function done2(exit2, __tsplusTrace) {
    return suspendSucceed(() => {
      const exit0 = exit2();
      return exit0._tag === "Success" ? succeedNow(exit0.value, __tsplusTrace) : failCauseNow(exit0.cause, __tsplusTrace);
    }, __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Fiber/operations/await.mjs
  var _await = _await_1;
  function _await_1(self2, __tsplusTrace) {
    void 0;
    return self2._await;
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Fiber/operations/inheritRefs.mjs
  function inheritRefs(self2, __tsplusTrace) {
    void 0;
    return self2._inheritRefs;
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/as.mjs
  function as_(self2, value, __tsplusTrace) {
    return map_(self2, value, __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/zipLeft.mjs
  function zipLeft_(self2, that, __tsplusTrace) {
    return flatMap_(self2, (a) => as_(that(), () => a, __tsplusTrace), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Fiber/operations/join.mjs
  function join(self2, __tsplusTrace) {
    return zipLeft_(flatMap_(_await(self2, __tsplusTrace), (exit2) => done2(() => exit2, __tsplusTrace), __tsplusTrace), () => inheritRefs(self2, __tsplusTrace), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Cause/operations/find.mjs
  function find_(self2, f) {
    return run(findSafe(self2, f));
  }
  function findSafe(self2, f) {
    const result = f(self2);
    if (result._tag === "Some") {
      return succeed2(() => result);
    }
    void 0;
    switch (self2._tag) {
      case "Both":
      case "Then":
        return flatMap_2(suspend(() => findSafe(self2.left, f)), (leftResult) => leftResult._tag === "Some" ? succeedNow2(leftResult) : findSafe(self2.right, f));
      case "Stackless": {
        return suspend(() => findSafe(self2.cause, f));
      }
      default:
        return succeed2(() => result);
    }
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Cause/operations/isInterrupted.mjs
  function isInterrupted(self2) {
    return isSome(find_(self2, (cause) => isInterruptType(cause) ? some(void 0) : none));
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Cause/operations/foldLeft.mjs
  function foldLeft_(self2, initial3, f) {
    let acc = initial3;
    void 0;
    let current = self2;
    let causes = void 0;
    while (current) {
      const result = f(acc, current);
      acc = result._tag === "Some" ? result.value : acc;
      void 0;
      switch (current._tag) {
        case "Then": {
          causes = new Stack(current.right, causes);
          void 0;
          current = current.left;
          break;
        }
        case "Both": {
          causes = new Stack(current.right, causes);
          void 0;
          current = current.left;
          break;
        }
        case "Stackless": {
          void 0;
          current = current.cause;
          break;
        }
        default: {
          current = void 0;
          break;
        }
      }
      if (!current && causes) {
        void 0;
        current = causes.value;
        causes = causes.previous;
      }
    }
    return acc;
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Cause/operations/interruptors.mjs
  function interruptors(self2) {
    return foldLeft_(self2, empty4(), (acc, curr) => isInterruptType(curr) ? some(add_(acc, curr.fiberId)) : some(acc));
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/foldCauseEffect.mjs
  function foldCauseEffect_(self2, failure, success, __tsplusTrace) {
    return new IFold(self2, failure, success, __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/interruption.mjs
  var fileName_14 = "(@effect/core) _src/io/Effect/operations/interruption.ts";
  var uninterruptible = uninterruptible_1;
  var uninterruptibleMask = uninterruptibleMask_1;
  var onInterrupt_ = onInterrupt_1;
  var interruptAs = interruptAs_1;
  var InterruptStatusRestoreImpl = class {
    constructor(flag) {
      this.flag = flag;
      this.restore = (effect2, __tsplusTrace) => {
        return suspendSucceed(() => interruptStatus_1(effect2(), () => this.flag, fileName_14 + ":34:58"), fileName_14 + ":34:33");
      };
      this.force = (effect2, __tsplusTrace) => {
        return suspendSucceed(() => this.flag.isUninterruptible ? interruptible_1(disconnect_1(uninterruptible_1(effect2(), fileName_14 + ":43:35"), fileName_14 + ":43:48"), fileName_14 + ":43:64") : interruptStatus_1(effect2(), () => this.flag, fileName_14 + ":44:35"), fileName_14 + ":41:33");
      };
    }
  };
  var interrupt3 = /* @__PURE__ */ flatMap_(fiberId, (fiberId2) => interruptAs_1(() => fiberId2, fileName_14 + ":58:80"), fileName_14 + ":58:48");
  function interruptStatus_1(self2, flag, __tsplusTrace) {
    return new IInterruptStatus(self2, flag, __tsplusTrace);
  }
  function interruptible_1(self2, __tsplusTrace) {
    return interruptStatus_1(self2, () => Interruptible, __tsplusTrace);
  }
  function uninterruptible_1(self2, __tsplusTrace) {
    return interruptStatus_1(self2, () => Uninterruptible, __tsplusTrace);
  }
  function checkInterruptible_1(f, __tsplusTrace) {
    return new ICheckInterrupt(f, __tsplusTrace);
  }
  function uninterruptibleMask_1(f, __tsplusTrace) {
    return checkInterruptible_1((flag) => uninterruptible_1(f(new InterruptStatusRestoreImpl(flag)), __tsplusTrace), __tsplusTrace);
  }
  function disconnect_1(effect2, __tsplusTrace) {
    return uninterruptibleMask_1(({
      restore
    }) => flatMap_(fiberId, (id) => flatMap_(forkDaemon(restore(() => effect2, __tsplusTrace), __tsplusTrace), (fiber) => onInterrupt_1(restore(() => join(fiber, __tsplusTrace), __tsplusTrace), () => forkDaemon(interruptAsNow_(fiber, id, __tsplusTrace), __tsplusTrace), __tsplusTrace), __tsplusTrace), __tsplusTrace), __tsplusTrace);
  }
  function onInterrupt_1(self2, cleanup, __tsplusTrace) {
    return uninterruptibleMask_1(({
      restore
    }) => foldCauseEffect_(restore(() => self2, __tsplusTrace), (cause) => isInterrupted(cause) ? zipRight_(cleanup(interruptors(cause)), () => failCauseNow(cause, __tsplusTrace), __tsplusTrace) : failCauseNow(cause, __tsplusTrace), succeedNow, __tsplusTrace), __tsplusTrace);
  }
  function interruptAs_1(fiberId2, __tsplusTrace) {
    return failCause(() => interrupt(fiberId2()), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/intoDeferred.mjs
  function intoDeferred_(self2, promise, __tsplusTrace) {
    return uninterruptibleMask(({
      restore
    }) => flatMap_(exit(restore(() => self2, __tsplusTrace), __tsplusTrace), (exit2) => promise().done(() => exit2, __tsplusTrace), __tsplusTrace), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/die.mjs
  function die2(f, __tsplusTrace) {
    return failCause(() => die(f(), none3), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/fail.mjs
  function fail2(error, __tsplusTrace) {
    return failCause(() => fail(error(), none3), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Deferred/definition.mjs
  var _a14;
  var fileName_15 = "(@effect/core) _src/io/Deferred/definition.ts";
  var DeferredSym = /* @__PURE__ */ Symbol.for("@effect/core/io/Deferred");
  function interruptJoiner(self2, joiner, __tsplusTrace) {
    return succeed(() => {
      const state = self2.state.get;
      if (state._tag === "Pending") {
        self2.state.set(pending(state.joiners.filter((j) => j !== joiner)));
      }
    }, __tsplusTrace);
  }
  var DeferredInternal = class {
    constructor(state, blockingOn) {
      this.state = state;
      this.blockingOn = blockingOn;
      this[_a14] = DeferredSym;
    }
    await(__tsplusTrace) {
      return asyncInterruptBlockingOn((k) => {
        const state = this.state.get;
        switch (state._tag) {
          case "Done": {
            return right(state.value);
          }
          case "Pending": {
            this.state.set(pending([k, ...state.joiners]));
            return left(interruptJoiner(this, k, fileName_15 + ":78:45"));
          }
        }
      }, () => this.blockingOn, fileName_15 + ":69:43");
    }
    complete(effect2, __tsplusTrace) {
      return intoDeferred_(effect2, () => this, fileName_15 + ":96:31");
    }
    completeWith(effect2, __tsplusTrace) {
      return succeed(() => {
        const state = this.state.get;
        switch (state._tag) {
          case "Done": {
            return false;
          }
          case "Pending": {
            this.state.set(done(effect2));
            state.joiners.forEach((f) => {
              f(effect2);
            });
            return true;
          }
        }
      }, fileName_15 + ":111:26");
    }
    die(defect, __tsplusTrace) {
      return this.completeWith(die2(defect, fileName_15 + ":137:40"), fileName_15 + ":137:29");
    }
    done(exit2, __tsplusTrace) {
      return this.completeWith(done2(exit2, fileName_15 + ":149:41"), fileName_15 + ":149:29");
    }
    fail(e, __tsplusTrace) {
      return this.completeWith(fail2(e, fileName_15 + ":157:41"), __tsplusTrace);
    }
    failCause(cause, __tsplusTrace) {
      return this.completeWith(failCause(cause, fileName_15 + ":169:46"), fileName_15 + ":169:29");
    }
    interrupt(__tsplusTrace) {
      return flatMap_(fiberId, (id) => this.completeWith(interruptAs(() => id, fileName_15 + ":177:79"), fileName_15 + ":177:60"), fileName_15 + ":177:34");
    }
    interruptAs(fiberId2, __tsplusTrace) {
      return this.completeWith(interruptAs(fiberId2, fileName_15 + ":189:48"), fileName_15 + ":189:29");
    }
    isDone(__tsplusTrace) {
      return succeed(() => this.state.get._tag === "Done", fileName_15 + ":197:26");
    }
    poll(__tsplusTrace) {
      return succeed(() => {
        const state = this.state.get;
        switch (state._tag) {
          case "Pending": {
            return none;
          }
          case "Done": {
            return some(state.value);
          }
        }
      }, fileName_15 + ":208:26");
    }
    succeed(value, __tsplusTrace) {
      return this.completeWith(succeed(value, fileName_15 + ":229:44"), fileName_15 + ":229:29");
    }
    unsafeDone(effect2) {
      const state = this.state.get;
      if (state._tag === "Pending") {
        this.state.set(done(effect2));
        Array.from(state.joiners).reverse().forEach((f) => {
          f(effect2);
        });
      }
    }
  };
  _a14 = DeferredSym;

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Deferred/operations/unsafeMake.mjs
  function unsafeMake3(fiberId2) {
    return new DeferredInternal(new AtomicReference(pending([])), fiberId2);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Exit/operations/map.mjs
  function map_5(self2, f) {
    switch (self2._tag) {
      case "Failure":
        return self2;
      case "Success":
        return succeed3(f(self2.value));
    }
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Exit/operations/zipWith.mjs
  function zipWith_2(self2, that, f, g) {
    switch (self2._tag) {
      case "Failure": {
        switch (that._tag) {
          case "Success": {
            return self2;
          }
          case "Failure": {
            return failCause2(g(self2.cause, that.cause));
          }
        }
      }
      case "Success": {
        switch (that._tag) {
          case "Success": {
            return succeed3(f(self2.value, that.value));
          }
          case "Failure": {
            return that;
          }
        }
      }
    }
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Exit/operations/collectAllPar.mjs
  function collectAllPar(exits) {
    const head3 = exits[Symbol.iterator]().next();
    if (!head3.done && head3.value) {
      return some(reduce_(skip_(exits, 1), map_5(head3.value, (a) => make5(a)), (acc, el) => zipWith_2(acc, el, (list, a) => prepend_(list, a), combinePar)));
    }
    return none;
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Cause/operations/fold.mjs
  function fold_2(self2, onEmptyCause, onFailCause, onDieCause, onInterruptCause, onThenCause, onBothCause, onStacklessCause) {
    return run(foldSafe(self2, onEmptyCause, onFailCause, onDieCause, onInterruptCause, onThenCause, onBothCause, onStacklessCause));
  }
  function foldSafe(self2, onEmptyCause, onFailCause, onDieCause, onInterruptCause, onThenCause, onBothCause, onStacklessCause) {
    void 0;
    switch (self2._tag) {
      case "Empty":
        return succeed2(onEmptyCause);
      case "Fail":
        return succeed2(() => onFailCause(self2.value, self2.trace));
      case "Die":
        return succeed2(() => onDieCause(self2.value, self2.trace));
      case "Interrupt":
        return succeed2(() => onInterruptCause(self2.fiberId, self2.trace));
      case "Both":
        return zipWith_(suspend(() => foldSafe(self2.left, onEmptyCause, onFailCause, onDieCause, onInterruptCause, onThenCause, onBothCause, onStacklessCause)), () => suspend(() => foldSafe(self2.right, onEmptyCause, onFailCause, onDieCause, onInterruptCause, onThenCause, onBothCause, onStacklessCause)), (left2, right2) => onBothCause(left2, right2));
      case "Then":
        return zipWith_(suspend(() => foldSafe(self2.left, onEmptyCause, onFailCause, onDieCause, onInterruptCause, onThenCause, onBothCause, onStacklessCause)), () => suspend(() => foldSafe(self2.right, onEmptyCause, onFailCause, onDieCause, onInterruptCause, onThenCause, onBothCause, onStacklessCause)), (left2, right2) => onThenCause(left2, right2));
      case "Stackless":
        return map_3(suspend(() => foldSafe(self2.cause, onEmptyCause, onFailCause, onDieCause, onInterruptCause, onThenCause, onBothCause, onStacklessCause)), (z) => onStacklessCause(z, self2.stackless));
    }
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Cause/operations/stripFailures.mjs
  function stripFailures(self2) {
    return fold_2(self2, () => empty5, () => empty5, (defect, trace) => new Die(defect, trace), (fiberId2, trace) => new Interrupt(fiberId2, trace), (left2, right2) => new Then(left2, right2), (left2, right2) => new Both(left2, right2), (cause, stackless2) => new Stackless(cause, stackless2));
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Fiber/operations/interrupt.mjs
  function interrupt4(self2, __tsplusTrace) {
    return flatMap_(fiberId, (fiberId2) => interruptAsNow_(self2, fiberId2, __tsplusTrace), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/transplant.mjs
  function transplant(f, __tsplusTrace) {
    return suspendSucceed(() => new IGetForkScope((scope) => f((effect2, __tsplusTrace2) => suspendSucceed(() => new IOverrideForkScope(effect2(), some(scope), __tsplusTrace2), __tsplusTrace2))), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Exit/operations/unit.mjs
  var unit2 = /* @__PURE__ */ succeed3(void 0);

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Exit/operations/collectAll.mjs
  function collectAll(exits) {
    const head3 = exits[Symbol.iterator]().next();
    if (!head3.done && head3.value) {
      return some(map_5(reduce_(skip_(exits, 1), map_5(head3.value, (a) => make5(a)), (acc, el) => zipWith_2(acc, el, (list, a) => prepend_(list, a), (e1, e2) => combineSeq(e1, e2))), (list) => reverse(list)));
    }
    return none;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/data/Maybe/getOrElse.mjs
  function getOrElse_(self2, onNone) {
    return isNone(self2) ? onNone() : self2.value;
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/flatten.mjs
  function flattenNow(self2, __tsplusTrace) {
    return flatMap_(self2, identity, __tsplusTrace);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/mutable/DoublyLinkedList.mjs
  var LinkedListNode = class {
    constructor(value) {
      this.value = value;
      this.removed = false;
      this.right = void 0;
      this.left = void 0;
    }
  };
  var DoublyLinkedList = class {
    constructor() {
      this.length = 0;
      this.headN = void 0;
      this.tailN = void 0;
    }
    get head() {
      return this.headN === void 0 ? void 0 : this.headN.value;
    }
    get isEmpty() {
      return this.length === 0;
    }
    get tail() {
      return this.tailN === void 0 ? void 0 : this.tailN.value;
    }
    forEach(f) {
      let current = this.headN;
      while (current !== void 0) {
        f(current.value);
        current = current.right;
      }
    }
    add(value) {
      const node = new LinkedListNode(value);
      if (this.length === 0) {
        this.headN = node;
      }
      if (this.tailN === void 0) {
        this.tailN = node;
      } else {
        this.tailN.right = node;
        node.left = this.tailN;
        this.tailN = node;
      }
      this.length += 1;
      return node;
    }
    empty() {
      this.length = 0;
      this.headN = this.tailN = void 0;
    }
    pop() {
      const h = this.tailN;
      if (h !== void 0) {
        this.remove(h);
        return h.value;
      }
      return void 0;
    }
    remove(n) {
      if (n.removed) {
        return;
      }
      n.removed = true;
      if (n.left !== void 0 && n.right !== void 0) {
        n.left.right = n.right;
        n.right.left = n.left;
      } else if (n.left !== void 0) {
        this.tailN = n.left;
        n.left.right = void 0;
      } else if (n.right !== void 0) {
        this.headN = n.right;
        n.right.left = void 0;
      } else {
        this.tailN = void 0;
        this.headN = void 0;
      }
      if (this.length > 0) {
        this.length -= 1;
      }
    }
    shift() {
      const h = this.headN;
      if (h !== void 0) {
        this.remove(h);
        return h.value;
      }
      return void 0;
    }
    [Symbol.iterator]() {
      let done6 = false;
      let head3 = this.headN;
      return {
        next() {
          if (done6) {
            return this.return();
          }
          if (head3 == null) {
            done6 = true;
            return this.return();
          }
          const value = head3.value;
          head3 = head3.right;
          return {
            done: done6,
            value
          };
        },
        return(value) {
          if (!done6) {
            done6 = true;
          }
          return {
            done: true,
            value
          };
        }
      };
    }
  };

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/mutable/MutableQueue/definition.mjs
  var MutableQueueSym = /* @__PURE__ */ Symbol.for("@tsplus/stdlib/collections/mutable/MutableQueue");
  var EmptyMutableQueue = /* @__PURE__ */ Symbol.for("@tsplus/stdlib/collections/mutable/MutableQueue/Empty");

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/mutable/MutableQueue/_internal/Bounded.mjs
  var _a15;
  var Bounded = class {
    constructor(max) {
      this[_a15] = MutableQueueSym;
      this.queue = new DoublyLinkedList();
      this.max = max;
    }
    get size() {
      return this.queue.length;
    }
    get isEmpty() {
      return this.size === 0;
    }
    get isFull() {
      return this.size === this.capacity;
    }
    get capacity() {
      return this.max;
    }
    offer(value) {
      if (this.isFull) {
        return false;
      }
      this.queue.add(value);
      return true;
    }
    offerAll(as) {
      const it = as[Symbol.iterator]();
      let next2;
      let rem = empty();
      let offering = true;
      while (offering && (next2 = it.next()) && !next2.done) {
        offering = this.offer(next2.value);
      }
      while (next2 && !next2.done) {
        rem = append_(rem, next2.value);
        next2 = it.next();
      }
      return rem;
    }
    poll(a) {
      if (this.isEmpty) {
        return a;
      }
      return this.queue.shift();
    }
    pollUpTo(n) {
      let result = empty();
      let count = 0;
      while (count < n) {
        const elem = this.poll(EmptyMutableQueue);
        if (elem === EmptyMutableQueue) {
          break;
        }
        result = append_(result, elem);
        count += 1;
      }
      return result;
    }
    [(_a15 = MutableQueueSym, Symbol.iterator)]() {
      return this.queue[Symbol.iterator]();
    }
  };

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/mutable/MutableQueue/bounded.mjs
  function bounded(n) {
    return new Bounded(n);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/mutable/MutableQueue/_internal/Unbounded.mjs
  var _a16;
  var Unbounded = class {
    constructor() {
      this[_a16] = MutableQueueSym;
      this.queue = new DoublyLinkedList();
    }
    get size() {
      return this.queue.length;
    }
    get isEmpty() {
      return this.size === 0;
    }
    get isFull() {
      return false;
    }
    get capacity() {
      return Number.MAX_SAFE_INTEGER;
    }
    offer(a) {
      this.queue.add(a);
      return true;
    }
    offerAll(as) {
      for (const a of as) {
        this.offer(a);
      }
      return empty();
    }
    poll(a) {
      if (this.isEmpty) {
        return a;
      }
      return this.queue.shift();
    }
    pollUpTo(n) {
      let result = empty();
      let count = 0;
      while (count < n) {
        const elem = this.poll(EmptyMutableQueue);
        if (elem === EmptyMutableQueue) {
          break;
        }
        result = append_(result, elem);
        count += 1;
      }
      return result;
    }
    [(_a16 = MutableQueueSym, Symbol.iterator)]() {
      return this.queue[Symbol.iterator]();
    }
  };

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/mutable/MutableQueue/unbounded.mjs
  function unbounded() {
    return new Unbounded();
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/data/AtomicBoolean.mjs
  var AtomicBoolean = class extends AtomicReference {
    constructor(b) {
      super(b);
    }
  };

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Deferred/operations/makeAs.mjs
  function makeAs(fiberId2, __tsplusTrace) {
    return succeed(() => unsafeMake3(fiberId2()), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Deferred/operations/make.mjs
  function make6(__tsplusTrace) {
    return flatMap_(fiberId, (id) => makeAs(() => id, __tsplusTrace), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/asSome.mjs
  function asSome(self2, __tsplusTrace) {
    return map_(self2, some, __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/succeedNone.mjs
  var fileName_16 = "(@effect/core) _src/io/Effect/operations/succeedNone.ts";
  var succeedNone = /* @__PURE__ */ succeed(() => none, fileName_16 + ":6:78");

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/whenEffect.mjs
  function whenEffect(predicate, effect2, __tsplusTrace) {
    return flatMap_(suspendSucceed(predicate, __tsplusTrace), (b) => b ? asSome(effect2(), __tsplusTrace) : succeedNone, __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/suspendSucceedWith.mjs
  function suspendSucceedWith(f, __tsplusTrace) {
    return new ISuspendWith(f, __tsplusTrace);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/single.mjs
  function single(a) {
    return new Singleton(a);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/take.mjs
  function take_(self2, n) {
    return self2._take(n);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/drop.mjs
  function drop_(self2, n) {
    void 0;
    if (n <= 0) {
      return self2;
    } else if (n >= self2.length) {
      return _Empty;
    } else {
      const len = self2.length;
      switch (self2._typeId) {
        case EmptyTypeId: {
          return _Empty;
        }
        case SliceTypeId: {
          return new Slice(self2.chunk, self2.offset + n, self2.length - n);
        }
        case SingletonTypeId: {
          if (n > 0) {
            return _Empty;
          }
          return self2;
        }
        default: {
          return new Slice(self2, n, len - n);
        }
      }
    }
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/splitAt.mjs
  function splitAt_(self2, n) {
    return make2(take_(self2, n), drop_(self2, n));
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/zipWith.mjs
  function zipWith_3(self2, that, f) {
    const length2 = Math.min(self2.length, that.length);
    if (length2 === 0) {
      return empty();
    }
    const leftIterator = self2._arrayLikeIterator();
    const rightIterator = that._arrayLikeIterator();
    let i = 0;
    let j = 0;
    let k = 0;
    let leftLength = 0;
    let rightLength = 0;
    let left2 = void 0;
    let right2 = void 0;
    let leftNext;
    let rightNext;
    let builder2 = empty();
    while (i < length2) {
      if (j < leftLength && k < rightLength) {
        builder2 = append_(builder2, f(left2[j], right2[k]));
        i++;
        j++;
        k++;
      } else if (j === leftLength && (leftNext = leftIterator.next()) && !leftNext.done) {
        left2 = leftNext.value;
        leftLength = left2.length;
        j = 0;
      } else if (k === rightLength && (rightNext = rightIterator.next()) && !rightNext.done) {
        right2 = rightNext.value;
        rightLength = right2.length;
        k = 0;
      }
    }
    return builder2;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/zip.mjs
  function zip_(self2, that) {
    return zipWith_3(self2, that, (a, b) => make2(a, b));
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/forEach.mjs
  function forEach_2(self2, f) {
    void 0;
    switch (self2._typeId) {
      case ArrTypeId: {
        const arr = self2._arrayLike();
        const len = arr.length;
        let i = 0;
        while (i < len) {
          f(arr[i]);
          i++;
        }
        return;
      }
      default: {
        const iterator = self2._arrayLikeIterator();
        let next2;
        while ((next2 = iterator.next()) && !next2.done) {
          const array = next2.value;
          const len = array.length;
          let i = 0;
          while (i < len) {
            const a = array[i];
            f(a);
            i++;
          }
        }
        return;
      }
    }
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/isEmpty.mjs
  function isEmpty2(self2) {
    return self2.length === 0;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/filter.mjs
  var filter_ = filter_1;
  function filter_1(self2, f) {
    void 0;
    switch (self2._typeId) {
      case ArrTypeId: {
        const arr = self2._arrayLike();
        const len = arr.length;
        let i = 0;
        let builder2 = empty();
        while (i < len) {
          const elem = arr[i];
          if (f(elem)) {
            builder2 = append_(builder2, elem);
          }
          i++;
        }
        return builder2;
      }
      default: {
        const iterator = self2._arrayLikeIterator();
        let next2;
        let builder2 = empty();
        while ((next2 = iterator.next()) && !next2.done) {
          const array = next2.value;
          const len = array.length;
          let i = 0;
          while (i < len) {
            const a = array[i];
            if (f(a)) {
              builder2 = append_(builder2, a);
            }
            i++;
          }
        }
        return builder2;
      }
    }
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/unsafeGet.mjs
  function unsafeGet_(self2, n) {
    return self2._get(n);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/prepend.mjs
  function prepend_2(self2, a) {
    return self2._prepend(a);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/concat.mjs
  function concat_(self2, that) {
    return self2._concat(that);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Queue/definition/common.mjs
  var fileName_17 = "(@effect/core) _src/io/Queue/definition/common.ts";
  var QueueSym = /* @__PURE__ */ Symbol.for("@effect/core/io/Queue");
  var CommonProto = {
    get [QueueSym]() {
      return QueueSym;
    },
    isFull(__tsplusTrace) {
      return map_(this.size, (size5) => size5 === this.capacity, fileName_17 + ":115:25");
    },
    isEmpty(__tsplusTrace) {
      return map_(this.size, (size5) => size5 === 0, fileName_17 + ":118:25");
    }
  };
  var DequeueProto = {
    poll(__tsplusTrace) {
      return map_(this.takeUpTo(1, fileName_17 + ":124:25"), (chunk) => head(chunk), fileName_17 + ":124:32");
    },
    takeN(n, __tsplusTrace) {
      return this.takeBetween(n, n);
    },
    takeBetween(min, max) {
      return suspendSucceed(() => takeRemainderLoop(this, min, max, empty(), fileName_17 + ":130:51"), fileName_17 + ":130:33");
    }
  };
  var QueueProto = {
    ...CommonProto,
    ...DequeueProto
  };
  function takeRemainderLoop(self2, min, max, acc, __tsplusTrace) {
    if (max < min) {
      return succeedNow(acc, __tsplusTrace);
    }
    return flatMap_(self2.takeUpTo(max, __tsplusTrace), (bs) => {
      const remaining = min - bs.length;
      if (remaining === 1) {
        return map_(self2.take, (b) => append_(concat_(acc, bs), b), __tsplusTrace);
      }
      if (remaining > 1) {
        return flatMap_(self2.take, (b) => takeRemainderLoop(self2, remaining - 1, max - bs.length - 1, append_(concat_(acc, bs), b), __tsplusTrace), __tsplusTrace);
      }
      return succeedNow(concat_(acc, bs), __tsplusTrace);
    }, __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Queue/operations/_internal/unsafeCompleteDeferred.mjs
  var fileName_18 = "(@effect/core) _src/io/Queue/operations/_internal/unsafeCompleteDeferred.ts";
  function unsafeCompleteDeferred(deferred, a) {
    return deferred.unsafeDone(succeedNow(a, fileName_18 + ":2:47"));
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Queue/operations/_internal/unsafeOfferAll.mjs
  function unsafeOfferAll(queue, as) {
    return queue.offerAll(as);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Queue/operations/_internal/unsafePollAll.mjs
  function unsafePollAll(queue) {
    return queue.pollUpTo(Number.MAX_SAFE_INTEGER);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Queue/operations/_internal/unsafeCompleteTakers.mjs
  function unsafeCompleteTakers(strategy, queue, takers) {
    let keepPolling = true;
    while (keepPolling && !queue.isEmpty) {
      const taker = takers.poll(EmptyMutableQueue);
      if (taker !== EmptyMutableQueue) {
        const element = queue.poll(EmptyMutableQueue);
        if (element !== EmptyMutableQueue) {
          unsafeCompleteDeferred(taker, element);
          strategy.unsafeOnQueueEmptySpace(queue, takers);
        } else {
          unsafeOfferAll(takers, prepend_2(unsafePollAll(takers), taker));
        }
        keepPolling = true;
      } else {
        keepPolling = false;
      }
    }
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Queue/operations/_internal/unsafePollN.mjs
  function unsafePollN(queue, max) {
    return queue.pollUpTo(max);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Queue/operations/_internal/unsafeRemove.mjs
  function unsafeRemove(queue, a) {
    unsafeOfferAll(queue, filter_(unsafePollAll(queue), (b) => a !== b));
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Scope/ReleaseMap/_internal/State.mjs
  var Exited = class {
    constructor(nextKey, exit2, update2) {
      this.nextKey = nextKey;
      this.exit = exit2;
      this.update = update2;
      this._tag = "Exited";
    }
  };
  var Running = class {
    constructor(nextKey, _finalizers, update2) {
      this.nextKey = nextKey;
      this._finalizers = _finalizers;
      this.update = update2;
      this._tag = "Running";
    }
    finalizers() {
      return this._finalizers;
    }
  };

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/excl-forEach.mjs
  var fileName_19 = "(@effect/core) _src/io/Effect/operations/excl-forEach.ts";
  var forEachDiscard = forEachDiscard_1;
  var collectAll2 = collectAll_1;
  function forEach_1(as, f, __tsplusTrace) {
    return suspendSucceed(() => {
      const acc = [];
      return map_(forEachDiscard_1(as, (a) => map_(f(a), (b) => {
        acc.push(b);
      }, __tsplusTrace), __tsplusTrace), () => from2(acc), __tsplusTrace);
    }, __tsplusTrace);
  }
  function forEachDiscard_1(as, f, __tsplusTrace) {
    return flatMap_(succeed(as, __tsplusTrace), (Collection) => forEachDiscardLoop(Collection[Symbol.iterator](), f), __tsplusTrace);
  }
  function forEachDiscardLoop(iterator, f) {
    const next2 = iterator.next();
    return next2.done ? unit : zipRight_(f(next2.value), () => forEachDiscardLoop(iterator, f), fileName_19 + ":92:51");
  }
  function forEachPar_1(as, f, __tsplusTrace) {
    return parallelismWith((option) => fold_(option, () => forEachParUnbounded(as, f, __tsplusTrace), (n) => forEachParN(as, n, f, __tsplusTrace)), __tsplusTrace);
  }
  function forEachParUnbounded(as, f, __tsplusTrace) {
    return suspendSucceed(() => flatMap_(succeed(() => [], __tsplusTrace), (array) => map_(forEachParUnboundedDiscard(() => map_2(as(), (a, n) => [a, n]), ([a, n]) => flatMap_(suspendSucceed(() => f(a), __tsplusTrace), (b) => succeed(() => {
      array[n] = b;
    }, __tsplusTrace), __tsplusTrace), __tsplusTrace), () => from2(array), __tsplusTrace), __tsplusTrace), __tsplusTrace);
  }
  function forEachParN(as, n, f, __tsplusTrace) {
    return suspendSucceed(() => {
      if (n < 1) {
        return dieMessage(() => `Unexpected nonpositive value "${n}" passed to foreachParN`, __tsplusTrace);
      }
      const as0 = from2(as());
      const size5 = size3(as0);
      if (size5 === 0) {
        return succeedNow(empty(), __tsplusTrace);
      }
      function worker(queue, array) {
        return flatMap_(map_(queue.takeUpTo(1, __tsplusTrace), (_) => head(_), __tsplusTrace), (_) => fold_(_, () => unit, ({
          tuple: [a, n2]
        }) => flatMap_(tap_(f(a), (b) => succeed(() => {
          array[n2] = b;
        }, __tsplusTrace), __tsplusTrace), () => worker(queue, array), __tsplusTrace)), __tsplusTrace);
      }
      return flatMap_(succeed(() => new Array(size5), __tsplusTrace), (array) => flatMap_(makeBoundedQueue(size5, __tsplusTrace), (queue) => flatMap_(queue.offerAll(zipWithIndex(as0), __tsplusTrace), () => map_(forEachParUnboundedDiscard(() => replicateNow_(worker(queue, array), n), identity, __tsplusTrace), () => from2(array), __tsplusTrace), __tsplusTrace), __tsplusTrace), __tsplusTrace);
    }, __tsplusTrace);
  }
  function forEachParDiscard_1(as, f, __tsplusTrace) {
    return parallelismWith((option) => fold_(option, () => forEachParUnboundedDiscard(as, f, __tsplusTrace), (n) => forEachParNDiscard(as, n, f, __tsplusTrace)), __tsplusTrace);
  }
  function forEachParUnboundedDiscard(as, f, __tsplusTrace) {
    return suspendSucceed(() => {
      const bs = from2(as());
      const size5 = size3(bs);
      if (size5 === 0) {
        return unit;
      }
      return uninterruptibleMask(({
        restore
      }) => {
        const deferred = unsafeMake3(none2);
        const ref2 = new AtomicNumber(0);
        return flatMap_(transplant((graft) => forEach_1(() => bs, (a) => forkDaemon(graft(() => foldCauseEffect_(restore(() => suspendSucceed(() => f(a), __tsplusTrace), __tsplusTrace), (cause) => zipRight_(deferred.fail(() => void 0, __tsplusTrace), () => failCauseNow(cause, __tsplusTrace), __tsplusTrace), () => {
          if (ref2.incrementAndGet() === size5) {
            deferred.unsafeDone(unit);
            return unit;
          } else {
            return unit;
          }
        }, __tsplusTrace), __tsplusTrace), __tsplusTrace), __tsplusTrace), __tsplusTrace), (fibers) => foldCauseEffect_(restore(() => deferred.await(__tsplusTrace), __tsplusTrace), (cause) => flatMap_(forEachParUnbounded(() => fibers, (fiber) => interrupt4(fiber, __tsplusTrace), __tsplusTrace), (exits) => {
          const collected = collectAllPar(exits);
          if (collected._tag === "Some" && collected.value._tag === "Failure") {
            return failCause(() => combinePar(stripFailures(cause), collected.value.cause), __tsplusTrace);
          }
          return failCause(() => stripFailures(cause), __tsplusTrace);
        }, __tsplusTrace), (_) => forEachDiscard_1(() => fibers, (fiber) => inheritRefs(fiber, __tsplusTrace), __tsplusTrace), __tsplusTrace), __tsplusTrace);
      }, __tsplusTrace);
    }, __tsplusTrace);
  }
  function forEachParNDiscard(as, n, f, __tsplusTrace) {
    return suspendSucceed(() => {
      const as0 = as();
      const bs = from2(as0);
      const size5 = size3(bs);
      if (size5 === 0) {
        return unit;
      }
      function worker(queue) {
        return flatMap_(map_(queue.takeUpTo(1, __tsplusTrace), (chunk) => head(chunk), __tsplusTrace), (option) => fold_(option, () => unit, (a) => flatMap_(f(a), () => worker(queue), __tsplusTrace)), __tsplusTrace);
      }
      return flatMap_(makeBoundedQueue(size5, __tsplusTrace), (queue) => flatMap_(queue.offerAll(as0, __tsplusTrace), () => forEachParUnboundedDiscard(() => replicateNow_(worker(queue), n), identity, __tsplusTrace), __tsplusTrace), __tsplusTrace);
    }, __tsplusTrace);
  }
  function collectAll_1(as, __tsplusTrace) {
    return forEach_1(as, identity, __tsplusTrace);
  }
  function collectAllDiscard(as, __tsplusTrace) {
    return forEachDiscard_1(as, identity, __tsplusTrace);
  }
  function releaseMapReleaseAll(self2, ex, execStrategy, __tsplusTrace) {
    return flattenNow(self2.ref.modify((s) => {
      switch (s._tag) {
        case "Exited": {
          return make2(unit, s);
        }
        case "Running": {
          switch (execStrategy._tag) {
            case "Sequential": {
              return make2(flatMap_(forEach_1(() => Array.from(s.finalizers()).reverse(), ([_, f]) => exit(s.update(f)(ex), __tsplusTrace), __tsplusTrace), (results) => done2(() => getOrElse_(collectAll(results), () => unit2), __tsplusTrace), __tsplusTrace), new Exited(s.nextKey, ex, s.update));
            }
            case "Parallel": {
              return make2(flatMap_(forEachPar_1(() => Array.from(s.finalizers()).reverse(), ([_, f]) => exit(s.update(f)(ex), __tsplusTrace), __tsplusTrace), (results) => done2(() => getOrElse_(collectAllPar(results), () => unit2), __tsplusTrace), __tsplusTrace), new Exited(s.nextKey, ex, s.update));
            }
            case "ParallelN": {
              return make2(withParallelism_(flatMap_(forEachPar_1(() => Array.from(s.finalizers()).reverse(), ([_, f]) => exit(s.update(f)(ex), __tsplusTrace), __tsplusTrace), (results) => done2(() => getOrElse_(collectAllPar(results), () => unit2), __tsplusTrace), __tsplusTrace), execStrategy.n, __tsplusTrace), new Exited(s.nextKey, ex, s.update));
            }
          }
        }
      }
    }, __tsplusTrace), __tsplusTrace);
  }
  function makeBoundedQueue(requestedCapacity, __tsplusTrace) {
    return flatMap_(succeed(() => bounded(requestedCapacity), __tsplusTrace), (queue) => createQueue(queue, new BackPressureStrategy(), __tsplusTrace), __tsplusTrace);
  }
  function createQueue(queue, strategy, __tsplusTrace) {
    return map_(make6(__tsplusTrace), (deferred) => unsafeCreateQueue(queue, unbounded(), deferred, new AtomicBoolean(false), strategy), __tsplusTrace);
  }
  var UnsafeQueueProto = {
    ...QueueProto,
    get capacity() {
      return this.queue.capacity;
    },
    get size() {
      return suspendSucceed(() => this.shutdownFlag.get ? interrupt3 : succeedNow(this.queue.size - this.takers.size + this.strategy.surplusSize, fileName_19 + ":639:28"), fileName_19 + ":636:33");
    },
    get awaitShutdown() {
      return this.shutdownHook.await(fileName_19 + ":646:62");
    },
    get isShutdown() {
      return succeed(() => this.shutdownFlag.get, fileName_19 + ":649:26");
    },
    get shutdown() {
      return uninterruptible(suspendSucceedWith((_, fiberId2) => {
        ;
        this.shutdownFlag.set(true);
        return unit_(whenEffect(() => this.shutdownHook.succeed(() => void 0, fileName_19 + ":655:61"), () => zipRight_(forEachParDiscard_1(() => unsafePollAll(this.takers), (deferred) => deferred.interruptAs(() => fiberId2, fileName_19 + ":661:47"), fileName_19 + ":657:35"), () => this.strategy.shutdown, fileName_19 + ":662:14"), fileName_19 + ":654:31"), fileName_19 + ":663:13");
      }, fileName_19 + ":652:37"), fileName_19 + ":664:23");
    },
    offer(a, __tsplusTrace) {
      return suspendSucceed(() => {
        if (this.shutdownFlag.get) {
          return interrupt3;
        }
        let noRemaining;
        if (this.queue.isEmpty) {
          const taker = this.takers.poll(EmptyMutableQueue);
          if (taker !== EmptyMutableQueue) {
            unsafeCompleteDeferred(taker, a);
            noRemaining = true;
          } else {
            noRemaining = false;
          }
        } else {
          noRemaining = false;
        }
        if (noRemaining) {
          return succeedNow(true, fileName_19 + ":684:33");
        }
        const succeeded = this.queue.offer(a);
        unsafeCompleteTakers(this.strategy, this.queue, this.takers);
        return succeeded ? succeedNow(true, fileName_19 + ":694:28") : this.strategy.handleSurplus(single(a), this.queue, this.takers, this.shutdownFlag, fileName_19 + ":695:61");
      }, fileName_19 + ":667:33");
    },
    offerAll(as, __tsplusTrace) {
      return suspendSucceed(() => {
        if (this.shutdownFlag.get) {
          return interrupt3;
        }
        const as0 = from2(as);
        const pTakers = this.queue.isEmpty ? unsafePollN(this.takers, size3(as0)) : empty();
        const {
          tuple: [forTakers, remaining]
        } = splitAt_(as0, size3(pTakers));
        forEach_2(zip_(pTakers, forTakers), ({
          tuple: [taker, item]
        }) => {
          unsafeCompleteDeferred(taker, item);
        });
        if (isEmpty2(remaining)) {
          return succeedNow(true, fileName_19 + ":722:33");
        }
        const surplus = unsafeOfferAll(this.queue, remaining);
        unsafeCompleteTakers(this.strategy, this.queue, this.takers);
        return isEmpty2(surplus) ? succeedNow(true, fileName_19 + ":732:28") : this.strategy.handleSurplus(surplus, this.queue, this.takers, this.shutdownFlag, fileName_19 + ":733:61");
      }, fileName_19 + ":704:33");
    },
    get take() {
      return suspendSucceedWith((_, fiberId2) => {
        if (this.shutdownFlag.get) {
          return interrupt3;
        }
        const item = this.queue.poll(EmptyMutableQueue);
        if (item !== EmptyMutableQueue) {
          ;
          this.strategy.unsafeOnQueueEmptySpace(this.queue, this.takers);
          return succeedNow(item, fileName_19 + ":752:33");
        } else {
          const deferred = unsafeMake3(fiberId2);
          return onInterrupt_(suspendSucceed(() => {
            ;
            this.takers.offer(deferred);
            unsafeCompleteTakers(this.strategy, this.queue, this.takers);
            return this.shutdownFlag.get ? interrupt3 : deferred.await(fileName_19 + ":766:94");
          }, fileName_19 + ":759:37"), () => {
            return succeed(() => unsafeRemove(this.takers, deferred), fileName_19 + ":768:32");
          }, fileName_19 + ":767:23");
        }
      }, fileName_19 + ":742:37");
    },
    get takeAll() {
      return suspendSucceed(() => this.shutdownFlag.get ? interrupt3 : succeed(() => {
        const as = unsafePollAll(this.queue);
        this.strategy.unsafeOnQueueEmptySpace(this.queue, this.takers);
        return as;
      }, fileName_19 + ":777:25"), fileName_19 + ":774:33");
    },
    takeUpTo(n, __tsplusTrace) {
      return suspendSucceed(() => this.shutdownFlag.get ? interrupt3 : succeed(() => {
        const as = unsafePollN(this.queue, n);
        this.strategy.unsafeOnQueueEmptySpace(this.queue, this.takers);
        return as;
      }, fileName_19 + ":791:25"), fileName_19 + ":788:33");
    }
  };
  function unsafeCreateQueue(queue, takers, shutdownHook, shutdownFlag, strategy) {
    return Object.setPrototypeOf({
      queue,
      takers,
      shutdownHook,
      shutdownFlag,
      strategy
    }, UnsafeQueueProto);
  }
  var BackPressureStrategy = class {
    constructor() {
      this.putters = unbounded();
    }
    handleSurplus(as, queue, takers, isShutdown, __tsplusTrace) {
      return suspendSucceedWith((_, fiberId2) => {
        const deferred = unsafeMake3(fiberId2);
        return onInterrupt_(suspendSucceed(() => {
          this.unsafeOffer(as, deferred);
          this.unsafeOnQueueEmptySpace(queue, takers);
          unsafeCompleteTakers(this, queue, takers);
          return isShutdown.get ? interrupt3 : deferred.await(fileName_19 + ":846:66");
        }, fileName_19 + ":842:35"), () => succeed(() => this.unsafeRemove(deferred), fileName_19 + ":847:42"), fileName_19 + ":847:21");
      }, fileName_19 + ":839:37");
    }
    unsafeRemove(deferred) {
      unsafeOfferAll(this.putters, filter_(unsafePollAll(this.putters), ({
        tuple: [, _]
      }) => _ !== deferred));
    }
    unsafeOffer(as, deferred) {
      let bs = as;
      while (size3(bs) > 0) {
        const head3 = unsafeGet_(bs, 0);
        bs = drop_(bs, 1);
        if (size3(bs) === 0) {
          this.putters.offer(make2(head3, deferred, true));
        } else {
          this.putters.offer(make2(head3, deferred, false));
        }
      }
    }
    unsafeOnQueueEmptySpace(queue, takers) {
      let keepPolling = true;
      while (keepPolling && !queue.isFull) {
        const putter = this.putters.poll(EmptyMutableQueue);
        if (putter !== EmptyMutableQueue) {
          const offered = queue.offer(putter.get(0));
          if (offered && putter.get(2)) {
            unsafeCompleteDeferred(putter.get(1), true);
          } else if (!offered) {
            unsafeOfferAll(this.putters, prepend_2(unsafePollAll(this.putters), putter));
          }
          unsafeCompleteTakers(this, queue, takers);
        } else {
          keepPolling = false;
        }
      }
    }
    get surplusSize() {
      return this.putters.size;
    }
    get shutdown() {
      return flatMap_(fiberId, (fiberId2) => flatMap_(succeed(() => unsafePollAll(this.putters), fileName_19 + ":905:39"), (putters) => map_(forEachPar_1(() => putters, ({
        tuple: [_, promise, lastItem]
      }) => lastItem ? promise.interruptAs(() => fiberId2, fileName_19 + ":908:78") : unit, fileName_19 + ":906:26"), () => void 0, fileName_19 + ":906:8"), fileName_19 + ":905:24"), fileName_19 + ":904:24");
    }
  };

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Many/definition.js
  var ManySym = Symbol.for("@effect/html/data/Many");

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Many/operations/_internal/ManyInternal.js
  var _a17;
  var _b8;
  var ManyInternal = class {
    constructor(placeholders) {
      this.placeholders = placeholders;
      this[_a17] = ManySym;
      this[_b8] = GenericSym;
    }
    get toArray() {
      return this.placeholders;
    }
  };
  _a17 = ManySym, _b8 = GenericSym;

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Many/operations/from.js
  var fileName_110 = "(@effect/html) _src/data/Many/operations/from.ts";
  function from4(placeholders) {
    return map_(collectAll2(() => placeholders.map((_) => {
      if (_ instanceof Base) {
        return _;
      }
      return succeedNow(_, fileName_110 + ":15:29");
    }), fileName_110 + ":10:27"), (_) => new ManyInternal(from(_)), fileName_110 + ":16:10");
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/data/Tuple/toNative.mjs
  function toNative(self2) {
    return self2.tuple;
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/io/WeakCache/definition.js
  var WeakCacheSym = Symbol.for("@effect/html/io/WeakCache");
  var _K2 = Symbol.for("@effect/html/io/WeakCache/K");
  var _V2 = Symbol.for("@effect/html/io/WeakCache/V");

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/io/WeakCache/operations/_internal/InternalWeakCache.js
  var _a18;
  var InternalWeakCache = class {
    constructor(map) {
      this.map = map;
      this[_a18] = WeakCacheSym;
    }
  };
  _a18 = WeakCacheSym;

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/io/WeakCache/operations/from.js
  function from5(entries) {
    return new InternalWeakCache(new WeakMap(map_2(entries, (_) => toNative(_))));
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/io/WeakCache/operations/make.js
  function make7(...entries) {
    return from5(entries);
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/io/WeakCache/operations/empty.js
  function empty6() {
    return make7();
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/io/WeakCache/operations/set.js
  function set(self2, k, v) {
    void 0;
    self2.map.set(k, v);
    return v;
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/io/WeakCache/operations/get.js
  function get2(self2, k) {
    void 0;
    return self2.map.get(k);
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/io/WeakCache/operations/getOrElse.js
  function getOrElse(self2, k, f) {
    const value = get2(self2, k);
    return value == void 0 ? f() : value;
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Portal/definition.js
  var PortalSym = Symbol.for("@effect/html/data/Portal");

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Portal/operations/_internal/InternalPortal.js
  var _a19;
  var InternalPortal = class {
    constructor(children, entry, wire2) {
      this.children = children;
      this.entry = entry;
      this.wire = wire2;
      this[_a19] = PortalSym;
    }
  };
  _a19 = PortalSym;

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Portal/operations/empty.js
  function empty7() {
    return new InternalPortal([], void 0, void 0);
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Entry/errors.js
  var MissingAttributeUpdateHandlerException = class {
  };
  var MissingWireException = class {
  };

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Entry/definition.js
  var EntrySym = Symbol.for("@effect/html/data/Entry");
  var Entry = {
    $: {},
    MissingAttributeUpdateHandlerException,
    MissingWireException
  };

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Entry/operations/_internal/InternalEntry.js
  var _a20;
  var InternalEntry = class {
    constructor(type3, template, content, updates3, wire2) {
      this.type = type3;
      this.template = template;
      this.content = content;
      this.updates = updates3;
      this.wire = wire2;
      this[_a20] = EntrySym;
    }
  };
  _a20 = EntrySym;

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Entry/operations/templateStringsArray.js
  function templateStringsArray(self2) {
    void 0;
    return self2.template;
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Interpolation/operations/templateStringsArray.js
  function templateStringsArray2(self2) {
    void 0;
    return self2.template;
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Entry/operations/type.js
  function type(self2) {
    void 0;
    return self2.type;
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Interpolation/operations/type.js
  function type2(self2) {
    void 0;
    return self2.type;
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Interpolation/operations/isSVG.js
  function isSVG(self2) {
    void 0;
    return self2.type === "svg";
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Interpolation/operations/instrument.js
  var empty8 = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;
  var elements = /<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/?)>/g;
  var attributes = /([^\s\\>"'=]+)\s*=\s*(['"]?)\x01/g;
  var interpolations = /[\x01\x02]/g;
  function instrument(self2) {
    void 0;
    let i = 0;
    return self2.template.join("").trim().replace(elements, (_, name, attrs, selfClosing) => {
      let ml = name + attrs.replace(attributes, "=$2$1").trimEnd();
      if (selfClosing.length) {
        ml += isSVG(self2) || empty8.test(name) ? " /" : "></" + name;
      }
      return "<" + ml + ">";
    }).replace(interpolations, (interpolation2) => interpolation2 === "" ? "<!--" + PREFIX + i++ + "-->" : PREFIX + i++);
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Interpolation/operations/toDocumentFragment.js
  function toHTML(html2) {
    const template = document.createElement("template");
    template.innerHTML = html2;
    return template.content;
  }
  function toSVG(svg2) {
    const xml = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    xml.innerHTML = svg2;
    const content = document.createDocumentFragment();
    content.append(...xml.childNodes);
    return content;
  }
  function toDocumentFragment(self2) {
    return isSVG(self2) ? toSVG(instrument(self2)) : toHTML(instrument(self2));
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Interpolation/operations/isInterpolation.js
  function isInterpolation(u) {
    return u instanceof InternalInterpolation;
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Handler/definition.js
  var HandlerSym = Symbol.for("@effect/html/data/Handler");

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Handler/operations/_internal/HandlerInternal.js
  var _a21;
  var _b9;
  var HandlerInternal = class {
    constructor(eventListener) {
      this.eventListener = eventListener;
      this[_a21] = HandlerSym;
      this[_b9] = GenericSym;
    }
  };
  _a21 = HandlerSym, _b9 = GenericSym;

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Handler/operations/isHandler.js
  function isHandler(u) {
    return u instanceof HandlerInternal;
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Handler/operations/toEventListener.js
  function toEventListener(self2) {
    void 0;
    return self2.eventListener;
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/None/definition.js
  var NoneSym = Symbol.for("@effect/html/data/None");

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/None/operations/_internal/NoneInternal.js
  var _a22;
  var _b10;
  var NoneInternal = class {
    constructor() {
      this[_a22] = GenericSym;
      this[_b10] = NoneSym;
    }
    [(_a22 = GenericSym, _b10 = NoneSym, Equals.sym)](that) {
      return that instanceof NoneInternal;
    }
    [Hash.sym]() {
      return hashString("effect/html/None");
    }
  };

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/None/operations/isNone.js
  function isNone2(u) {
    return u instanceof NoneInternal;
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Many/operations/isMany.js
  function isMany(u) {
    return u instanceof ManyInternal;
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Interpolation/operations/values.js
  function values(self2) {
    void 0;
    return self2.values;
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Template/errors.js
  var NoNextSiblingException = class {
  };
  var NoParentNodeException = class {
  };
  var NoTextNodeException = class {
  };
  var InvalidElementException = class {
  };
  var MissingNodeException = class {
  };
  var MissingAttributeNameException = class {
  };

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Template/definition.js
  var TemplateSym = Symbol.for("@effect/html/data/Template");
  var Template = {
    $: {},
    NoNextSiblingException,
    InvalidElementException,
    NoParentNodeException,
    NoTextNodeException,
    MissingAttributeNameException,
    MissingNodeException
  };

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Template/operations/_internal/InternalTemplate.js
  var _a23;
  var InternalTemplate = class {
    constructor(content, nodes) {
      this.content = content;
      this.nodes = nodes;
      this[_a23] = TemplateSym;
    }
  };
  _a23 = TemplateSym;

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Template/operations/make.js
  function make8(content, nodes) {
    return new InternalTemplate(content, nodes);
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Template/operations/toDocumentFragment.js
  function toDocumentFragment2(self2) {
    void 0;
    return document.importNode(self2.content, true);
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Wire/errors.js
  var NoFirstChildException = class {
  };
  var NoLastChildException = class {
  };

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Wire/definition.js
  var WireSym = Symbol.for("@effect/html/data/Wire");
  var Wire = {
    $: {},
    ELEMENT_NODE: 1,
    NODE_TYPE: 111,
    NoFirstChildException,
    NoLastChildException
  };

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Wire/operations/firstChild.js
  function firstChild(self2) {
    void 0;
    if (self2.firstChild == void 0) {
      throw new Wire.NoFirstChildException();
    }
    return self2.firstChild;
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Wire/operations/lastChild.js
  function lastChild(self2) {
    void 0;
    if (self2.lastChild == void 0) {
      throw new Wire.NoLastChildException();
    }
    return self2.lastChild;
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Wire/operations/make.js
  function make9(portal) {
    return new InternalWire(portal, [...portal.childNodes], portal.firstChild, portal.lastChild);
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Wire/operations/remove.js
  function remove(self2) {
    void 0;
    if (self2.firstChild == void 0) {
      throw new Wire.NoFirstChildException();
    }
    if (self2.lastChild == void 0) {
      throw new Wire.NoLastChildException();
    }
    const range2 = document.createRange();
    range2.setStartAfter(self2.firstChild);
    range2.setEndAfter(self2.lastChild);
    range2.deleteContents();
    return self2.firstChild;
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Wire/operations/valueOf.js
  function valueOf(self2) {
    void 0;
    if (self2.node.childNodes.length !== self2.nodes.length) {
      self2.node.append(...self2.nodes);
    }
    return self2.node;
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Wire/operations/_internal/InternalWire.js
  var _a24;
  var InternalWire = class {
    constructor(node, nodes, firstChild2, lastChild2) {
      this.node = node;
      this.nodes = nodes;
      this.firstChild = firstChild2;
      this.lastChild = lastChild2;
      this.ELEMENT_NODE = Wire.ELEMENT_NODE;
      this.nodeType = Wire.NODE_TYPE;
      this[_a24] = WireSym;
    }
  };
  _a24 = WireSym;

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Wire/operations/isWire.js
  function isWire(u) {
    return u instanceof InternalWire;
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/ElementRef/definition.js
  var ElementRefSym = Symbol.for("@effect/html/data/ElementRef");

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/ElementRef/operations/_internal/ElementRefInternal.js
  var _a25;
  var _b11;
  var fileName_111 = "(@effect/html) _src/data/ElementRef/operations/_internal/ElementRefInternal.ts";
  var ElementRefInternal = class {
    constructor(ref2) {
      this.ref = ref2;
      this[_a25] = ElementRefSym;
      this[_b11] = GenericSym;
    }
    get current() {
      return succeedNow(this.ref.get, fileName_111 + ":13:29");
    }
  };
  _a25 = ElementRefSym, _b11 = GenericSym;

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/ElementRef/operations/isElementRef.js
  function isElementRef(u) {
    return u instanceof ElementRefInternal;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/data/Maybe/fromNullable.mjs
  function fromNullable(a) {
    return a == null ? none : some(a);
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Template/operations/updates.js
  function isNode(u) {
    return u instanceof Node;
  }
  function isElement(u) {
    return u instanceof Element;
  }
  function isDocumentFragment(u) {
    return u instanceof DocumentFragment;
  }
  function diffable(node, operation) {
    if (node == void 0) {
      throw new Template.MissingNodeException();
    }
    if (isWire(node)) {
      if (1 / operation < 0) {
        if (operation) {
          return remove(node);
        }
        return lastChild(node);
      }
      if (operation) {
        return valueOf(node);
      }
      return firstChild(node);
    }
    return node;
  }
  function synchronize(parentNode, a, b, get3, before) {
    const bLength = b.length;
    let aEnd = a.length;
    let bEnd = bLength;
    let aStart = 0;
    let bStart = 0;
    let map = null;
    while (aStart < aEnd || bStart < bEnd) {
      if (aEnd === aStart) {
        const node = bEnd < bLength ? bStart ? get3(b[bStart - 1], -0).nextSibling : get3(b[bEnd - bStart], 0) : before;
        while (bStart < bEnd) {
          parentNode.insertBefore(get3(b[bStart++], 1), node);
        }
      } else if (bEnd === bStart) {
        while (aStart < aEnd) {
          if (!map || !map.has(a[aStart])) {
            parentNode.removeChild(get3(a[aStart], -1));
          }
          aStart++;
        }
      } else if (a[aStart] === b[bStart]) {
        aStart++;
        bStart++;
      } else if (a[aEnd - 1] === b[bEnd - 1]) {
        aEnd--;
        bEnd--;
      } else if (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]) {
        const node = get3(a[--aEnd], -1).nextSibling;
        parentNode.insertBefore(get3(b[bStart++], 1), get3(a[aStart++], -1).nextSibling);
        parentNode.insertBefore(get3(b[--bEnd], 1), node);
        a[aEnd] = b[bEnd];
      } else {
        if (!map) {
          map = new Map();
          let i = bStart;
          while (i < bEnd) {
            map.set(b[i], i++);
          }
        }
        if (map.has(a[aStart])) {
          const index = map.get(a[aStart]);
          if (bStart < index && index < bEnd) {
            let i = aStart;
            let sequence = 1;
            while (++i < aEnd && i < bEnd && map.get(a[i]) === index + sequence) {
              sequence++;
            }
            if (sequence > index - bStart) {
              const node = get3(a[aStart], 0);
              while (bStart < index) {
                parentNode.insertBefore(get3(b[bStart++], 1), node);
              }
            } else {
              parentNode.replaceChild(get3(b[bStart++], 1), get3(a[aStart++], -1));
            }
          } else {
            aStart++;
          }
        } else {
          parentNode.removeChild(get3(a[aStart++], -1));
        }
      }
    }
    return b;
  }
  function diff(comment, oldNodes, newNodes) {
    if (comment.parentNode == void 0) {
      throw new Template.NoParentNodeException();
    }
    return synchronize(comment.parentNode, oldNodes, newNodes, diffable, comment);
  }
  function handlePrimitive(text2, nodes, comment, newValue) {
    if (!text2) {
      text2 = document.createTextNode("");
    }
    text2.data = newValue;
    return diff(comment, nodes, [text2]);
  }
  function handleAnything(comment) {
    let oldValue;
    let text2;
    let nodes = [];
    return (newValue) => {
      switch (typeof newValue) {
        case "string":
        case "number":
        case "boolean":
          if (oldValue !== newValue) {
            oldValue = newValue;
            nodes = handlePrimitive(text2, nodes, comment, newValue.toString());
          }
          break;
        case "object":
        case "undefined":
          if (newValue == void 0) {
            if (oldValue != newValue) {
              oldValue = newValue;
              nodes = diff(comment, nodes, []);
            }
            break;
          }
          if (Array.isArray(newValue)) {
            oldValue = newValue;
            if (newValue.length === 0) {
              nodes = diff(comment, nodes, []);
              break;
            }
            if (isWire(newValue[0]) || isNode(newValue[0])) {
              nodes = diff(comment, nodes, newValue);
              break;
            }
            nodes = handlePrimitive(text2, nodes, comment, String(newValue));
            break;
          }
          if (oldValue !== newValue && (isWire(newValue) || isNode(newValue))) {
            oldValue = newValue;
            nodes = diff(comment, nodes, isDocumentFragment(newValue) ? newValue.childNodes : [newValue]);
          }
          break;
      }
    };
  }
  function event(node, name) {
    let lower;
    let oldValue;
    let type3 = name.slice(2);
    if (!(name in node) && (lower = name.toLowerCase()) in node) {
      type3 = lower.slice(2);
    }
    return (newValue) => {
      if (oldValue !== newValue) {
        if (oldValue != void 0) {
          node.removeEventListener(type3, oldValue);
        }
        if (newValue != void 0) {
          node.addEventListener(type3, newValue);
        }
        oldValue = newValue;
      }
    };
  }
  function attribute(node, name) {
    let oldValue;
    let orphan = true;
    const attributeNode = document.createAttributeNS(null, name);
    return (newValue) => {
      if (oldValue !== newValue) {
        if (newValue == void 0) {
          if (!orphan) {
            node.removeAttributeNode(attributeNode);
            orphan = true;
          }
        } else {
          attributeNode.value = newValue;
          if (orphan) {
            node.setAttributeNodeNS(attributeNode);
            orphan = false;
          }
        }
        oldValue = newValue;
      }
    };
  }
  function ref(node) {
    let oldValue;
    return (newValue) => {
      if (oldValue !== newValue) {
        if (isElementRef(oldValue)) {
          void 0;
          oldValue.ref.set(none);
        }
        oldValue = newValue;
        if (newValue != void 0) {
          void 0;
          newValue.ref.set(fromNullable(node));
        }
      }
    };
  }
  function handleAttribute(node, name) {
    if (name[0] === "o" && name[1] === "n") {
      return event(node, name);
    }
    switch (name) {
      case "ref":
        return ref(node);
    }
    return attribute(node, name);
  }
  function text(node) {
    let oldValue;
    return (newValue) => {
      if (oldValue != newValue) {
        oldValue = newValue;
        node.textContent = newValue == void 0 ? "" : newValue;
      }
    };
  }
  function handlers(fragment, {name, path, type: type3}) {
    const node = path.reduceRight(({childNodes}, i) => {
      const node2 = childNodes[i];
      if (node2 == void 0) {
        throw new Template.MissingNodeException();
      }
      return node2;
    }, fragment);
    if (type3 === "node") {
      return handleAnything(node);
    }
    if (type3 === "attr" && isElement(node)) {
      if (name == void 0) {
        throw new Template.MissingAttributeNameException();
      }
      return handleAttribute(node, name);
    }
    return text(node);
  }
  function updates(self2, fragment) {
    void 0;
    return self2.nodes.map((_) => handlers(fragment, _));
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Interpolation/operations/updates.js
  var interpolation = new RegExp(`(<!--${PREFIX}(\\d+)-->|\\s*${PREFIX}(\\d+)=([^\\s>]))`, "g");
  var passRef = ref(null);

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/io/UpdateCache.js
  var UpdateCache = empty6();

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Interpolation/operations/toTemplate.js
  function createPath(node0) {
    const path = [];
    let {parentNode} = node0;
    let node = node0;
    while (parentNode) {
      path.push(Array.prototype.indexOf.call(parentNode.childNodes, node));
      node = parentNode;
      parentNode = node.parentNode;
    }
    return path;
  }
  var textOnly = /^(?:textarea|script|style|title|plaintext|xmp)$/;
  function toTemplate(self2) {
    void 0;
    const text2 = instrument(self2);
    const content = toDocumentFragment(self2);
    const tw = document.createTreeWalker(content, 1 | 128);
    const nodes = [];
    const length2 = self2.template.length - 1;
    let i = 0;
    let search = `${PREFIX}${i}`;
    while (i < length2) {
      const node = tw.nextNode();
      if (!node) {
        throw new Interpolation.InvalidTemplateException(text2);
      }
      if (node.nodeType === 8 && node instanceof CharacterData) {
        if (node.data === search) {
          nodes.push({type: "node", path: createPath(node), name: void 0});
          search = `${PREFIX}${++i}`;
        }
      } else if (node instanceof Element) {
        while (node.hasAttribute(search)) {
          nodes.push({
            type: "attr",
            path: createPath(node),
            name: node.getAttribute(search)
          });
          node.removeAttribute(search);
          search = `${PREFIX}${++i}`;
        }
        if (textOnly.test(node.localName) && node.textContent?.trim() === `<!--${search}-->`) {
          node.textContent = "";
          nodes.push({type: "text", path: createPath(node), name: void 0});
          search = `${PREFIX}${++i}`;
        }
      }
    }
    return make8(content, nodes);
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/io/TemplateCache.js
  var TemplateCache = empty6();

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Entry/operations/make.js
  function make10(type3, template, content, updates3) {
    return new InternalEntry(type3, template, content, updates3, void 0);
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Interpolation/operations/toEntry.js
  function toEntry(self2) {
    void 0;
    const template = getOrElse(TemplateCache, self2.template, () => set(TemplateCache, self2.template, toTemplate(self2)));
    const fragment = toDocumentFragment2(template);
    return make10(self2.type, self2.template, fragment, updates(template, fragment));
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Portal/operations/getEntry.js
  function getEntry(self2, interpolation2) {
    void 0;
    if (!self2.entry || templateStringsArray(self2.entry) !== templateStringsArray2(interpolation2) || type(self2.entry) !== type2(interpolation2)) {
      self2.entry = toEntry(interpolation2);
    }
    return self2.entry;
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Portal/operations/getChild.js
  function getChild(self2, index) {
    void 0;
    return self2.children[index] ?? (self2.children[index] = empty7());
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Portal/operations/removeChild.js
  function removeChild(self2, index) {
    void 0;
    self2.children[index] = null;
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Portal/operations/unrollValue.js
  function unrollValue(self2, index, values2) {
    const value = values2[index];
    if (isInterpolation(value)) {
      values2[index] = unroll(getChild(self2, index), value);
    } else if (isHandler(value)) {
      values2[index] = toEventListener(value);
    } else if (isNone2(value)) {
      values2[index] = null;
    } else if (isMany(value)) {
      values2[index] = unrollValues(getChild(self2, index), value.toArray);
    } else {
      removeChild(self2, index);
    }
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Portal/operations/resizeChildren.js
  function spliceChildren(self2, length2) {
    void 0;
    if (length2 < self2.children.length) {
      self2.children.splice(length2);
    }
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Portal/operations/unrollValues.js
  function unrollValues(self2, values2) {
    const {length: length2} = values2;
    for (let i = 0; i < length2; i++) {
      unrollValue(self2, i, values2);
    }
    spliceChildren(self2, length2);
    return values2;
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Entry/operations/toWire.js
  function toWire(self2) {
    void 0;
    if (self2.wire == void 0) {
      if (self2.content.firstChild === self2.content.lastChild) {
        if (self2.content.lastChild != void 0) {
          self2.wire = self2.content.lastChild;
        } else {
          self2.wire = self2.content;
        }
      } else {
        self2.wire = make9(self2.content);
      }
    }
    return self2.wire;
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Entry/operations/update.js
  function update(self2, values2) {
    void 0;
    for (let i = 0; i < self2.updates.length; i++) {
      const f = self2.updates[i];
      if (f == void 0) {
        throw new Entry.MissingAttributeUpdateHandlerException();
      }
      f(values2[i]);
    }
    return self2;
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Portal/operations/unroll.js
  function unroll(self2, interpolation2) {
    void 0;
    const entry = getEntry(self2, interpolation2);
    update(entry, unrollValues(self2, values(interpolation2)));
    return toWire(entry);
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Portal/operations/fixed.js
  var fileName_112 = "(@effect/html) _src/data/Portal/operations/fixed.ts";
  function fixed(self2) {
    return (type3, template, placeholders) => map_(from4(placeholders), (values2) => unroll(self2, make(type3, template, values2)), fileName_112 + ":12:32");
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashMap/unsafeGet.mjs
  function unsafeGet_2(self2, key) {
    const element = getHash_(self2, key, hashUnknown(key));
    if (isNone(element)) {
      throw new NoSuchElement();
    }
    return element.value;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashMap/get.mjs
  function get_2(self2, key) {
    return getHash_(self2, key, hashUnknown(key));
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/service/Env.mjs
  function methodAdd(tag2, service) {
    const map = new Map(this.unsafeMap);
    map.set(tag2, service);
    return new Env(map);
  }
  function methodGet(tag2) {
    if (!this.unsafeMap.has(tag2)) {
      throw new NoSuchElement();
    }
    return this.unsafeMap.get(tag2);
  }
  function methodGetMaybe(tag2) {
    return this.unsafeMap.has(tag2) ? some(this.unsafeMap.get(tag2)) : none;
  }
  function methodMerge(that) {
    const map = new Map(this.unsafeMap);
    for (const [tag2, s] of that.unsafeMap) {
      map.set(tag2, s);
    }
    return new Env(map);
  }
  function pruneMethod(...tags) {
    const tagSet = new Set(tags);
    const newEnv = new Map();
    for (const [tag2, s] of this.unsafeMap.entries()) {
      if (tagSet.has(tag2)) {
        newEnv.set(tag2, s);
      }
    }
    return new Env(newEnv);
  }
  var sym2 = /* @__PURE__ */ Symbol("@tsplus/stdlib/Env/Env");
  var Env = /* @__PURE__ */ Object.assign(function self(a, b) {
    if (this != null && this.constructor === self) {
      return createEnv(a);
    }
    return Env.empty.add(a, b);
  }, {
    sym: sym2,
    empty: /* @__PURE__ */ createEnv(/* @__PURE__ */ new Map())
  });
  function createEnv(unsafeMap) {
    return {
      [sym2]: identity,
      add: methodAdd,
      get: methodGet,
      unsafeGet: methodGet,
      getMaybe: methodGetMaybe,
      merge: methodMerge,
      prune: pruneMethod,
      unsafeMap
    };
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/service/Patch.mjs
  var _a26;
  var empty9 = empty_1;
  var combine_ = combine_1;
  var PatchSym = /* @__PURE__ */ Symbol.for("@tsplus/stdlib/service/Patch");
  var Patch = {
    $: {}
  };
  var BasePatch = class {
    constructor() {
      this[_a26] = PatchSym;
    }
  };
  _a26 = PatchSym;
  var Empty3 = class extends BasePatch {
    constructor() {
      super();
      this._tag = "Empty";
    }
  };
  var AddService = class extends BasePatch {
    constructor(tag2, service) {
      super();
      this.tag = tag2;
      this.service = service;
      this._tag = "AddService";
    }
  };
  var AndThen = class extends BasePatch {
    constructor(first, second) {
      super();
      this.first = first;
      this.second = second;
      this._tag = "AndThen";
    }
  };
  var RemoveService = class extends BasePatch {
    constructor(tag2) {
      super();
      this.tag = tag2;
      this._tag = "RemoveService";
    }
  };
  var UpdateService = class extends BasePatch {
    constructor(tag2, update2) {
      super();
      this.tag = tag2;
      this.update = update2;
      this._tag = "UpdateService";
    }
  };
  function patch_(self2, env) {
    const updatedRef = {
      ref: false
    };
    const updated = patchLoop(new Map(env.unsafeMap), make5(self2), updatedRef);
    if (!updatedRef.ref) {
      return new Env(updated);
    }
    const map = new Map();
    for (const [tag2] of env.unsafeMap) {
      if (updated.has(tag2)) {
        map.set(tag2, updated.get(tag2));
        updated.delete(tag2);
      }
    }
    for (const [tag2, s] of updated) {
      map.set(tag2, s);
    }
    return new Env(map);
  }
  function patchLoop(env, patches, updatedRef) {
    var env_1 = env, patches_1 = patches, updatedRef_1 = updatedRef;
    var env_2 = env, patches_2 = patches, updatedRef_2 = updatedRef;
    while (1) {
      if (isNil(patches_1)) {
        return env_1;
      }
      const head3 = patches_1.head;
      void 0;
      const tail = patches_1.tail;
      switch (head3._tag) {
        case "Empty": {
          env_2 = env_1;
          patches_2 = tail;
          updatedRef_2 = updatedRef_1;
          env_1 = env_2;
          patches_1 = patches_2;
          updatedRef_1 = updatedRef_2;
          continue;
        }
        case "AddService": {
          env_2 = env_1.set(head3.tag, head3.service);
          patches_2 = tail;
          updatedRef_2 = updatedRef_1;
          env_1 = env_2;
          patches_1 = patches_2;
          updatedRef_1 = updatedRef_2;
          continue;
        }
        case "AndThen": {
          env_2 = env_1;
          patches_2 = prependAll_(tail, make5(head3.first, head3.second));
          updatedRef_2 = updatedRef_1;
          env_1 = env_2;
          patches_1 = patches_2;
          updatedRef_1 = updatedRef_2;
          continue;
        }
        case "RemoveService": {
          env_2 = (env_1.delete(head3.tag), env_1);
          patches_2 = tail;
          updatedRef_2 = updatedRef_1;
          env_1 = env_2;
          patches_1 = patches_2;
          updatedRef_1 = updatedRef_2;
          continue;
        }
        case "UpdateService": {
          env_2 = env_1.set(head3.tag, head3.update(env_1.get(head3.tag)));
          patches_2 = tail;
          updatedRef_2 = (updatedRef_1.ref = true, updatedRef_1);
          env_1 = env_2;
          patches_1 = patches_2;
          updatedRef_1 = updatedRef_2;
          continue;
        }
      }
    }
  }
  function empty_1() {
    return new Empty3();
  }
  function combine_1(self2, that) {
    return new AndThen(self2, that);
  }
  function diff2(oldValue, newValue) {
    const missingServices = new Map(oldValue.unsafeMap);
    let patch = empty_1();
    for (const [tag2, newService] of newValue.unsafeMap.entries()) {
      if (missingServices.has(tag2)) {
        const old = missingServices.get(tag2);
        missingServices.delete(tag2);
        if (old !== newService) {
          patch = combine_1(patch, new UpdateService(tag2, () => newService));
        }
      } else {
        missingServices.delete(tag2);
        patch = combine_1(patch, new AddService(tag2, newService));
      }
    }
    for (const [tag2] of missingServices.entries()) {
      patch = combine_1(patch, new RemoveService(tag2));
    }
    return patch;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/service/Tag.mjs
  var Tag = /* @__PURE__ */ Object.assign(() => ({
    [Tag.sym]: identity,
    toEnv(value) {
      return Env(this, value);
    }
  }), {
    sym: /* @__PURE__ */ Symbol("@tsplus/stdlib/environment/Tag"),
    is: (u) => typeof u === "object" && u != null && Tag.sym in u
  });

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/service/Service.mjs
  var Service = {
    Tag,
    Env,
    Patch
  };

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/io/RenderContext/definition.js
  var RenderContextSym = Symbol.for("@effect/html/io/RenderContext");
  var RenderContext = {
    $: {},
    Tag: Service.Tag()
  };

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberRef/operations/currentEnvironment.mjs
  var currentEnvironment = /* @__PURE__ */ LazyValue.make(() => unsafeMake(Env.empty));

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/serviceWithEffect.mjs
  function serviceWithEffect(tag2, f, __tsplusTrace) {
    return suspendSucceed(() => flatMap_(get(currentEnvironment.value, __tsplusTrace), (env) => f(env.unsafeGet(tag2)), __tsplusTrace), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/serviceWith.mjs
  function serviceWith(tag2, f, __tsplusTrace) {
    return serviceWithEffect(tag2, (a) => succeedNow(f(a), __tsplusTrace), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Layer/definition.mjs
  var _a27;
  var _b12;
  var _c6;
  var _d4;
  var _e4;
  var _f3;
  var _g2;
  var _h;
  var LayerTypeId = /* @__PURE__ */ Symbol.for("@effect/core/Layer");
  var LayerAbstract = class {
    constructor() {
      this[_a27] = LayerTypeId;
    }
  };
  _a27 = LayerTypeId;
  var ILayerApply = class {
    constructor(self2) {
      this.self = self2;
      this._tag = "LayerApply";
      this[_b12] = LayerTypeId;
    }
  };
  _b12 = LayerTypeId;
  _c6 = LayerTypeId;
  _d4 = LayerTypeId;
  _e4 = LayerTypeId;
  var ILayerScoped = class extends LayerAbstract {
    constructor(self2) {
      super();
      this.self = self2;
      this._tag = "LayerScoped";
    }
  };
  var ILayerSuspend = class {
    constructor(self2) {
      this.self = self2;
      this._tag = "LayerSuspend";
      this[_f3] = LayerTypeId;
    }
  };
  _f3 = LayerTypeId;
  _g2 = LayerTypeId;
  var ILayerZipWithPar = class {
    constructor(self2, that, f) {
      this.self = self2;
      this.that = that;
      this.f = f;
      this._tag = "LayerZipWithPar";
      this[_h] = LayerTypeId;
    }
  };
  _h = LayerTypeId;

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Layer/operations/suspend.mjs
  function suspend2(f) {
    return new ILayerSuspend(f);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Layer/operations/fromValue.mjs
  var fileName_113 = "(@effect/core) _src/io/Layer/operations/fromValue.ts";
  function fromValue(tag2, service) {
    return suspend2(() => new ILayerScoped(map_(succeed(service, fileName_113 + ":9:55"), (service2) => Env(tag2, service2), fileName_113 + ":9:68")));
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/io/RenderContext/operations/make.js
  var make11 = (context) => fromValue(RenderContext.Tag, () => ({
    _tag: "RenderContext",
    context
  }));

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/io/RenderContext/operations/isDOM.js
  var fileName_114 = "(@effect/html) _src/io/RenderContext/operations/isDOM.ts";
  function isDOM() {
    return serviceWith(RenderContext.Tag, ({context}) => context === "DOM", fileName_114 + ":5:28");
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/io/PortalCache.js
  var PortalCache = empty6();

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Portal/operations/wire.js
  function wire(self2) {
    void 0;
    return self2.wire;
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/data/Portal/operations/setWire.js
  function setWire(self2, wire2) {
    void 0;
    self2.wire = wire2;
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/dieNow.mjs
  function dieNow(defect, __tsplusTrace) {
    return failCause(() => die(defect, none3), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Cause/operations/failureMaybe.mjs
  function failureMaybe(self2) {
    return find_(self2, (cause) => isFailType(cause) ? some(cause.value) : none);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Cause/operations/failureOrCause.mjs
  function failureOrCause(self2) {
    return fold_(failureMaybe(self2), () => right(self2), left);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/data/Either/fold.mjs
  function fold_3(self2, onLeft, onRight) {
    return isLeft(self2) ? onLeft(self2.left) : onRight(self2.right);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/foldEffect.mjs
  function foldEffect_(self2, failure, success, __tsplusTrace) {
    return foldCauseEffect_(self2, (cause) => fold_3(failureOrCause(cause), failure, failCauseNow), success, __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/orDieWith.mjs
  function orDieWith_(self2, f, __tsplusTrace) {
    return foldEffect_(self2, (e) => dieNow(f(e), __tsplusTrace), succeedNow, __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/orDie.mjs
  function orDie(self2, __tsplusTrace) {
    return orDieWith_(self2, identity, __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/STM/TryCommit.mjs
  var Done2 = class {
    constructor(exit2) {
      this.exit = exit2;
      this._tag = "Done";
    }
  };
  var Suspend2 = class {
    constructor(journal) {
      this.journal = journal;
      this._tag = "Suspend";
    }
  };
  function done3(exit2) {
    return new Done2(exit2);
  }
  function suspend3(journal) {
    return new Suspend2(journal);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Exit/operations/die.mjs
  function die3(defect) {
    return failCause2(die(defect));
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Exit/operations/fail.mjs
  function fail3(error) {
    return failCause2(fail(error));
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/STM/State.mjs
  var _a28;
  var _b13;
  var _c7;
  var STMStateSym = /* @__PURE__ */ Symbol.for("@effect/core/stm/STM/State");
  var Done3 = class {
    constructor(exit2) {
      this.exit = exit2;
      this._tag = "Done";
      this[_a28] = STMStateSym;
    }
    [(_a28 = STMStateSym, Hash.sym)]() {
      return combine(hashString(this._tag), hashUnknown(this.exit));
    }
    [Equals.sym](that) {
      return isState_1(that) && this[Hash.sym]() === that[Hash.sym]();
    }
  };
  var Interrupted = class {
    constructor() {
      this._tag = "Interrupted";
      this[_b13] = STMStateSym;
    }
    [(_b13 = STMStateSym, Hash.sym)]() {
      return hashString(this._tag);
    }
    [Equals.sym](that) {
      return isState_1(that) && this[Hash.sym]() === that[Hash.sym]();
    }
  };
  var Running2 = class {
    constructor() {
      this._tag = "Running";
      this[_c7] = STMStateSym;
    }
    [(_c7 = STMStateSym, Hash.sym)]() {
      return hashString(this._tag);
    }
    [Equals.sym](that) {
      return isState_1(that) && this[Hash.sym]() === that[Hash.sym]();
    }
  };
  function isState_1(u) {
    return typeof u === "object" && u != null && STMStateSym in u;
  }
  function done4(exit2) {
    switch (exit2._tag) {
      case "Succeed": {
        return new Done3(succeed3(exit2.value));
      }
      case "Die": {
        return new Done3(die3(exit2.value));
      }
      case "Fail": {
        return new Done3(fail3(exit2.value));
      }
      case "Interrupt": {
        return new Done3(interrupt2(exit2.fiberId));
      }
      case "Retry": {
        throw new Error("Bug: done being called on TExit.Retry");
      }
    }
  }
  var interrupted = /* @__PURE__ */ new Interrupted();
  var running = /* @__PURE__ */ new Running2();
  function isRunning(self2) {
    return self2._tag === "Running";
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/TExit/definition.mjs
  var Fail2 = class {
    constructor(value) {
      this.value = value;
      this._tag = "Fail";
    }
    [Hash.sym]() {
      return hashUnknown(this.value);
    }
    [Equals.sym](that) {
      return that instanceof Fail2 && equals(this.value, that.value);
    }
  };
  var Die2 = class {
    constructor(value) {
      this.value = value;
      this._tag = "Die";
    }
    [Hash.sym]() {
      return hashUnknown(this.value);
    }
    [Equals.sym](that) {
      return that instanceof Die2 && equals(this.value, that.value);
    }
  };
  var Interrupt2 = class {
    constructor(fiberId2) {
      this.fiberId = fiberId2;
      this._tag = "Interrupt";
    }
    [Hash.sym]() {
      return hashUnknown(this.fiberId);
    }
    [Equals.sym](that) {
      return that instanceof Interrupt2 && equals(this.fiberId, that.fiberId);
    }
  };
  var Succeed2 = class {
    constructor(value) {
      this.value = value;
      this._tag = "Succeed";
    }
    [Hash.sym]() {
      return hashUnknown(this.value);
    }
    [Equals.sym](that) {
      return that instanceof Succeed2 && equals(this.value, that.value);
    }
  };
  var _retryHash = /* @__PURE__ */ hashRandom();
  var Retry = class {
    constructor() {
      this._tag = "Retry";
    }
    [Hash.sym]() {
      return optimize(_retryHash);
    }
    [Equals.sym](that) {
      return that instanceof Retry;
    }
  };
  function succeed4(a) {
    return new Succeed2(a);
  }
  function fail4(e) {
    return new Fail2(e);
  }
  function die4(e) {
    return new Die2(e);
  }
  function interrupt5(fiberId2) {
    return new Interrupt2(fiberId2);
  }
  var retry = /* @__PURE__ */ new Retry();

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/STM/definition/base.mjs
  var _a29;
  var STMSym = /* @__PURE__ */ Symbol.for("@effect/core/stm/STM");
  var STMBase = class {
    constructor() {
      this[_a29] = STMSym;
    }
  };
  _a29 = STMSym;

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/STM/definition/primitives.mjs
  var _a30;
  var _b14;
  var _c8;
  var _d5;
  var STMEffect = class extends STMBase {
    constructor(f) {
      super();
      this.f = f;
      this._tag = "STMEffect";
    }
  };
  var STMOnFailure = class extends STMBase {
    constructor(stm, onFailure) {
      super();
      this.stm = stm;
      this.onFailure = onFailure;
      this._tag = "STMOnFailure";
    }
    apply(a) {
      return new STMSucceedNow(a);
    }
  };
  var STMOnSuccess = class extends STMBase {
    constructor(stm, apply3) {
      super();
      this.stm = stm;
      this.apply = apply3;
      this._tag = "STMOnSuccess";
    }
  };
  var STMSucceedNow = class extends STMBase {
    constructor(a) {
      super();
      this.a = a;
      this._tag = "STMSucceedNow";
    }
  };
  var STMSucceed = class extends STMBase {
    constructor(a) {
      super();
      this.a = a;
      this._tag = "STMSucceed";
    }
  };
  var STMFailExceptionSym = /* @__PURE__ */ Symbol.for("@effect/core/stm/STM/FailException");
  var STMFailException = class {
    constructor(e) {
      this.e = e;
      this[_a30] = STMFailExceptionSym;
    }
  };
  _a30 = STMFailExceptionSym;
  function isFailException(u) {
    return typeof u === "object" && u != null && STMFailExceptionSym in u;
  }
  var STMDieExceptionSym = /* @__PURE__ */ Symbol.for("@effect/core/stm/STM/DieException");
  _b14 = STMDieExceptionSym;
  function isDieException(u) {
    return typeof u === "object" && u != null && STMDieExceptionSym in u;
  }
  var STMInterruptExceptionSym = /* @__PURE__ */ Symbol.for("@effect/core/stm/STM/InterruptException");
  _c8 = STMInterruptExceptionSym;
  function isInterruptException(u) {
    return typeof u === "object" && u != null && STMInterruptExceptionSym in u;
  }
  var STMRetryExceptionSym = /* @__PURE__ */ Symbol.for("@effect/core/stm/STM/RetryException");
  var STMRetryException = class {
    constructor() {
      this[_d5] = STMRetryExceptionSym;
    }
  };
  _d5 = STMRetryExceptionSym;
  function isRetryException(u) {
    return typeof u === "object" && u != null && STMRetryExceptionSym in u;
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/STM/operations/succeed.mjs
  function succeed5(a) {
    return new STMSucceed(a);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/STM/operations/fail.mjs
  function fail5(e) {
    return new STMEffect(() => {
      throw new STMFailException(e());
    });
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/STM/operations/succeedNow.mjs
  function succeedNow3(a) {
    return new STMSucceedNow(a);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/STM/operations/flatMap.mjs
  function flatMap_3(self2, f) {
    return new STMOnSuccess(self2, f);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/STM/operations/map.mjs
  function map_6(self2, f) {
    return flatMap_3(self2, (a) => succeedNow3(f(a)));
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/STM/operations/zipWith.mjs
  function zipWith_4(self2, that, f) {
    return flatMap_3(self2, (a) => map_6(that(), (b) => f(a, b)));
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/STM/operations/zipRight.mjs
  function zipRight_2(self2, that) {
    return zipWith_4(self2, that, (_, b) => b);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/STM/operations/catchAll.mjs
  function catchAll_(self2, f) {
    return new STMOnFailure(self2, f);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/STM/operations/foldSTM.mjs
  function foldSTM_(self2, g, f) {
    return flatMap_3(catchAll_(map_6(self2, right), (e) => map_6(g(e), left)), (either) => fold_3(either, succeedNow3, f));
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/STM/operations/ensuring.mjs
  function ensuring_(self2, finalizer) {
    return foldSTM_(self2, (e) => zipRight_2(finalizer, () => fail5(() => e)), (a) => zipRight_2(finalizer, () => succeedNow3(a)));
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/STM/operations/_internal/STMDriver.mjs
  var STMDriver = class {
    constructor(self2, journal, fiberId2, r0) {
      this.self = self2;
      this.journal = journal;
      this.fiberId = fiberId2;
      this.yieldOpCount = 2048;
      this.envStack = new Stack(r0);
    }
    unwindStack(error, isRetry) {
      let result = void 0;
      while (this.contStack && result == null) {
        const cont = this.contStack.value;
        this.contStack = this.contStack.previous;
        if (cont._tag === "STMOnFailure") {
          if (!isRetry) {
            result = cont.onFailure(error);
          }
        }
        if (cont._tag === "STMOnRetry") {
          if (isRetry) {
            result = cont.onRetry();
          }
        }
      }
      return result;
    }
    run() {
      let curr = this.self;
      let exit2 = void 0;
      let opCount = 0;
      while (exit2 == null && curr != null) {
        if (opCount === this.yieldOpCount) {
          let valid = true;
          for (const entry of this.journal) {
            valid = entry[1].use((_) => _.isValid());
          }
          if (!valid) {
            exit2 = retry;
          } else {
            opCount = 0;
          }
        } else {
          const k = curr;
          void 0;
          switch (k._tag) {
            case "STMEffect": {
              try {
                const a = k.f(this.journal, this.fiberId, this.envStack.value);
                if (!this.contStack) {
                  exit2 = succeed4(a);
                } else {
                  const cont = this.contStack.value;
                  this.contStack = this.contStack.previous;
                  curr = cont.apply(a);
                }
              } catch (e) {
                if (isRetryException(e)) {
                  curr = this.unwindStack(void 0, true);
                  if (!curr) {
                    exit2 = retry;
                  }
                } else if (isFailException(e)) {
                  curr = this.unwindStack(e.e, false);
                  if (!curr) {
                    exit2 = fail4(e.e);
                  }
                } else if (isDieException(e)) {
                  curr = this.unwindStack(e.e, false);
                  if (!curr) {
                    exit2 = die4(e.e);
                  }
                } else if (isInterruptException(e)) {
                  exit2 = interrupt5(e.fiberId);
                } else {
                  throw e;
                }
              }
              break;
            }
            case "STMOnSuccess": {
              this.contStack = new Stack(k, this.contStack);
              curr = k.stm;
              break;
            }
            case "STMOnFailure": {
              this.contStack = new Stack(k, this.contStack);
              curr = k.stm;
              break;
            }
            case "STMOnRetry": {
              this.contStack = new Stack(k, this.contStack);
              curr = k.stm;
              break;
            }
            case "STMProvide": {
              this.envStack = new Stack(k.f(this.envStack.value), this.envStack);
              curr = ensuring_(k.stm, succeed5(() => {
                this.envStack = this.envStack.previous;
              }));
              break;
            }
            case "STMSucceedNow": {
              const a = k.a;
              if (!this.contStack) {
                exit2 = succeed4(a);
              } else {
                const cont = this.contStack.value;
                this.contStack = this.contStack.previous;
                curr = cont.apply(a);
              }
              break;
            }
            case "STMSucceed": {
              const a = k.a();
              if (!this.contStack) {
                exit2 = succeed4(a);
              } else {
                const cont = this.contStack.value;
                this.contStack = this.contStack.previous;
                curr = cont.apply(a);
              }
              break;
            }
          }
          opCount = opCount + 1;
        }
      }
      return exit2;
    }
  };

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/TRef/definition.mjs
  var TRefSym = /* @__PURE__ */ Symbol.for("@effect/core/stm/TRef");

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/TRef/operations/_internal/TRefInternal.mjs
  var _a31;
  var TRefInternal = class {
    constructor(versioned, todo) {
      this.versioned = versioned;
      this.todo = todo;
      this[_a31] = TRefSym;
    }
  };
  _a31 = TRefSym;

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/support/Scheduler.mjs
  var scheduled = {
    running: false,
    tasks: /* @__PURE__ */ new DoublyLinkedList()
  };
  function starveInternal(depth) {
    const toRun = scheduled.tasks;
    scheduled.tasks = new DoublyLinkedList();
    toRun.forEach((task) => {
      task();
    });
    if (scheduled.tasks.isEmpty) {
      scheduled.running = false;
    } else {
      starve(depth);
    }
  }
  function starve(depth = 0) {
    if (depth >= 2048) {
      setTimeout(() => starveInternal(0), 0);
    } else {
      queueMicrotask(() => starveInternal(depth + 1));
    }
  }
  function scheduleTask(task) {
    scheduled.tasks.add(task);
    if (!scheduled.running) {
      scheduled.running = true;
      starve();
    }
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/STM/Journal.mjs
  var fileName_115 = "(@effect/core) _src/stm/STM/Journal.ts";
  function commitJournal(journal) {
    for (const entry of journal) {
      entry[1].use((_) => _.commit());
    }
  }
  function analyzeJournal(journal) {
    let val = "RO";
    for (const entry of journal) {
      val = entry[1].use((_) => _.isInvalid() ? "I" : _.isChanged() ? "RW" : val);
      if (val === "I") {
        return val;
      }
    }
    return val;
  }
  var emptyTodoMap = /* @__PURE__ */ empty3();
  function collectTodos(journal) {
    const allTodos = new Map();
    for (const entry of journal) {
      const tref = entry[1].use((_) => _.tref);
      void 0;
      const todos = tref.todo.get;
      for (const todo of todos) {
        allTodos.set(todo.get(0), todo.get(1));
      }
      tref.todo.set(emptyTodoMap);
    }
    return allTodos;
  }
  function execTodos(todos) {
    for (const todo of todos) {
      todo[1]();
    }
  }
  function completeTodos_1(exit2, journal) {
    const todos = collectTodos(journal);
    if (todos.size > 0) {
      scheduleTask(() => execTodos(todos));
    }
    return done3(exit2);
  }
  function addTodo(txnId, journal, todoEffect) {
    let added = false;
    for (const entry of journal) {
      const tref = entry[1].use((_) => _.tref);
      void 0;
      const oldTodo = tref.todo.get;
      if (!has_(oldTodo, txnId)) {
        const newTodo = set_(oldTodo, txnId, todoEffect);
        tref.todo.set(newTodo);
        added = true;
      }
    }
    return added;
  }
  function untrackedTodoTargets(oldJournal, newJournal) {
    const untracked = new Map();
    for (const entry of newJournal) {
      const key = entry[0];
      const value = entry[1];
      if (!oldJournal.has(key) && !value.use((_) => _.isNew)) {
        untracked.set(key, value);
      }
    }
    return untracked;
  }
  function tryCommit(fiberId2, stm, state, env) {
    const journal = new Map();
    const value = new STMDriver(stm, journal, fiberId2, env).run();
    const analysis = analyzeJournal(journal);
    if (analysis === "RW") {
      state.compareAndSet(running, done4(value));
      commitJournal(journal);
    } else if (analysis === "I") {
      throw new Error("Bug: invalid journal");
    }
    switch (value._tag) {
      case "Succeed": {
        return completeTodos_1(succeed3(value.value), journal);
      }
      case "Fail": {
        return completeTodos_1(fail3(value.value), journal);
      }
      case "Die": {
        return completeTodos_1(die3(value.value), journal);
      }
      case "Interrupt": {
        return completeTodos_1(interrupt2(fiberId2), journal);
      }
      case "Retry": {
        return suspend3(journal);
      }
    }
  }
  function tryCommitSync(fiberId2, stm, env) {
    const journal = new Map();
    const value = new STMDriver(stm, journal, fiberId2, env).run();
    const analysis = analyzeJournal(journal);
    if (analysis === "RW" && value._tag === "Succeed") {
      commitJournal(journal);
    } else if (analysis === "I") {
      throw new Error("Bug: invalid journal");
    }
    switch (value._tag) {
      case "Succeed": {
        return completeTodos_1(succeed3(value.value), journal);
      }
      case "Fail": {
        return completeTodos_1(fail3(value.value), journal);
      }
      case "Die": {
        return completeTodos_1(die3(value.value), journal);
      }
      case "Interrupt": {
        return completeTodos_1(interrupt2(fiberId2), journal);
      }
      case "Retry": {
        return suspend3(journal);
      }
    }
  }
  function completeTryCommit(exit2, k) {
    k(done2(() => exit2, fileName_115 + ":229:16"));
  }
  function suspendTryCommit(fiberId2, stm, txnId, state, env, k, accum, journal) {
    while (1) {
      addTodo(txnId, journal, () => tryCommitAsync(void 0, fiberId2, stm, txnId, state, env)(k));
      if (isInvalid(journal)) {
        const v = tryCommit(fiberId2, stm, state, env);
        switch (v._tag) {
          case "Done": {
            completeTryCommit(v.exit, k);
            return;
          }
          case "Suspend": {
            const untracked = untrackedTodoTargets(accum, v.journal);
            if (untracked.size > 0) {
              for (const entry of untracked) {
                accum.set(entry[0], entry[1]);
              }
              journal = untracked;
            }
            break;
          }
        }
      } else {
        return;
      }
    }
  }
  function tryCommitAsync(journal, fiberId2, stm, txnId, state, env) {
    return (k) => {
      if (isRunning(state.get)) {
        if (journal == null) {
          const v = tryCommit(fiberId2, stm, state, env);
          switch (v._tag) {
            case "Done": {
              completeTryCommit(v.exit, k);
              break;
            }
            case "Suspend": {
              suspendTryCommit(fiberId2, stm, txnId, state, env, k, v.journal, v.journal);
              break;
            }
          }
        } else {
          suspendTryCommit(fiberId2, stm, txnId, state, env, k, journal, journal);
        }
      }
    };
  }
  function isValid(journal) {
    let valid = true;
    for (const entry of journal) {
      valid = entry[1].use((_) => _.isValid());
      if (!valid) {
        return valid;
      }
    }
    return valid;
  }
  function isInvalid(journal) {
    return !isValid(journal);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/STM/Versioned.mjs
  var _a32;
  var VersionedSym = /* @__PURE__ */ Symbol.for("@effect/core/stm/STM/Versioned");
  var Versioned = class {
    constructor(value) {
      this.value = value;
      this[_a32] = VersionedSym;
    }
  };
  _a32 = VersionedSym;
  function make12(value) {
    return new Versioned(value);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/TSemaphore/definition.mjs
  var TSemaphoreSym = /* @__PURE__ */ Symbol.for("@effect/core/stm/TSemaphore");

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/TSemaphore/operations/_internal/TSemaphoreInternal.mjs
  var _a33;
  var TSemaphoreInternal = class {
    constructor(permits) {
      this.permits = permits;
      this[_a33] = TSemaphoreSym;
    }
  };
  _a33 = TSemaphoreSym;

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Semaphore/definition.mjs
  var SemaphoreSym = /* @__PURE__ */ Symbol.for("@effect/core/io/Semaphore");

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Semaphore/operations/_internal/SemaphoreInternal.mjs
  var _a34;
  var SemaphoreInternal = class {
    constructor(semaphore) {
      this.semaphore = semaphore;
      this[_a34] = SemaphoreSym;
    }
  };
  _a34 = SemaphoreSym;

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Ref/definition.mjs
  var RefSym = /* @__PURE__ */ Symbol.for("@effect/core/io/Ref");
  var SynchronizedSym = /* @__PURE__ */ Symbol.for("@effect/core/io/Ref/Synchronized");

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Ref/operations/_internal/RefInternal.mjs
  var fileName_116 = "(@effect/core) _src/io/Ref/operations/_internal/RefInternal.ts";
  var RefInternal = {
    get [RefSym]() {
      return RefSym;
    },
    getAndSet(a, __tsplusTrace) {
      return this.modify((v) => make2(v, a), fileName_116 + ":17:23");
    },
    getAndUpdate(f, __tsplusTrace) {
      return this.modify((v) => make2(v, f(v)), fileName_116 + ":25:23");
    },
    getAndUpdateSome(pf, __tsplusTrace) {
      return this.modify((v) => make2(v, getOrElse_(pf(v), () => v)), fileName_116 + ":34:23");
    },
    modifySome(fallback, pf, __tsplusTrace) {
      return this.modify((v) => getOrElse_(pf(v), () => make2(fallback, v)), fileName_116 + ":49:23");
    },
    update(f, __tsplusTrace) {
      return this.modify((v) => make2(void 0, f(v)), fileName_116 + ":56:23");
    },
    updateAndGet(f, __tsplusTrace) {
      return this.modify((v) => {
        const result = f(v);
        return make2(result, result);
      }, fileName_116 + ":64:23");
    },
    updateSome(pf, __tsplusTrace) {
      return this.modify((v) => make2(void 0, getOrElse_(pf(v), () => v)), fileName_116 + ":76:23");
    },
    updateSomeAndGet(pf, __tsplusTrace) {
      return this.modify((v) => {
        const result = getOrElse_(pf(v), () => v);
        return make2(result, result);
      }, fileName_116 + ":85:23");
    }
  };

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Ref/operations/_internal/AtomicInternal.mjs
  var fileName_117 = "(@effect/core) _src/io/Ref/operations/_internal/AtomicInternal.ts";
  var UnsafeAPI = class {
    constructor(value) {
      this.value = value;
    }
    get get() {
      return this.value.get;
    }
    getAndSet(a) {
      const current = this.value.get;
      this.value.set(a);
      return current;
    }
    getAndUpdate(f) {
      const current = this.value.get;
      this.value.set(f(current));
      return current;
    }
    getAndUpdateSome(pf) {
      const current = this.value.get;
      const opt = pf(current);
      if (isSome(opt)) {
        this.value.set(opt.value);
      }
      return current;
    }
    modify(f) {
      const current = this.value.get;
      const {
        tuple: [b, a]
      } = f(current);
      this.value.set(a);
      return b;
    }
    modifySome(fallback, pf) {
      const current = this.value.get;
      const tuple = getOrElse_(pf(current), () => make2(fallback, current));
      this.value.set(tuple.get(1));
      return tuple.get(0);
    }
    set(a) {
      return this.value.set(a);
    }
    setAsync(a) {
      return scheduleTask(() => this.value.set(a));
    }
    update(f) {
      const current = this.value.get;
      this.value.set(f(current));
    }
    updateAndGet(f) {
      const current = this.value.get;
      const next2 = f(current);
      this.value.set(next2);
      return next2;
    }
    updateSome(pf) {
      const current = this.value.get;
      const opt = pf(current);
      if (isSome(opt)) {
        this.value.set(opt.value);
      }
    }
    updateSomeAndGet(pf) {
      const current = this.value.get;
      const next2 = pf(current);
      if (isSome(next2)) {
        this.value.set(next2.value);
        return next2.value;
      }
      return current;
    }
  };
  var AtomicInternal = {
    ...RefInternal,
    get [RefSym]() {
      return RefSym;
    },
    get(__tsplusTrace) {
      return succeed(() => this.unsafe.get, fileName_117 + ":99:26");
    },
    modify(f, __tsplusTrace) {
      return succeed(() => this.unsafe.modify(f), fileName_117 + ":102:26");
    },
    set(a, __tsplusTrace) {
      return succeed(() => this.unsafe.set(a), fileName_117 + ":105:26");
    },
    setAsync(a, __tsplusTrace) {
      return succeed(() => this.unsafe.setAsync(a), fileName_117 + ":108:26");
    }
  };

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/STM/Entry.mjs
  var _a35;
  var _b15;
  var EntrySym2 = /* @__PURE__ */ Symbol.for("@effect/core/stm/STM/Entry");
  var Entry2 = class {
    constructor(use) {
      this.use = use;
      this[_a35] = EntrySym2;
    }
  };
  _a35 = EntrySym2;
  function makeEntry(tref0, isNew0) {
    void 0;
    const versioned = tref0.versioned;
    const ops = new EntryOps(tref0, versioned, versioned.value, isNew0, false);
    return new Entry2((f) => f(ops));
  }
  var EntryOpsSym = /* @__PURE__ */ Symbol.for("@effect/core/stm/STM/Entry/Ops");
  var EntryOps = class {
    constructor(tref, expected, newValue, isNew, isChanged) {
      this[_b15] = EntryOpsSym;
      this.tref = tref;
      this.expected = expected;
      this.newValue = newValue;
      this.isNew = isNew;
      this._isChanged = isChanged;
    }
    unsafeSet(value) {
      this._isChanged = true;
      this.newValue = value;
    }
    unsafeGet() {
      return this.newValue;
    }
    commit() {
      void 0;
      this.tref.versioned = make12(this.newValue);
    }
    copy() {
      const ops = new EntryOps(this.tref, this.expected, this.newValue, this.isNew, this.isChanged());
      return new Entry2((f) => f(ops));
    }
    isInvalid() {
      return !this.isValid();
    }
    isValid() {
      void 0;
      return this.tref.versioned === this.expected;
    }
    isChanged() {
      return this._isChanged;
    }
    toString() {
      return `Entry(expected.value = ${this.expected.value}, newValue = ${this.newValue}, tref = ${this.tref}, isChanged = ${this.isChanged()})`;
    }
  };
  _b15 = EntryOpsSym;

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/TRef/operations/_internal/getOrMakeEntry.mjs
  function getOrMakeEntry(self2, journal) {
    if (journal.has(self2)) {
      return journal.get(self2);
    }
    const entry = makeEntry(self2, false);
    journal.set(self2, entry);
    return entry;
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/TRef/operations/unsafeGet.mjs
  function unsafeGet_3(self2, journal) {
    const entry = getOrMakeEntry(self2, journal);
    return entry.use((_) => _.unsafeGet());
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/TRef/operations/unsafeSet.mjs
  function unsafeSet_(self2, value, journal) {
    const entry = getOrMakeEntry(self2, journal);
    entry.use((_) => _.unsafeSet(value));
    return void 0;
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/TSemaphore/operations/acquireN.mjs
  function acquireN_(self2, n) {
    void 0;
    return new STMEffect((journal) => {
      if (n < 0) {
        throw new IllegalArgumentException(`Unexpected negative value ${n} passed to acquireN`);
      }
      const value = unsafeGet_3(self2.permits, journal);
      if (value < n) {
        throw new STMRetryException();
      } else {
        return unsafeSet_(self2.permits, value - n, journal);
      }
    });
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/STM/TxnId.mjs
  var txnCounter_1 = /* @__PURE__ */ new AtomicNumber(0);
  function makeTxnId() {
    return txnCounter_1.incrementAndGet();
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/asyncMaybe.mjs
  var asyncMaybeBlockingOn = asyncMaybeBlockingOn_1;
  function asyncMaybeBlockingOn_1(register, blockingOn, __tsplusTrace) {
    return asyncInterruptBlockingOn((cb) => fold_(register(cb), () => left(unit), right), () => blockingOn, __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/async.mjs
  var _async = _async_1;
  var asyncBlockingOn = asyncBlockingOn_1;
  function _async_1(register, __tsplusTrace) {
    return asyncBlockingOn_1(register, none2, __tsplusTrace);
  }
  function asyncBlockingOn_1(register, blockingOn, __tsplusTrace) {
    return asyncMaybeBlockingOn((cb) => {
      register(cb);
      return none;
    }, blockingOn, __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/catchAllCause.mjs
  function catchAllCause_(self2, f, __tsplusTrace) {
    return foldCauseEffect_(self2, f, succeedNow, __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/environment.mjs
  function environment(__tsplusTrace) {
    return suspendSucceed(() => get(currentEnvironment.value, __tsplusTrace), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/environmentWithEffect.mjs
  function environmentWithEffect(f, __tsplusTrace) {
    return flatMap_(environment(__tsplusTrace), f, __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/STM/operations/atomically.mjs
  function atomically(self2, __tsplusTrace) {
    return environmentWithEffect((env) => suspendSucceedWith((_, fiberId2) => {
      const v = tryCommitSync(fiberId2, self2, env);
      switch (v._tag) {
        case "Done": {
          throw new Effect.Error(v.exit, __tsplusTrace);
        }
        case "Suspend": {
          const txnId = makeTxnId();
          const state = new AtomicReference(running);
          const io = _async(tryCommitAsync(v.journal, fiberId2, self2, txnId, state, env), __tsplusTrace);
          return uninterruptibleMask(({
            restore
          }) => catchAllCause_(restore(() => io, __tsplusTrace), (cause) => {
            state.compareAndSet(running, interrupted);
            const currentState = state.get;
            return currentState._tag === "Done" ? done2(() => currentState.exit, __tsplusTrace) : failCause(() => cause, __tsplusTrace);
          }, __tsplusTrace), __tsplusTrace);
        }
      }
    }, __tsplusTrace), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/STM/operations/commit.mjs
  function commit(self2, __tsplusTrace) {
    return atomically(self2, __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/STM/operations/effect.mjs
  function effect(f) {
    return new STMEffect(f);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/TSemaphore/operations/releaseN.mjs
  function releaseN_(self2, n) {
    void 0;
    return effect((journal) => {
      if (n < 0) {
        throw new IllegalArgumentException(`Unexpected negative value ${n} passed to releaseN`);
      }
      const current = unsafeGet_3(self2.permits, journal);
      return unsafeSet_(self2.permits, current + n, journal);
    });
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/ensuring.mjs
  function ensuring_2(self2, finalizer, __tsplusTrace) {
    return suspendSucceed(() => new IEnsuring(self2, finalizer(), __tsplusTrace), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/TSemaphore/operations/withPermits.mjs
  function withPermits_(self2, permits, __tsplusTrace) {
    return (effect2) => uninterruptibleMask(({
      restore
    }) => zipRight_(restore(() => commit(acquireN_(self2, permits), __tsplusTrace), __tsplusTrace), () => ensuring_2(restore(() => effect2, __tsplusTrace), () => commit(releaseN_(self2, permits), __tsplusTrace), __tsplusTrace), __tsplusTrace), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/TSemaphore/operations/withPermit.mjs
  function withPermit(self2, __tsplusTrace) {
    return (effect2) => withPermits_(self2, 1, __tsplusTrace)(effect2);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Semaphore/operations/withPermit.mjs
  function withPermit2(self2, __tsplusTrace) {
    return (effect2) => {
      void 0;
      return withPermit(self2.semaphore, __tsplusTrace)(effect2);
    };
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Ref/operations/_internal/SynchronizedInternal.mjs
  var fileName_118 = "(@effect/core) _src/io/Ref/operations/_internal/SynchronizedInternal.ts";
  var SynchronizedInternal = {
    ...RefInternal,
    get [RefSym]() {
      return RefSym;
    },
    get [SynchronizedSym]() {
      return SynchronizedSym;
    },
    get(__tsplusTrace) {
      return this.ref.get(fileName_118 + ":25:24");
    },
    modifyEffect(f, __tsplusTrace) {
      return withPermit2(this.semaphore, fileName_118 + ":37:26")(flatMap_(flatMap_(this.get(fileName_118 + ":38:15"), f, fileName_118 + ":38:25"), (tp) => {
        const {
          tuple: [b, a]
        } = tp;
        return as_(this.ref.set(a, fileName_118 + ":41:28"), () => b, fileName_118 + ":41:34");
      }, fileName_118 + ":38:36"));
    },
    set(a, __tsplusTrace) {
      return withPermit2(this.semaphore, fileName_118 + ":50:26")(this.ref.set(a, fileName_118 + ":50:50"));
    },
    setAsync(a, __tsplusTrace) {
      return withPermit2(this.semaphore, fileName_118 + ":57:26")(this.ref.setAsync(a, fileName_118 + ":57:55"));
    },
    getAndUpdateEffect(f, __tsplusTrace) {
      return this.modifyEffect((v) => map_(f(v), (result) => make2(v, result), fileName_118 + ":68:45"), fileName_118 + ":68:29");
    },
    getAndUpdateSomeEffect(pf, __tsplusTrace) {
      return this.modifyEffect((v) => map_(getOrElse_(pf(v), () => succeedNow(v, fileName_118 + ":80:68")), (result) => make2(v, result), fileName_118 + ":80:76"), fileName_118 + ":80:29");
    },
    modify(f, __tsplusTrace) {
      return this.modifyEffect((a) => succeedNow(f(a), fileName_118 + ":83:54"), fileName_118 + ":83:29");
    },
    modifySomeEffect(fallback, pf, __tsplusTrace) {
      return this.modifyEffect((v) => getOrElse_(pf(v), () => succeedNow(make2(fallback, v), fileName_118 + ":97:68")), fileName_118 + ":97:29");
    },
    updateEffect(f, __tsplusTrace) {
      return this.modifyEffect((v) => map_(f(v), (result) => make2(void 0, result), fileName_118 + ":107:43"), fileName_118 + ":107:29");
    },
    updateAndGetEffect(f, __tsplusTrace) {
      return this.modifyEffect((v) => map_(f(v), (result) => make2(result, result), fileName_118 + ":118:43"), fileName_118 + ":118:29");
    },
    updateSomeEffect(pf, __tsplusTrace) {
      return this.modifyEffect((v) => map_(getOrElse_(pf(v), () => succeedNow(v, fileName_118 + ":131:68")), (result) => make2(void 0, result), fileName_118 + ":131:76"), fileName_118 + ":131:29");
    },
    updateSomeAndGetEffect(pf, __tsplusTrace) {
      return this.modifyEffect((v) => map_(getOrElse_(pf(v), () => succeedNow(v, fileName_118 + ":144:68")), (result) => make2(result, result), fileName_118 + ":144:76"), fileName_118 + ":144:29");
    }
  };

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Ref/operations/unsafeMake.mjs
  var unsafeMake4 = unsafeMake_1;
  function unsafeMake_1(value) {
    return Object.setPrototypeOf({
      unsafe: new UnsafeAPI(new AtomicReference(value))
    }, AtomicInternal);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/TRef/operations/make.mjs
  function make13(a) {
    return new STMEffect((journal) => {
      const value = a();
      const versioned = new Versioned(value);
      const todo = new AtomicReference(emptyTodoMap);
      const tref = new TRefInternal(versioned, todo);
      journal.set(tref, makeEntry(tref, true));
      return tref;
    });
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/TSemaphore/operations/make.mjs
  function make14(permits) {
    return map_6(make13(() => permits), (v) => new TSemaphoreInternal(v));
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/stm/TSemaphore/operations/makeCommit.mjs
  function makeCommit(permits, __tsplusTrace) {
    return commit(make14(permits), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Semaphore/operations/make.mjs
  function make15(permits, __tsplusTrace) {
    return map_(makeCommit(permits, __tsplusTrace), (semaphore) => new SemaphoreInternal(semaphore), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/do.mjs
  var fileName_119 = "(@effect/core) _src/io/Effect/operations/do.ts";
  var bind_ = bind_1;
  var bindValue_ = bindValue_1;
  function bind_1(self2, tag2, f, __tsplusTrace) {
    return flatMap_(self2, (k) => map_(f(k), (a) => ({
      ...k,
      [tag2]: a
    }), __tsplusTrace), __tsplusTrace);
  }
  function bindValue_1(self2, tag2, f, __tsplusTrace) {
    return map_(self2, (k) => ({
      ...k,
      [tag2]: f(k)
    }), __tsplusTrace);
  }
  function Do() {
    return succeedNow({}, fileName_119 + ":119:27");
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Ref/operations/make.mjs
  var makeRef = makeRef_1;
  function makeRef_1(value, __tsplusTrace) {
    return succeed(() => unsafeMake4(value()), __tsplusTrace);
  }
  function makeSynchronized(value, __tsplusTrace) {
    return map_(bind_(bind_(Do(), "ref", () => makeRef_1(value, __tsplusTrace), __tsplusTrace), "semaphore", () => make15(1, __tsplusTrace), __tsplusTrace), ({
      ref: ref2,
      semaphore
    }) => Object.setPrototypeOf({
      ref: ref2,
      semaphore
    }, SynchronizedInternal), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/provideEnvironment.mjs
  function provideEnvironment_(self2, environment3, __tsplusTrace) {
    return flatMap_(succeed(environment3, __tsplusTrace), (env) => locally_(currentEnvironment.value, env, __tsplusTrace)(self2), __tsplusTrace);
  }

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/io/Hooks.js
  var fileName_120 = "(@effect/html) _src/io/Hooks.ts";
  var afterRenderRef = unsafeMake(emptyOf());
  function withHooks(fa, f) {
    return flatMap_(makeRef(() => empty(), fileName_120 + ":8:27"), (ref2) => flatMap_(flatMap_(locally_(afterRenderRef, some(ref2), fileName_120 + ":9:44")(fa()), f, fileName_120 + ":9:75"), (result) => map_(flatMap_(ref2.get(fileName_120 + ":12:14"), (hooks) => collectAllDiscard(() => hooks, fileName_120 + ":12:60"), fileName_120 + ":12:24"), () => result, fileName_120 + ":11:6"), fileName_120 + ":9:21"), fileName_120 + ":8:18");
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Layer/operations/fromEffectEnvironment.mjs
  function fromEffectEnvironment(effect2, __tsplusTrace) {
    return suspend2(() => new ILayerApply(effect2()));
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Layer/operations/environment.mjs
  var fileName_121 = "(@effect/core) _src/io/Layer/operations/environment.ts";
  function environment2() {
    return fromEffectEnvironment(() => environment(fileName_121 + ":8:56"), fileName_121 + ":8:37");
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Layer/operations/and.mjs
  function and_(self2, that) {
    return suspend2(() => new ILayerZipWithPar(self2, that(), (a, b) => a.merge(b)));
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/ExecutionStrategy/definition.mjs
  var Sequential = class {
    constructor() {
      this._tag = "Sequential";
    }
  };
  var sequential = /* @__PURE__ */ new Sequential();

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Scope/definition.mjs
  var ScopeSym = /* @__PURE__ */ Symbol.for("@effect/core/io/Scope");
  var CloseableScopeSym = /* @__PURE__ */ Symbol.for("@effect/core/io/Scope/Closeable");
  var Scope = {
    $: {},
    Tag: /* @__PURE__ */ Tag()
  };

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Scope/operations/addFinalizerExit.mjs
  function addFinalizerExit_(self2, finalizer) {
    void 0;
    return self2._addFinalizerExit(finalizer);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Scope/operations/_internal/CloseableScopeInternal.mjs
  var _a36;
  var _b16;
  var CloseableScopeInternal = class {
    constructor(_fork, _addFinalizerExit, _close) {
      this._fork = _fork;
      this._addFinalizerExit = _addFinalizerExit;
      this._close = _close;
      this[_a36] = ScopeSym;
      this[_b16] = CloseableScopeSym;
    }
  };
  _a36 = ScopeSym, _b16 = CloseableScopeSym;

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Scope/operations/close.mjs
  function close_(self2, exit2) {
    void 0;
    return self2._close(exit2);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Scope/ReleaseMap/operations/release.mjs
  function release_(self2, key, exit2, __tsplusTrace) {
    return flattenNow(self2.ref.modify((s) => {
      switch (s._tag) {
        case "Exited": {
          return make2(unit, s);
        }
        case "Running": {
          const finalizers = s.finalizers();
          const finalizer = fromNullable(finalizers.get(key));
          finalizers.delete(key);
          return make2(fold_(finalizer, () => unit, (fin) => s.update(fin)(exit2)), new Running(s.nextKey, finalizers, s.update));
        }
      }
    }, __tsplusTrace), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Scope/ReleaseMap/operations/_internal/next.mjs
  function next(l) {
    return l + 1;
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Scope/ReleaseMap/operations/addIfOpen.mjs
  function addIfOpen_(self2, finalizer, __tsplusTrace) {
    return flattenNow(self2.ref.modify((s) => {
      switch (s._tag) {
        case "Exited": {
          return make2(map_(finalizer(s.exit), () => none, __tsplusTrace), new Exited(next(s.nextKey), s.exit, s.update));
        }
        case "Running": {
          const finalizers = s.finalizers().set(s.nextKey, finalizer);
          return make2(succeed(() => some(s.nextKey), __tsplusTrace), new Running(next(s.nextKey), finalizers, s.update));
        }
      }
    }, __tsplusTrace), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Scope/ReleaseMap/operations/add.mjs
  function add_2(self2, finalizer, __tsplusTrace) {
    return map_(addIfOpen_(self2, finalizer, __tsplusTrace), (_) => fold_(_, () => () => unit, (k) => (e) => release_(self2, k, e, __tsplusTrace)), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Scope/ReleaseMap/operations/releaseAll.mjs
  var releaseAll_ = releaseMapReleaseAll;

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Scope/ReleaseMap/definition.mjs
  var ReleaseMap = class {
    constructor(ref2) {
      this.ref = ref2;
    }
  };
  function apply(ref2) {
    return new ReleaseMap(ref2);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Scope/ReleaseMap/operations/make.mjs
  var fileName_122 = "(@effect/core) _src/io/Scope/ReleaseMap/operations/make.ts";
  var make16 = /* @__PURE__ */ succeed(unsafeMake_12, fileName_122 + ":9:35");
  function unsafeMake_12() {
    return apply(unsafeMake4(new Running(0, new Map(), identity)));
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Scope/operations/makeWith.mjs
  var fileName_123 = "(@effect/core) _src/io/Scope/operations/makeWith.ts";
  var makeWith = makeWith_1;
  function makeWith_1(executionStrategy) {
    return map_(make16, (releaseMap) => new CloseableScopeInternal(uninterruptible(map_(tap_(bind_(bind_(Do(), "scope", () => makeWith_1(() => sequential), fileName_123 + ":16:16"), "finalizer", ({
      scope
    }) => add_2(releaseMap, (exit2) => close_(scope, () => exit2), fileName_123 + ":17:59"), fileName_123 + ":17:16"), ({
      finalizer,
      scope
    }) => addFinalizerExit_(scope, finalizer), fileName_123 + ":18:15"), ({
      scope
    }) => scope, fileName_123 + ":19:15"), fileName_123 + ":20:27"), (finalizer) => unit_(add_2(releaseMap, finalizer, fileName_123 + ":21:38"), fileName_123 + ":21:54"), (exit2) => suspendSucceed(() => unit_(releaseAll_(releaseMap, exit2(), executionStrategy(), fileName_123 + ":24:34"), fileName_123 + ":24:68"), fileName_123 + ":23:32")), fileName_123 + ":12:29");
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Scope/operations/make.mjs
  var make17 = /* @__PURE__ */ makeWith(() => sequential);

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Exit/operations/fold.mjs
  function fold_4(self2, failed, completed) {
    switch (self2._tag) {
      case "Failure":
        return failed(self2.cause);
      case "Success":
        return completed(self2.value);
    }
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/acquireUseReleaseExit.mjs
  function acquireUseReleaseExit(acquire, use, release, __tsplusTrace) {
    return uninterruptibleMask(({
      restore
    }) => flatMap_(acquire(), (a) => flatMap_(exit(suspendSucceed(() => restore(() => use(a), __tsplusTrace), __tsplusTrace), __tsplusTrace), (exit2) => foldCauseEffect_(suspendSucceed(() => release(a, exit2), __tsplusTrace), (cause2) => failCause(() => fold_4(exit2, (cause1) => combineSeq(cause1, cause2), () => cause2), __tsplusTrace), () => done2(() => exit2, __tsplusTrace), __tsplusTrace), __tsplusTrace), __tsplusTrace), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/onExit.mjs
  function onExit_(self2, cleanup, __tsplusTrace) {
    return acquireUseReleaseExit(() => unit, () => self2, (_, exit2) => cleanup(exit2), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/scopeWith.mjs
  function scopeWith(f, __tsplusTrace) {
    return serviceWithEffect(Scope.Tag, f, __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/provideSomeEnvironment.mjs
  function provideSomeEnvironment_(self2, f, __tsplusTrace) {
    return environmentWithEffect((r0) => provideEnvironment_(self2, () => f(r0), __tsplusTrace), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Scope/operations/extend.mjs
  var fileName_124 = "(@effect/core) _src/io/Scope/operations/extend.ts";
  function extend_(self2, effect2) {
    return suspendSucceed(() => provideSomeEnvironment_(effect2(), (env) => env.merge(Env(Scope.Tag, self2)), fileName_124 + ":15:36"), fileName_124 + ":14:31");
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/zipWithPar.mjs
  var fileName_125 = "(@effect/core) _src/io/Effect/operations/zipWithPar.ts";
  function zipWithPar_(self2, that, f, __tsplusTrace) {
    const g = (b, a) => f(a, b);
    return transplant((graft) => descriptorWith((d) => new IRaceWith(() => graft(() => self2, __tsplusTrace), () => graft(that, __tsplusTrace), (winner, loser) => coordinate(d.id, f, true, winner, loser), (winner, loser) => coordinate(d.id, g, false, winner, loser)), __tsplusTrace), __tsplusTrace);
  }
  function coordinate(fiberId2, f, leftWinner, winner, loser) {
    return flatMap_(_await(winner, fileName_125 + ":43:22"), (winnerExit) => fold_4(winnerExit, (winnerCause) => flatMap_(interruptAsNow_(loser, fiberId2, fileName_125 + ":46:26"), (loserExit) => fold_4(loserExit, (loserCause) => leftWinner ? failCause(() => combinePar(winnerCause, loserCause), fileName_125 + ":49:44") : failCause(() => combinePar(loserCause, winnerCause), fileName_125 + ":49:89"), () => failCause(() => winnerCause, fileName_125 + ":50:35")), fileName_125 + ":46:43"), (a) => flatMap_(_await(loser, fileName_125 + ":54:20"), (loserExit) => fold_4(loserExit, (loserCause) => failCause(() => loserCause, fileName_125 + ":56:45"), (b) => zipRight_(zipRight_(inheritRefs(winner, fileName_125 + ":57:38"), () => inheritRefs(loser, fileName_125 + ":57:60"), fileName_125 + ":57:42"), () => succeed(() => f(a, b), fileName_125 + ":57:79"), fileName_125 + ":57:64")), fileName_125 + ":54:30")), fileName_125 + ":43:32");
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/data/Match.mjs
  var pattern_2 = (n) => (m, _, d) => {
    return _[m[n]] ? _[m[n]](m, m) : d(m, m);
  };
  var matchTag_ = /* @__PURE__ */ pattern_2("_tag");

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Layer/memoMap.mjs
  var fileName_126 = "(@effect/core) _src/io/Layer/memoMap.ts";
  var buildWithScope = buildWithScope_1;
  var MemoMap = class {
    constructor(ref2) {
      this.ref = ref2;
    }
    getOrElseMemoize(layer, scope) {
      return flatMap_(succeed(scope, fileName_126 + ":22:26"), (scope2) => flattenNow(this.ref.modifyEffect((map) => {
        const inMap = fromNullable(map.get(layer));
        switch (inMap._tag) {
          case "Some": {
            const {
              tuple: [acquire, release]
            } = inMap.value;
            const cached = onExit_(acquire, (exit2) => fold_4(exit2, () => unit, () => addFinalizerExit_(scope2, release)), fileName_126 + ":32:71");
            return succeed(() => make2(cached, map), fileName_126 + ":39:34");
          }
          case "None": {
            return map_(bindValue_(bindValue_(bind_(bind_(bind_(Do(), "observers", () => makeSynchronized(() => 0, fileName_126 + ":43:61"), fileName_126 + ":43:20"), "deferred", () => make6(fileName_126 + ":44:52"), fileName_126 + ":44:20"), "finalizerRef", () => makeSynchronized(() => () => unit, fileName_126 + ":45:64"), fileName_126 + ":45:20"), "resource", ({
              deferred,
              finalizerRef,
              observers
            }) => uninterruptibleMask(({
              restore
            }) => flatMap_(bind_(bindValue_(Do(), "outerScope", () => scope2, fileName_126 + ":49:31"), "innerScope", () => make17, fileName_126 + ":51:26"), ({
              innerScope,
              outerScope
            }) => flatMap_(exit(restore(() => flatMap_(withScope_1(layer, () => innerScope, fileName_126 + ":53:46"), (f) => f(this), fileName_126 + ":53:66"), fileName_126 + ":53:30"), fileName_126 + ":54:30"), (exit2) => {
              switch (exit2._tag) {
                case "Failure": {
                  return zipRight_(zipRight_(deferred.failCause(() => exit2.cause, fileName_126 + ":59:51"), () => close_(innerScope, () => exit2), fileName_126 + ":59:65"), () => failCause(() => exit2.cause, fileName_126 + ":61:51"), fileName_126 + ":60:59");
                }
                case "Success": {
                  return as_(zipRight_(zipRight_(zipRight_(finalizerRef.set((exit3) => whenEffect(() => observers.modify((n) => make2(n === 1, n - 1), fileName_126 + ":67:51"), () => close_(innerScope, () => exit3), fileName_126 + ":66:50"), fileName_126 + ":65:54"), () => observers.update((n) => n + 1, fileName_126 + ":71:59"), fileName_126 + ":71:42"), () => addFinalizerExit_(outerScope, (e) => flatMap_(finalizerRef.get(fileName_126 + ":73:86"), (fin) => fin(e), fileName_126 + ":73:96")), fileName_126 + ":72:42"), () => deferred.succeed(() => exit2.value, fileName_126 + ":75:59"), fileName_126 + ":75:42"), () => exit2.value, fileName_126 + ":76:36");
                }
              }
            }, fileName_126 + ":55:33"), fileName_126 + ":52:29"), fileName_126 + ":47:43"), fileName_126 + ":46:25"), "memoized", ({
              deferred,
              finalizerRef,
              observers
            }) => make2(onExit_(deferred.await(fileName_126 + ":84:33"), (exit2) => fold_4(exit2, () => unit, () => observers.update((n) => n + 1, fileName_126 + ":89:47")), fileName_126 + ":85:28"), (e) => flatMap_(finalizerRef.get(fileName_126 + ":92:66"), (fin) => fin(e), fileName_126 + ":92:76")), fileName_126 + ":82:25"), ({
              memoized,
              resource
            }) => make2(resource, isFresh_1(layer) ? map : map.set(layer, memoized)), fileName_126 + ":94:19");
          }
        }
      }, fileName_126 + ":23:28"), fileName_126 + ":97:17"), fileName_126 + ":22:41");
    }
  };
  function makeMemoMap() {
    return flatMap_(makeSynchronized(() => new Map(), fileName_126 + ":106:31"), (r) => succeed(() => new MemoMap(r), fileName_126 + ":108:45"), fileName_126 + ":108:23");
  }
  function buildWithScope_1(self2, scope, __tsplusTrace) {
    return flatMap_(bind_(bind_(Do(), "memoMap", () => makeMemoMap(), __tsplusTrace), "run", () => withScope_1(self2, scope, __tsplusTrace), __tsplusTrace), ({
      memoMap,
      run: run2
    }) => run2(memoMap), __tsplusTrace);
  }
  function withScope_1(self2, scope, __tsplusTrace) {
    return matchTag_(self2, {
      LayerApply: (_) => succeed(() => (memoMap) => _.self, __tsplusTrace),
      LayerExtendScope: (_) => succeed(() => (memoMap) => scopeWith((scope2) => memoMap.getOrElseMemoize(_.self, () => scope2), __tsplusTrace), __tsplusTrace),
      LayerFold: (_) => succeed(() => (memoMap) => foldCauseEffect_(memoMap.getOrElseMemoize(_.self, scope), (e) => memoMap.getOrElseMemoize(_.failure(e), scope), (r) => memoMap.getOrElseMemoize(_.success(r), scope), __tsplusTrace), __tsplusTrace),
      LayerFresh: (_) => succeed(() => (__) => buildWithScope_1(_.self, scope, __tsplusTrace), __tsplusTrace),
      LayerScoped: (_) => succeed(() => (__) => extend_(scope(), () => _.self), __tsplusTrace),
      LayerSuspend: (_) => succeed(() => (memoMap) => memoMap.getOrElseMemoize(_.self(), scope), __tsplusTrace),
      LayerTo: (_) => succeed(() => (memoMap) => flatMap_(memoMap.getOrElseMemoize(_.self, scope), (r) => provideEnvironment_(memoMap.getOrElseMemoize(_.that, scope), () => r, __tsplusTrace), __tsplusTrace), __tsplusTrace),
      LayerZipWithPar: (_) => succeed(() => (memoMap) => zipWithPar_(memoMap.getOrElseMemoize(_.self, scope), () => memoMap.getOrElseMemoize(_.that, scope), _.f, __tsplusTrace), __tsplusTrace)
    });
  }
  function isFresh_1(self2) {
    return self2._tag === "LayerFresh";
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/provideLayer.mjs
  function provideLayer_(self2, layer, __tsplusTrace) {
    return acquireUseReleaseExit(() => make17, (scope) => flatMap_(buildWithScope(layer, () => scope, __tsplusTrace), (r) => provideEnvironment_(self2, () => r, __tsplusTrace), __tsplusTrace), (scope, exit2) => close_(scope, () => exit2), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/provideSomeLayer.mjs
  function provideSomeLayer_(self2, layer, __tsplusTrace) {
    return provideLayer_(self2, and_(environment2(), () => layer), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/TraceElement/definition.mjs
  var _a37;
  var _b17;
  var TraceElementSym = /* @__PURE__ */ Symbol.for("@effect/core/io/TraceElement");
  var NoLocation = class {
    constructor() {
      this._tag = "NoLocation";
      this[_a37] = TraceElementSym;
    }
    [(_a37 = TraceElementSym, Hash.sym)]() {
      return hashString(this._tag);
    }
    [Equals.sym](u) {
      return isTraceElement_1(u) && u._tag === "NoLocation";
    }
  };
  var SourceLocation = class {
    constructor(fileName, lineNumber, columnNumber) {
      this.fileName = fileName;
      this.lineNumber = lineNumber;
      this.columnNumber = columnNumber;
      this._tag = "SourceLocation";
      this[_b17] = TraceElementSym;
    }
    [(_b17 = TraceElementSym, Hash.sym)]() {
      return combine(hashString(this._tag), combine(hashString(this.fileName), combine(hashNumber(this.lineNumber), hashNumber(this.columnNumber))));
    }
    [Equals.sym](that) {
      return isTraceElement_1(that) && this[Hash.sym]() === that[Hash.sym]();
    }
  };
  function isTraceElement_1(u) {
    return typeof u === "object" && u != null && TraceElementSym in u;
  }
  var empty_12 = /* @__PURE__ */ new NoLocation();
  var empty10 = empty_12;
  function sourceLocation_1(fileName, lineNumber, columnNumber) {
    return new SourceLocation(fileName, lineNumber, columnNumber);
  }
  var LOCATION_REGEX = /^(.*?):(\d*?):(\d*?)$/;
  function parse(trace) {
    if (trace) {
      const parts = trace.match(LOCATION_REGEX);
      if (parts) {
        const fileName = parts[1].trim();
        const lineNumber = Number.parseInt(parts[2]);
        const columnNumber = Number.parseInt(parts[3]);
        return sourceLocation_1(fileName, lineNumber, columnNumber);
      }
      return empty_12;
    }
    return empty_12;
  }
  function stringify(self2) {
    switch (self2._tag) {
      case "NoLocation": {
        return "";
      }
      case "SourceLocation": {
        return `${self2.fileName}:${self2.lineNumber}:${self2.columnNumber}`;
      }
    }
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberId/operations/make.mjs
  var _fiberCounter = /* @__PURE__ */ new AtomicNumber(0);
  function unsafeMake5(location) {
    return new RuntimeFiberId(_fiberCounter.getAndIncrement(), Math.floor(new Date().getTime() / 1e3), location);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Random/definition.mjs
  var RandomSym = /* @__PURE__ */ Symbol.for("@effect/core/io/Random");
  var Random = {
    $: {},
    Tag: /* @__PURE__ */ Service.Tag()
  };

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Random/operations/live.mjs
  var _a38;
  var fileName_127 = "(@effect/core) _src/io/Random/operations/live.ts";
  var defaultRandom_1 = /* @__PURE__ */ LazyValue.make(() => new LiveRandom(Math.random() * 4294967296 >>> 0));
  var defaultRandom = defaultRandom_1;
  var live = /* @__PURE__ */ fromValue(Random.Tag, () => defaultRandom_1.value);
  var LiveRandom = class {
    constructor(seed) {
      this.seed = seed;
      this[_a38] = RandomSym;
      this.PRNG = new RandomPCG(seed);
    }
    get next() {
      return succeed(() => this.PRNG.number(), fileName_127 + ":23:26");
    }
    get nextBoolean() {
      return flatMap_(this.next, (n) => succeed(() => n > 0.5, fileName_127 + ":27:51"), fileName_127 + ":27:29");
    }
    get nextInt() {
      return succeed(() => this.PRNG.integer(0), fileName_127 + ":31:26");
    }
    nextRange(low, high, __tsplusTrace) {
      return flatMap_(this.next, (n) => succeed(() => (high - low) * n + low, fileName_127 + ":35:51"), fileName_127 + ":35:29");
    }
    nextIntBetween(low, high, __tsplusTrace) {
      return succeed(() => this.PRNG.integer(high - low) + low, fileName_127 + ":43:26");
    }
    shuffle(collection, __tsplusTrace) {
      return shuffleWith(collection, (n) => this.nextIntBetween(0, n, fileName_127 + ":50:62"), fileName_127 + ":50:23");
    }
  };
  _a38 = RandomSym;
  function shuffleWith(collection, nextIntBounded, __tsplusTrace) {
    return suspendSucceed(() => {
      const collection0 = collection();
      return map_(tap_(bindValue_(bind_(Do(), "buffer", () => succeed(() => {
        const buffer = [];
        for (const element of collection0) {
          buffer.push(element);
        }
        return buffer;
      }, __tsplusTrace), __tsplusTrace), "swap", ({
        buffer
      }) => (i1, i2) => succeed(() => {
        const tmp = buffer[i1];
        buffer[i1] = buffer[i2];
        buffer[i2] = tmp;
        return buffer;
      }, __tsplusTrace), __tsplusTrace), ({
        buffer,
        swap
      }) => {
        const ns = [];
        for (let i = buffer.length; i >= 2; i = i - 1) {
          ns.push(i);
        }
        return forEachDiscard(() => ns, (n) => flatMap_(nextIntBounded(n), (k) => swap(n - 1, k), __tsplusTrace), __tsplusTrace);
      }, __tsplusTrace), ({
        buffer
      }) => buffer, __tsplusTrace);
    }, __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Clock/definition.mjs
  var ClockSym = /* @__PURE__ */ Symbol.for("@effect/core/io/Clock");
  var Clock = {
    $: {},
    Scheduler: {},
    Tag: /* @__PURE__ */ Tag()
  };
  var MAX_TIMER_MILLIS_1 = 2 ** 31 - 1;
  var globalScheduler = {
    unsafeSchedule(task, duration) {
      if (duration.millis > MAX_TIMER_MILLIS_1) {
        return constFalse;
      }
      let completed = false;
      const handle = setTimeout(() => {
        completed = true;
        task();
      }, duration.millis);
      return () => {
        clearTimeout(handle);
        return !completed;
      };
    }
  };

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberRef/operations/unsafeMakeEnvironment.mjs
  function unsafeMakeEnvironment(initial3) {
    return new FiberRefInternal(initial3, diff2, (first, second) => combine_(first, second), (patch) => (value) => patch_(patch, value), empty9());
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Clock/operations/live.mjs
  var _a39;
  var fileName_128 = "(@effect/core) _src/io/Clock/operations/live.ts";
  var LiveClock = class {
    constructor() {
      this[_a39] = ClockSym;
    }
    get currentTime() {
      return succeed(() => this.unsafeCurrentTime, fileName_128 + ":7:26");
    }
    get unsafeCurrentTime() {
      return new Date().getTime();
    }
    get scheduler() {
      return succeed(() => globalScheduler, fileName_128 + ":15:26");
    }
    sleep(duration, __tsplusTrace) {
      return flatMap_(succeed(duration, fileName_128 + ":19:26"), (duration2) => asyncInterrupt((cb) => {
        const canceler = globalScheduler.unsafeSchedule(() => cb(unit), duration2);
        return left(succeed(canceler, fileName_128 + ":22:42"));
      }, fileName_128 + ":20:28"), fileName_128 + ":19:44");
    }
  };
  _a39 = ClockSym;

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/definition.mjs
  var liveServices_1 = /* @__PURE__ */ LazyValue.make(() => Env(Clock.Tag, new LiveClock()).add(Random.Tag, defaultRandom.value));
  var liveServices = liveServices_1;
  var services = /* @__PURE__ */ LazyValue.make(() => unsafeMakeEnvironment(liveServices_1.value));

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/ImmutableMap/definition.mjs
  var ImmutableMap = class {
    constructor(internalMap) {
      this.internalMap = internalMap;
    }
    [Symbol.iterator]() {
      const iterator = this.internalMap[Symbol.iterator]();
      return {
        next: () => {
          const next2 = iterator.next();
          if (next2.done) {
            return {
              done: true,
              value: void 0
            };
          }
          return {
            done: false,
            value: make2(next2.value[0], next2.value[1])
          };
        }
      };
    }
    [Equals.sym](other) {
      if (other instanceof ImmutableMap && this.internalMap.size === other.internalMap.size) {
        for (const [otherKey, otherValue] of other.internalMap) {
          if (this.internalMap.has(otherKey)) {
            const value = this.internalMap.get(otherKey);
            if (!equals(value, otherValue)) {
              return false;
            }
          } else {
            return false;
          }
        }
        return true;
      }
      return false;
    }
    [Hash.sym]() {
      let hash = hashString("ImmutableMap");
      for (const item of this) {
        hash ^= combine(hashUnknown(item.get(0)), hashUnknown(item.get(1)));
      }
      return optimize(hash);
    }
  };

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/ImmutableMap/from.mjs
  function from6(entries) {
    const map = new Map();
    for (const {
      tuple: [key, value]
    } of entries) {
      map.set(key, value);
    }
    return new ImmutableMap(map);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/ImmutableMap/make.mjs
  function make18(...entries) {
    return from6(entries);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Supervisor/definition.mjs
  var Supervisor = class {
    constructor(value, unsafeOnStart, unsafeOnEnd, unsafeOnEffect = () => void 0, unsafeOnSuspend = () => void 0, unsafeOnResume = () => void 0) {
      this.value = value;
      this.unsafeOnStart = unsafeOnStart;
      this.unsafeOnEnd = unsafeOnEnd;
      this.unsafeOnEffect = unsafeOnEffect;
      this.unsafeOnSuspend = unsafeOnSuspend;
      this.unsafeOnResume = unsafeOnResume;
    }
  };

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Supervisor/operations/const.mjs
  var ConstSupervisor = class extends Supervisor {
    constructor(value) {
      super(value, () => void 0, () => void 0);
    }
  };

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Supervisor/operations/none.mjs
  var none4 = /* @__PURE__ */ new ConstSupervisor(unit);

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Exit/operations/flatMap.mjs
  function flatMap_4(self2, f) {
    switch (self2._tag) {
      case "Failure":
        return self2;
      case "Success":
        return f(self2.value);
    }
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Exit/operations/flatten.mjs
  function flatten(self2) {
    return flatMap_4(self2, identity);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashSet/from.mjs
  function from7(elements2) {
    const set2 = beginMutation2(empty4());
    for (const v of elements2) {
      add_(set2, v);
    }
    return endMutation(set2);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberId/operations/ids.mjs
  function ids(self2) {
    return run(idsSafe(self2));
  }
  function idsSafe(self2) {
    void 0;
    switch (self2._tag) {
      case "None": {
        return succeed2(() => make4());
      }
      case "Runtime": {
        return succeed2(() => from7([self2.id]));
      }
      case "Composite": {
        let base = succeed2(() => empty4());
        for (const fiberId2 of self2.fiberIds) {
          base = zipWith_(suspend(() => idsSafe(fiberId2)), () => base, (a, b) => union_(a, b));
        }
        return base;
      }
    }
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashSet/map.mjs
  function map_7(self2, f) {
    const set2 = empty4();
    return mutate_(set2, (_) => {
      forEach_(self2, (e) => {
        const v = f(e);
        if (!has_2(_, v)) {
          add_(_, v);
        }
      });
    });
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashSet/flatMap.mjs
  function flatMap_5(self2, f) {
    const set2 = empty4();
    return mutate_(set2, (_) => {
      forEach_(self2, (a) => {
        for (const b of f(a)) {
          if (!has_2(_, b)) {
            add_(_, b);
          }
        }
      });
    });
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashSet/reduce.mjs
  function reduce_3(self2, z, f) {
    void 0;
    return reduceWithIndex_(self2._keyMap, z, (z2, v) => f(z2, v));
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Cause/operations/defects.mjs
  function defects(self2) {
    return reverse(foldLeft_(self2, empty2(), (causes, cause) => isDieType(cause) ? some(prepend_(causes, cause.value)) : none));
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/List/head.mjs
  function head2(self2) {
    return isNil(self2) ? none : some(self2.head);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/data/Maybe/map.mjs
  function map_8(self2, f) {
    return isNone(self2) ? none : some(f(self2.value));
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Cause/operations/squashWith.mjs
  function squashWith_(self2, f) {
    return getOrElse_(map_8(failureMaybe(self2), f), () => {
      if (isInterrupted(self2)) {
        const fibers = reduce_3(flatMap_5(interruptors(self2), (fiberId2) => map_7(ids(fiberId2), (n) => `#${n}`)), "", (acc, id) => `${acc}, ${id}`);
        return new InterruptedException(`Interrupted by fibers: ${fibers}`);
      }
      return getOrElse_(head2(defects(self2)), () => new InterruptedException());
    });
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Metrics/definition.mjs
  var fileName_129 = "(@effect/core) _src/io/Metrics/definition.ts";
  var MetricSym = /* @__PURE__ */ Symbol.for("@effect/core/io/Metric");
  var Metric = function(keyType, unsafeUpdate, unsafeValue) {
    const metric = Object.assign((effect2, __tsplusTrace) => tap_(effect2, (a) => succeed(() => unsafeUpdate(a, empty4()), fileName_129 + ":56:39"), fileName_129 + ":56:17"), {
      [MetricSym]: MetricSym,
      keyType,
      unsafeUpdate,
      unsafeValue
    });
    return metric;
  };

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/data/Duration.mjs
  var Duration = class {
    constructor(millis) {
      this.millis = millis;
    }
    [Equals.sym](other) {
      return other instanceof Duration && this.millis === other.millis;
    }
    [Hash.sym]() {
      return hashNumber(this.millis);
    }
  };
  function lowerThenOrEqual_(self2, that) {
    return self2.millis <= that.millis;
  }
  function equals_3(self2, that) {
    return self2.millis === that.millis;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/equals.mjs
  function equals_4(self2, that) {
    return corresponds_(self2, that, equals);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Metrics/MetricKeyType.mjs
  var _a40;
  var _b18;
  var _c9;
  var _d6;
  var _e5;
  var _f4;
  var MetricKeyTypeSym = /* @__PURE__ */ Symbol.for("@effect/core/io/Metric/MetricKeyType");
  var CounterKeySym = /* @__PURE__ */ Symbol.for("@effect/core/io/Metric/MetricKeyType/Counter");
  var FrequencyKeySym = /* @__PURE__ */ Symbol.for("@effect/core/io/Metric/MetricKeyType/Frequency");
  var GaugeKeySym = /* @__PURE__ */ Symbol.for("@effect/core/io/Metric/MetricKeyType/Gauge");
  var HistogramKeySym = /* @__PURE__ */ Symbol.for("@effect/core/io/Metric/MetricKeyType/Histogram");
  var SummaryKeySym = /* @__PURE__ */ Symbol.for("@effect/core/io/Metric/MetricKeyType/Summary");
  var BaseMetricKeyType = class {
    constructor() {
      this[_a40] = MetricKeyTypeSym;
    }
  };
  _a40 = MetricKeyTypeSym;
  var CounterKey = class extends BaseMetricKeyType {
    constructor() {
      super(...arguments);
      this[_b18] = CounterKeySym;
    }
    [(_b18 = CounterKeySym, Hash.sym)]() {
      return hashString("ets/Metrics/MetricKeyType/Counter");
    }
    [Equals.sym](u) {
      return isCounterKey_1(u);
    }
  };
  var GaugeKey = class extends BaseMetricKeyType {
    constructor() {
      super(...arguments);
      this[_c9] = GaugeKeySym;
    }
    [(_c9 = GaugeKeySym, Hash.sym)]() {
      return hashString("ets/Metrics/MetricKeyType/Gauge");
    }
    [Equals.sym](u) {
      return isGaugeKey_1(u);
    }
  };
  var FrequencyKey = class extends BaseMetricKeyType {
    constructor() {
      super(...arguments);
      this[_d6] = FrequencyKeySym;
    }
    [(_d6 = FrequencyKeySym, Hash.sym)]() {
      return hashString("ets/Metrics/MetricKeyType/Frequency");
    }
    [Equals.sym](u) {
      return isFrequencyKey_1(u);
    }
  };
  var HistogramKey = class extends BaseMetricKeyType {
    constructor(boundaries) {
      super();
      this.boundaries = boundaries;
      this[_e5] = HistogramKeySym;
    }
    [(_e5 = HistogramKeySym, Hash.sym)]() {
      return combine(hashString("ets/Metrics/MetricKeyType/Histogram"), hashUnknown(this.boundaries));
    }
    [Equals.sym](u) {
      return isHistogramKey_1(u) && equals(this.boundaries, u.boundaries);
    }
  };
  var SummaryKey = class extends BaseMetricKeyType {
    constructor(maxAge, maxSize, error, quantiles) {
      super();
      this.maxAge = maxAge;
      this.maxSize = maxSize;
      this.error = error;
      this.quantiles = quantiles;
      this[_f4] = SummaryKeySym;
    }
    [(_f4 = SummaryKeySym, Hash.sym)]() {
      return combine(hashString("ets/Metrics/MetricKeyType/Summary"), combine(hashUnknown(this.maxAge), combine(hashNumber(this.maxSize), combine(hashNumber(this.error), hashUnknown(this.quantiles)))));
    }
    [Equals.sym](u) {
      return isSummaryKey_1(u) && equals_3(this.maxAge, u.maxAge) && this.maxSize === u.maxSize && this.error === u.error && equals_4(this.quantiles, u.quantiles);
    }
  };
  var counter = /* @__PURE__ */ new CounterKey();
  var frequency = /* @__PURE__ */ new FrequencyKey();
  function histogram(boundaries) {
    return new HistogramKey(boundaries);
  }
  function isCounterKey_1(u) {
    return typeof u === "object" && u != null && CounterKeySym in u;
  }
  function isGaugeKey_1(u) {
    return typeof u === "object" && u != null && GaugeKeySym in u;
  }
  function isFrequencyKey_1(u) {
    return typeof u === "object" && u != null && FrequencyKeySym in u;
  }
  function isHistogramKey_1(u) {
    return typeof u === "object" && u != null && HistogramKeySym in u;
  }
  function isSummaryKey_1(u) {
    return typeof u === "object" && u != null && SummaryKeySym in u;
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Metrics/MetricKey.mjs
  var _a41;
  var taggedWithLabelSet = taggedWithLabelSet_1;
  var MetricKeySym = /* @__PURE__ */ Symbol.for("@effect/core/io/Metric/MetricKey");
  var MetricKey = class {
    constructor(name, keyType, tags = empty4()) {
      this.name = name;
      this.keyType = keyType;
      this.tags = tags;
      this[_a41] = MetricKeySym;
    }
    [(_a41 = MetricKeySym, Hash.sym)]() {
      return combine(hashString(this.name), combine(hashUnknown(this.keyType), hashUnknown(this.tags)));
    }
    [Equals.sym](u) {
      return isMetricKey_1(u) && this.name === u.name && hashUnknown(this.keyType) === hashUnknown(u.keyType) && equals_2(this.tags, u.tags);
    }
  };
  function counter2(name) {
    return new MetricKey(name, counter);
  }
  function frequency2(name) {
    return new MetricKey(name, frequency);
  }
  function histogram2(name, boundaries) {
    return new MetricKey(name, histogram(boundaries));
  }
  function taggedWithLabelSet_1(self2, extraTags) {
    return size2(extraTags) === 0 ? self2 : new MetricKey(self2.name, self2.keyType, union_(self2.tags, extraTags));
  }
  function isMetricKey_1(u) {
    return typeof u === "object" && u != null && MetricKeySym in u;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/ImmutableArray/definition.mjs
  var ImmutableArray = class {
    constructor(array) {
      this.array = array;
    }
    [Symbol.iterator]() {
      return this.array[Symbol.iterator]();
    }
    [Equals.sym](other) {
      return other instanceof ImmutableArray && this.array.length === other.array.length && this.array.every((v, i) => equals(v, other.array[i]));
    }
    [Hash.sym]() {
      return hashArray(this.array);
    }
  };

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/ImmutableArray/from.mjs
  function from8(iterable) {
    return new ImmutableArray(Array.from(iterable));
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/ImmutableArray/map.mjs
  function map_9(self2, f) {
    return new ImmutableArray(self2.array.map((a, i) => f(a, i)));
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/mutable/MutableHashMap/definition.mjs
  var _a42;
  var MutableHashMapSym = /* @__PURE__ */ Symbol.for("@tsplus/stdlib/collections/mutable/MutableHashMap");
  var MutableHashMap = class {
    constructor() {
      this[_a42] = MutableHashMapSym;
      this.backingMap = new Map();
      this.length = new AtomicNumber(0);
    }
    get size() {
      return this.length.get;
    }
    get(k) {
      const hash = hashUnknown(k);
      const arr = this.backingMap.get(hash);
      if (arr == null) {
        return none;
      }
      let c = arr;
      while (c) {
        if (equals(k, c.k)) {
          return some(c.v);
        }
        c = c.next;
      }
      return none;
    }
    remove(k) {
      const hash = hashUnknown(k);
      const arr = this.backingMap.get(hash);
      if (arr == null) {
        return this;
      }
      if (equals(k, arr.k)) {
        if (arr.next != null) {
          this.backingMap.set(hash, arr.next);
        } else {
          this.backingMap.delete(hash);
        }
        this.length.decrementAndGet();
        return this;
      }
      let next2 = arr.next;
      let curr = arr;
      while (next2) {
        if (equals(k, next2.k)) {
          curr.next = next2.next;
          this.length.decrementAndGet();
          return this;
        }
        curr = next2;
        next2 = next2.next;
      }
      return this;
    }
    set(k, v) {
      const hash = hashUnknown(k);
      const arr = this.backingMap.get(hash);
      if (arr == null) {
        this.backingMap.set(hash, new Node2(k, v));
        this.length.incrementAndGet();
        return this;
      }
      let c = arr;
      let l = arr;
      while (c) {
        if (equals(k, c.k)) {
          c.v = v;
          return this;
        }
        l = c;
        c = c.next;
      }
      this.length.incrementAndGet();
      l.next = new Node2(k, v);
      return this;
    }
    update(k, f) {
      const hash = hashUnknown(k);
      const arr = this.backingMap.get(hash);
      if (arr == null) {
        return this;
      }
      let c = arr;
      while (c) {
        if (equals(k, c.k)) {
          c.v = f(c.v);
          return this;
        }
        c = c.next;
      }
      return this;
    }
    [(_a42 = MutableHashMapSym, Symbol.iterator)]() {
      return map_9(from8(this.backingMap.values()), (node) => make2(node.k, node.v))[Symbol.iterator]();
    }
  };
  var Node2 = class {
    constructor(k, v, next2) {
      this.k = k;
      this.v = v;
      this.next = next2;
    }
    [Symbol.iterator]() {
      let c = this;
      let n = 0;
      return {
        next: () => {
          if (c) {
            const kv = make2(c.k, c.v);
            c = c.next;
            n++;
            return {
              value: kv,
              done: false
            };
          } else {
            return {
              value: n,
              done: true
            };
          }
        }
      };
    }
  };

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/mutable/MutableHashMap/empty.mjs
  function empty11() {
    return new MutableHashMap();
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Metrics/MetricListener.mjs
  var MetricListener = class {
    constructor(unsafeUpdate) {
      this.unsafeUpdate = unsafeUpdate;
    }
    unsafeUpdateCache(key) {
      return this.unsafeUpdate(key);
    }
  };

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Metrics/MetricPair.mjs
  function unsafeMake6(metricKey, metricState) {
    return {
      metricKey,
      metricState
    };
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/data/Maybe/toUndefined.mjs
  function toUndefined(self2) {
    return isNone(self2) ? void 0 : self2.value;
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Metrics/MetricState.mjs
  var _a43;
  var _b19;
  var _c10;
  var _d7;
  var _e6;
  var _f5;
  var MetricStateSym = /* @__PURE__ */ Symbol.for("@effect/core/io/Metrics/MetricState");
  var CounterStateSym = /* @__PURE__ */ Symbol.for("@effect/core/io/Metrics/MetricState/Counter");
  var GaugeStateSym = /* @__PURE__ */ Symbol.for("@effect/core/io/Metrics/MetricState/Gauge");
  var FrequencyStateSym = /* @__PURE__ */ Symbol.for("@effect/core/io/Metrics/MetricState/Frequency");
  var HistogramStateSym = /* @__PURE__ */ Symbol.for("@effect/core/io/Metrics/MetricState/Histogram");
  var SummaryStateSym = /* @__PURE__ */ Symbol.for("@effect/core/io/Metrics/MetricState/Summary");
  var BaseMetricState = class {
    constructor() {
      this[_a43] = MetricStateSym;
    }
  };
  _a43 = MetricStateSym;
  var CounterState = class extends BaseMetricState {
    constructor(count) {
      super();
      this.count = count;
      this[_b19] = CounterStateSym;
    }
    [(_b19 = CounterStateSym, Hash.sym)]() {
      return combine(hashString("@effect/core/io/Metrics/MetricState/Counter"), hashNumber(this.count));
    }
    [Equals.sym](u) {
      return isCounterState_1(u) && this.count === u.count;
    }
  };
  var GaugeState = class extends BaseMetricState {
    constructor(value) {
      super();
      this.value = value;
      this[_c10] = GaugeStateSym;
    }
    [(_c10 = GaugeStateSym, Hash.sym)]() {
      return combine(hashString("@effect/core/io/Metrics/MetricState/Gauge"), hashNumber(this.value));
    }
    [Equals.sym](u) {
      return isGaugeState_1(u) && this.value === u.value;
    }
  };
  var FrequencyState = class extends BaseMetricState {
    constructor(occurrences) {
      super();
      this.occurrences = occurrences;
      this[_d7] = FrequencyStateSym;
    }
    [(_d7 = FrequencyStateSym, Hash.sym)]() {
      return combine(hashString("@effect/core/io/Metrics/MetricState/Frequency"), hashIterator(this.occurrences[Symbol.iterator]()));
    }
    [Equals.sym](u) {
      return isFrequencyState_1(u) && equals_(this.occurrences, u.occurrences);
    }
  };
  var HistogramState = class extends BaseMetricState {
    constructor(buckets, count, min, max, sum) {
      super();
      this.buckets = buckets;
      this.count = count;
      this.min = min;
      this.max = max;
      this.sum = sum;
      this[_e6] = HistogramStateSym;
    }
    [(_e6 = HistogramStateSym, Hash.sym)]() {
      return combine(hashString("@effect/core/io/Metrics/MetricState/Histogram"), combine(hashUnknown(this.buckets), combine(hashNumber(this.count), combine(hashNumber(this.min), combine(hashNumber(this.max), hashNumber(this.sum))))));
    }
    [Equals.sym](u) {
      return isHistogramState_1(u) && equals_4(this.buckets, u.buckets) && this.count === u.count && this.min === u.min && this.max === u.max && this.sum === u.sum;
    }
  };
  var SummaryState = class extends BaseMetricState {
    constructor(error, quantiles, count, min, max, sum) {
      super();
      this.error = error;
      this.quantiles = quantiles;
      this.count = count;
      this.min = min;
      this.max = max;
      this.sum = sum;
      this[_f5] = SummaryStateSym;
    }
    [(_f5 = SummaryStateSym, Hash.sym)]() {
      return combine(hashString("@effect/core/io/Metrics/MetricState/Summary"), combine(hashNumber(this.error), combine(hashUnknown(this.quantiles), combine(hashNumber(this.count), combine(hashNumber(this.min), combine(hashNumber(this.max), hashNumber(this.sum)))))));
    }
    [Equals.sym](u) {
      return isSummaryState_1(u) && this.error === u.error && equals_4(this.quantiles, u.quantiles) && this.count === u.count && this.min === u.min && this.max === u.max && this.sum === u.sum;
    }
  };
  function counter3(count) {
    return new CounterState(count);
  }
  function gauge2(value) {
    return new GaugeState(value);
  }
  function frequency3(occurrences) {
    return new FrequencyState(occurrences);
  }
  function histogram3(buckets, count, min, max, sum) {
    return new HistogramState(buckets, count, min, max, sum);
  }
  function summary2(error, quantiles, count, min, max, sum) {
    return new SummaryState(error, quantiles, count, min, max, sum);
  }
  function isCounterState_1(u) {
    return typeof u === "object" && u != null && CounterStateSym in u;
  }
  function isGaugeState_1(u) {
    return typeof u === "object" && u != null && GaugeStateSym in u;
  }
  function isFrequencyState_1(u) {
    return typeof u === "object" && u != null && FrequencyStateSym in u;
  }
  function isHistogramState_1(u) {
    return typeof u === "object" && u != null && HistogramStateSym in u;
  }
  function isSummaryState_1(u) {
    return typeof u === "object" && u != null && SummaryStateSym in u;
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Metrics/MetricHook.mjs
  function make19(update2, get3) {
    return {
      update: update2,
      get: get3
    };
  }
  function onUpdate(self2, f) {
    return {
      update: (input) => {
        self2.update(input);
        return f(input);
      },
      get: self2.get
    };
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashMap/endMutation.mjs
  function endMutation2(self2) {
    void 0;
    self2._editable = false;
    return self2;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashMap/from.mjs
  function from9(entries) {
    const map = beginMutation(empty3());
    for (const entry of entries) {
      set_(map, entry.get(0), entry.get(1));
    }
    return endMutation2(map);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/HashMap/make.mjs
  function make20(...entries) {
    return from9(entries);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/prelude/Ord/definition.mjs
  var Ord = (compare2) => ({
    compare: compare2
  });

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/prelude/Equivalence/definition.mjs
  var Equivalence = /* @__PURE__ */ Object.assign((equals2) => ({
    equals: equals2
  }), {
    $: {}
  });

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/prelude/Ord/operations.mjs
  var lt = lt_1;
  function contramap(fa, f) {
    return Ord((x, y) => fa.compare(f(x), f(y)));
  }
  function lt_1(O) {
    return (x, y) => O.compare(x, y) === -1;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/prelude/Ord/common.mjs
  var compare = (x, y) => {
    return x < y ? -1 : x > y ? 1 : 0;
  };
  var number_1 = /* @__PURE__ */ Ord(compare);
  var number = number_1;

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/sort.mjs
  function sort_(self2, O) {
    return from2(Array.from(self2).sort((x, y) => O.compare(x, y)));
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/mapWithIndex.mjs
  function mapWithIndex_(self2, f) {
    void 0;
    if (self2._typeId === SingletonTypeId) {
      return new Singleton(f(0, self2.a));
    }
    let r = empty();
    let i = 0;
    for (const k of self2) {
      r = append_(r, f(i, k));
      i += 1;
    }
    return r;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/builder.mjs
  function builder() {
    return new ChunkBuilder(empty());
  }
  var ChunkBuilder = class {
    constructor(chunk) {
      this.chunk = chunk;
    }
    append(a) {
      this.chunk = append_(this.chunk, a);
      return this;
    }
    build() {
      return this.chunk;
    }
  };

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/unsafeHead.mjs
  function unsafeHead2(self2) {
    return self2._get(0);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/unsafeTail.mjs
  function unsafeTail2(self2) {
    if (self2.length === 0) {
      throw new IndexOutOfBounds(1, 1, self2.length - 1);
    }
    return drop_(self2, 1);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/reduce.mjs
  function reduce_4(self2, s, f) {
    void 0;
    switch (self2._typeId) {
      case SingletonTypeId: {
        return f(s, self2.a);
      }
      case ArrTypeId: {
        const arr = self2._arrayLike();
        const len = arr.length;
        let s1 = s;
        let i = 0;
        while (i < len) {
          s1 = f(s1, arr[i]);
          i++;
        }
        return s1;
      }
      default: {
        const iterator = self2._arrayLikeIterator();
        let next2;
        let s1 = s;
        while ((next2 = iterator.next()) && !next2.done) {
          const array = next2.value;
          const len = array.length;
          let i = 0;
          while (i < len) {
            const a = array[i];
            s1 = f(s1, a);
            i++;
          }
        }
        return s1;
      }
    }
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/unsafeLast.mjs
  function unsafeLast(self2) {
    return self2._get(self2.length - 1);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/splitWhere.mjs
  function splitWhere_(self2, f) {
    const iterator = self2._arrayLikeIterator();
    let next2;
    let cont = true;
    let i = 0;
    while (cont && (next2 = iterator.next()) && !next2.done) {
      const array = next2.value;
      const len = array.length;
      let j = 0;
      while (cont && j < len) {
        const a = array[j];
        if (f(a)) {
          cont = false;
        } else {
          i++;
          j++;
        }
      }
    }
    return splitAt_(self2, i);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Metrics/MetricHooks.mjs
  function counter4(_key) {
    let sum = 0;
    return make19((value) => {
      sum = sum + value;
    }, () => counter3(sum));
  }
  function gauge3(_key, startAt) {
    let value = startAt;
    return make19((v) => {
      value = v;
    }, () => gauge2(value));
  }
  function frequency4(_key) {
    let count = 0;
    const values2 = new Map();
    const update2 = (word) => {
      count = count + 1;
      const slotCount = values2.get(word) ?? 0;
      values2.set(word, slotCount + 1);
    };
    const snapshot = () => make20(...Array.from(values2.entries()).map(([k, v]) => make2(k, v)));
    return make19(update2, () => frequency3(snapshot()));
  }
  function histogram4(key) {
    const bounds = key.keyType.boundaries.values;
    const size5 = bounds.length;
    const values2 = Array(size5 + 1);
    const boundaries = Array(size5);
    let count = 0;
    let sum = 0;
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    mapWithIndex_(sort_(bounds, number), (i, n) => {
      boundaries[i] = n;
    });
    const update2 = (value) => {
      let from10 = 0;
      let to = size5;
      while (from10 !== to) {
        const mid = Math.floor(from10 + (to - from10) / 2);
        const boundary = boundaries[mid];
        if (value <= boundary) {
          to = mid;
        } else {
          from10 = mid;
        }
        if (to === from10 + 1) {
          if (value <= boundaries[from10]) {
            to = from10;
          } else {
            from10 = to;
          }
        }
      }
      values2[from10] = values2[from10] + 1;
      count = count + 1;
      sum = sum + value;
      if (value < min) {
        min = value;
      }
      if (value > max) {
        max = value;
      }
    };
    const getBuckets = () => {
      const builder2 = builder();
      let i = 0;
      let cumulated = 0;
      while (i != size5) {
        const boundary = boundaries[i];
        const value = values2[i];
        cumulated = cumulated + value;
        builder2.append(make2(boundary, cumulated));
        i = i + 1;
      }
      return builder2.build();
    };
    return make19(update2, () => histogram3(getBuckets(), count, min, max, sum));
  }
  function summary3(key) {
    const {
      error,
      maxAge,
      maxSize,
      quantiles
    } = key.keyType;
    const sortedQuantiles = sort_(quantiles, number);
    const values2 = Array(maxSize);
    let head3 = 0;
    let count = 0;
    let sum = 0;
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    const snapshot = (now) => {
      const builder2 = builder();
      let i = 0;
      while (i !== maxSize - 1) {
        const item = values2[i];
        if (item != null) {
          const {
            tuple: [t, v]
          } = item;
          const age = new Duration(now - t);
          if (age.millis >= 0 && lowerThenOrEqual_(age, maxAge)) {
            builder2.append(v);
          }
        }
        i = i + 1;
      }
      return calculateQuantiles(error, sortedQuantiles, sort_(builder2.build(), number));
    };
    const observe = (value, timestamp) => {
      if (maxSize > 0) {
        head3 = head3 + 1;
        const target = head3 % maxSize;
        values2[target] = make2(timestamp, value);
      }
      count = count + 1;
      sum = sum + value;
      if (value < min) {
        min = value;
      }
      if (value > max) {
        max = value;
      }
    };
    return make19(({
      tuple: [value, timestamp]
    }) => observe(value, timestamp), () => summary2(error, snapshot(Date.now()), count, min, max, sum));
  }
  var ResolvedQuantile = class {
    constructor(quantile, value, consumed, rest) {
      this.quantile = quantile;
      this.value = value;
      this.consumed = consumed;
      this.rest = rest;
    }
  };
  function calculateQuantiles(error, sortedQuantiles, sortedSamples) {
    const sampleCount = sortedSamples.length;
    if (isEmpty2(sortedQuantiles)) {
      return empty();
    }
    const head3 = unsafeHead2(sortedQuantiles);
    const tail = unsafeTail2(sortedQuantiles);
    const resolved = reduce_4(tail, single(resolveQuantile(error, sampleCount, none, 0, head3, sortedSamples)), (acc, quantile) => {
      const h = unsafeHead2(acc);
      return append_(acc, resolveQuantile(error, sampleCount, h.value, h.consumed, quantile, h.rest));
    });
    return map_4(resolved, (rq) => make2(rq.quantile, rq.value));
  }
  function resolveQuantile(error, sampleCount, current, consumed, quantile, rest) {
    var error_1 = error, sampleCount_1 = sampleCount, current_1 = current, consumed_1 = consumed, quantile_1 = quantile, rest_1 = rest;
    var error_2 = error, sampleCount_2 = sampleCount, current_2 = current, consumed_2 = consumed, quantile_2 = quantile, rest_2 = rest;
    while (1) {
      if (isEmpty2(rest_1)) {
        return new ResolvedQuantile(quantile_1, none, consumed_1, empty());
      }
      if (quantile_1 === 1) {
        return new ResolvedQuantile(quantile_1, some(unsafeLast(rest_1)), consumed_1 + rest_1.length, empty());
      }
      const sameHead = splitWhere_(rest_1, (n) => n > unsafeHead2(rest_1));
      const desired = quantile_1 * sampleCount_1;
      const allowedError = error_1 / 2 * desired;
      const candConsumed = consumed_1 + sameHead.get(0).length;
      const candError = Math.abs(candConsumed - desired);
      if (candConsumed < desired - allowedError) {
        error_2 = error_1;
        sampleCount_2 = sampleCount_1;
        current_2 = head(rest_1);
        consumed_2 = candConsumed;
        quantile_2 = quantile_1;
        rest_2 = sameHead.get(1);
        error_1 = error_2;
        sampleCount_1 = sampleCount_2;
        current_1 = current_2;
        consumed_1 = consumed_2;
        quantile_1 = quantile_2;
        rest_1 = rest_2;
        continue;
      }
      if (candConsumed > desired + allowedError) {
        return new ResolvedQuantile(quantile_1, current_1, consumed_1, rest_1);
      }
      switch (current_1._tag) {
        case "None": {
          error_2 = error_1;
          sampleCount_2 = sampleCount_1;
          current_2 = head(rest_1);
          consumed_2 = candConsumed;
          quantile_2 = quantile_1;
          rest_2 = sameHead.get(1);
          error_1 = error_2;
          sampleCount_1 = sampleCount_2;
          current_1 = current_2;
          consumed_1 = consumed_2;
          quantile_1 = quantile_2;
          rest_1 = rest_2;
          continue;
        }
        case "Some": {
          const prevError = Math.abs(desired - current_1.value);
          if (candError < prevError) {
            error_2 = error_1;
            sampleCount_2 = sampleCount_1;
            current_2 = head(rest_1);
            consumed_2 = candConsumed;
            quantile_2 = quantile_1;
            rest_2 = sameHead.get(1);
            error_1 = error_2;
            sampleCount_1 = sampleCount_2;
            current_1 = current_2;
            consumed_1 = consumed_2;
            quantile_1 = quantile_2;
            rest_1 = rest_2;
            continue;
          }
          return new ResolvedQuantile(quantile_1, some(current_1.value), consumed_1, rest_1);
        }
      }
    }
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/mutable/MutableHashMap/has.mjs
  function has_3(self2, key) {
    return isSome(self2.get(key));
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Metrics/MetricRegistry.mjs
  var MetricRegistry = class {
    constructor() {
      this.map = empty11();
      this.listeners = new Set();
      this.listener = new MetricListener((key) => (update2) => {
        for (const listener of this.listeners) {
          listener.unsafeUpdate(key)(update2);
        }
      });
    }
    installListener(listener) {
      this.listeners.add(listener);
    }
    removeListener(listener) {
      this.listeners.delete(listener);
    }
    snapshot() {
      const result = [];
      for (const {
        tuple: [key, hook]
      } of this.map) {
        result.push(unsafeMake6(key, hook.get()));
      }
      return from7(result);
    }
    get(key) {
      const hook = toUndefined(this.map.get(key));
      if (hook == null) {
        if (key.keyType instanceof CounterKey) {
          return this.getCounter(key);
        }
        if (key.keyType instanceof GaugeKey) {
          return this.getGauge(key);
        }
        if (key.keyType instanceof FrequencyKey) {
          return this.getFrequency(key);
        }
        if (key.keyType instanceof HistogramKey) {
          return this.getHistogram(key);
        }
        if (key.keyType instanceof SummaryKey) {
          return this.getSummary(key);
        }
        throw new Error("Bug, unknown MetricKeyType");
      } else {
        return hook;
      }
    }
    getCounter(key) {
      let value = toUndefined(this.map.get(key));
      if (value == null) {
        const updater = this.listener.unsafeUpdate(key);
        const counter6 = onUpdate(counter4(key), updater);
        if (!has_3(this.map, key)) {
          this.map.set(key, counter6);
        }
        value = counter6;
      }
      return value;
    }
    getGauge(key) {
      let value = toUndefined(this.map.get(key));
      if (value == null) {
        const updater = this.listener.unsafeUpdate(key);
        const gauge4 = onUpdate(gauge3(key, 0), updater);
        if (!has_3(this.map, key)) {
          this.map.set(key, gauge4);
        }
        value = gauge4;
      }
      return value;
    }
    getFrequency(key) {
      let value = toUndefined(this.map.get(key));
      if (value == null) {
        const updater = this.listener.unsafeUpdate(key);
        const frequency6 = onUpdate(frequency4(key), updater);
        if (!has_3(this.map, key)) {
          this.map.set(key, frequency6);
        }
        value = frequency6;
      }
      return value;
    }
    getHistogram(key) {
      let value = toUndefined(this.map.get(key));
      if (value == null) {
        const updater = this.listener.unsafeUpdate(key);
        const histogram6 = onUpdate(histogram4(key), updater);
        if (!has_3(this.map, key)) {
          this.map.set(key, histogram6);
        }
        value = histogram6;
      }
      return value;
    }
    getSummary(key) {
      let value = toUndefined(this.map.get(key));
      if (value == null) {
        const updater = this.listener.unsafeUpdate(key);
        const summary4 = onUpdate(summary3(key), updater);
        if (!has_3(this.map, key)) {
          this.map.set(key, summary4);
        }
        value = summary4;
      }
      return value;
    }
  };

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Metrics/operations/registry.mjs
  var metricRegistry = /* @__PURE__ */ LazyValue.make(() => new MetricRegistry());

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Metrics/operations/fromMetricKey.mjs
  function fromMetricKey(key) {
    const hook = (extraTags) => {
      const fullKey = taggedWithLabelSet(key, extraTags);
      return metricRegistry.value.get(fullKey);
    };
    return Metric(key.keyType, (input, extraTags) => hook(extraTags).update(input), (extraTags) => hook(extraTags).get());
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Metrics/operations/frequency.mjs
  function frequency5(name) {
    return fromMetricKey(frequency2(name));
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Metrics/operations/counter.mjs
  function counter5(name) {
    return fromMetricKey(counter2(name));
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/prelude/Equivalence/strict.mjs
  function strict() {
    return Equivalence((x, y) => x === y);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/prelude/Equivalence/number.mjs
  var number2 = /* @__PURE__ */ strict();

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/elem.mjs
  function elem_(self2, E2, value) {
    const predicate = (element) => E2.equals(element, value);
    for (let i = 0; i < self2.length; i++) {
      if (predicate(unsafeGet_(self2, i))) {
        return true;
      }
    }
    return false;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/uniq.mjs
  function uniq_(self2, E2) {
    let out = empty();
    for (let i = 0; i < self2.length; i++) {
      const a = unsafeGet_(self2, i);
      if (!elem_(out, E2, a)) {
        out = append_(out, a);
      }
    }
    return self2.length === out.length ? self2 : out;
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Metrics/Boundaries.mjs
  var _a44;
  var HistogramBoundariesSym = /* @__PURE__ */ Symbol.for("@effect/core/io/Metrics/Histogram/Boundaries");
  var HistogramBoundariesInternal = class {
    constructor(values2) {
      this.values = values2;
      this[_a44] = HistogramBoundariesSym;
    }
    [(_a44 = HistogramBoundariesSym, Hash.sym)]() {
      return combine(hashString("ets/Metrics/Histogram/Boundaries"), hashUnknown(this.values));
    }
    [Equals.sym](u) {
      return isHistogramBoundaries_1(u) && equals_4(this.values, u.values);
    }
  };
  function fromChunk_1(chunk) {
    return new HistogramBoundariesInternal(uniq_(concat_(chunk, single(Number.MAX_VALUE)), number2));
  }
  function exponential(start, factor, count) {
    return fromChunk_1(map_4(range(0, count - 1), (i) => start * Math.pow(factor, i)));
  }
  function isHistogramBoundaries_1(u) {
    return typeof u === "object" && u != null && HistogramBoundariesSym in u;
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Metrics/operations/histogram.mjs
  function histogram5(name, boundaries) {
    return fromMetricKey(histogram2(name, boundaries));
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Fiber/status.mjs
  var _a45;
  var _b20;
  var _c11;
  var FiberStatusSym = /* @__PURE__ */ Symbol.for("@effect/core/Fiber/FiberStatus");
  var Done4 = class {
    constructor() {
      this._tag = "Done";
      this[_a45] = FiberStatusSym;
    }
    [(_a45 = FiberStatusSym, Hash.sym)]() {
      return hashString(this._tag);
    }
    [Equals.sym](that) {
      return isFiberStatus_1(that) && that._tag === "Done";
    }
  };
  var Running3 = class {
    constructor(interrupting) {
      this.interrupting = interrupting;
      this._tag = "Running";
      this[_b20] = FiberStatusSym;
    }
    [(_b20 = FiberStatusSym, Hash.sym)]() {
      return combine(hashString(this._tag), hashUnknown(this.interrupting));
    }
    [Equals.sym](that) {
      return isFiberStatus_1(that) && that._tag === "Running" && this.interrupting === that.interrupting;
    }
  };
  var Suspended = class {
    constructor(interrupting, interruptible, asyncs, blockingOn, asyncTrace) {
      this.interrupting = interrupting;
      this.interruptible = interruptible;
      this.asyncs = asyncs;
      this.blockingOn = blockingOn;
      this.asyncTrace = asyncTrace;
      this._tag = "Suspended";
      this[_c11] = FiberStatusSym;
    }
    [(_c11 = FiberStatusSym, Hash.sym)]() {
      return combine(hashString(this._tag), combine(hashUnknown(this.interrupting), combine(hashUnknown(this.interruptible), combine(hashNumber(this.asyncs), combine(hashUnknown(this.blockingOn), hashUnknown(this.asyncTrace))))));
    }
    [Equals.sym](that) {
      return isFiberStatus_1(that) && that._tag === "Suspended" && this.interrupting === that.interrupting && this.interruptible === that.interruptible && this.asyncs === that.asyncs && equals(this.blockingOn, that.blockingOn);
    }
  };
  function isFiberStatus_1(u) {
    return typeof u === "object" && u != null && FiberStatusSym in u;
  }
  var statusDone = /* @__PURE__ */ new Done4();
  function statusRunning(interrupting) {
    return new Running3(interrupting);
  }
  function statusSuspended(interrupting, interruptible, asyncs, blockingOn, asyncTrace) {
    return new Suspended(interrupting, interruptible, asyncs, blockingOn, asyncTrace);
  }
  function isInterrupting(self2) {
    switch (self2._tag) {
      case "Done": {
        return false;
      }
      case "Running": {
        return self2.interrupting;
      }
      case "Suspended": {
        return self2.interrupting;
      }
    }
  }
  function withInterrupting(self2, newInterrupting) {
    switch (self2._tag) {
      case "Done": {
        return self2;
      }
      case "Running": {
        return new Running3(newInterrupting);
      }
      case "Suspended": {
        return new Suspended(newInterrupting, self2.interruptible, self2.asyncs, self2.blockingOn, self2.asyncTrace);
      }
    }
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Fiber/_internal/cancelerState.mjs
  var empty12 = {
    _tag: "Empty"
  };
  var pending2 = {
    _tag: "Pending"
  };
  function registered(asyncCanceler) {
    return {
      _tag: "Registered",
      asyncCanceler
    };
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Fiber/_internal/fiberState.mjs
  var Executing = class {
    constructor(status, observers, suppressed, interruptors2, asyncCanceler, mailbox) {
      this.status = status;
      this.observers = observers;
      this.suppressed = suppressed;
      this.interruptors = interruptors2;
      this.asyncCanceler = asyncCanceler;
      this.mailbox = mailbox;
      this._tag = "Executing";
    }
  };
  var Done5 = class {
    constructor(value) {
      this.value = value;
      this._tag = "Done";
      this.suppressed = empty5;
      this.status = statusDone;
      this.interruptors = empty4();
    }
  };
  function executing(status, observers, suppressed, interruptors2, asyncCanceler, mailbox) {
    return new Executing(status, observers, suppressed, interruptors2, asyncCanceler, mailbox);
  }
  function done5(value) {
    return new Done5(value);
  }
  function initial() {
    return new Executing(statusRunning(false), empty2(), empty5, empty4(), empty12, void 0);
  }
  function isInterrupting2(self2) {
    return isInterrupting(self2.status);
  }
  function interruptorsCause(state) {
    return reduce_3(state.interruptors, empty5, (acc, interruptor) => combineSeq(acc, interrupt(interruptor)));
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/ImmutableMap/size.mjs
  function size4(self2) {
    return self2.internalMap.size;
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberRefs/definition.mjs
  var FiberRefsSym = /* @__PURE__ */ Symbol.for("@effect/core/io/FiberRefs");

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberRefs/operations/_internal/FiberRefsInternal.mjs
  var _a46;
  var FiberRefsInternal = class {
    constructor(fiberRefLocals) {
      this.fiberRefLocals = fiberRefLocals;
      this[_a46] = FiberRefsSym;
    }
  };
  _a46 = FiberRefsSym;

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberRefs/operations/make.mjs
  function make21(fiberRefLocals) {
    return new FiberRefsInternal(fiberRefLocals);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/updateFiberRefs.mjs
  function updateFiberRefs(f, __tsplusTrace) {
    return new IFiberRefModifyAll((fiberId2, fiberRefs) => make2(void 0, f(fiberId2, fiberRefs)), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/LogLevel/definition.mjs
  var All = {
    _tag: "All",
    syslog: 0,
    label: "ALL",
    ordinal: Number.MIN_SAFE_INTEGER
  };
  var Info = {
    _tag: "Info",
    syslog: 6,
    label: "INFO",
    ordinal: 2e4
  };
  var Debug = {
    _tag: "Debug",
    syslog: 7,
    label: "DEBUG",
    ordinal: 1e4
  };
  var None3 = {
    _tag: "None",
    syslog: 7,
    label: "OFF",
    ordinal: Number.MAX_SAFE_INTEGER
  };

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberRef/operations/currentLogLevel.mjs
  var currentLogLevel = /* @__PURE__ */ LazyValue.make(() => unsafeMake(Info));

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberRef/operations/currentLogSpan.mjs
  var currentLogSpan = /* @__PURE__ */ LazyValue.make(() => unsafeMake(empty2()));

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/ImmutableMap/empty.mjs
  function empty13() {
    return new ImmutableMap(new Map());
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberRef/operations/currentLogAnnotations.mjs
  var currentLogAnnotations = /* @__PURE__ */ LazyValue.make(() => unsafeMake(empty13()));

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/ImmutableMap/copy.mjs
  function copy(self2) {
    const map = new Map();
    for (const [key, value] of self2.internalMap) {
      map.set(key, value);
    }
    return new ImmutableMap(map);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/ImmutableMap/remove.mjs
  function remove_(self2, key) {
    const map = copy(self2).internalMap;
    map.delete(key);
    return new ImmutableMap(map);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/ImmutableMap/set.mjs
  function set_2(self2, key, value) {
    const map = copy(self2).internalMap;
    map.set(key, value);
    return new ImmutableMap(map);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberRef/operations/initital.mjs
  function initial2(self2) {
    void 0;
    return self2._initial;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/ImmutableMap/get.mjs
  function get_3(self2, key) {
    return self2.internalMap.has(key) ? some(self2.internalMap.get(key)) : none;
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/List/filter.mjs
  function filter_2(self2, p) {
    return filterCommon_(self2, p, false);
  }
  function noneIn(l, p, isFlipped) {
    while (true) {
      if (isNil(l)) {
        return nil();
      } else {
        if (p(l.head) !== isFlipped) {
          return allIn(l, l.tail, p, isFlipped);
        } else {
          l = l.tail;
        }
      }
    }
  }
  function allIn(start, remaining, p, isFlipped) {
    while (true) {
      if (isNil(remaining)) {
        return start;
      } else {
        if (p(remaining.head) !== isFlipped) {
          remaining = remaining.tail;
        } else {
          return partialFill(start, remaining, p, isFlipped);
        }
      }
    }
  }
  function partialFill(origStart, firstMiss, p, isFlipped) {
    const newHead = cons(unsafeHead(origStart), nil());
    let toProcess = unsafeTail(origStart);
    let currentLast = newHead;
    while (!(toProcess === firstMiss)) {
      const newElem = cons(unsafeHead(toProcess), nil());
      currentLast.tail = newElem;
      currentLast = newElem;
      toProcess = toProcess.tail;
    }
    let next2 = firstMiss.tail;
    let nextToCopy = next2;
    while (!isNil(next2)) {
      const head3 = unsafeHead(next2);
      if (p(head3) !== isFlipped) {
        next2 = next2.tail;
      } else {
        while (!(nextToCopy === next2)) {
          const newElem = cons(unsafeHead(nextToCopy), nil());
          currentLast.tail = newElem;
          currentLast = newElem;
          nextToCopy = nextToCopy.tail;
        }
        nextToCopy = next2.tail;
        next2 = next2.tail;
      }
    }
    if (!isNil(nextToCopy)) {
      currentLast.tail = nextToCopy;
    }
    return newHead;
  }
  function filterCommon_(list, p, isFlipped) {
    return noneIn(list, p, isFlipped);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/List/forEach.mjs
  function forEach_3(self2, f) {
    let these = self2;
    while (!isNil(these)) {
      f(these.head);
      these = these.tail;
    }
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/Chunk/join.mjs
  function join_(self2, sep) {
    return reduce_4(self2, "", (s, a) => s.length > 0 ? `${s}${sep}${a}` : a);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberId/operations/threadName.mjs
  function threadName(self2) {
    const identifiers = join_(map_4(from2(ids(self2)), (n) => `${n}`), ",");
    return `effect-ts-fiber-${identifiers}`;
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Cause/operations/contains.mjs
  function contains_(self2, that) {
    if (self2 === that) {
      return true;
    }
    return foldLeft_(self2, false, (acc, cause) => some(acc || equals(cause, that)));
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Exit/operations/mapErrorCause.mjs
  function mapErrorCause_(self2, f) {
    switch (self2._tag) {
      case "Failure":
        return new Failure(f(self2.cause));
      case "Success":
        return self2;
    }
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberRef/operations/fork.mjs
  function fork_(self2) {
    void 0;
    return self2._fork;
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberRef/operations/patch.mjs
  var patch_2 = patch_1;
  function patch_1(self2, patch) {
    return (oldValue) => {
      void 0;
      return self2._patch(patch)(oldValue);
    };
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberRef/operations/forkScopeOverride.mjs
  var forkScopeOverride = /* @__PURE__ */ LazyValue.make(() => unsafeMake(none, () => none));

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/data/Maybe/orElse.mjs
  function orElse_(self2, onNone) {
    return isNone(self2) ? onNone() : self2;
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberId/operations/combine.mjs
  function combine_2(self2, that) {
    void 0;
    switch (self2._tag) {
      case "None": {
        return that;
      }
      case "Runtime": {
        void 0;
        switch (that._tag) {
          case "None": {
            return self2;
          }
          case "Runtime": {
            return new CompositeFiberId(from7([self2, that]));
          }
          case "Composite": {
            return new CompositeFiberId(add_(that.fiberIds, self2));
          }
        }
      }
      case "Composite": {
        void 0;
        switch (that._tag) {
          case "None": {
            return self2;
          }
          case "Runtime": {
            return new CompositeFiberId(add_(self2.fiberIds, that));
          }
          case "Composite": {
            return new CompositeFiberId(union_(self2.fiberIds, that.fiberIds));
          }
        }
      }
    }
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberId/operations/combineAll.mjs
  function combineAll(fiberIds) {
    return reduce_3(fiberIds, none2, (a, b) => combine_2(a, b));
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Cause/operations/isTraced.mjs
  function isTraced(self2) {
    return isSome(find_(self2, (cause) => isDieType(cause) && cause.trace !== none3 || isFailType(cause) && cause.trace !== none3 || isInterruptType(cause) && cause.trace !== none3 ? some(void 0) : none));
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Trace/operations/combine.mjs
  function combine_3(self2, that) {
    return make3(combine_2(self2.fiberId, that.fiberId), concat_(self2.stackTrace, that.stackTrace));
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Cause/operations/mapTrace.mjs
  function mapTrace_(self2, f) {
    return fold_2(self2, () => empty5, (e, trace) => new Fail(e, f(trace)), (d, trace) => new Die(d, f(trace)), (fiberId2, trace) => new Interrupt(fiberId2, f(trace)), (left2, right2) => new Then(left2, right2), (left2, right2) => new Both(left2, right2), (cause, stackless2) => new Stackless(cause, stackless2));
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Cause/operations/traced.mjs
  function traced_(self2, trace) {
    return mapTrace_(self2, (_) => combine_3(_, trace));
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/zip.mjs
  function zip_2(self2, that, __tsplusTrace) {
    return flatMap_(self2, (a) => map_(that(), (b) => make2(a, b), __tsplusTrace), __tsplusTrace);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Supervisor/operations/and.mjs
  var fileName_130 = "(@effect/core) _src/io/Supervisor/operations/and.ts";
  function and_2(self2, that) {
    return new Supervisor(zip_2(self2.value, () => that.value, fileName_130 + ":14:19"), (environment3, effect2, parent, fiber) => {
      try {
        self2.unsafeOnStart(environment3, effect2, parent, fiber);
      } finally {
        that.unsafeOnStart(environment3, effect2, parent, fiber);
      }
    }, (exit2, fiber) => {
      self2.unsafeOnEnd(exit2, fiber);
      that.unsafeOnEnd(exit2, fiber);
    }, (fiber, effect2) => {
      self2.unsafeOnEffect(fiber, effect2);
      that.unsafeOnEffect(fiber, effect2);
    }, (fiber) => {
      self2.unsafeOnSuspend(fiber);
      that.unsafeOnSuspend(fiber);
    }, (fiber) => {
      self2.unsafeOnSuspend(fiber);
      that.unsafeOnSuspend(fiber);
    });
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/RuntimeConfig/operations/make.mjs
  function make22(value) {
    return {
      value
    };
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberRef/operations/diff.mjs
  function diff_(self2, oldValue, newValue) {
    void 0;
    return self2._diff(oldValue, newValue);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberRef/operations/combine.mjs
  function combine_4(self2, first, second) {
    void 0;
    return self2._combine(first, second);
  }

  // ../node_modules/.pnpm/@tsplus+stdlib@0.2.2/node_modules/@tsplus/stdlib/_mjs/collections/List/map.mjs
  function map_10(self2, f) {
    if (isNil(self2)) {
      return self2;
    } else {
      const h = cons(f(self2.head), nil());
      let t = h;
      let rest = self2.tail;
      while (!isNil(rest)) {
        const nx = cons(f(rest.head), nil());
        t.tail = nx;
        t = nx;
        rest = rest.tail;
      }
      return h;
    }
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/FiberRefs/operations/_internal/join.mjs
  function joinFiberRefs(self2, that) {
    void 0;
    void 0;
    const parentFiberRefs = self2.fiberRefLocals;
    const childFiberRefs = that.fiberRefLocals;
    const fiberRefLocals = reduce_4(from2(childFiberRefs), parentFiberRefs, (parentFiberRefs2, {
      tuple: [fiberRef, childStack]
    }) => {
      const parentStack = getOrElse_(get_3(parentFiberRefs2, fiberRef), () => empty2());
      const values2 = combine2(fiberRef, parentStack, childStack);
      const patches = reverse(reduce_2(values2.tail, make2(values2.head, empty2()), ({
        tuple: [oldValue, patches2]
      }, newValue) => make2(newValue, cons(diff_(fiberRef, oldValue, newValue), patches2))).get(1));
      if (isNil(patches)) {
        return parentFiberRefs2;
      }
      let newStack;
      if (isNil(parentStack)) {
        newStack = none;
      } else {
        const patch = reduce_2(patches.tail, patches.head, (a, b) => combine_4(fiberRef, a, b));
        const {
          tuple: [fiberId2, oldValue]
        } = parentStack.head;
        const tail = parentStack.tail;
        newStack = some(cons(make2(fiberId2, patch_2(fiberRef, patch)(oldValue)), tail));
      }
      return fold_(newStack, () => parentFiberRefs2, (stack) => set_2(parentFiberRefs2, fiberRef, stack));
    });
    return new FiberRefsInternal(fiberRefLocals);
  }
  function combine2(fiberRef, parentStack, childStack) {
    return combineLoop(reverse(parentStack), reverse(childStack), initial2(fiberRef), initial2(fiberRef));
  }
  function combineLoop(parentStack, childStack, lastParentValue, lastChildValue) {
    var parentStack_1 = parentStack, childStack_1 = childStack, lastParentValue_1 = lastParentValue, lastChildValue_1 = lastChildValue;
    var parentStack_2 = parentStack, childStack_2 = childStack, lastParentValue_2 = lastParentValue, lastChildValue_2 = lastChildValue;
    while (1) {
      if (isNil(parentStack_1) || isNil(childStack_1)) {
        return cons(lastChildValue_1, map_10(childStack_1, (tuple) => tuple.get(1)));
      }
      const {
        tuple: [parentId, parentValue]
      } = parentStack_1.head;
      const parentTail = parentStack_1.tail;
      const {
        tuple: [childId, childValue]
      } = childStack_1.head;
      const childTail = childStack_1.tail;
      if (equals(parentId, childId)) {
        parentStack_2 = parentTail;
        childStack_2 = childTail;
        lastParentValue_2 = parentValue;
        lastChildValue_2 = childValue;
        parentStack_1 = parentStack_2;
        childStack_1 = childStack_2;
        lastParentValue_1 = lastParentValue_2;
        lastChildValue_1 = lastChildValue_2;
        continue;
      }
      if (parentId.id < childId.id) {
        return prepend_(prepend_(prepend_(map_10(childStack_1, (tuple) => tuple.get(1)), childValue), lastChildValue_1), lastParentValue_1);
      }
      return prepend_(prepend_(map_10(childStack_1, (tuple) => tuple.get(1)), childValue), lastChildValue_1);
    }
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/support/StackTraceBuilder.mjs
  var StackTraceBuilder = class {
    constructor() {
      this.last = void 0;
      this.builder = builder();
    }
    append(trace) {
      if (trace != null && trace !== this.last && trace !== empty10) {
        this.builder.append(trace);
        this.last = trace;
      }
    }
    build() {
      return this.builder.build();
    }
  };
  function unsafeMake7() {
    return new StackTraceBuilder();
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Fiber/_internal/context.mjs
  var _a47;
  var fileName_131 = "(@effect/core) _src/io/Fiber/_internal/context.ts";
  var fiberFailureCauses = /* @__PURE__ */ LazyValue.make(() => frequency5("effect_fiber_failure_causes"));
  var fiberForkLocations = /* @__PURE__ */ LazyValue.make(() => frequency5("effect_fiber_fork_locations"));
  var fibersStarted = /* @__PURE__ */ LazyValue.make(() => counter5("effect_fiber_started"));
  var fiberSuccesses = /* @__PURE__ */ LazyValue.make(() => counter5("effect_fiber_successes"));
  var fiberFailures = /* @__PURE__ */ LazyValue.make(() => counter5("effect_fiber_failures"));
  var fiberLifetimes = /* @__PURE__ */ LazyValue.make(() => {
    const fiberLifetimeBoundaries = exponential(1, 2, 100);
    return histogram5("effect_fiber_lifetimes", fiberLifetimeBoundaries);
  });
  var InterruptExit = class {
    constructor(apply3, trace) {
      this.apply = apply3;
      this.trace = trace;
      this._tag = "InterruptExit";
    }
  };
  var Finalizer = class {
    constructor(finalizer, handleInterrupts, trace) {
      this.finalizer = finalizer;
      this.handleInterrupts = handleInterrupts;
      this.trace = trace;
      this._tag = "Finalizer";
    }
    apply(a) {
      this.handleInterrupts();
      return map_(this.finalizer, () => a, this.finalizer.trace);
    }
  };
  var ApplyFrame = class {
    constructor(apply3, trace) {
      this.apply = apply3;
      this.trace = trace;
      this._tag = "ApplyFrame";
    }
  };
  var catastrophicFailure = /* @__PURE__ */ new AtomicBoolean(false);
  var currentFiber = /* @__PURE__ */ new AtomicReference(null);
  var FiberContext = class {
    constructor(_id, childFibers, fiberRefLocals, runtimeConfig, interruptStatus) {
      this._id = _id;
      this.childFibers = childFibers;
      this._tag = "RuntimeFiber";
      this[_a47] = FiberSym;
      this.state = new AtomicReference(initial());
      this.asyncEpoch = 0;
      this.stack = void 0;
      this.nextEffect = void 0;
      this._location = this._id.location;
      this.interruptExit = new InterruptExit((v) => {
        if (this.unsafeIsInterruptible) {
          this.popInterruptStatus();
          return succeedNow(v, fileName_131 + ":391:43");
        } else {
          return succeed(() => {
            this.popInterruptStatus();
            return v;
          }, fileName_131 + ":394:23");
        }
      });
      this.fiberRefLocals = fiberRefLocals;
      this.runtimeConfig = runtimeConfig;
      this.interruptStatus = interruptStatus;
      if (this.trackMetrics) {
        fibersStarted.value.unsafeUpdate(1, empty4());
        fiberForkLocations.value.unsafeUpdate(stringify(this._location), empty4());
      }
    }
    get fiberId() {
      return this._id;
    }
    get _await() {
      return asyncInterruptBlockingOn((k) => {
        const cb = (x) => k(done2(() => x, fileName_131 + ":115:67"));
        const result = this.unsafeAddObserverMaybe(cb);
        return result == null ? left(succeed(() => this.unsafeRemoveObserver(cb), fileName_131 + ":119:37")) : right(succeedNow(result, fileName_131 + ":120:41"));
      }, () => this.fiberId, fileName_131 + ":114:43");
    }
    get _children() {
      return this._evalOnEffect(succeed(() => {
        const chunkBuilder = builder();
        for (const child of this.childFibers) {
          chunkBuilder.append(child);
        }
        return chunkBuilder.build();
      }, fileName_131 + ":126:21"), succeed(() => empty(), fileName_131 + ":133:21"));
    }
    get _inheritRefs() {
      return suspendSucceed(() => {
        if (size4(this.fiberRefLocals) === 0) {
          return unit;
        }
        const childFiberRefs = make21(this.fiberRefLocals);
        return updateFiberRefs((_, parentFiberRefs) => joinFiberRefs(parentFiberRefs, childFiberRefs), fileName_131 + ":145:36");
      }, fileName_131 + ":138:33");
    }
    get _poll() {
      return succeed(() => this.unsafePoll(), fileName_131 + ":150:26");
    }
    _interruptAs(fiberId2) {
      return this.unsafeInterruptAs(fiberId2);
    }
    get _scope() {
      return unsafeMake2(this);
    }
    get _status() {
      return succeed(() => this.state.get.status, fileName_131 + ":168:26");
    }
    get _trace() {
      return succeed(() => this.unsafeCaptureTrace([]), fileName_131 + ":172:26");
    }
    _evalOn(effect2, orElse) {
      return suspendSucceed(() => this.unsafeEvalOn(effect2) ? unit : unit_(orElse, fileName_131 + ":180:60"), fileName_131 + ":179:33");
    }
    _evalOnEffect(effect2, orElse) {
      return flatMap_(environment(fileName_131 + ":188:30"), (environment3) => flatMap_(make6(fileName_131 + ":189:20"), (deferred) => zipRight_(this._evalOn(intoDeferred_(provideEnvironment_(effect2, () => environment3, fileName_131 + ":191:36"), () => deferred, fileName_131 + ":191:62"), intoDeferred_(provideEnvironment_(orElse, () => environment3, fileName_131 + ":192:36"), () => deferred, fileName_131 + ":192:62")), () => deferred.await(fileName_131 + ":193:34"), fileName_131 + ":193:19"), fileName_131 + ":189:38"), fileName_131 + ":188:43");
    }
    unsafeGetDescriptor() {
      return {
        id: this.fiberId,
        status: this.state.get.status,
        interrupters: this.state.get.interruptors,
        interruptStatus: fromBoolean(this.unsafeIsInterruptible)
      };
    }
    get trackMetrics() {
      return isEnabled_(this.runtimeConfig.value.flags, trackRuntimeMetrics);
    }
    observeFailure(failure) {
      if (this.trackMetrics) {
        fiberFailureCauses.value.unsafeUpdate(failure, empty4());
      }
    }
    unsafeLog(message, trace) {
      const logLevel = this.unsafeGetRef(currentLogLevel.value);
      const spans = this.unsafeGetRef(currentLogSpan.value);
      const annotations = this.unsafeGetRef(currentLogAnnotations.value);
      const contextMap = this.unsafeGetRefs(this.fiberRefLocals);
      forEach_(this.runtimeConfig.value.loggers, (logger) => {
        logger.apply(parse(trace), this.fiberId, logLevel, message, () => empty5, contextMap, spans, annotations);
      });
    }
    unsafeLogWith(message, cause, overrideLogLevel, overrideRef1 = null, overrideValue1 = null, trace) {
      const logLevel = getOrElse_(overrideLogLevel, () => this.unsafeGetRef(currentLogLevel.value));
      const spans = this.unsafeGetRef(currentLogSpan.value);
      const annotations = this.unsafeGetRef(currentLogAnnotations.value);
      let contextMap = this.unsafeGetRefs(this.fiberRefLocals);
      if (overrideRef1 != null) {
        if (overrideValue1 == null) {
          contextMap = remove_(contextMap, overrideRef1);
        } else {
          contextMap = set_2(contextMap, overrideRef1, overrideValue1);
        }
      }
      forEach_(this.runtimeConfig.value.loggers, (logger) => {
        logger.apply(parse(trace), this.fiberId, logLevel, message, cause, contextMap, spans, annotations);
      });
    }
    get isStackEmpty() {
      return this.stack == null;
    }
    pushContinuation(k) {
      this.stack = new Stack(k, this.stack);
    }
    popContinuation() {
      if (this.stack) {
        const current = this.stack.value;
        this.stack = this.stack.previous;
        return current;
      }
      return void 0;
    }
    unsafeNextEffect(previousSuccess) {
      if (!this.isStackEmpty) {
        const frame = this.popContinuation();
        return frame._tag === "Fold" ? frame.success(previousSuccess) : frame.apply(previousSuccess);
      }
      return this.unsafeTryDone(succeed3(previousSuccess));
    }
    unsafeUnwindStack() {
      let unwinding = true;
      let discardedFolds = false;
      while (unwinding && !this.isStackEmpty) {
        const frame = this.popContinuation();
        switch (frame._tag) {
          case "InterruptExit": {
            this.popInterruptStatus();
            break;
          }
          case "Finalizer": {
            this.unsafeDisableInterrupting();
            this.pushContinuation(new ApplyFrame((cause) => foldCauseEffect_(frame.finalizer, (finalizerCause) => {
              this.popInterruptStatus();
              this.unsafeAddSuppressed(finalizerCause);
              return failCauseNow(cause, fileName_131 + ":352:45");
            }, () => {
              this.popInterruptStatus();
              return failCauseNow(cause, fileName_131 + ":356:45");
            }, fileName_131 + ":348:46")));
            unwinding = false;
            break;
          }
          case "Fold": {
            if (this.unsafeShouldInterrupt) {
              discardedFolds = true;
            } else {
              this.pushContinuation(new ApplyFrame(frame.failure, frame.trace));
              unwinding = false;
            }
            break;
          }
        }
      }
      return discardedFolds;
    }
    pushInterruptStatus(flag) {
      this.interruptStatus = new Stack(flag, this.interruptStatus);
    }
    popInterruptStatus() {
      if (this.interruptStatus) {
        const current = this.interruptStatus.value;
        this.interruptStatus = this.interruptStatus.previous;
        return current;
      }
      return void 0;
    }
    unsafeInterruptAs(fiberId2) {
      const interruptedCause = interrupt(fiberId2);
      return suspendSucceed(() => {
        const oldState = this.state.get;
        if (oldState._tag === "Executing" && oldState.status._tag === "Suspended" && oldState.status.interruptible && oldState.asyncCanceler._tag === "Registered") {
          const newState = executing(statusRunning(true), oldState.observers, oldState.suppressed, add_(oldState.interruptors, fiberId2), empty12, oldState.mailbox);
          this.state.set(newState);
          const interrupt6 = failCause(() => interruptedCause, fileName_131 + ":438:43");
          const asyncCanceler = oldState.asyncCanceler.asyncCanceler;
          const effect2 = asyncCanceler === unit ? interrupt6 : zipRight_(asyncCanceler, () => interrupt6, fileName_131 + ":440:90");
          this.unsafeRunLater(effect2);
        } else if (oldState._tag === "Executing") {
          const newCause = combineSeq(oldState.suppressed, interruptedCause);
          const newState = executing(oldState.status, oldState.observers, newCause, add_(oldState.interruptors, fiberId2), oldState.asyncCanceler, oldState.mailbox);
          this.state.set(newState);
        }
        return this._await;
      }, fileName_131 + ":418:33");
    }
    unsafeSetInterrupting(value) {
      const oldState = this.state.get;
      if (oldState._tag === "Executing") {
        this.state.set(executing(withInterrupting(oldState.status, value), oldState.observers, oldState.suppressed, oldState.interruptors, oldState.asyncCanceler, oldState.mailbox));
      }
    }
    unsafeDisableInterrupting() {
      this.interruptStatus = new Stack(false, this.interruptStatus);
    }
    unsafeRestoreInterrupt() {
      this.stack = new Stack(this.interruptExit, this.stack);
    }
    get unsafeIsInterrupted() {
      return size2(this.state.get.interruptors) > 0;
    }
    get unsafeIsInterruptible() {
      return this.interruptStatus ? this.interruptStatus.value : true;
    }
    get unsafeIsInterrupting() {
      return isInterrupting2(this.state.get);
    }
    get unsafeShouldInterrupt() {
      return this.unsafeIsInterrupted && this.unsafeIsInterruptible && !this.unsafeIsInterrupting;
    }
    unsafeGetRef(fiberRef) {
      return getOrElse_(map_8(get_3(this.fiberRefLocals, fiberRef), (stack) => stack.head.get(1)), () => initial2(fiberRef));
    }
    unsafeGetRefs(fiberRefLocals) {
      const refs = [];
      for (const {
        tuple: [fiberRef, stack]
      } of fiberRefLocals) {
        refs.push(make2(fiberRef, stack.head.get(1)));
      }
      return from6(refs);
    }
    unsafeSetRef(fiberRef, value) {
      const oldStack = getOrElse_(get_3(this.fiberRefLocals, fiberRef), () => empty2());
      const newStack = isNil(oldStack) ? cons(make2(this._id, value), nil()) : cons(make2(this._id, value), oldStack.tail);
      this.fiberRefLocals = set_2(this.fiberRefLocals, fiberRef, newStack);
    }
    unsafeDeleteRef(fiberRef) {
      this.fiberRefLocals = remove_(this.fiberRefLocals, fiberRef);
    }
    unsafeAddObserverMaybe(k) {
      const oldState = this.state.get;
      switch (oldState._tag) {
        case "Executing": {
          this.state.set(executing(oldState.status, prepend_(oldState.observers, k), oldState.suppressed, oldState.interruptors, oldState.asyncCanceler, oldState.mailbox));
          return void 0;
        }
        case "Done": {
          return oldState.value;
        }
      }
    }
    unsafeRemoveObserver(k) {
      const oldState = this.state.get;
      if (oldState._tag === "Executing") {
        const observers = filter_2(oldState.observers, (o) => o !== k);
        this.state.set(executing(oldState.status, observers, oldState.suppressed, oldState.interruptors, oldState.asyncCanceler, oldState.mailbox));
      }
    }
    unsafeNotifyObservers(v, observers) {
      if (length(observers) > 0) {
        const result = succeed3(v);
        forEach_3(observers, (k) => k(result));
      }
    }
    unsafeReportUnhandled(exit2, trace) {
      if (exit2._tag === "Failure") {
        try {
          this.unsafeLogWith(() => `Fiber ${threadName(this.fiberId)} did not handle an error`, () => exit2.cause, some(Debug), null, null, trace);
        } catch (error) {
          if (this.runtimeConfig.value.fatal(error)) {
            this.runtimeConfig.value.reportFatal(error);
          } else {
            console.log(`An exception was thrown by a logger:
${error}`);
          }
        }
      }
    }
    unsafeAddSuppressed(cause) {
      if (!isEmpty(cause)) {
        const oldState = this.state.get;
        if (oldState._tag === "Executing") {
          const newState = executing(oldState.status, oldState.observers, combineSeq(oldState.suppressed, cause), oldState.interruptors, oldState.asyncCanceler, oldState.mailbox);
          this.state.set(newState);
        }
      }
    }
    unsafeClearSuppressed() {
      const oldState = this.state.get;
      switch (oldState._tag) {
        case "Executing": {
          const newState = executing(oldState.status, oldState.observers, empty5, oldState.interruptors, oldState.asyncCanceler, oldState.mailbox);
          this.state.set(newState);
          const interruptorsCause2 = interruptorsCause(oldState);
          return contains_(oldState.suppressed, interruptorsCause2) ? oldState.suppressed : combineSeq(oldState.suppressed, interruptorsCause2);
        }
        case "Done": {
          return interruptorsCause(oldState);
        }
      }
    }
    unsafeAddChild(child) {
      return this.unsafeEvalOn(succeed(() => this.childFibers.add(child), fileName_131 + ":665:44"));
    }
    unsafePoll() {
      const state = this.state.get;
      return state._tag === "Done" ? some(state.value) : none;
    }
    unsafeCaptureTrace(prefix) {
      const builder2 = unsafeMake7();
      prefix.forEach((_) => builder2.append(_));
      if (this.stack != null) {
        const stack = this.stack;
        const frames = [stack.value];
        let previous = stack.previous;
        while (previous != null) {
          frames.unshift(previous.value);
          previous = previous.previous;
        }
        frames.forEach((frame) => builder2.append(parse(frame.trace)));
      }
      return new Trace(this.fiberId, builder2.build());
    }
    unsafeEnterAsync(epoch, blockingOn, trace) {
      const oldState = this.state.get;
      if (oldState._tag === "Executing" && oldState.status._tag === "Running" && oldState.asyncCanceler._tag === "Empty") {
        const newStatus = statusSuspended(oldState.status.interrupting, this.unsafeIsInterruptible && !this.unsafeIsInterrupting, epoch, blockingOn, trace);
        const newState = executing(newStatus, oldState.observers, oldState.suppressed, oldState.interruptors, pending2, oldState.mailbox);
        this.state.set(newState);
      } else {
        throw new IllegalStateException(`Fiber ${threadName(this.fiberId)} is not running`);
      }
    }
    unsafeExitAsync(epoch) {
      const oldState = this.state.get;
      if (oldState._tag === "Executing" && oldState.status._tag === "Suspended" && oldState.status.asyncs === epoch) {
        const newState = executing(statusRunning(oldState.status.interrupting), oldState.observers, oldState.suppressed, oldState.interruptors, empty12, oldState.mailbox);
        this.state.set(newState);
        return true;
      }
      return false;
    }
    unsafeCreateAsyncResume(epoch) {
      return (effect2) => {
        if (this.unsafeExitAsync(epoch)) {
          this.unsafeRunLater(effect2);
        }
      };
    }
    unsafeSetAsyncCanceler(epoch, asyncCanceler0) {
      const oldState = this.state.get;
      const asyncCanceler = asyncCanceler0 == null ? unit : asyncCanceler0;
      if (oldState._tag === "Executing" && oldState.status._tag === "Suspended" && oldState.asyncCanceler._tag === "Pending" && epoch === oldState.status.asyncs) {
        this.state.set(executing(oldState.status, oldState.observers, oldState.suppressed, oldState.interruptors, registered(asyncCanceler), oldState.mailbox));
      } else if (oldState._tag === "Executing" && oldState.status._tag === "Suspended" && oldState.asyncCanceler._tag === "Registered" && epoch === oldState.status.asyncs) {
        throw new Error("Bug, inconsistent state in unsafeSetAsyncCanceler");
      }
    }
    unsafeAddFinalizer(finalizer) {
      this.pushContinuation(new Finalizer(finalizer, () => {
        this.unsafeDisableInterrupting();
        this.unsafeRestoreInterrupt();
      }));
    }
    unsafeEvalOn(effect2) {
      const oldState = this.state.get;
      switch (oldState._tag) {
        case "Executing": {
          const newMailbox = oldState.mailbox == null ? effect2 : zipRight_(oldState.mailbox, () => effect2, fileName_131 + ":823:89");
          this.state.set(executing(oldState.status, oldState.observers, oldState.suppressed, oldState.interruptors, oldState.asyncCanceler, newMailbox));
          return true;
        }
        case "Done": {
          return false;
        }
      }
    }
    unsafeTryDone(exit2) {
      const oldState = this.state.get;
      switch (oldState._tag) {
        case "Executing": {
          if (oldState.mailbox != null) {
            const newState = executing(oldState.status, oldState.observers, oldState.suppressed, oldState.interruptors, oldState.asyncCanceler, void 0);
            this.state.set(newState);
            this.unsafeSetInterrupting(true);
            return zipRight_(oldState.mailbox, () => done2(() => exit2, fileName_131 + ":864:67"), fileName_131 + ":864:55");
          } else if (this.childFibers.size === 0) {
            const interruptorsCause2 = interruptorsCause(oldState);
            const newExit = interruptorsCause2 === empty5 ? exit2 : mapErrorCause_(exit2, (cause) => contains_(cause, interruptorsCause2) ? cause : combineSeq(cause, interruptorsCause2));
            this.state.set(done5(newExit));
            this.unsafeReportUnhandled(newExit);
            this.unsafeNotifyObservers(newExit, oldState.observers);
            const startTimeSeconds = this._id.startTimeSeconds;
            const endTimeSeconds = new Date().getTime() / 1e3;
            const lifetime = endTimeSeconds - startTimeSeconds;
            if (this.trackMetrics) {
              fiberLifetimes.value.unsafeUpdate(lifetime, empty4());
            }
            fold_4(newExit, (cause) => {
              if (this.trackMetrics) {
                fiberFailures.value.unsafeUpdate(1, empty4());
              }
              return fold_2(cause, () => fiberFailureCauses.value.unsafeUpdate("<empty>", empty4()), (failure, _) => {
                this.observeFailure(typeof failure === "object" ? failure.constructor.name : "<anonymous>");
              }, (defect, _) => {
                this.observeFailure(typeof defect === "object" ? defect.constructor.name : "<anonymous>");
              }, () => {
                this.observeFailure("InterruptedException");
              }, constVoid, constVoid, constVoid);
            }, () => {
              if (this.trackMetrics) {
                fiberSuccesses.value.unsafeUpdate(1, empty4());
              }
            });
            return void 0;
          } else {
            this.unsafeSetInterrupting(true);
            let interruptChildren = unit;
            for (const child of this.childFibers) {
              interruptChildren = zipRight_(interruptChildren, () => child._interruptAs(this._id), fileName_131 + ":931:59");
            }
            this.childFibers.clear();
            return zipRight_(interruptChildren, () => done2(() => exit2, fileName_131 + ":936:68"), fileName_131 + ":936:56");
          }
        }
        case "Done": {
          return void 0;
        }
      }
    }
    unsafeDrainMailbox() {
      const oldState = this.state.get;
      switch (oldState._tag) {
        case "Executing": {
          const newState = executing(oldState.status, oldState.observers, oldState.suppressed, oldState.interruptors, oldState.asyncCanceler, void 0);
          this.state.set(newState);
          return oldState.mailbox;
        }
        case "Done": {
          return void 0;
        }
      }
    }
    unsafeOnDone(k) {
      const result = this.unsafeAddObserverMaybe(k);
      if (result != null) {
        k(succeed3(result));
      }
    }
    unsafeFork(effect2, trace, forkScope = none) {
      const childId = unsafeMake5(trace);
      const childFiberRefLocalEntries = [];
      for (const {
        tuple: [fiberRef, stack]
      } of this.fiberRefLocals) {
        const value = patch_2(fiberRef, fork_(fiberRef))(stack.head.get(1));
        childFiberRefLocalEntries.push(make2(fiberRef, prepend_(stack, make2(childId, value))));
      }
      const childFiberRefLocals = from6(childFiberRefLocalEntries);
      const parentScope = getOrElse_(orElse_(forkScope, () => this.unsafeGetRef(forkScopeOverride.value)), () => this._scope);
      const grandChildren = new Set();
      const childContext = new FiberContext(childId, grandChildren, childFiberRefLocals, this.runtimeConfig, new Stack(this.interruptStatus ? this.interruptStatus.value : true));
      if (this.runtimeConfig.value.supervisor !== none4) {
        this.runtimeConfig.value.supervisor.unsafeOnStart(this.unsafeGetRef(currentEnvironment.value), effect2, some(this), childContext);
        childContext.unsafeOnDone((exit2) => this.runtimeConfig.value.supervisor.unsafeOnEnd(flatten(exit2), childContext));
      }
      const childEffect = !parentScope.unsafeAdd(this.runtimeConfig, childContext, fileName_131 + ":1024:47") ? interruptAs(() => parentScope.fiberId, fileName_131 + ":1025:27") : effect2;
      childContext.nextEffect = childEffect;
      scheduleTask(() => childContext.runUntil(this.runtimeConfig.value.maxOp));
      return childContext;
    }
    complete(winner, loser, cont, ab, cb) {
      if (ab.compareAndSet(true, false)) {
        cb(cont(winner, loser));
      }
    }
    unsafeRace(race, trace) {
      const raceIndicator = new AtomicBoolean(true);
      const left2 = this.unsafeFork(race.left(), trace);
      const right2 = this.unsafeFork(race.right(), trace);
      return asyncBlockingOn((cb) => {
        const leftRegister = left2.unsafeAddObserverMaybe(() => this.complete(left2, right2, race.leftWins, raceIndicator, cb));
        if (leftRegister != null) {
          this.complete(left2, right2, race.leftWins, raceIndicator, cb);
        } else {
          const rightRegister = right2.unsafeAddObserverMaybe(() => this.complete(right2, left2, race.rightWins, raceIndicator, cb));
          if (rightRegister != null) {
            this.complete(right2, left2, race.rightWins, raceIndicator, cb);
          }
        }
      }, combineAll(from7([left2.fiberId, right2.fiberId])), fileName_131 + ":1056:34");
    }
    unsafeRunLater(instr) {
      this.nextEffect = instr;
      scheduleTask(() => this.runUntil(this.runtimeConfig.value.maxOp));
    }
    runUntil(maxOpCount) {
      try {
        const flags = this.runtimeConfig.value.flags;
        const logRuntime2 = isEnabled_(flags, logRuntime);
        let current = this.nextEffect;
        this.nextEffect = void 0;
        const superviseOps = isEnabled_(flags, superviseOperations) && this.runtimeConfig.value.supervisor !== none4;
        if (isEnabled_(flags, enableCurrentFiber)) {
          currentFiber.set(this);
        }
        if (this.runtimeConfig.value.supervisor !== none4) {
          this.runtimeConfig.value.supervisor.unsafeOnResume(this);
        }
        while (current != null) {
          try {
            let opCount = 0;
            do {
              if (!this.unsafeShouldInterrupt) {
                const message = this.unsafeDrainMailbox();
                if (message != null) {
                  const oldEffect = current;
                  current = flatMap_(message, () => oldEffect, fileName_131 + ":1118:54");
                } else if (opCount === maxOpCount) {
                  this.unsafeRunLater(current);
                  current = void 0;
                } else {
                  if (logRuntime2) {
                    this.unsafeLog(() => current.unsafeLog(), current.trace);
                  }
                  if (superviseOps) {
                    this.runtimeConfig.value.supervisor.unsafeOnEffect(this, current);
                  }
                  switch (current._tag) {
                    case "FlatMap": {
                      this.pushContinuation(new ApplyFrame(current.k, current.trace));
                      current = current.effect;
                      break;
                    }
                    case "SucceedNow": {
                      current = this.unsafeNextEffect(current.value);
                      break;
                    }
                    case "Succeed": {
                      current = this.unsafeNextEffect(current.effect());
                      break;
                    }
                    case "SucceedWith": {
                      current = this.unsafeNextEffect(current.effect(this.runtimeConfig, this._id));
                      break;
                    }
                    case "Fail": {
                      const cause = current.cause();
                      const tracedCause = isTraced(cause) ? cause : traced_(cause, this.unsafeCaptureTrace([parse(current.trace)]));
                      const discardedFolds = this.unsafeUnwindStack();
                      const strippedCause = discardedFolds ? stripFailures(tracedCause) : tracedCause;
                      const suppressed = this.unsafeClearSuppressed();
                      const fullCause = contains_(strippedCause, suppressed) ? strippedCause : combineSeq(strippedCause, suppressed);
                      if (this.isStackEmpty) {
                        this.unsafeSetInterrupting(true);
                        current = this.unsafeTryDone(failCause2(fullCause));
                      } else {
                        this.unsafeSetInterrupting(false);
                        current = this.unsafeNextEffect(fullCause);
                      }
                      break;
                    }
                    case "Fold": {
                      const effect2 = current;
                      current = effect2.effect;
                      this.pushContinuation(effect2);
                      break;
                    }
                    case "Suspend": {
                      current = current.make();
                      break;
                    }
                    case "SuspendWith": {
                      current = current.make(this.runtimeConfig, this._id);
                      break;
                    }
                    case "InterruptStatus": {
                      const boolFlag = current.flag().toBoolean;
                      const interruptStatus = this.interruptStatus ? this.interruptStatus.value : true;
                      if (interruptStatus !== boolFlag) {
                        this.interruptStatus = new Stack(boolFlag, this.interruptStatus);
                        this.unsafeRestoreInterrupt();
                      }
                      current = current.effect;
                      break;
                    }
                    case "CheckInterrupt": {
                      current = current.k(fromBoolean(this.unsafeIsInterruptible));
                      break;
                    }
                    case "Async": {
                      const effect2 = current;
                      const epoch = this.asyncEpoch;
                      this.asyncEpoch = epoch + 1;
                      this.unsafeEnterAsync(epoch, effect2.blockingOn(), parse(effect2.trace));
                      const k = effect2.register;
                      const either = k(this.unsafeCreateAsyncResume(epoch));
                      switch (either._tag) {
                        case "Left": {
                          const canceler = either.left;
                          this.unsafeSetAsyncCanceler(epoch, canceler);
                          if (this.unsafeShouldInterrupt) {
                            if (this.unsafeExitAsync(epoch)) {
                              this.unsafeSetInterrupting(true);
                              current = zipRight_(canceler, () => failCause(() => this.unsafeClearSuppressed(), fileName_131 + ":1261:49"), fileName_131 + ":1260:48");
                            } else {
                              current = void 0;
                            }
                          } else {
                            current = void 0;
                          }
                          break;
                        }
                        case "Right": {
                          if (!this.unsafeExitAsync(epoch)) {
                            current = void 0;
                          } else {
                            current = either.right;
                          }
                          break;
                        }
                      }
                      break;
                    }
                    case "Fork": {
                      const effect2 = current;
                      current = this.unsafeNextEffect(this.unsafeFork(effect2.effect, parse(effect2.trace), effect2.scope()));
                      break;
                    }
                    case "Descriptor": {
                      current = current.f(this.unsafeGetDescriptor());
                      break;
                    }
                    case "Yield": {
                      this.unsafeRunLater(unit);
                      current = void 0;
                      break;
                    }
                    case "Trace": {
                      current = this.unsafeNextEffect(this.unsafeCaptureTrace([parse(current.trace)]));
                      break;
                    }
                    case "FiberRefModify": {
                      const {
                        tuple: [result, newValue]
                      } = current.f(this.unsafeGetRef(current.fiberRef));
                      this.unsafeSetRef(current.fiberRef, newValue);
                      current = this.unsafeNextEffect(result);
                      break;
                    }
                    case "FiberRefModifyAll": {
                      const {
                        tuple: [result, newValue]
                      } = current.f(this._id, make21(this.fiberRefLocals));
                      void 0;
                      this.fiberRefLocals = newValue.fiberRefLocals;
                      current = this.unsafeNextEffect(result);
                      break;
                    }
                    case "FiberRefLocally": {
                      const effect2 = current;
                      const fiberRef = effect2.fiberRef;
                      const oldValue = this.unsafeGetRef(fiberRef);
                      this.unsafeSetRef(fiberRef, effect2.localValue);
                      current = ensuring_2(effect2.effect, () => succeed(() => this.unsafeSetRef(fiberRef, oldValue), fileName_131 + ":1351:39"), fileName_131 + ":1350:45");
                      break;
                    }
                    case "FiberRefDelete": {
                      this.unsafeDeleteRef(current.fiberRef);
                      current = this.unsafeNextEffect(void 0);
                      break;
                    }
                    case "FiberRefWith": {
                      current = current.f(this.unsafeGetRef(current.fiberRef));
                      break;
                    }
                    case "RaceWith": {
                      current = this.unsafeRace(current, parse(current.trace));
                      break;
                    }
                    case "Supervise": {
                      const effect2 = current;
                      const oldSupervisor = this.runtimeConfig.value.supervisor;
                      const newSupervisor = and_2(effect2.supervisor(), oldSupervisor);
                      this.runtimeConfig = make22({
                        ...this.runtimeConfig.value,
                        supervisor: newSupervisor
                      });
                      this.unsafeAddFinalizer(succeed(() => {
                        this.runtimeConfig = make22({
                          ...this.runtimeConfig.value,
                          supervisor: oldSupervisor
                        });
                      }, fileName_131 + ":1390:37"));
                      current = effect2.effect;
                      break;
                    }
                    case "GetForkScope": {
                      const effect2 = current;
                      current = effect2.f(getOrElse_(this.unsafeGetRef(forkScopeOverride.value), () => this._scope));
                      break;
                    }
                    case "OverrideForkScope": {
                      const oldForkScopeOverride = this.unsafeGetRef(forkScopeOverride.value);
                      this.unsafeSetRef(forkScopeOverride.value, current.forkScope);
                      this.unsafeAddFinalizer(succeed(() => this.unsafeSetRef(forkScopeOverride.value, oldForkScopeOverride), fileName_131 + ":1428:37"));
                      current = current.effect;
                      break;
                    }
                    case "Ensuring": {
                      this.unsafeAddFinalizer(current.finalizer);
                      current = current.effect;
                      break;
                    }
                    case "Logged": {
                      const effect2 = current;
                      this.unsafeLogWith(effect2.message, effect2.cause, effect2.overrideLogLevel, effect2.overrideRef1, effect2.overrideValue1, effect2.trace);
                      current = this.unsafeNextEffect(void 0);
                      break;
                    }
                    case "SetRuntimeConfig": {
                      this.runtimeConfig = current.runtimeConfig;
                      current = unit;
                      break;
                    }
                  }
                }
              } else {
                const trace = current.trace;
                current = failCause(() => this.unsafeClearSuppressed(), trace);
                this.unsafeSetInterrupting(true);
              }
              opCount = opCount + 1;
            } while (current != null);
          } catch (e) {
            if (e instanceof InterruptedException) {
              const trace = current?.trace;
              current = interruptAs(() => none2, trace);
              this.unsafeSetInterrupting(true);
            } else if (e instanceof Effect.Error) {
              switch (e.exit._tag) {
                case "Success": {
                  current = this.unsafeNextEffect(e.exit.value);
                  break;
                }
                case "Failure": {
                  const trace = current ? current.trace : void 0;
                  current = failCause(() => e.exit.cause, trace);
                  break;
                }
              }
            } else if (this.runtimeConfig.value.fatal(e)) {
              catastrophicFailure.set(true);
              this.runtimeConfig.value.reportFatal(e);
              current = void 0;
            } else {
              this.unsafeSetInterrupting(true);
              current = die2(() => e, fileName_131 + ":1517:45");
            }
          }
        }
      } finally {
        if (isEnabled_(this.runtimeConfig.value.flags, enableCurrentFiber)) {
          currentFiber.set(null);
        }
        if (this.runtimeConfig.value.supervisor !== none4) {
          this.runtimeConfig.value.supervisor.unsafeOnSuspend(this);
        }
      }
    }
    run() {
      return this.runUntil(this.runtimeConfig.value.maxOp);
    }
  };
  _a47 = FiberSym;

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Runtime/definition.mjs
  var fileName_132 = "(@effect/core) _src/io/Runtime/definition.ts";
  var Runtime = class {
    constructor(environment3, runtimeConfig) {
      this.environment = environment3;
      this.runtimeConfig = runtimeConfig;
      this.unsafeRunWith = (effect2, k, __tsplusTrace) => {
        const fiberId2 = unsafeMake5(parse(__tsplusTrace));
        const children = new Set();
        const supervisor = this.runtimeConfig.value.supervisor;
        const fiberRefLocals = make18(make2(currentEnvironment.value, cons(make2(fiberId2, this.environment), nil())), make2(services.value, cons(make2(fiberId2, liveServices.value), nil())));
        const context = new FiberContext(fiberId2, children, fiberRefLocals, this.runtimeConfig, new Stack(Interruptible.toBoolean));
        globalScope.value.unsafeAdd(this.runtimeConfig, context, fileName_132 + ":32:38");
        if (supervisor !== none4) {
          supervisor.unsafeOnStart(this.environment, effect2, none, context);
          context.unsafeOnDone((exit2) => supervisor.unsafeOnEnd(flatten(exit2), context));
        }
        context.nextEffect = effect2;
        context.run();
        context.unsafeOnDone((exit2) => {
          k(flatten(exit2));
        });
        return (id) => (k2) => this.unsafeRunAsyncWith(context._interruptAs(id), (exit2) => k2(flatten(exit2)), fileName_132 + ":46:50");
      };
      this.unsafeRunAsync = (effect2, __tsplusTrace) => {
        return this.unsafeRunAsyncWith(effect2, constVoid, fileName_132 + ":56:35");
      };
      this.unsafeRunAsyncWith = (effect2, k, __tsplusTrace) => {
        this.unsafeRunWith(effect2, k, fileName_132 + ":71:23");
      };
      this.unsafeRunPromise = (effect2, __tsplusTrace) => {
        return new Promise((resolve, reject) => {
          this.unsafeRunAsyncWith(effect2, (exit2) => {
            switch (exit2._tag) {
              case "Success": {
                resolve(exit2.value);
                break;
              }
              case "Failure": {
                reject(squashWith_(exit2.cause, identity));
                break;
              }
            }
          }, fileName_132 + ":87:30");
        });
      };
      this.unsafeRunPromiseExit = (effect2, __tsplusTrace) => {
        return new Promise((resolve) => {
          this.unsafeRunAsyncWith(effect2, (exit2) => {
            resolve(exit2);
          }, fileName_132 + ":114:30");
        });
      };
    }
  };

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Supervisor/operations/track.mjs
  var fileName_133 = "(@effect/core) _src/io/Supervisor/operations/track.ts";
  var unsafeTrack = unsafeTrack_1;
  var MAX_SET_INTERVAL_VALUE = 2 ** 31 - 1;
  function unsafeTrack_1() {
    const set2 = new Set();
    const interval = new AtomicReference(void 0);
    return new Supervisor(succeed(() => from2(set2), fileName_133 + ":23:19"), (_, __, ___, fiber) => {
      if (set2.has(fiber)) {
        if (interval.get == null) {
          interval.set(setInterval(() => {
          }, MAX_SET_INTERVAL_VALUE));
        }
      } else {
        set2.add(fiber);
      }
    }, (_, fiber) => {
      set2.delete(fiber);
      if (set2.size === 0) {
        const ci = interval.get;
        if (ci) {
          clearInterval(ci);
        }
      }
    });
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/LogLevel/instances/Ord.mjs
  var ordLogLevel = /* @__PURE__ */ contramap(number, (level) => level.ordinal);

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/LogLevel/operations/ordinal.mjs
  function geq_(self2, that) {
    return !lt(ordLogLevel)(self2, that);
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/LogSpan/operations/render.mjs
  function render_(self2, now) {
    const label = self2.label.indexOf(" ") < 0 ? self2.label : `"${self2.label}"`;
    return `${label}=${now - self2.startTime}ms`;
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Logger/operations/default.mjs
  var defaultLogger = {
    apply: (trace, fiberId2, logLevel, message, cause0, context, spans, annotations) => {
      const cause = cause0();
      const now = new Date();
      const nowMillis = now.getTime();
      let output = [`timestamp=${now.toISOString()}`, ` level=${logLevel.label}`, ` thread=#${threadName(fiberId2)}`, ` message="${message()}"`].join("");
      if (cause != null && cause != empty5) {
      }
      if (length(spans) > 0) {
        output = output + " ";
        let first = true;
        for (const span of spans) {
          if (first) {
            first = false;
          } else {
            output = output + " ";
          }
          output = output + render_(span, nowMillis);
        }
      }
      if (trace._tag === "SourceLocation") {
        const location = `${trace.fileName}:${trace.lineNumber}:${trace.columnNumber}`;
        output = output + " location=";
        output = appendQuoted(location, output);
      }
      if (size4(annotations) > 0) {
        output = output + " ";
        let first = true;
        for (const {
          tuple: [key, value]
        } of annotations) {
          if (first) {
            first = false;
          } else {
            output = output + " ";
          }
          output = appendQuoted(key, output);
          output = output + "=";
          output = appendQuoted(value, output);
        }
      }
      return output;
    }
  };
  function appendQuoted(label, output) {
    if (label.indexOf(" ") < 0) {
      return output + label;
    } else {
      return output + `"${label}"`;
    }
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Logger/operations/map.mjs
  function map_11(self2, f) {
    return {
      apply: (trace, fiberId2, logLevel, message, cause, context, spans, annotations) => f(self2.apply(trace, fiberId2, logLevel, message, cause, context, spans, annotations))
    };
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Logger/operations/filterLogLevel.mjs
  function filterLogLevel_(self2, f) {
    return {
      apply: (trace, fiberId2, logLevel, message, cause, context, spans, annotations) => {
        return f(logLevel) ? some(self2.apply(trace, fiberId2, logLevel, message, cause, context, spans, annotations)) : none;
      }
    };
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/RuntimeConfig/Flags/definition.mjs
  function apply2(flags) {
    return {
      flags
    };
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/RuntimeConfig/Flags/operations/empty.mjs
  var empty14 = /* @__PURE__ */ apply2(/* @__PURE__ */ empty4());

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/RuntimeConfig/Flags/operations/add.mjs
  function add_3(self2, flag) {
    return apply2(add_(self2.flags, flag));
  }

  // ../node_modules/.pnpm/@effect+core@0.0.7/node_modules/@effect/core/_mjs/io/Effect/operations/runtime.mjs
  var defaultRuntimeConfig_1 = /* @__PURE__ */ make22({
    fatal: () => false,
    reportFatal: (defect) => {
      throw defect;
    },
    supervisor: /* @__PURE__ */ unsafeTrack(),
    loggers: /* @__PURE__ */ make4(/* @__PURE__ */ filterLogLevel_(/* @__PURE__ */ map_11(defaultLogger, (output) => console.log(output)), (level) => geq_(level, Info))),
    flags: /* @__PURE__ */ add_3(empty14, enableFiberRoots),
    maxOp: 2048
  });
  var defaultRuntime = /* @__PURE__ */ new Runtime(Env.empty, defaultRuntimeConfig_1);
  var unsafeRunPromise = defaultRuntime.unsafeRunPromise;
  var unsafeRunAsync = defaultRuntime.unsafeRunAsync;
  var unsafeRunAsyncWith = defaultRuntime.unsafeRunAsyncWith;
  var unsafeRunPromiseExit = defaultRuntime.unsafeRunPromiseExit;
  var unsafeRunWith = defaultRuntime.unsafeRunWith;

  // ../node_modules/.pnpm/file+apps+tar+effect-html-0.0.1.tgz/node_modules/@effect/html/build/esm/io/Render.js
  var fileName_134 = "(@effect/html) _src/io/Render.ts";
  function toInterpolation(type3, template, placeholders) {
    return map_(from4(placeholders), (values2) => make(type3, template, values2), fileName_134 + ":30:37");
  }
  function tag(type3) {
    const keyed = empty6();
    return Object.assign((template, ...placeholders) => toInterpolation(type3, template, placeholders), {
      for(ref2, id) {
        return (template, ...placeholders) => flatMap_(isDOM(), (isDOM2) => {
          if (isDOM2) {
            const memo = getOrElse(keyed, ref2, () => set(keyed, ref2, empty3()));
            const fixed2 = getOrElse_(get_2(memo, id), () => {
              const portal = empty7();
              return unsafeGet_2(set(keyed, ref2, set_(memo, id, fixed(portal))), id);
            });
            return fixed2(type3, template, placeholders);
          }
          return toInterpolation(type3, template, placeholders);
        }, fileName_134 + ":68:40");
      },
      node: (template, ...placeholders) => flatMap_(isDOM(), (isDOM2) => {
        if (isDOM2) {
          return map_(map_(from4(placeholders), (values2) => make(type3, template, values2), fileName_134 + ":95:49"), (interpolation2) => {
            const portal = empty7();
            const wireOrNode = unroll(portal, interpolation2);
            return isWire(wireOrNode) ? valueOf(wireOrNode) : wireOrNode.valueOf();
          }, fileName_134 + ":96:21");
        }
        return toInterpolation(type3, template, placeholders);
      }, fileName_134 + ":92:38")
    });
  }
  function render(where, fa) {
    return provideSomeLayer_(withHooks(() => fa, (interpolation2) => orDie(succeed(() => {
      const portal = getOrElse(PortalCache, where, () => set(PortalCache, where, empty7()));
      const wire2 = isInterpolation(interpolation2) ? unroll(portal, interpolation2) : interpolation2;
      if (wire2 !== wire(portal)) {
        setWire(portal, wire2);
        where.replaceChildren(isWire(wire2) ? valueOf(wire2) : wire2.valueOf());
      }
      return where;
    }, fileName_134 + ":123:21"), fileName_134 + ":138:15")), make11("DOM"), fileName_134 + ":139:21");
  }
  var html = tag("html");
  var svg = tag("svg");

  // dist/index.js
  var fileName_135 = "C:/Users/t/Desktop/Programmieren/Effect/Effect-2/solid-2/apps/src/index.ts";
  var myPage = html` <div>Here's my main page.</div> `;
  var myListView = html`<div>Here's my main page4.</div>`;
  var myPage2 = html` ${myPage} ${myListView} `;
  var program = map_(render(document.body, html` ${myPage2}`), () => void 0, fileName_135 + ":10:4");
  unsafeRunPromise(program, fileName_135 + ":13:25");
})();
