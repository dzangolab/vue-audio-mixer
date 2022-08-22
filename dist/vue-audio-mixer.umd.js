(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Demo = {}));
})(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var tinyEmitter = {exports: {}};

	function E$1 () {
	  // Keep this empty so it's easier to inherit from
	  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
	}

	E$1.prototype = {
	  on: function (name, callback, ctx) {
	    var e = this.e || (this.e = {});

	    (e[name] || (e[name] = [])).push({
	      fn: callback,
	      ctx: ctx
	    });

	    return this;
	  },

	  once: function (name, callback, ctx) {
	    var self = this;
	    function listener () {
	      self.off(name, listener);
	      callback.apply(ctx, arguments);
	    }
	    listener._ = callback;
	    return this.on(name, listener, ctx);
	  },

	  emit: function (name) {
	    var data = [].slice.call(arguments, 1);
	    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
	    var i = 0;
	    var len = evtArr.length;

	    for (i; i < len; i++) {
	      evtArr[i].fn.apply(evtArr[i].ctx, data);
	    }

	    return this;
	  },

	  off: function (name, callback) {
	    var e = this.e || (this.e = {});
	    var evts = e[name];
	    var liveEvents = [];

	    if (evts && callback) {
	      for (var i = 0, len = evts.length; i < len; i++) {
	        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
	          liveEvents.push(evts[i]);
	      }
	    }

	    // Remove event from queue to prevent memory leak
	    // Suggested by https://github.com/lazd
	    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

	    (liveEvents.length)
	      ? e[name] = liveEvents
	      : delete e[name];

	    return this;
	  }
	};

	tinyEmitter.exports = E$1;
	tinyEmitter.exports.TinyEmitter = E$1;

	var E = tinyEmitter.exports;
	var instance = new E();

	//NOTE: The event bus pattern is discouraged with vue
	const EventBus = {
	  $on: (...args) => instance.on(...args),
	  $once: (...args) => instance.once(...args),
	  $off: (...args) => instance.off(...args),
	  $emit: (...args) => instance.emit(...args)
	};

	var variables = {"knobTextColourDefault":"#000","knobTextColourDark":"#C0C0C0","marginBetweenChannelsSmall":"1","channelHeight":"200","meterHeight":"210","channelWidthSmall":"40","meterWidthSmall":"5","meterWidthBetweenSmall":"2","channelSliderThumbSizeSmall":"0.4","channelWidthMedium":"57","marginBetweenChannelsMedium":"2","meterWidthMedium":"10","meterWidthBetweenMedium":"5","channelSliderThumbSizeMedium":"0.6","masterChannelLabelBackgroundColour":"#000","channelLabelTextColour":"#FFFFFF","channelStripBackgroundColour":"#16191c","channelMuteButtonBackgroundColour":"#666B73","channelMuteButtonBackgroundColourActive":"#911","channelMuteButtonBorderColour":"#000","channelMuteButtonTextColourHover":"#FFF","channelMuteButtonTextColourActive":"#FFF","channelSoloButtonBackgroundColourActive":"#1cdd20","channelSoloButtonTextColourActive":"#FFF","channelPannerTextColour":"rgb(255, 255, 255)","loaderInnerColour":"#1d7a9c","loaderOuterColour":"#00a7cc","loaderTextColour":"#1d7a9c","sliderInputBackground":"repeating-linear-gradient(90deg, #000, #3b3e41 0.0625em, transparent 0.0625em, transparent 0.75em) no-repeat 50% 0.75em border-box, ","sliderTrackColour":"#15181b","sliderThumbBackground":"radial-gradient(#ebe1e0 10%, rgba(235, 225, 224, 0.2) 10%, rgba(235, 225, 224, 0) 72%) no-repeat 50% 50%, radial-gradient(at 100% 50%, #e9dfde, #eae1de 71%, rgba(0, 0, 0, 0) 71%) no-repeat 2.5em 50%, linear-gradient(90deg, #e9dfde, #d0c8c6) no-repeat 100% 50%, radial-gradient(at 0 50%, #d0c6c5, #c6baba 71%, rgba(0, 0, 0, 0) 71%) no-repeat 0.75em 50%, linear-gradient(90deg, #e3d9d8, #d0c6c5) no-repeat 0 50%, linear-gradient(#cdc0c0, #fcf5ef, #fcf5ef, #cdc0c0)","progressBarBackgroundColour":"#4c4c4c","progressBarCursorColour":"#b6c8e1","transportTimeBackground":"#000","transportTimeTextColour":"#fff","transportButtonsColour":"#d5d5d5"};

	var script$7 = {
	    mixins:[],
	    props: {
	        modelValue: {
	            type: [Number, String]
	        }
	    },

	    data : function() {
	      return {
	        dragging:false,
	        progress:0,
	        rows:[23,43,63,83,103,123,143,163,183]
	      };
	    },

	   
	     watch:{
	      inputVal: function(){
	        this.setProgress();
	      },
	    },

	    mounted(){
	      this.setProgress();
	    },

	    created(){
	      window.addEventListener('mousemove',this.doDrag);
	      window.addEventListener('touchmove',this.doDrag);

	      window.addEventListener("mouseup", this.triggerMouseUpEvent);
	      window.addEventListener("touchend", this.triggerMouseUpEvent);
	    },

	    beforeDestroy() {
	      window.removeEventListener('mousemove', this.doDrag);
	      window.removeEventListener('touchmove', this.doDrag);
	      window.removeEventListener("mouseup", this.triggerMouseUpEvent);
	      window.removeEventListener("touchend", this.triggerMouseUpEvent);
	    },

	    computed: {
	        trackHeight()
	        {
	          let paddingtop = 58;
	          return parseInt(variables.meterHeight) - paddingtop;
	        },

	        thumbPosition(){
	          return (this.progress) +'px';
	        },

	        inputVal: {
	          get: function (){
	              return this.modelValue;
	          },

	          set: function (modelValue){
	            this.$emit('update', modelValue);
	          }
	        }
	    },

	    methods: {
	      setProgress()
	      {
	          let percent = (100/1.5)*this.modelValue;
	          let percentt = (this.trackHeight/100) * percent;
	          this.progress = Math.round(percentt);
	      },

	      triggerMouseUpEvent()
	      {
	          this.dragging = false;
	      },

	      doDrag(e)
	      {
	        if(!this.dragging){
	          return;
	        }

	        if (e.cancelable) 
	          e.preventDefault();

	        e = e.type == 'touchmove' ? e.touches[0] : e;

	        let target = this.$refs['vue-audio-mixer-slider'];
	        let rect = target.getBoundingClientRect();
	        let x =  rect.bottom- e.clientY; //x position within the element.
	        let percent = (100/this.trackHeight) * x;
	        percent = Math.round(percent);


	        if(percent > 100)
	          percent = 100;

	        if(percent < 0)
	          percent = 0;

	        this.inputVal = (((percent/100) * 1.5).toFixed(1));
	      },

	      startDrag(e)
	      {
	        if (e.cancelable) 
	          e.preventDefault();
	        this.dragging = true; 
	      }
	    }
	};

	/**
	 * Make a map and return a function for checking if a key
	 * is in that map.
	 * IMPORTANT: all calls of this function must be prefixed with
	 * \/\*#\_\_PURE\_\_\*\/
	 * So that rollup can tree-shake them if necessary.
	 */

	function normalizeStyle(value) {
	    if (isArray(value)) {
	        const res = {};
	        for (let i = 0; i < value.length; i++) {
	            const item = value[i];
	            const normalized = isString(item)
	                ? parseStringStyle(item)
	                : normalizeStyle(item);
	            if (normalized) {
	                for (const key in normalized) {
	                    res[key] = normalized[key];
	                }
	            }
	        }
	        return res;
	    }
	    else if (isString(value)) {
	        return value;
	    }
	    else if (isObject(value)) {
	        return value;
	    }
	}
	const listDelimiterRE = /;(?![^(]*\))/g;
	const propertyDelimiterRE = /:(.+)/;
	function parseStringStyle(cssText) {
	    const ret = {};
	    cssText.split(listDelimiterRE).forEach(item => {
	        if (item) {
	            const tmp = item.split(propertyDelimiterRE);
	            tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
	        }
	    });
	    return ret;
	}
	function normalizeClass(value) {
	    let res = '';
	    if (isString(value)) {
	        res = value;
	    }
	    else if (isArray(value)) {
	        for (let i = 0; i < value.length; i++) {
	            const normalized = normalizeClass(value[i]);
	            if (normalized) {
	                res += normalized + ' ';
	            }
	        }
	    }
	    else if (isObject(value)) {
	        for (const name in value) {
	            if (value[name]) {
	                res += name + ' ';
	            }
	        }
	    }
	    return res.trim();
	}

	function looseCompareArrays(a, b) {
	    if (a.length !== b.length)
	        return false;
	    let equal = true;
	    for (let i = 0; equal && i < a.length; i++) {
	        equal = looseEqual(a[i], b[i]);
	    }
	    return equal;
	}
	function looseEqual(a, b) {
	    if (a === b)
	        return true;
	    let aValidType = isDate(a);
	    let bValidType = isDate(b);
	    if (aValidType || bValidType) {
	        return aValidType && bValidType ? a.getTime() === b.getTime() : false;
	    }
	    aValidType = isSymbol(a);
	    bValidType = isSymbol(b);
	    if (aValidType || bValidType) {
	        return a === b;
	    }
	    aValidType = isArray(a);
	    bValidType = isArray(b);
	    if (aValidType || bValidType) {
	        return aValidType && bValidType ? looseCompareArrays(a, b) : false;
	    }
	    aValidType = isObject(a);
	    bValidType = isObject(b);
	    if (aValidType || bValidType) {
	        /* istanbul ignore if: this if will probably never be called */
	        if (!aValidType || !bValidType) {
	            return false;
	        }
	        const aKeysCount = Object.keys(a).length;
	        const bKeysCount = Object.keys(b).length;
	        if (aKeysCount !== bKeysCount) {
	            return false;
	        }
	        for (const key in a) {
	            const aHasKey = a.hasOwnProperty(key);
	            const bHasKey = b.hasOwnProperty(key);
	            if ((aHasKey && !bHasKey) ||
	                (!aHasKey && bHasKey) ||
	                !looseEqual(a[key], b[key])) {
	                return false;
	            }
	        }
	    }
	    return String(a) === String(b);
	}
	function looseIndexOf(arr, val) {
	    return arr.findIndex(item => looseEqual(item, val));
	}

	/**
	 * For converting {{ interpolation }} values to displayed strings.
	 * @private
	 */
	const toDisplayString = (val) => {
	    return isString(val)
	        ? val
	        : val == null
	            ? ''
	            : isArray(val) ||
	                (isObject(val) &&
	                    (val.toString === objectToString || !isFunction(val.toString)))
	                ? JSON.stringify(val, replacer, 2)
	                : String(val);
	};
	const replacer = (_key, val) => {
	    // can't use isRef here since @vue/shared has no deps
	    if (val && val.__v_isRef) {
	        return replacer(_key, val.value);
	    }
	    else if (isMap(val)) {
	        return {
	            [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val]) => {
	                entries[`${key} =>`] = val;
	                return entries;
	            }, {})
	        };
	    }
	    else if (isSet(val)) {
	        return {
	            [`Set(${val.size})`]: [...val.values()]
	        };
	    }
	    else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
	        return String(val);
	    }
	    return val;
	};
	const EMPTY_ARR = [];
	const onRE = /^on[^a-z]/;
	const isOn = (key) => onRE.test(key);
	const extend = Object.assign;
	const isArray = Array.isArray;
	const isMap = (val) => toTypeString(val) === '[object Map]';
	const isSet = (val) => toTypeString(val) === '[object Set]';
	const isDate = (val) => toTypeString(val) === '[object Date]';
	const isFunction = (val) => typeof val === 'function';
	const isString = (val) => typeof val === 'string';
	const isSymbol = (val) => typeof val === 'symbol';
	const isObject = (val) => val !== null && typeof val === 'object';
	const objectToString = Object.prototype.toString;
	const toTypeString = (value) => objectToString.call(value);
	const isPlainObject = (val) => toTypeString(val) === '[object Object]';
	const invokeArrayFns = (fns, arg) => {
	    for (let i = 0; i < fns.length; i++) {
	        fns[i](arg);
	    }
	};
	const toNumber = (val) => {
	    const n = parseFloat(val);
	    return isNaN(n) ? val : n;
	};

	function isReactive(value) {
	    if (isReadonly(value)) {
	        return isReactive(value["__v_raw" /* RAW */]);
	    }
	    return !!(value && value["__v_isReactive" /* IS_REACTIVE */]);
	}
	function isReadonly(value) {
	    return !!(value && value["__v_isReadonly" /* IS_READONLY */]);
	}
	function isProxy(value) {
	    return isReactive(value) || isReadonly(value);
	}
	function isRef(r) {
	    return !!(r && r.__v_isRef === true);
	}

	/**
	 * mark the current rendering instance for asset resolution (e.g.
	 * resolveComponent, resolveDirective) during render
	 */
	let currentRenderingInstance = null;
	let currentScopeId = null;

	const isSuspense = (type) => type.__isSuspense;
	/**
	 * Adds directives to a VNode.
	 */
	function withDirectives(vnode, directives) {
	    {
	        return vnode;
	    }
	}

	const COMPONENTS = 'components';
	/**
	 * @private
	 */
	function resolveComponent(name, maybeSelfReference) {
	    return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
	}
	const NULL_DYNAMIC_COMPONENT = Symbol();
	// implementation
	function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
	}

	/**
	 * Actual implementation
	 */
	function renderList(source, renderItem, cache, index) {
	    let ret;
	    const cached = (cache && cache[index]);
	    if (isArray(source) || isString(source)) {
	        ret = new Array(source.length);
	        for (let i = 0, l = source.length; i < l; i++) {
	            ret[i] = renderItem(source[i], i, undefined, cached && cached[i]);
	        }
	    }
	    else if (typeof source === 'number') {
	        ret = new Array(source);
	        for (let i = 0; i < source; i++) {
	            ret[i] = renderItem(i + 1, i, undefined, cached && cached[i]);
	        }
	    }
	    else if (isObject(source)) {
	        if (source[Symbol.iterator]) {
	            ret = Array.from(source, (item, i) => renderItem(item, i, undefined, cached && cached[i]));
	        }
	        else {
	            const keys = Object.keys(source);
	            ret = new Array(keys.length);
	            for (let i = 0, l = keys.length; i < l; i++) {
	                const key = keys[i];
	                ret[i] = renderItem(source[key], key, i, cached && cached[i]);
	            }
	        }
	    }
	    else {
	        ret = [];
	    }
	    if (cache) {
	        cache[index] = ret;
	    }
	    return ret;
	}

	const isTeleport = (type) => type.__isTeleport;

	const Fragment = Symbol(undefined);
	const Text = Symbol(undefined);
	const Comment = Symbol(undefined);
	// Since v-if and v-for are the two possible ways node structure can dynamically
	// change, once we consider v-if branches and each v-for fragment a block, we
	// can divide a template into nested blocks, and within each block the node
	// structure would be stable. This allows us to skip most children diffing
	// and only worry about the dynamic nodes (indicated by patch flags).
	const blockStack = [];
	let currentBlock = null;
	/**
	 * Open a block.
	 * This must be called before `createBlock`. It cannot be part of `createBlock`
	 * because the children of the block are evaluated before `createBlock` itself
	 * is called. The generated code typically looks like this:
	 *
	 * ```js
	 * function render() {
	 *   return (openBlock(),createBlock('div', null, [...]))
	 * }
	 * ```
	 * disableTracking is true when creating a v-for fragment block, since a v-for
	 * fragment always diffs its children.
	 *
	 * @private
	 */
	function openBlock(disableTracking = false) {
	    blockStack.push((currentBlock = disableTracking ? null : []));
	}
	function closeBlock() {
	    blockStack.pop();
	    currentBlock = blockStack[blockStack.length - 1] || null;
	}
	function setupBlock(vnode) {
	    // save current block children on the block vnode
	    vnode.dynamicChildren =
	        currentBlock || EMPTY_ARR ;
	    // close block
	    closeBlock();
	    // a block is always going to be patched, so track it as a child of its
	    // parent block
	    if (currentBlock) {
	        currentBlock.push(vnode);
	    }
	    return vnode;
	}
	/**
	 * @private
	 */
	function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
	    return setupBlock(createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, true /* isBlock */));
	}
	/**
	 * Create a block root vnode. Takes the same exact arguments as `createVNode`.
	 * A block root keeps track of dynamic nodes within the block in the
	 * `dynamicChildren` array.
	 *
	 * @private
	 */
	function createBlock(type, props, children, patchFlag, dynamicProps) {
	    return setupBlock(createVNode(type, props, children, patchFlag, dynamicProps, true /* isBlock: prevent a block from tracking itself */));
	}
	function isVNode(value) {
	    return value ? value.__v_isVNode === true : false;
	}
	const InternalObjectKey = `__vInternal`;
	const normalizeKey = ({ key }) => key != null ? key : null;
	const normalizeRef = ({ ref, ref_key, ref_for }) => {
	    return (ref != null
	        ? isString(ref) || isRef(ref) || isFunction(ref)
	            ? { i: currentRenderingInstance, r: ref, k: ref_key, f: !!ref_for }
	            : ref
	        : null);
	};
	function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1 /* ELEMENT */, isBlockNode = false, needFullChildrenNormalization = false) {
	    const vnode = {
	        __v_isVNode: true,
	        __v_skip: true,
	        type,
	        props,
	        key: props && normalizeKey(props),
	        ref: props && normalizeRef(props),
	        scopeId: currentScopeId,
	        slotScopeIds: null,
	        children,
	        component: null,
	        suspense: null,
	        ssContent: null,
	        ssFallback: null,
	        dirs: null,
	        transition: null,
	        el: null,
	        anchor: null,
	        target: null,
	        targetAnchor: null,
	        staticCount: 0,
	        shapeFlag,
	        patchFlag,
	        dynamicProps,
	        dynamicChildren: null,
	        appContext: null
	    };
	    if (needFullChildrenNormalization) {
	        normalizeChildren(vnode, children);
	        // normalize suspense children
	        if (shapeFlag & 128 /* SUSPENSE */) {
	            type.normalize(vnode);
	        }
	    }
	    else if (children) {
	        // compiled element vnode - if children is passed, only possible types are
	        // string or Array.
	        vnode.shapeFlag |= isString(children)
	            ? 8 /* TEXT_CHILDREN */
	            : 16 /* ARRAY_CHILDREN */;
	    }
	    // track vnode for block tree
	    if (// avoid a block node from tracking itself
	        !isBlockNode &&
	        // has current parent block
	        currentBlock &&
	        // presence of a patch flag indicates this node needs patching on updates.
	        // component nodes also should always be patched, because even if the
	        // component doesn't need to update, it needs to persist the instance on to
	        // the next vnode so that it can be properly unmounted later.
	        (vnode.patchFlag > 0 || shapeFlag & 6 /* COMPONENT */) &&
	        // the EVENTS flag is only for hydration and if it is the only flag, the
	        // vnode should not be considered dynamic due to handler caching.
	        vnode.patchFlag !== 32 /* HYDRATE_EVENTS */) {
	        currentBlock.push(vnode);
	    }
	    return vnode;
	}
	const createVNode = (_createVNode);
	function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
	    if (!type || type === NULL_DYNAMIC_COMPONENT) {
	        type = Comment;
	    }
	    if (isVNode(type)) {
	        // createVNode receiving an existing vnode. This happens in cases like
	        // <component :is="vnode"/>
	        // #2078 make sure to merge refs during the clone instead of overwriting it
	        const cloned = cloneVNode(type, props, true /* mergeRef: true */);
	        if (children) {
	            normalizeChildren(cloned, children);
	        }
	        if (!isBlockNode && currentBlock) {
	            if (cloned.shapeFlag & 6 /* COMPONENT */) {
	                currentBlock[currentBlock.indexOf(type)] = cloned;
	            }
	            else {
	                currentBlock.push(cloned);
	            }
	        }
	        cloned.patchFlag |= -2 /* BAIL */;
	        return cloned;
	    }
	    // class component normalization.
	    if (isClassComponent(type)) {
	        type = type.__vccOpts;
	    }
	    // class & style normalization.
	    if (props) {
	        // for reactive or proxy objects, we need to clone it to enable mutation.
	        props = guardReactiveProps(props);
	        let { class: klass, style } = props;
	        if (klass && !isString(klass)) {
	            props.class = normalizeClass(klass);
	        }
	        if (isObject(style)) {
	            // reactive state objects need to be cloned since they are likely to be
	            // mutated
	            if (isProxy(style) && !isArray(style)) {
	                style = extend({}, style);
	            }
	            props.style = normalizeStyle(style);
	        }
	    }
	    // encode the vnode type information into a bitmap
	    const shapeFlag = isString(type)
	        ? 1 /* ELEMENT */
	        : isSuspense(type)
	            ? 128 /* SUSPENSE */
	            : isTeleport(type)
	                ? 64 /* TELEPORT */
	                : isObject(type)
	                    ? 4 /* STATEFUL_COMPONENT */
	                    : isFunction(type)
	                        ? 2 /* FUNCTIONAL_COMPONENT */
	                        : 0;
	    return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
	}
	function guardReactiveProps(props) {
	    if (!props)
	        return null;
	    return isProxy(props) || InternalObjectKey in props
	        ? extend({}, props)
	        : props;
	}
	function cloneVNode(vnode, extraProps, mergeRef = false) {
	    // This is intentionally NOT using spread or extend to avoid the runtime
	    // key enumeration cost.
	    const { props, ref, patchFlag, children } = vnode;
	    const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
	    const cloned = {
	        __v_isVNode: true,
	        __v_skip: true,
	        type: vnode.type,
	        props: mergedProps,
	        key: mergedProps && normalizeKey(mergedProps),
	        ref: extraProps && extraProps.ref
	            ? // #2078 in the case of <component :is="vnode" ref="extra"/>
	                // if the vnode itself already has a ref, cloneVNode will need to merge
	                // the refs so the single vnode can be set on multiple refs
	                mergeRef && ref
	                    ? isArray(ref)
	                        ? ref.concat(normalizeRef(extraProps))
	                        : [ref, normalizeRef(extraProps)]
	                    : normalizeRef(extraProps)
	            : ref,
	        scopeId: vnode.scopeId,
	        slotScopeIds: vnode.slotScopeIds,
	        children: children,
	        target: vnode.target,
	        targetAnchor: vnode.targetAnchor,
	        staticCount: vnode.staticCount,
	        shapeFlag: vnode.shapeFlag,
	        // if the vnode is cloned with extra props, we can no longer assume its
	        // existing patch flag to be reliable and need to add the FULL_PROPS flag.
	        // note: preserve flag for fragments since they use the flag for children
	        // fast paths only.
	        patchFlag: extraProps && vnode.type !== Fragment
	            ? patchFlag === -1 // hoisted node
	                ? 16 /* FULL_PROPS */
	                : patchFlag | 16 /* FULL_PROPS */
	            : patchFlag,
	        dynamicProps: vnode.dynamicProps,
	        dynamicChildren: vnode.dynamicChildren,
	        appContext: vnode.appContext,
	        dirs: vnode.dirs,
	        transition: vnode.transition,
	        // These should technically only be non-null on mounted VNodes. However,
	        // they *should* be copied for kept-alive vnodes. So we just always copy
	        // them since them being non-null during a mount doesn't affect the logic as
	        // they will simply be overwritten.
	        component: vnode.component,
	        suspense: vnode.suspense,
	        ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
	        ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
	        el: vnode.el,
	        anchor: vnode.anchor
	    };
	    return cloned;
	}
	/**
	 * @private
	 */
	function createTextVNode(text = ' ', flag = 0) {
	    return createVNode(Text, null, text, flag);
	}
	/**
	 * @private
	 */
	function createCommentVNode(text = '', 
	// when used as the v-else branch, the comment node must be created as a
	// block to ensure correct updates.
	asBlock = false) {
	    return asBlock
	        ? (openBlock(), createBlock(Comment, null, text))
	        : createVNode(Comment, null, text);
	}
	function normalizeChildren(vnode, children) {
	    let type = 0;
	    const { shapeFlag } = vnode;
	    if (children == null) {
	        children = null;
	    }
	    else if (isArray(children)) {
	        type = 16 /* ARRAY_CHILDREN */;
	    }
	    else if (typeof children === 'object') {
	        if (shapeFlag & (1 /* ELEMENT */ | 64 /* TELEPORT */)) {
	            // Normalize slot to plain children for plain element and Teleport
	            const slot = children.default;
	            if (slot) {
	                // _c marker is added by withCtx() indicating this is a compiled slot
	                slot._c && (slot._d = false);
	                normalizeChildren(vnode, slot());
	                slot._c && (slot._d = true);
	            }
	            return;
	        }
	        else {
	            type = 32 /* SLOTS_CHILDREN */;
	            const slotFlag = children._;
	            if (!slotFlag && !(InternalObjectKey in children)) {
	                children._ctx = currentRenderingInstance;
	            }
	            else if (slotFlag === 3 /* FORWARDED */ && currentRenderingInstance) {
	                // a child component receives forwarded slots from the parent.
	                // its slot type is determined by its parent's slot type.
	                if (currentRenderingInstance.slots._ === 1 /* STABLE */) {
	                    children._ = 1 /* STABLE */;
	                }
	                else {
	                    children._ = 2 /* DYNAMIC */;
	                    vnode.patchFlag |= 1024 /* DYNAMIC_SLOTS */;
	                }
	            }
	        }
	    }
	    else if (isFunction(children)) {
	        children = { default: children, _ctx: currentRenderingInstance };
	        type = 32 /* SLOTS_CHILDREN */;
	    }
	    else {
	        children = String(children);
	        // force teleport children to array so it can be moved around
	        if (shapeFlag & 64 /* TELEPORT */) {
	            type = 16 /* ARRAY_CHILDREN */;
	            children = [createTextVNode(children)];
	        }
	        else {
	            type = 8 /* TEXT_CHILDREN */;
	        }
	    }
	    vnode.children = children;
	    vnode.shapeFlag |= type;
	}
	function mergeProps(...args) {
	    const ret = {};
	    for (let i = 0; i < args.length; i++) {
	        const toMerge = args[i];
	        for (const key in toMerge) {
	            if (key === 'class') {
	                if (ret.class !== toMerge.class) {
	                    ret.class = normalizeClass([ret.class, toMerge.class]);
	                }
	            }
	            else if (key === 'style') {
	                ret.style = normalizeStyle([ret.style, toMerge.style]);
	            }
	            else if (isOn(key)) {
	                const existing = ret[key];
	                const incoming = toMerge[key];
	                if (incoming &&
	                    existing !== incoming &&
	                    !(isArray(existing) && existing.includes(incoming))) {
	                    ret[key] = existing
	                        ? [].concat(existing, incoming)
	                        : incoming;
	                }
	            }
	            else if (key !== '') {
	                ret[key] = toMerge[key];
	            }
	        }
	    }
	    return ret;
	}
	function isClassComponent(value) {
	    return isFunction(value) && '__vccOpts' in value;
	}

	function addEventListener(el, event, handler, options) {
	    el.addEventListener(event, handler, options);
	}

	const getModelAssigner = (vnode) => {
	    const fn = vnode.props['onUpdate:modelValue'] ||
	        (false );
	    return isArray(fn) ? value => invokeArrayFns(fn, value) : fn;
	};
	function onCompositionStart(e) {
	    e.target.composing = true;
	}
	function onCompositionEnd(e) {
	    const target = e.target;
	    if (target.composing) {
	        target.composing = false;
	        target.dispatchEvent(new Event('input'));
	    }
	}
	// We are exporting the v-model runtime directly as vnode hooks so that it can
	// be tree-shaken in case v-model is never used.
	const vModelText = {
	    created(el, { modifiers: { lazy, trim, number } }, vnode) {
	        el._assign = getModelAssigner(vnode);
	        const castToNumber = number || (vnode.props && vnode.props.type === 'number');
	        addEventListener(el, lazy ? 'change' : 'input', e => {
	            if (e.target.composing)
	                return;
	            let domValue = el.value;
	            if (trim) {
	                domValue = domValue.trim();
	            }
	            if (castToNumber) {
	                domValue = toNumber(domValue);
	            }
	            el._assign(domValue);
	        });
	        if (trim) {
	            addEventListener(el, 'change', () => {
	                el.value = el.value.trim();
	            });
	        }
	        if (!lazy) {
	            addEventListener(el, 'compositionstart', onCompositionStart);
	            addEventListener(el, 'compositionend', onCompositionEnd);
	            // Safari < 10.2 & UIWebView doesn't fire compositionend when
	            // switching focus before confirming composition choice
	            // this also fixes the issue where some browsers e.g. iOS Chrome
	            // fires "change" instead of "input" on autocomplete.
	            addEventListener(el, 'change', onCompositionEnd);
	        }
	    },
	    // set value on mounted so it's after min/max for type="range"
	    mounted(el, { value }) {
	        el.value = value == null ? '' : value;
	    },
	    beforeUpdate(el, { value, modifiers: { lazy, trim, number } }, vnode) {
	        el._assign = getModelAssigner(vnode);
	        // avoid clearing unresolved text. #2302
	        if (el.composing)
	            return;
	        if (document.activeElement === el && el.type !== 'range') {
	            if (lazy) {
	                return;
	            }
	            if (trim && el.value.trim() === value) {
	                return;
	            }
	            if ((number || el.type === 'number') && toNumber(el.value) === value) {
	                return;
	            }
	        }
	        const newValue = value == null ? '' : value;
	        if (el.value !== newValue) {
	            el.value = newValue;
	        }
	    }
	};
	const vModelCheckbox = {
	    // #4096 array checkboxes need to be deep traversed
	    deep: true,
	    created(el, _, vnode) {
	        el._assign = getModelAssigner(vnode);
	        addEventListener(el, 'change', () => {
	            const modelValue = el._modelValue;
	            const elementValue = getValue(el);
	            const checked = el.checked;
	            const assign = el._assign;
	            if (isArray(modelValue)) {
	                const index = looseIndexOf(modelValue, elementValue);
	                const found = index !== -1;
	                if (checked && !found) {
	                    assign(modelValue.concat(elementValue));
	                }
	                else if (!checked && found) {
	                    const filtered = [...modelValue];
	                    filtered.splice(index, 1);
	                    assign(filtered);
	                }
	            }
	            else if (isSet(modelValue)) {
	                const cloned = new Set(modelValue);
	                if (checked) {
	                    cloned.add(elementValue);
	                }
	                else {
	                    cloned.delete(elementValue);
	                }
	                assign(cloned);
	            }
	            else {
	                assign(getCheckboxValue(el, checked));
	            }
	        });
	    },
	    // set initial checked on mount to wait for true-value/false-value
	    mounted: setChecked,
	    beforeUpdate(el, binding, vnode) {
	        el._assign = getModelAssigner(vnode);
	        setChecked(el, binding, vnode);
	    }
	};
	function setChecked(el, { value, oldValue }, vnode) {
	    el._modelValue = value;
	    if (isArray(value)) {
	        el.checked = looseIndexOf(value, vnode.props.value) > -1;
	    }
	    else if (isSet(value)) {
	        el.checked = value.has(vnode.props.value);
	    }
	    else if (value !== oldValue) {
	        el.checked = looseEqual(value, getCheckboxValue(el, true));
	    }
	}
	// retrieve raw value set via :value bindings
	function getValue(el) {
	    return '_value' in el ? el._value : el.value;
	}
	// retrieve raw value for true-value and false-value set via :true-value or :false-value bindings
	function getCheckboxValue(el, checked) {
	    const key = checked ? '_trueValue' : '_falseValue';
	    return key in el ? el[key] : checked;
	}

	const vShow = {
	    beforeMount(el, { value }, { transition }) {
	        el._vod = el.style.display === 'none' ? '' : el.style.display;
	        if (transition && value) {
	            transition.beforeEnter(el);
	        }
	        else {
	            setDisplay(el, value);
	        }
	    },
	    mounted(el, { value }, { transition }) {
	        if (transition && value) {
	            transition.enter(el);
	        }
	    },
	    updated(el, { value, oldValue }, { transition }) {
	        if (!value === !oldValue)
	            return;
	        if (transition) {
	            if (value) {
	                transition.beforeEnter(el);
	                setDisplay(el, true);
	                transition.enter(el);
	            }
	            else {
	                transition.leave(el, () => {
	                    setDisplay(el, false);
	                });
	            }
	        }
	        else {
	            setDisplay(el, value);
	        }
	    },
	    beforeUnmount(el, { value }) {
	        setDisplay(el, value);
	    }
	};
	function setDisplay(el, value) {
	    el.style.display = value ? el._vod : 'none';
	}

	const _hoisted_1$6 = {
	  class: "vue-audio-mixer-slider",
	  ref: "vue-audio-mixer-slider"
	};
	const _hoisted_2$5 = /*#__PURE__*/createBaseVNode("div", { class: "vue-audio-mixer-fader-slider-track" }, null, -1);

	function render$7(_ctx, _cache, $props, $setup, $data, $options) {
	  return (openBlock(), createElementBlock("div", _hoisted_1$6, [
	    createBaseVNode("div", {
	      class: "vue-audio-mixer-fader-thumb",
	      onMousedown: _cache[0] || (_cache[0] = (...args) => ($options.startDrag && $options.startDrag(...args))),
	      onTouchstart: _cache[1] || (_cache[1] = (...args) => ($options.startDrag && $options.startDrag(...args))),
	      style: normalizeStyle({bottom: $options.thumbPosition})
	    }, null, 36),
	    _hoisted_2$5,
	    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.rows, (p) => {
	      return (openBlock(), createElementBlock("div", {
	        class: "vue-audio-mixer-fader-slider-row",
	        style: normalizeStyle({ bottom: p + 'px' })
	      }, null, 4))
	    }), 256)),
	    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.rows, (p) => {
	      return (openBlock(), createElementBlock("div", {
	        class: "vue-audio-mixer-fader-slider-row-right",
	        style: normalizeStyle({ bottom: p + 'px' })
	      }, null, 4))
	    }), 256))
	  ], 512))
	}

	script$7.render = render$7;

	let instanceCount = 0;

	var script$6 = {
	  name: 'Channel',
	  props: [
	    'index',
	    'trackIndex', 
	    'title',
	    'context', 
	    'url',
	    'output',
	    'leftAnalyser',
	    'rightAnalyser',
	    'scriptProcessorNode',
	    'defaultPan',
	    'defaultGain',
	    'defaultMuted',
	    'showMute',
	    'isMaster',
	    'mixerVars',
	    'solodTracks'
	  ],

	  components:{
	    Slider: script$7
	  },

	  data : function(){       
	      return {
	          leftBouncer : {average:0,opacity:1},
	          rightBouncer: {average:0,opacity:1},
	          gradient    : false,
	          ctx         : false,
	          gain        : 0.8,
	          pan         : 0,
	          soloModel   : false,
	          mute        : false,
	          meterHeight : parseInt(variables.meterHeight),
	          titleModel  : '',
	          loaded      : false,
	      };
	  },

	  computed:{
	    knobTextColour()
	    {
	      if(this.mixerVars.theme_colour == 'default'){
	        return variables.knobTextColourDefault;
	      }

	      if(this.mixerVars.theme_colour == 'dark'){
	        return variables.knobTextColourDark;
	      }

	    },

	    pannerSize()
	    {
	      return this.mixerVars.theme_size == 'Small' ? 30 :40; 
	    },

	    meterWidth()
	    {
	      return parseInt(variables['meterWidth'+this.mixerVars.theme_size]);
	    },

	    meterWidthBetween()
	    {
	      return parseInt(variables['meterWidthBetween'+this.mixerVars.theme_size]);
	    },

	    formattedGain()
	    {
	      return this.pad(Math.round((this.gain*100)),3);
	    }
	  },

	  watch:{
	    pan: function(){
	        this.changePan();
	    },

	    mute: function(){
	      this.muteChange();
	    },

	    soloModel: function(newVal){
	        this.soloChange(this.trackIndex, newVal);
	    },

	    titleModel:function(){
	      this.titleChange();
	    }
	  },

	  created(){
	   // EventBus.$on('loaded',()=>{this.loaded = true});
	    this.titleModel = 'Track '+(this.trackIndex+1);
	    EventBus.$on(this.mixerVars.instance_id+'ended', this.ended);
	    this.scriptProcessorNode.onaudioprocess = () => {
	      this.drawMeter();
	    };
	  },

	  beforeCreate() {
	    // A component Id for internal referencing of HTML elements
	    this._componentId = ++instanceCount;
	   },

	  beforeDestroy() {
	    EventBus.$off(this.mixerVars.instance_id+'ended',this.ended);
	  },

	  mounted(){
	      console.debug("Channel::mounted:_componentId:", this._componentId);

	      this.ctx = document.getElementById('canvas'+this._componentId).getContext("2d");
	      this.gradient = this.ctx.createLinearGradient(0,0,0,400);
	      this.gradient.addColorStop(1,'#31e2fc');
	      this.gradient.addColorStop(0.75,'#38fedd');
	      this.gradient.addColorStop(0.25,'#38fedd');
	      this.gradient.addColorStop(0,'#31e0fc');

	      console.debug("Channel::mounted:setting-pan:", this.defaultPan);
	      this.pan = this.defaultPan === undefined ? 0 : this.defaultPan;
	      this.gain = this.defaultGain === undefined ? 0 : this.defaultGain;
	      this.mute = this.defaultMuted === undefined ? false : this.defaultMuted;
	    
	      this.changePan();
	      this.changeGain();

	      this.drawMeter();

	  },

	  methods: {
	    pad(n, width, z) {
	      z = z || '0';
	      n = n + '';
	      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	    },

	    ended(index){
	      if(index == this.index){
	        setTimeout( () => { this.clearCanvas();}, 10);
	      }

	    },

	    changeGain(gainValue)
	    {
	      if (gainValue) {
	        this.gain = gainValue;
	        this.$emit('gainChange', this.gain); 
	      }
	    },

	    changePan() {
	      console.debug("Channel::changePan:this.pan:", this.pan);
	      //TODO later re-enable: this.$emit('panChange',this.pan);
	    },

	    muteChange() {
	      this.$emit('muteChange',this.mute);
	    },

	    soloChange(trackIndex, is_solo) {
	      EventBus.$emit(this.mixerVars.instance_id+'soloChange',{index:trackIndex, solo:is_solo});
	    },

	    titleChange() {
	      this.$emit(this.mixerVars.instance_id+'titleChange',this.titleModel);
	    },

	    getAverageVolume(array) {
	        var values = 0;
	        var average;
	        var length = array.length;
	        // get all the frequency amplitudes
	        for (var i = 0; i < length; i++) {
	            values += array[i];
	        }
	        average = values / length;
	        return average;
	    },

	    clearCanvas(){
	       // clear the current state
	      this.ctx.clearRect(0, 0, 60, this.meterHeight);

	      this.ctx.fillStyle="#15181b";
	      // create background to meters
	      this.ctx.fillRect(0,0,this.meterWidth,this.meterHeight+200);
	      this.ctx.fillRect(this.meterWidth+this.meterWidthBetween,0,this.meterWidth,this.meterHeight+200);

	    },

	    drawMeter(){
	      // get the average for the first channel
	      var array =  new Uint8Array(this.leftAnalyser.frequencyBinCount);
	      this.leftAnalyser.getByteFrequencyData(array);
	      var average = this.getAverageVolume(array);

	      // get the average for the second channel
	      var array2 =  new Uint8Array(this.rightAnalyser.frequencyBinCount);
	      this.rightAnalyser.getByteFrequencyData(array2);
	      var average2 = this.getAverageVolume(array2);

	      // bouncers left
	      if(average > this.leftBouncer.average){
	        this.leftBouncer.average = average;
	        this.leftBouncer.opacity = 1;
	      }
	      else {
	        if(this.leftBouncer.opacity > 0.1) // fade out
	          this.leftBouncer.opacity = this.leftBouncer.opacity -0.1;
	        else
	          this.leftBouncer.opacity = 0;
	        this.leftBouncer.average--; // make it fall
	      }

	      // bouncers right
	      if(average2 > this.rightBouncer.average){
	        this.rightBouncer.opacity = 1;
	        this.rightBouncer.average = average2;
	      }
	      else {
	        if(this.rightBouncer.opacity > 0.1)// fade out
	          this.rightBouncer.opacity = this.rightBouncer.opacity -0.1;
	        else
	          this.rightBouncer.opacity = 0;
	        this.rightBouncer.average--;// make it fall
	      }

	      this.clearCanvas();

	      // set the fill style
	      this.ctx.fillStyle=this.gradient;


	      // create the meters (ctx.meterHeight/100) is 1% of the meter height
	      this.ctx.fillRect(0,this.meterHeight-(average*(this.meterHeight/100)),this.meterWidth,this.meterHeight+200);
	      this.ctx.fillRect(this.meterWidth+this.meterWidthBetween,this.meterHeight-(average2*(this.meterHeight/100)),this.meterWidth,this.meterHeight+200);

	      // create the bouncers

	      if(average > 0)
	        this.ctx.fillRect(0,this.meterHeight-(this.leftBouncer.average*(this.meterHeight/100))-2,this.meterWidth,this.leftBouncer.opacity);
	      if(average2 > 0)
	        this.ctx.fillRect(this.meterWidth+this.meterWidthBetween,this.meterHeight-(this.rightBouncer.average*(this.meterHeight/100))-2,this.meterWidth,this.rightBouncer.opacity);
	    }
	  }
	};

	const _hoisted_1$5 = ["id", "height"];
	const _hoisted_2$4 = { class: "slider_value" };
	const _hoisted_3$4 = { class: "vue-audio-mixer-channel-mute-button" };
	const _hoisted_4$4 = /*#__PURE__*/createBaseVNode("span", { class: "vue-audio-mixer-channel-mute-button-label" }, "M", -1);
	const _hoisted_5$3 = {
	  key: 0,
	  class: "logo"
	};
	const _hoisted_6$1 = { class: "vue-audio-mixer-channel-solo-button" };
	const _hoisted_7$1 = /*#__PURE__*/createBaseVNode("span", { class: "vue-audio-mixer-channel-solo-button-label" }, "S", -1);
	const _hoisted_8$1 = { class: "vue-audio-mixer-channel-label" };
	const _hoisted_9$1 = { "data-label": "0" };

	function render$6(_ctx, _cache, $props, $setup, $data, $options) {
	  const _component_Slider = resolveComponent("Slider");

	  return (openBlock(), createElementBlock("div", {
	    class: normalizeClass(["vue-audio-mixer-channel", {'with-panner':$props.mixerVars.show_pan}])
	  }, [
	    createBaseVNode("div", {
	      class: normalizeClass(["vue-audio-mixer-channel-panner-container", {'vue-audio-mixer-is-master':$props.isMaster}])
	    }, [
	      withDirectives(createBaseVNode("input", {
	        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.pan) = $event)),
	        type: "number"
	      }, null, 512), [
	        [vModelText, _ctx.pan]
	      ])
	    ], 2),
	    createBaseVNode("canvas", {
	      id: 'canvas'+_ctx._componentId,
	      width: "25",
	      height: _ctx.meterHeight,
	      style: {"display":"block"},
	      class: "vue-audio-mixer-channel-meter-canvas"
	    }, null, 8, _hoisted_1$5),
	    createBaseVNode("div", _hoisted_2$4, toDisplayString($options.formattedGain), 1),
	    createVNode(_component_Slider, {
	      modelValue: _ctx.gain,
	      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.gain) = $event)),
	      onUpdate: $options.changeGain
	    }, null, 8, ["modelValue", "onUpdate"]),
	    withDirectives(createBaseVNode("div", _hoisted_3$4, [
	      createBaseVNode("label", null, [
	        withDirectives(createBaseVNode("input", {
	          id: "checkbox",
	          "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.mute) = $event)),
	          type: "checkbox"
	        }, null, 512), [
	          [vModelCheckbox, _ctx.mute]
	        ]),
	        _hoisted_4$4
	      ])
	    ], 512), [
	      [vShow, $props.showMute]
	    ]),
	    ($props.isMaster && !$props.showMute)
	      ? (openBlock(), createElementBlock("div", _hoisted_5$3))
	      : createCommentVNode("", true),
	    withDirectives(createBaseVNode("div", _hoisted_6$1, [
	      createBaseVNode("label", null, [
	        withDirectives(createBaseVNode("input", {
	          "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((_ctx.soloModel) = $event)),
	          type: "checkbox"
	        }, null, 512), [
	          [vModelCheckbox, _ctx.soloModel]
	        ]),
	        _hoisted_7$1
	      ])
	    ], 512), [
	      [vShow, !$props.isMaster]
	    ]),
	    createBaseVNode("div", _hoisted_8$1, [
	      createBaseVNode("label", _hoisted_9$1, toDisplayString($props.title), 1)
	    ])
	  ], 2))
	}

	script$6.render = render$6;

	var script$5 = {
	  name: 'MixerChannel',

	  props: [
	      'title',
	      'context', 
	      'url',
	      'output',
	      'defaultPan',
	      'defaultGain',
	      'defaultMuted',
	      'trackIndex',
	      'mixerVars',
	      'hidden',
	      'solodTracks'
	  ],

	  components:{Channel: script$6},

	  data : function(){       
	      return {
	        buffer             : false,
	        ctx                : false,
	        gain               : 0.8,
	        gainNode           : false,
	        gainValue          : 0,
	        gradient           : false,
	        leftAnalyser       : false,
	        leftBouncer        : {average:0,opacity:1},
	        loaded             : false,
	        meterHeight        : 400,
	        meterWidth         : 10,
	        muted              : false,
	        mutedByMute        :false,
	        mutedBySolo        :false,
	        pan                : 0,
	        pannerNode         : false,
	        playFrom           : false,
	        playing            : false,
	        rightAnalyser      : false,
	        rightBouncer       : {average:0,opacity:1},
	        scriptProcessorNode: false,
	        sourceNode         : false,
	        splitter           : false,
	      };
	  },

	  watch:{
	    solodTracks:
	    {
	      handler() {
	        if(this.solodTracks.length && this.solodTracks.indexOf(this.trackIndex) === -1)
	          this.muteChange(true, true);
	        else
	          this.muteChange(false, true);
	      },
	      deep: true
	    },
	  },

	  created(){
	    this.muted = this.defaultMuted;
	    this.pan   = this.defaultPan;
	    this.gainValue  = this.defaultGain.toString();

	    this.scriptProcessorNode = this.context.createScriptProcessor(2048, 1, 1);
	    EventBus.$on(this.mixerVars.instance_id+'play', this.playSound);
	    EventBus.$on(this.mixerVars.instance_id+'stop', this.stopSound);
	    this.loadSound();
	  },

	  beforeUnmount() {
	    EventBus.$off(this.mixerVars.instance_id+'play',this.playSound);
	    EventBus.$off(this.mixerVars.instance_id+'stop',this.stopSound);
	  },

	  methods: {
	    mute()
	    {
	      this.gainValue = this.gainNode.gain.value; // store gain value
	      this.gainNode.gain.value = 0; // mute the gain node
	      this.muted = true;
	      this.$emit('muteChange', {index:this.trackIndex,muted:this.muted});
	    },

	    unMute()
	    {
	      this.muted = false;
	      this.gainNode.gain.value = this.gainValue; // restore previous gain value
	      this.$emit('muteChange', {index:this.trackIndex,muted:this.muted});
	    },

	    

	    /*
	    * MUTE CHANGE
	    * Event when mute changes
	    */

	    muteChange(value, triggered_from_solo){
	        // don't mute hidden tracks
	        if(this.hidden)
	          return;

	        if(triggered_from_solo)
	        {
	          if(value && !this.mutedByMute && !this.mutedBySolo) {
	            this.mute();
	          }
	          
	          if(!value && !this.mutedByMute) {
	            this.unMute();
	          }

	          this.mutedBySolo = value;
	        }else {
	          if(value && !this.mutedByMute && !this.mutedBySolo) {
	            this.mute();
	          }
	          
	          if(!value && !this.mutedBySolo) {
	            this.unMute();
	          }

	          this.mutedByMute = value;
	        }

	    },

	    soloChange(value){
	      EventBus.$emit('soloChange', {index:this.trackIndex});
	    },

	    changeGain(gain)
	    {
	      this.gainValue = gain;
	      //this.gain = gain;

	      if(!this.muted){
	        this.gainNode.gain.value = gain;
	      }

	        this.$emit('gainChange', {index:this.trackIndex,gain:gain});
	    },

	    changePan(pan) {
	        this.pan = pan;
	        var xDeg = parseInt(pan);
	        var zDeg = xDeg + 90;
	        if (zDeg > 90) {
	            zDeg = 180 - zDeg;
	        }
	        var x = Math.sin(xDeg * (Math.PI / 180));
	        var z = Math.sin(zDeg * (Math.PI / 180));
	        this.pannerNode.setPosition(x, 0, z);

	        this.$emit('panChange', {index:this.trackIndex,pan:pan});
	    },
	   
	    // load the specified sound
	    loadSound() {
	        var request = new XMLHttpRequest();
	        request.onerror = (e) => {
	          EventBus.$emit("track_load_error", this.url);
	        };
	        request.open('GET', this.url, true);
	        request.responseType = 'arraybuffer';

	        // When loaded decode the data
	        request.onload = () => { 
	            // decode the data
	            this.context.decodeAudioData(request.response, (buffer) => { // sound loaded
	                EventBus.$emit("pcm_data_loaded", {buffer:buffer, index:this.trackIndex});
	                // when the audio is decoded play the sound
	                this.buffer=buffer;
	                EventBus.$emit(this.mixerVars.instance_id+'track_loaded', this.buffer.duration);
	                this.setupAudioNodes();

	            }, this.onError);
	        };
	        request.send();
	    },
	   
	    playSound(playfrom) {
	        if(playfrom === undefined)
	            playfrom = 0;

	        this.setupAudioNodes();

	        this.sourceNode.start(0,playfrom/1000);
	    },

	    stopSound() {
	        this.sourceNode.stop(0);
	    },
	 
	    // log if an error occurs
	    onError(e) {
	        console.log(e);
	    },

	    getAverageVolume(array) {
	        var values = 0;
	        var average;
	 
	        var length = array.length;
	 
	        // get all the frequency amplitudes
	        for (var i = 0; i < length; i++) {
	            values += array[i];
	        }
	 
	        average = values / length;
	        return average;
	    },


	    setupAudioNodes() {
	        this.sourceNode = this.context.createBufferSource();

	        this.sourceNode.buffer = this.buffer;

	        this.leftAnalyser = this.context.createAnalyser();
	        this.leftAnalyser.smoothingTimeConstant = 0.6;
	        this.leftAnalyser.fftSize = 1024;
	 
	        this.rightAnalyser = this.context.createAnalyser();
	        this.rightAnalyser.smoothingTimeConstant = 0.6;
	        this.rightAnalyser.fftSize = 1024;



	        // Create a gain node.
	        this.gainNode = this.context.createGain();

	        // Create a panner node.
	        this.pannerNode = this.context.createPanner();
	        this.pannerNode.panningModel = "equalpower";
	        
	        // setup a javascript node

	        // create splitter
	        this.splitter = this.context.createChannelSplitter(2);



	        // connect everything together
	        this.pannerNode.connect(this.splitter);
	        this.gainNode.connect(this.pannerNode);
	        this.scriptProcessorNode.connect(this.gainNode);
	        this.sourceNode.connect(this.gainNode);
	        this.splitter.connect(this.leftAnalyser,0,0);
	        this.splitter.connect(this.rightAnalyser,1,0);
	        this.pannerNode.connect(this.output);


	        //this.leftAnalyser.connect(this.scriptProcessorNode);


	        // initial values
	        // 

	        let mutedBySolo = this.mutedBySolo;
	        this.mutedBySolo = false;
	        this.mutedByMute = false;
	       
	        this.gainNode.gain.value = this.gainValue;
	        this.changeGain(this.gainValue);

	        this.muteChange(this.muted, mutedBySolo);

	        this.changePan(this.pan);

	        this.sourceNode.onended = () => {
	          this.onended();
	        };

	        this.loaded = true;
	    },


	    onended()
	    {
	        // disconnect everything
	        this.scriptProcessorNode.disconnect();
	        this.sourceNode.disconnect();
	        this.gainNode.disconnect();
	        this.pannerNode.disconnect();
	        this.leftAnalyser.disconnect();
	        this.rightAnalyser.disconnect();
	        this.splitter.disconnect();

	        if(this.playFrom)
	            EventBus.$emit(this.mixerVars.instance_id+'play', this.playFrom);

	        EventBus.$emit(this.mixerVars.instance_id+'ended',this._componentId);
	    },
	  }
	};

	function render$5(_ctx, _cache, $props, $setup, $data, $options) {
	  const _component_Channel = resolveComponent("Channel");

	  return (_ctx.loaded)
	    ? (openBlock(), createBlock(_component_Channel, {
	        key: 0,
	        index: _ctx._componentId,
	        trackIndex: $props.trackIndex,
	        title: $props.title,
	        defaultPan: _ctx.pan,
	        defaultMuted: _ctx.muted,
	        defaultGain: $props.defaultGain,
	        onGainChange: $options.changeGain,
	        onMuteChange: $options.muteChange,
	        onSoloChange: $options.soloChange,
	        onPanChange: $options.changePan,
	        leftAnalyser: _ctx.leftAnalyser,
	        rightAnalyser: _ctx.rightAnalyser,
	        scriptProcessorNode: _ctx.scriptProcessorNode,
	        showMute: true,
	        mixerVars: $props.mixerVars
	      }, null, 8, ["index", "trackIndex", "title", "defaultPan", "defaultMuted", "defaultGain", "onGainChange", "onMuteChange", "onSoloChange", "onPanChange", "leftAnalyser", "rightAnalyser", "scriptProcessorNode", "mixerVars"]))
	    : createCommentVNode("", true)
	}

	script$5.render = render$5;

	var script$4 = {
	  name: 'timedisplay',
	  props: [
	      'progressTime',
	      'totalTime',
	      'mixerVars'
	  ],
	  data : function(){       
	      return {
	      };
	  },
	  computed:{

	    showMins()
	    {
	      return this.totalTime > 61000;
	    },

	    totalLength(){
	      return this.formatTime(this.totalTime);
	    },

	    progressFormatted(){
	      return this.formatTime(this.progressTime);
	    },
	  },
	  methods:{
	     formatTime(millis){
	        //        let hours = Math.floor(millis / 36e5);
	        let  mins = Math.floor((millis % 36e5) / 6e4);
	        let  secs = Math.floor((millis % 6e4) / 1000);
	        let  mill = Math.floor(millis % 1000);

	        if(!this.showMins){ // if 60 seconds or less, don't show minutes
	          var returns = [0,this.pad(secs+(mins*60),2),this.pad(mill, 2).substring(2, 0)];
	        }else {
	          var returns = [this.pad(mins,2),this.pad(secs,2),this.pad(mill, 2).substring(2, 0)];
	        }

	        return returns;
	    },
	    /* PAD 
	    * pad string with leading zeros
	    */
	    pad: function(str, max) {
	        str = str.toString();
	        return str.length < max ? this.pad("0" + str, max) : str;
	    },
	  }



	};

	const _hoisted_1$4 = { class: "vue-audio-mixer-timer" };
	const _hoisted_2$3 = {
	  key: 0,
	  class: "vue-audio-mixer-timer-number"
	};
	const _hoisted_3$3 = { key: 1 };
	const _hoisted_4$3 = { class: "vue-audio-mixer-timer-number" };
	const _hoisted_5$2 = /*#__PURE__*/createTextVNode(":");
	const _hoisted_6 = { class: "vue-audio-mixer-timer-number" };
	const _hoisted_7 = { key: 2 };
	const _hoisted_8 = {
	  key: 3,
	  class: "total"
	};
	const _hoisted_9 = { key: 0 };
	const _hoisted_10 = /*#__PURE__*/createTextVNode(":");

	function render$4(_ctx, _cache, $props, $setup, $data, $options) {
	  return (openBlock(), createElementBlock("div", _hoisted_1$4, [
	    createBaseVNode("span", {
	      class: normalizeClass(["vue-audio-mixer-progress-time", {'vue-audio-mixer-show-total-time':$props.mixerVars.show_total_time}])
	    }, [
	      ($options.showMins)
	        ? (openBlock(), createElementBlock("span", _hoisted_2$3, toDisplayString($options.progressFormatted[0]), 1))
	        : createCommentVNode("", true),
	      ($options.showMins)
	        ? (openBlock(), createElementBlock("span", _hoisted_3$3, ":"))
	        : createCommentVNode("", true),
	      createBaseVNode("span", _hoisted_4$3, toDisplayString($options.progressFormatted[1]), 1),
	      _hoisted_5$2,
	      createBaseVNode("span", _hoisted_6, toDisplayString($options.progressFormatted[2]), 1),
	      ($props.mixerVars.show_total_time)
	        ? (openBlock(), createElementBlock("span", _hoisted_7, " / "))
	        : createCommentVNode("", true),
	      ($props.mixerVars.show_total_time)
	        ? (openBlock(), createElementBlock("span", _hoisted_8, [
	            ($options.showMins)
	              ? (openBlock(), createElementBlock("span", _hoisted_9, toDisplayString($options.totalLength[0]) + ":", 1))
	              : createCommentVNode("", true),
	            createBaseVNode("span", null, toDisplayString($options.totalLength[1]), 1),
	            _hoisted_10,
	            createBaseVNode("span", null, toDisplayString($options.totalLength[2]), 1)
	          ]))
	        : createCommentVNode("", true)
	    ], 2)
	  ]))
	}

	script$4.render = render$4;

	var script$3 = {
	  name: 'progressbar',
	  props: [
	      'progressPercent',
	      'mixerVars',
	      'tracks',
	      'recording'
	  ],
	  created(){
	    this.waveFormLastGenerated = new Date();
	    window.addEventListener('mousemove',this.doDrag);
	    window.addEventListener("mouseup", this.triggerMouseUpEvent);
	    window.addEventListener("touchend", this.triggerMouseUpEvent);
	    EventBus.$on('pcm_data_loaded',this.addWavelengthPointData);
	    EventBus.$on('loaded',this.create);
	  },
	  beforeDestroy() {
	    window.removeEventListener('mousemove',this.doDrag);
	    window.removeEventListener("mouseup", this.triggerMouseUpEvent);
	    window.removeEventListener("touchend", this.triggerMouseUpEvent);
	  },
	  data : function(){       
	      return {
	        progress:0,
	        dragging:false,
	        restart:false,
	        pcmData:[],
	        rightData:[],

	        canvas:null,
	        dpr:null,
	        padding:null,
	        ctx:null,
	        canvasWidth:0,
	        canvasHeight:0,

	        waveformDataPoints:[],
	        regenerate_pcm_data:false,
	        waveformPadding:20,
	        reduced_pcm_data:[],
	        max_length:0,
	        newPCMdata:[]
	      };
	  },
	  watch: {

	    tracks: {
	      // This will let Vue know to look inside the array
	      deep: true,
	      // We have to move our method to a handler field
	      handler(){
	      // only allow the canvas to be refreshed once every 1 seconds max
	       clearTimeout(this.regenerate_pcm_data);
	        this.regenerate_pcm_data = setTimeout(() => {
	            this.convertPCMDataToWaveform();
	        }, 100);
	      }
	    },

	    progressPercent: function(newVal){
	      if(this.$refs['vue-audio-mixer-progress-bar'] && !this.dragging)
	        this.progress =  (this.$refs['vue-audio-mixer-progress-bar'].offsetWidth/100) * newVal;
	    },

	    progress:function()
	    {
	      this.drawWaveform(); 
	    }

	  },
	  computed:{
	    totalLength(){
	      return this.formatTime(this.totalTime);
	    },

	    progressFormatted(){
	      return this.formatTime(this.progressTime);
	    },

	    progressBarPosition()
	    {
	      return this.progress+'px';
	    }

	    
	  },
	  methods:{

	    create(loaded){
	      if(loaded){
	        if(!this.canvas){
	          this.$nextTick(() => {
	            this.reducePCMData();
	          });
	        }
	      }

	    },

	    // normalize the waveform data so it appears as big as possible
	    normalizeData(filteredData) {
	      const multiplier = Math.pow(Math.max(...filteredData), -1);
	      return filteredData.map(n => n * multiplier);
	    },

	    // Fraws the waveform
	    drawWaveformLineSegment (ctx, x, y, width, isEven) {

	      let halfway = this.canvasHeight / 2;


	      ctx.lineWidth = 1; // how thick the line is

	      if(this.progress*this.dpr > x){
	        if(this.recording){
	          ctx.strokeStyle = isEven ?  "#8c0d0d" : "#bf1111"; // what color our line is
	        }else {
	          ctx.strokeStyle = isEven ?  "#38fedd" : "#99ffee"; // what color our line is
	        }
	      }else {
	        ctx.strokeStyle = isEven ?  "#a3a3a3" : "#d9d9d9"; // what color our line is
	      }

	      

	      ctx.beginPath();
	      y = isEven ? y : -y;

	      y = halfway +y;

	      ctx.moveTo(x, halfway);
	      ctx.lineTo(x, y);
	      ctx.stroke();
	    },

	    // returns the loudness of an array of PCM data
	    getAmps(buffer)
	    {

	      var rms = 0;

	      for (var i = 0; i < buffer.length; i++) {
	        rms += buffer[i] * buffer[i];
	      }

	      rms /= buffer.length;
	      rms = Math.sqrt(rms);
	 
	      return rms;

	    },

	    // splits array into chunks
	    chunkArray(arr, size)
	    {
	      return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
	        arr.slice(i * size, i * size + size)
	      );
	    },


	    // convert PCM data to waveform data points
	    convertPCMDataToWaveform()
	    {

	    

	      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
	      this.ctx.fillStyle="#303030";
	      // create background to meters
	      this.ctx.fillRect(0,0,this.canvasWidth,this.canvasHeight);

	      let finalData = [];

	      for (let i = 0; i < this.reduced_pcm_data.length; i++){
	        for (let d = 0; d < this.reduced_pcm_data[i].data.length; d++){
	          if(finalData[d] === undefined){
	            finalData.push(0);
	          }
	          // timex value by current gain and mute
	          let track_value = this.tracks[this.reduced_pcm_data[i].index].muted ? 0 : (this.reduced_pcm_data[i].data[d] * this.tracks[this.reduced_pcm_data[i].index].gain);
	          finalData[d] = finalData[d] + track_value;
	        }
	      }        

	      let normalizedData = this.filterData(finalData);
	      normalizedData = this.normalizeData(normalizedData);

	      this.waveformDataPoints = normalizedData;
	      this.drawWaveform();

	    },

	    // draws the waveform
	    drawWaveform(){

	      let normalizedData = this.waveformDataPoints;

	      // draw the line segments
	      const width = this.canvasWidth;

	      for (let i = 0; i < normalizedData.length; i++) {
	        const x = i;
	        let height = normalizedData[i] * ((this.canvasHeight-this.waveformPadding)/2);
	        this.drawWaveformLineSegment(this.ctx, x, height, width, i%2 == 0);
	      }

	    },

	    createCanvas()
	    {

	       // Set up the canvas
	      this.canvas = document.getElementById('vue-audio-mixer-waveform');
	      this.dpr = window.devicePixelRatio || 1;
	      this.padding = 20;
	      this.canvasWidth = this.$refs['vue-audio-mixer-progress-bar'].offsetWidth * this.dpr;
	      this.canvas.width = this.canvasWidth;
	      this.canvas.height = 100;
	      this.canvasHeight = this.canvas.offsetHeight * this.dpr;
	      this.ctx = this.canvas.getContext("2d");
	    },

	    // filters data so we only have the correct number of data points to the number of pixesl in the canvas
	    filterData(rawData)
	    {
	      const samples = this.canvasWidth; // Number of samples we want to have in our final data set
	      const blockSize = rawData.length / samples; // Number of samples in each subdivision
	      const filteredData = [];
	      for (let i = 0; i < samples; i++) {
	        let index = rawData[Math.ceil(i * blockSize)];
	        if(index !== undefined)
	          filteredData.push(rawData[Math.ceil(i * blockSize)]); 
	      }
	      return filteredData;
	    },


	    /**
	     * Reduced the PCM data to the ammount of pixels in the canvas
	     */

	    reducePCMData(data)
	    {

	      if(!this.canvas){
	        this.createCanvas();
	      }


	      // the number of pcm data parts we want to analyse per pixel
	      let chunk_size = Math.floor(this.max_length/this.canvasWidth);
	      for (let i = 0; i < this.pcmData.length; i++){

	        // split data into chunk sizes
	        let newArray = this.chunkArray(this.pcmData[i].data,chunk_size);
	        // make an array of the amps of each track for each pixel
	        let finalData = [];
	        for (let c = 0; c < newArray.length; c++){
	          let amps = this.tracks[this.pcmData[i].index].muted ? 0 : (this.getAmps(newArray[c]) * this.tracks[this.pcmData[i].index].gain);
	          if(finalData[c] === undefined){
	            finalData.push(0);
	          }
	          finalData[c] =  finalData[c] + amps;
	        }
	        // create new data array with reduced data
	        this.reduced_pcm_data.push({data:finalData, index:this.pcmData[i].index});

	      }
	      this.pcmData = []; // remove this massive data from the storage

	      this.convertPCMDataToWaveform();

	    },

	    
	    /*
	    * Called when a new audio source is loaded. Adds the PCM data to the array
	    *
	    * Raw buffer data is massive, so we need to reduce this down before using it
	    *
	    **/
	    
	    addWavelengthPointData(raw){


	      var channels = 2;
	      let finalData = [];

	      for (var channel = 0; channel < channels; channel++) {

	        // get the raw buffer data
	        let buffer = raw.buffer.getChannelData(channel);

	        // chunk this into chunks of 1000 points
	        let newArray = this.chunkArray(buffer,1000);

	        // make an array of the amps of each track for each chunk
	        for (let c = 0; c < newArray.length; c++){
	          if(finalData[c] === undefined){
	            finalData.push(0);
	          }
	          finalData[c] =  finalData[c] + this.getAmps(newArray[c]);
	        }
	      }

	      // Calculates the most data points there is
	      if(finalData.length > this.max_length)
	          this.max_length = finalData.length;

	      this.pcmData.push({data:finalData,index:raw.index});

	    },

	    startDrag(e){
	      this.dragging = true;
	      this.progressBarClick(e);
	    },

	    doDrag(e){
	      if(this.dragging)
	        this.progressBarClick(e);
	    },

	    triggerMouseUpEvent(e){
	      let doIt = this.dragging ? true : false;
	      this.dragging = false;
	      if(doIt)
	        this.progressBarClick(e, true);
	    },

	    progressBarClick(e, fdsa)
	    {

	      // can't click while recording
	      if(this.recording)
	        return;

	      let target = this.$refs['vue-audio-mixer-progress-bar'];
	      var rect = target.getBoundingClientRect();
	      var x = e.clientX - rect.left; //x position within the element.
	      var percent = (100/target.offsetWidth) * x;

	      percent = Math.round(percent);

	      if(percent < 0 || percent > 100)
	        return false;
	       // only if mouse inside box


	      if(!this.dragging)
	        this.$emit('percent', percent);
	      else
	        this.progress = Math.round(x);

	    }
	  }



	};

	const _hoisted_1$3 = /*#__PURE__*/createBaseVNode("canvas", {
	  width: "0",
	  height: "20",
	  id: "vue-audio-mixer-waveform"
	}, null, -1);

	function render$3(_ctx, _cache, $props, $setup, $data, $options) {
	  return (openBlock(), createElementBlock("div", null, [
	    createBaseVNode("div", {
	      class: "vue-audio-mixer-progress-bar",
	      ref: "vue-audio-mixer-progress-bar",
	      onMousedown: _cache[0] || (_cache[0] = (...args) => ($options.startDrag && $options.startDrag(...args)))
	    }, [
	      _hoisted_1$3,
	      createBaseVNode("div", {
	        class: "vue-audio-mixer-progress-cursor",
	        style: normalizeStyle({left: $options.progressBarPosition})
	      }, null, 4)
	    ], 544)
	  ]))
	}

	script$3.render = render$3;

	var script$2 = {
	  name: 'transportbuttons',
	  props: [
	      'playing'
	  ],
	  data : function(){       
	      return {
	      };
	  },

	};

	const _hoisted_1$2 = { class: "vue-audio-mixer-transport" };
	const _hoisted_2$2 = /*#__PURE__*/createBaseVNode("span", null, null, -1);
	const _hoisted_3$2 = /*#__PURE__*/createBaseVNode("span", null, null, -1);
	const _hoisted_4$2 = [
	  _hoisted_2$2,
	  _hoisted_3$2
	];

	function render$2(_ctx, _cache, $props, $setup, $data, $options) {
	  return (openBlock(), createElementBlock("div", _hoisted_1$2, [
	    createBaseVNode("button", {
	      type: "button",
	      class: normalizeClass(["vue-audio-mixer-transport-play-button", {'vue-audio-mixer-transport-play-button-active':$props.playing}]),
	      onClick: _cache[0] || (_cache[0] = $event => (_ctx.$emit('togglePlay')))
	    }, _hoisted_4$2, 2),
	    createBaseVNode("button", {
	      type: "button",
	      class: "vue-audio-mixer-transport-start-button",
	      onClick: _cache[1] || (_cache[1] = $event => (_ctx.$emit('stop')))
	    })
	  ]))
	}

	script$2.render = render$2;

	var script$1 = {
	  name: 'loader',
	  props: [
	      'percentLoaded'
	  ],
	  data : function(){       
	      return {
	      };
	  }

	};

	const _hoisted_1$1 = { class: "vue-audio-mixer-loader" };
	const _hoisted_2$1 = { class: "vue-audio-mixer-loader-text" };
	const _hoisted_3$1 = /*#__PURE__*/createTextVNode("Loading... ");
	const _hoisted_4$1 = /*#__PURE__*/createTextVNode("%");
	const _hoisted_5$1 = /*#__PURE__*/createBaseVNode("div", { class: "vue-audio-mixer-loader-inner" }, [
	  /*#__PURE__*/createBaseVNode("div"),
	  /*#__PURE__*/createBaseVNode("div")
	], -1);

	function render$1(_ctx, _cache, $props, $setup, $data, $options) {
	  return (openBlock(), createElementBlock("div", _hoisted_1$1, [
	    createBaseVNode("p", _hoisted_2$1, [
	      _hoisted_3$1,
	      createBaseVNode("span", null, toDisplayString($props.percentLoaded), 1),
	      _hoisted_4$1
	    ]),
	    _hoisted_5$1
	  ]))
	}

	script$1.render = render$1;

	function commonjsRequire(path) {
		throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
	}

	var recorder = {exports: {}};

	(function (module, exports) {
	  (function (f) {
	    {
	      module.exports = f();
	    }
	  })(function () {
	    return function e(t, n, r) {
	      function s(o, u) {
	        if (!n[o]) {
	          if (!t[o]) {
	            var a = typeof commonjsRequire == "function" && commonjsRequire;
	            if (!u && a) return a(o, !0);
	            if (i) return i(o, !0);
	            var f = new Error("Cannot find module '" + o + "'");
	            throw f.code = "MODULE_NOT_FOUND", f;
	          }

	          var l = n[o] = {
	            exports: {}
	          };
	          t[o][0].call(l.exports, function (e) {
	            var n = t[o][1][e];
	            return s(n ? n : e);
	          }, l, l.exports, e, t, n, r);
	        }

	        return n[o].exports;
	      }

	      var i = typeof commonjsRequire == "function" && commonjsRequire;

	      for (var o = 0; o < r.length; o++) s(r[o]);

	      return s;
	    }({
	      1: [function (require, module, exports) {

	        module.exports = require("./recorder").Recorder;
	      }, {
	        "./recorder": 2
	      }],
	      2: [function (require, module, exports) {

	        var _createClass = function () {
	          function defineProperties(target, props) {
	            for (var i = 0; i < props.length; i++) {
	              var descriptor = props[i];
	              descriptor.enumerable = descriptor.enumerable || false;
	              descriptor.configurable = true;
	              if ("value" in descriptor) descriptor.writable = true;
	              Object.defineProperty(target, descriptor.key, descriptor);
	            }
	          }

	          return function (Constructor, protoProps, staticProps) {
	            if (protoProps) defineProperties(Constructor.prototype, protoProps);
	            if (staticProps) defineProperties(Constructor, staticProps);
	            return Constructor;
	          };
	        }();

	        Object.defineProperty(exports, "__esModule", {
	          value: true
	        });
	        exports.Recorder = undefined;

	        var _inlineWorker = require('inline-worker');

	        var _inlineWorker2 = _interopRequireDefault(_inlineWorker);

	        function _interopRequireDefault(obj) {
	          return obj && obj.__esModule ? obj : {
	            default: obj
	          };
	        }

	        function _classCallCheck(instance, Constructor) {
	          if (!(instance instanceof Constructor)) {
	            throw new TypeError("Cannot call a class as a function");
	          }
	        }

	        var Recorder = exports.Recorder = function () {
	          function Recorder(source, cfg) {
	            var _this = this;

	            _classCallCheck(this, Recorder);

	            this.config = {
	              bufferLen: 4096,
	              numChannels: 2,
	              mimeType: 'audio/wav'
	            };
	            this.recording = false;
	            this.callbacks = {
	              getBuffer: [],
	              exportWAV: []
	            };
	            Object.assign(this.config, cfg);
	            this.context = source.context;
	            this.node = (this.context.createScriptProcessor || this.context.createJavaScriptNode).call(this.context, this.config.bufferLen, this.config.numChannels, this.config.numChannels);

	            this.node.onaudioprocess = function (e) {
	              if (!_this.recording) return;
	              var buffer = [];

	              for (var channel = 0; channel < _this.config.numChannels; channel++) {
	                buffer.push(e.inputBuffer.getChannelData(channel));
	              }

	              _this.worker.postMessage({
	                command: 'record',
	                buffer: buffer
	              });
	            };

	            source.connect(this.node);
	            this.node.connect(this.context.destination); //this should not be necessary

	            var self = {};
	            this.worker = new _inlineWorker2.default(function () {
	              var recLength = 0,
	                  recBuffers = [],
	                  sampleRate = undefined,
	                  numChannels = undefined;

	              self.onmessage = function (e) {
	                switch (e.data.command) {
	                  case 'init':
	                    init(e.data.config);
	                    break;

	                  case 'record':
	                    record(e.data.buffer);
	                    break;

	                  case 'exportWAV':
	                    exportWAV(e.data.type);
	                    break;

	                  case 'getBuffer':
	                    getBuffer();
	                    break;

	                  case 'clear':
	                    clear();
	                    break;
	                }
	              };

	              function init(config) {
	                sampleRate = config.sampleRate;
	                numChannels = config.numChannels;
	                initBuffers();
	              }

	              function record(inputBuffer) {
	                for (var channel = 0; channel < numChannels; channel++) {
	                  recBuffers[channel].push(inputBuffer[channel]);
	                }

	                recLength += inputBuffer[0].length;
	              }

	              function exportWAV(type) {
	                var buffers = [];

	                for (var channel = 0; channel < numChannels; channel++) {
	                  buffers.push(mergeBuffers(recBuffers[channel], recLength));
	                }

	                var interleaved = undefined;

	                if (numChannels === 2) {
	                  interleaved = interleave(buffers[0], buffers[1]);
	                } else {
	                  interleaved = buffers[0];
	                }

	                var dataview = encodeWAV(interleaved);
	                var audioBlob = new Blob([dataview], {
	                  type: type
	                });
	                self.postMessage({
	                  command: 'exportWAV',
	                  data: audioBlob
	                });
	              }

	              function getBuffer() {
	                var buffers = [];

	                for (var channel = 0; channel < numChannels; channel++) {
	                  buffers.push(mergeBuffers(recBuffers[channel], recLength));
	                }

	                self.postMessage({
	                  command: 'getBuffer',
	                  data: buffers
	                });
	              }

	              function clear() {
	                recLength = 0;
	                recBuffers = [];
	                initBuffers();
	              }

	              function initBuffers() {
	                for (var channel = 0; channel < numChannels; channel++) {
	                  recBuffers[channel] = [];
	                }
	              }

	              function mergeBuffers(recBuffers, recLength) {
	                var result = new Float32Array(recLength);
	                var offset = 0;

	                for (var i = 0; i < recBuffers.length; i++) {
	                  result.set(recBuffers[i], offset);
	                  offset += recBuffers[i].length;
	                }

	                return result;
	              }

	              function interleave(inputL, inputR) {
	                var length = inputL.length + inputR.length;
	                var result = new Float32Array(length);
	                var index = 0,
	                    inputIndex = 0;

	                while (index < length) {
	                  result[index++] = inputL[inputIndex];
	                  result[index++] = inputR[inputIndex];
	                  inputIndex++;
	                }

	                return result;
	              }

	              function floatTo16BitPCM(output, offset, input) {
	                for (var i = 0; i < input.length; i++, offset += 2) {
	                  var s = Math.max(-1, Math.min(1, input[i]));
	                  output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
	                }
	              }

	              function writeString(view, offset, string) {
	                for (var i = 0; i < string.length; i++) {
	                  view.setUint8(offset + i, string.charCodeAt(i));
	                }
	              }

	              function encodeWAV(samples) {
	                var buffer = new ArrayBuffer(44 + samples.length * 2);
	                var view = new DataView(buffer);
	                /* RIFF identifier */

	                writeString(view, 0, 'RIFF');
	                /* RIFF chunk length */

	                view.setUint32(4, 36 + samples.length * 2, true);
	                /* RIFF type */

	                writeString(view, 8, 'WAVE');
	                /* format chunk identifier */

	                writeString(view, 12, 'fmt ');
	                /* format chunk length */

	                view.setUint32(16, 16, true);
	                /* sample format (raw) */

	                view.setUint16(20, 1, true);
	                /* channel count */

	                view.setUint16(22, numChannels, true);
	                /* sample rate */

	                view.setUint32(24, sampleRate, true);
	                /* byte rate (sample rate * block align) */

	                view.setUint32(28, sampleRate * 4, true);
	                /* block align (channel count * bytes per sample) */

	                view.setUint16(32, numChannels * 2, true);
	                /* bits per sample */

	                view.setUint16(34, 16, true);
	                /* data chunk identifier */

	                writeString(view, 36, 'data');
	                /* data chunk length */

	                view.setUint32(40, samples.length * 2, true);
	                floatTo16BitPCM(view, 44, samples);
	                return view;
	              }
	            }, self);
	            this.worker.postMessage({
	              command: 'init',
	              config: {
	                sampleRate: this.context.sampleRate,
	                numChannels: this.config.numChannels
	              }
	            });

	            this.worker.onmessage = function (e) {
	              var cb = _this.callbacks[e.data.command].pop();

	              if (typeof cb == 'function') {
	                cb(e.data.data);
	              }
	            };
	          }

	          _createClass(Recorder, [{
	            key: 'record',
	            value: function record() {
	              this.recording = true;
	            }
	          }, {
	            key: 'stop',
	            value: function stop() {
	              this.recording = false;
	            }
	          }, {
	            key: 'clear',
	            value: function clear() {
	              this.worker.postMessage({
	                command: 'clear'
	              });
	            }
	          }, {
	            key: 'getBuffer',
	            value: function getBuffer(cb) {
	              cb = cb || this.config.callback;
	              if (!cb) throw new Error('Callback not set');
	              this.callbacks.getBuffer.push(cb);
	              this.worker.postMessage({
	                command: 'getBuffer'
	              });
	            }
	          }, {
	            key: 'exportWAV',
	            value: function exportWAV(cb, mimeType) {
	              mimeType = mimeType || this.config.mimeType;
	              cb = cb || this.config.callback;
	              if (!cb) throw new Error('Callback not set');
	              this.callbacks.exportWAV.push(cb);
	              this.worker.postMessage({
	                command: 'exportWAV',
	                type: mimeType
	              });
	            }
	          }], [{
	            key: 'forceDownload',
	            value: function forceDownload(blob, filename) {
	              var url = (window.URL || window.webkitURL).createObjectURL(blob);
	              var link = window.document.createElement('a');
	              link.href = url;
	              link.download = filename || 'output.wav';
	              var click = document.createEvent("Event");
	              click.initEvent("click", true, true);
	              link.dispatchEvent(click);
	            }
	          }]);

	          return Recorder;
	        }();

	        exports.default = Recorder;
	      }, {
	        "inline-worker": 3
	      }],
	      3: [function (require, module, exports) {

	        module.exports = require("./inline-worker");
	      }, {
	        "./inline-worker": 4
	      }],
	      4: [function (require, module, exports) {
	        (function (global) {

	          var _createClass = function () {
	            function defineProperties(target, props) {
	              for (var key in props) {
	                var prop = props[key];
	                prop.configurable = true;
	                if (prop.value) prop.writable = true;
	              }

	              Object.defineProperties(target, props);
	            }

	            return function (Constructor, protoProps, staticProps) {
	              if (protoProps) defineProperties(Constructor.prototype, protoProps);
	              if (staticProps) defineProperties(Constructor, staticProps);
	              return Constructor;
	            };
	          }();

	          var _classCallCheck = function (instance, Constructor) {
	            if (!(instance instanceof Constructor)) {
	              throw new TypeError("Cannot call a class as a function");
	            }
	          };

	          var WORKER_ENABLED = !!(global === global.window && global.URL && global.Blob && global.Worker);

	          var InlineWorker = function () {
	            function InlineWorker(func, self) {
	              var _this = this;

	              _classCallCheck(this, InlineWorker);

	              if (WORKER_ENABLED) {
	                var functionBody = func.toString().trim().match(/^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/)[1];
	                var url = global.URL.createObjectURL(new global.Blob([functionBody], {
	                  type: "text/javascript"
	                }));
	                return new global.Worker(url);
	              }

	              this.self = self;

	              this.self.postMessage = function (data) {
	                setTimeout(function () {
	                  _this.onmessage({
	                    data: data
	                  });
	                }, 0);
	              };

	              setTimeout(function () {
	                func.call(self);
	              }, 0);
	            }

	            _createClass(InlineWorker, {
	              postMessage: {
	                value: function postMessage(data) {
	                  var _this = this;

	                  setTimeout(function () {
	                    _this.self.onmessage({
	                      data: data
	                    });
	                  }, 0);
	                }
	              }
	            });

	            return InlineWorker;
	          }();

	          module.exports = InlineWorker;
	        }).call(this, typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
	      }, {}]
	    }, {}, [1])(1);
	  });
	})(recorder);

	var Recorder = /*@__PURE__*/getDefaultExportFromCjs(recorder.exports);

	var script = {
	  name: 'app',

	  props: {
	    theme:{
	      String, 
	      default:'default'
	    },
	    config: Object,
	    size: {
	      type: String,
	      default:'medium'
	    },
	    showPan: {
	      type: Boolean,
	      default:true
	    },
	    showTotalTime:{
	      type: Boolean,
	      default:true
	    }
	  },
	  components: {
	    MixerChannel: script$5,
	    Channel: script$6,
	    Loader: script$1,
	    TimeDisplay: script$4,
	    TransportButtons: script$2,
	    ProgressBar: script$3
	  },
	  data : function(){       
	      return {
	        context                    : false,
	        gainNode                   : false,
	        scriptProcessorNode        : false,
	        leftAnalyser               : false,
	        rightAnalyser              : false,
	        splitter                   : false,
	        masterPanValue             : 0,
	        masterGainValue            : 1,
	        masterMuted                : false,
	        totalDuration              : 0,
	        startedAt                  : 0,
	        currentTime                : 0,
	        timelineWidth              : 0,
	        playing                    : false,
	        pausedAt                   : 0,
	        dragging                   : false,
	        restart                    : false,
	        overRideProgressBarPosition: false,
	        progressBarPosition        : 0,
	        tracks                     : [],
	        solodTracks                : [],
	        tracksLoaded               : 0,
	        recorder                   : null,
	        recording                  :false,
	        track_load_error           : false
	      };
	  },

	  created(){
	    this.currentTime =  Date.now();
	    this.startedAt = this.currentTime;

	    this.checkConfig();

	    var AudioContext = window.AudioContext // Default
	    || window.webkitAudioContext // Safari and old versions of Chrome
	    || false; 

	    this.context            = new AudioContext;
	    this.gainNode           = this.context.createGain();
	    this.gainNode.connect(this.context.destination);
	    this.scriptProcessorNode = this.context.createScriptProcessor(2048, 1, 1);
	    this.setupAudioNodes();
	    EventBus.$on(this.mixerVars.instance_id+'track_loaded', this.trackLoaded);
	    EventBus.$on(this.mixerVars.instance_id+'stop', this.stopped);
	    EventBus.$on(this.mixerVars.instance_id+'play', this.started);
	    EventBus.$on(this.mixerVars.instance_id+'soloChange', this.detectedSoloChange);

	    EventBus.$on('track_load_error',this.trackLoadError);

	    setInterval(() => {
	      if(this.playing)
	        this.currentTime =  Date.now();
	    }, 1);
	  },

	  beforeDestroy() {
	    EventBus.$off(this.mixerVars.instance_id+'soloChange',this.detectedSoloChange);
	    EventBus.$off(this.mixerVars.instance_id+'track_loaded',this.trackLoaded);
	    EventBus.$off(this.mixerVars.instance_id+'stop',this.stopped);
	    EventBus.$off(this.mixerVars.instance_id+'play',this.started);
	  },

	  watch: {
	    progressPercent: function(newVal){
	      if(newVal >= 100)
	         EventBus.$emit(this.mixerVars.instance_id+'stop');
	    },

	    loading(newVal) {
	      EventBus.$emit('loaded',!newVal);
	      this.$emit('loaded',!newVal);
	    },

	    trackSettings(newVal)
	    {
	      this.$emit('input',newVal);
	    }

	    
	  },

	  computed: {
	    visibleTracks(){
	      return this.tracks.filter(t => !t.hidden);
	    },

	    mixerWidth()
	    {
	      if(this.track_load_error){
	        return '500px';
	      }

	      let width = 69; // channel width of medium
	      if(this.mixerVars.theme_size == 'Small'){
	        width = 51; // channel width of small
	      }
	      return (width*(this.visibleTracks.length+1))+'px';
	    },

	    mixerVars()
	    {
	      return {
	        'theme_size'     : this.themeSize,
	        'theme_colour'   : this.theme,
	        'instance_id'    : Math.floor((Math.random() * 100) + 1),
	        'show_pan'       : this.showPan,
	        'show_total_time': this.showTotalTime
	      }
	    },

	    trackClass()
	    {
	      return 'vue-audio-mixer-theme-tracks-'+this.tracks.length;
	    },

	    themeClassColour(){
	      return 'vue-audio-mixer-theme-'+this.theme;
	    },

	    themeClassSize() {
	      let className = 'vue-audio-mixer-theme-'+(this.themeSize.toLowerCase());
	      let toReturn = {};
	      toReturn[className] = true;
	      return toReturn;
	    },

	    themeSize()
	    {
	      if(this.size && this.size.toLowerCase() == 'small'){
	        return 'Small'
	      }
	      return 'Medium'
	    },

	    // the starter config for the current settings
	    trackSettings()
	    {

	      return {
	        tracks: this.tracks,
	        master:{
	          "pan":parseFloat(this.masterPanValue),
	          "gain":parseFloat(this.masterGainValue),
	          "muted":this.masterMuted
	        }
	      };

	    },

	    progress(){
	      return this.currentTime - this.startedAt;
	    },

	    progressPercent(){
	      return (100/this.totalDuration)*(this.progress);
	    },

	    loading(){
	      return this.tracksLoaded == 0 || this.tracksLoaded < this.tracks.length;
	    },

	    loadingPercent(){
	      return ((100/this.tracks.length)*this.tracksLoaded).toFixed(2);
	    }

	  
	  },

	  methods: {
	    trackLoadError(track_url)
	    {
	      this.track_load_error = track_url;
	    },

	    saveAudioMix(){
	        this.stop();
	        this.recording = true;
	        this.recorder = new Recorder(this.pannerNode);
	        this.play();
	        this.recorder.record();
	        this.stopMix();
	    },

	    stopMix() {
	      setTimeout(() => {
	        this.stopRecording();
	     }, this.totalDuration);
	    },

	    stopRecording(){

	      if(this.recording){
	        this.recording = false;
	        this.stop();
	        this.recorder.exportWAV((blob) => {
	            var a = document.createElement("a");
	            document.body.appendChild(a);
	            a.style = "display: none";
	            let url = window.URL.createObjectURL(blob);
	            a.href = url;
	            a.download = 'mix.wav';
	            a.click();
	            window.URL.revokeObjectURL(url);
	        });
	      }
	    },

	    detectedSoloChange(track)
	    {
	        let index = this.solodTracks.indexOf(track.index);
	        if (index > -1) {
	          if(!track.solo)
	            this.solodTracks.splice(index, 1);
	        }else {
	          if(track.solo)
	            this.solodTracks.push(track.index);
	        }
	    },

	    playFromPercent(percent){
	      if(this.playing){
	        this.restart = true;
	        EventBus.$emit(this.mixerVars.instance_id+'stop');
	      }

	      this.currentTime =  Date.now();
	      this.pausedAt =  (this.totalDuration/100) * percent;
	      this.startedAt = this.currentTime - this.pausedAt;

	      if(this.restart)
	        setTimeout( () => { EventBus.$emit(this.mixerVars.instance_id+'play',this.pausedAt); }, 10);

	      this.restart = false;
	    },


	    checkConfig(){
	      let json = this.config;

	      if(json){
	        this.tracks          = json.tracks;
	        this.masterPanValue  = json.master.pan;
	        this.masterGainValue = json.master.gain;
	        this.masterMuted     = json.master.muted;
	      }
	    },

	    started(){
	      this.overRideProgressBarPosition = false;
	      this.playing = true;
	    },

	    stopped(){
	      this.playing = false;
	    },

	    pause()
	    {
	      // stop if already playing
	      if(this.playing){
	        this.stopRecording();
	        this.pausedAt = this.progress;
	        EventBus.$emit(this.mixerVars.instance_id+'stop');
	      }

	    },

	    play()
	    {
	      if(this.playing)
	        this.pause();

	      this.doPlay();
	    },

	    doPlay(){
	      if(this.progressPercent >= 100){ // it's at the end, so restart
	        this.playing = true;
	        this.playFromPercent(0);
	      }else {
	        this.startedAt = Date.now() - this.progress;
	        EventBus.$emit(this.mixerVars.instance_id+'play',this.pausedAt);      
	      }
	    },

	    togglePlay()
	    {
	      if(this.playing){
	        this.pause();
	      }else {
	        this.doPlay();
	      }
	      
	    },

	    stop()
	    {
	      if(!this.playing){
	        this.stopRecording();
	      }

	      if(this.playing){
	        this.pause();
	      }
	      
	      this.pausedAt = 0;

	      if(!this.playing){
	        this.startedAt = this.currentTime;
	        EventBus.$emit(this.mixerVars.instance_id+'stop');
	      }
	    },

	    trackLoaded(duration){

	      this.tracksLoaded++;


	    

	      duration = duration*1000;

	      if(duration > this.totalDuration){
	        this.totalDuration = duration;
	      }

	    },

	    changeGain(value){
	      if (value && value.gain) {
	        this.tracks[value.index].gain = parseFloat(value.gain);
	      }
	    },

	    changePan(value){
	      this.tracks[value.index].pan = parseFloat(value.pan);
	    },

	    changeMute(value){
	      if (value && value.muted) {
	        this.tracks[value.index].muted = value.muted;
	      }
	    },

	    changeSolo(value){

	    },

	 

	    /************************************************************
	    *
	    * Master channel controls
	    *
	    *************************************************************/

	    changeMasterMute(value){
	      if(value){
	        this.masterGainValue = this.gainNode.gain.value; // store gain value
	        this.gainNode.gain.value = 0; // mute the gain node
	        this.masterMuted = true;
	      }
	      else {
	        this.masterMuted = false;
	        this.gainNode.gain.value = this.masterGainValue; // restore previous gain value
	      }
	    },

	     // Master Gain

	    changeMasterGain(gain)
	    {
	      this.masterGainValue = gain;
	      if(!this.masterMuted)
	        this.gainNode.gain.value = gain;
	    },

	    // Master Pan

	    changeMasterPan(pan) {
	      var xDeg = parseInt(pan);
	      var zDeg = xDeg + 90;
	      if (zDeg > 90) {
	        zDeg = 180 - zDeg;
	      }
	      var x = Math.sin(xDeg * (Math.PI / 180));
	      var z = Math.sin(zDeg * (Math.PI / 180));
	      this.pannerNode.setPosition(x, 0, z);

	      this.masterPanValue = pan;
	    },

	    // Master Audio Nodes

	    setupAudioNodes() {


	        // setup a analyzers
	        this.leftAnalyser = this.context.createAnalyser();
	        this.leftAnalyser.smoothingTimeConstant = 0.3;
	        this.leftAnalyser.fftSize = 1024;
	 
	        this.rightAnalyser = this.context.createAnalyser();
	        this.rightAnalyser.smoothingTimeConstant = 0.0;
	        this.rightAnalyser.fftSize = 1024;

	        // Create a gain node.
	        this.gainNode = this.context.createGain();

	        // Create a panner node.
	        this.pannerNode = this.context.createPanner();
	        this.pannerNode.panningModel = "equalpower";
	        
	        // create splitter
	        this.splitter = this.context.createChannelSplitter();

	        // connect everything together
	        this.scriptProcessorNode.connect(this.gainNode);
	        this.gainNode.connect(this.pannerNode);
	        this.pannerNode.connect(this.splitter);
	        this.splitter.connect(this.leftAnalyser,0,0);
	        this.splitter.connect(this.rightAnalyser,1,0);
	       // this.leftAnalyser.connect(this.scriptProcessorNode);
	        this.pannerNode.connect(this.context.destination);

	        // initial values
	        this.changeMasterGain(this.masterGainValue);
	        this.changeMasterPan(this.masterPanValue);
	       // this.changeMasterMute(this.masterMuted);

	    },

	   

	  }

	};

	const _hoisted_1 = {
	  key: 0,
	  class: "vue-audio-mixer-error"
	};
	const _hoisted_2 = { class: "vue-audio-mixer-loading-hider" };
	const _hoisted_3 = {
	  class: "vue-audio-mixer-channel-strip",
	  ref: "channelstrip"
	};
	const _hoisted_4 = { class: "time_and_transport" };
	const _hoisted_5 = { class: "text-center" };

	function render(_ctx, _cache, $props, $setup, $data, $options) {
	  const _component_Loader = resolveComponent("Loader");
	  const _component_MixerChannel = resolveComponent("MixerChannel");
	  const _component_Channel = resolveComponent("Channel");
	  const _component_ProgressBar = resolveComponent("ProgressBar");
	  const _component_TimeDisplay = resolveComponent("TimeDisplay");
	  const _component_TransportButtons = resolveComponent("TransportButtons");

	  return (openBlock(), createElementBlock("div", {
	    class: normalizeClass(["vue-audio-mixer", [$options.themeClassSize, $options.themeClassColour, $options.trackClass]]),
	    style: normalizeStyle({ width: $options.mixerWidth })
	  }, [
	    (_ctx.track_load_error)
	      ? (openBlock(), createElementBlock("p", _hoisted_1, "Track " + toDisplayString(_ctx.track_load_error) + " failed to load. Check that the track is hosted on the same domain as the mixer, or that CORS is enabled on the track's hosting service.", 1))
	      : ($options.loading)
	        ? (openBlock(), createBlock(_component_Loader, {
	            key: 1,
	            percentLoaded: $options.loadingPercent
	          }, null, 8, ["percentLoaded"]))
	        : createCommentVNode("", true),
	    withDirectives(createBaseVNode("div", _hoisted_2, [
	      createBaseVNode("div", _hoisted_3, [
	        createBaseVNode("div", null, [
	          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.tracks, (track, index) => {
	            return withDirectives((openBlock(), createBlock(_component_MixerChannel, {
	              title: track.title,
	              defaultPan: track.pan,
	              hidden: track.hidden,
	              defaultGain: track.gain,
	              defaultMuted: track.muted,
	              context: _ctx.context,
	              output: _ctx.gainNode,
	              url: track.url,
	              key: index,
	              solodTracks: _ctx.solodTracks,
	              trackIndex: index,
	              onPanChange: $options.changePan,
	              onGainChange: $options.changeGain,
	              onMuteChange: $options.changeMute,
	              onSoloChange: $options.changeSolo,
	              mixerVars: $options.mixerVars
	            }, null, 8, ["title", "defaultPan", "hidden", "defaultGain", "defaultMuted", "context", "output", "url", "solodTracks", "trackIndex", "onPanChange", "onGainChange", "onMuteChange", "onSoloChange", "mixerVars"])), [
	              [vShow, !track.hidden]
	            ])
	          }), 128)),
	          createVNode(_component_Channel, {
	            title: "Master",
	            defaultPan: _ctx.masterPanValue,
	            defaultGain: _ctx.masterGainValue,
	            defaultMuted: _ctx.masterMuted,
	            onMuteChange: $options.changeMasterMute,
	            onGainChange: $options.changeMasterGain,
	            onPanChange: $options.changeMasterPan,
	            leftAnalyser: _ctx.leftAnalyser,
	            rightAnalyser: _ctx.rightAnalyser,
	            scriptProcessorNode: _ctx.scriptProcessorNode,
	            showMute: false,
	            isMaster: true,
	            mixerVars: $options.mixerVars
	          }, null, 8, ["defaultPan", "defaultGain", "defaultMuted", "onMuteChange", "onGainChange", "onPanChange", "leftAnalyser", "rightAnalyser", "scriptProcessorNode", "mixerVars"])
	        ]),
	        createVNode(_component_ProgressBar, {
	          recording: _ctx.recording,
	          progressPercent: $options.progressPercent,
	          onPercent: $options.playFromPercent,
	          mixerVars: $options.mixerVars,
	          tracks: _ctx.tracks
	        }, null, 8, ["recording", "progressPercent", "onPercent", "mixerVars", "tracks"]),
	        createBaseVNode("div", _hoisted_4, [
	          createVNode(_component_TimeDisplay, {
	            progressTime: $options.progress,
	            totalTime: _ctx.totalDuration,
	            mixerVars: $options.mixerVars
	          }, null, 8, ["progressTime", "totalTime", "mixerVars"]),
	          createVNode(_component_TransportButtons, {
	            playing: _ctx.playing,
	            onStop: $options.stop,
	            onTogglePlay: $options.togglePlay,
	            mixerVars: $options.mixerVars
	          }, null, 8, ["playing", "onStop", "onTogglePlay", "mixerVars"])
	        ])
	      ], 512),
	      createBaseVNode("div", _hoisted_5, [
	        createBaseVNode("button", {
	          onClick: _cache[0] || (_cache[0] = (...args) => ($options.saveAudioMix && $options.saveAudioMix(...args))),
	          class: normalizeClass(["vue-audio-mixer-download-mix", {'recording':_ctx.recording}])
	        }, "Record and download mix", 2)
	      ])
	    ], 512), [
	      [vShow, !$options.loading]
	    ])
	  ], 6))
	}

	script.render = render;

	function styleInject(css, ref) {
	  if ( ref === void 0 ) ref = {};
	  var insertAt = ref.insertAt;

	  if (!css || typeof document === 'undefined') { return; }

	  var head = document.head || document.getElementsByTagName('head')[0];
	  var style = document.createElement('style');
	  style.type = 'text/css';

	  if (insertAt === 'top') {
	    if (head.firstChild) {
	      head.insertBefore(style, head.firstChild);
	    } else {
	      head.appendChild(style);
	    }
	  } else {
	    head.appendChild(style);
	  }

	  if (style.styleSheet) {
	    style.styleSheet.cssText = css;
	  } else {
	    style.appendChild(document.createTextNode(css));
	  }
	}

	var css_248z = "@import url(\"https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap\");\n@import url(\"https://fonts.googleapis.com/css2?family=Open+Sans&display=swap\");\n.vue-audio-mixer-channel-label {\n  line-height: 0.6rem;\n  font-size: 0.55rem;\n  display: table;\n  padding: 2px;\n  margin-top: 5px;\n  width: 100%;\n  height: 30px;\n  overflow: hidden;\n  clear: both;\n  float: left;\n  color: #FFFFFF;\n  text-align: center;\n  border: none;\n  box-sizing: border-box;\n  overflow: hidden; }\n  .vue-audio-mixer-channel-label label {\n    word-wrap: break-word;\n    display: table-cell;\n    vertical-align: middle;\n    word-break: break-word; }\n\n.logo {\n  position: absolute;\n  top: 10px;\n  left: 5px;\n  right: 5px; }\n  .logo img {\n    width: 100%; }\n\n.vue-audio-mixer-channel-strip {\n  background: transparent !important;\n  background: #16191c;\n  position: relative;\n  overflow: auto;\n  display: block;\n  opacity: 1;\n  display: inline-block; }\n\n.vue-audio-mixer-theme-small .vue-audio-mixer-channel {\n  margin-right: 1px;\n  width: 40px; }\n\n.vue-audio-mixer-theme-medium .vue-audio-mixer-channel {\n  margin-right: 2px;\n  width: 57px; }\n\n.with-panner {\n  margin-top: 40px; }\n\n.vue-audio-mixer-channel {\n  height: 245px;\n  padding: 5px;\n  padding-top: 41px;\n  box-sizing: content-box;\n  position: relative;\n  float: left;\n  display: block; }\n  .vue-audio-mixer-channel:last-child {\n    margin-right: 0px; }\n    .vue-audio-mixer-channel:last-child .vue-audio-mixer-channel-label {\n      background: #000 !important; }\n\n.vue-audio-mixer-channel-slider {\n  right: 17px;\n  top: 40px;\n  display: block;\n  float: left;\n  -ms-transform: rotate(270deg);\n  /* IE 9 */\n  -webkit-transform: rotate(270deg);\n  /* Chrome, Safari, Opera */\n  transform: rotate(270deg);\n  position: absolute;\n  transform-origin: right; }\n\n.vue-audio-mixer-theme-small .vue-audio-mixer-channel-meter-canvas {\n  margin-right: 40px; }\n\n.vue-audio-mixer-theme-medium .vue-audio-mixer-channel-meter-canvas {\n  margin-right: 57px; }\n\n.vue-audio-mixer-channel-meter-canvas {\n  margin-left: 2px;\n  display: block;\n  float: left; }\n\n@keyframes rotate {\n  0% {\n    -webkit-transform: rotate(0deg) scale(1);\n    transform: rotate(0deg) scale(1); }\n  50% {\n    -webkit-transform: rotate(180deg) scale(0.6);\n    transform: rotate(180deg) scale(0.6); }\n  100% {\n    -webkit-transform: rotate(360deg) scale(1);\n    transform: rotate(360deg) scale(1); } }\n\n@-webkit-keyframes ball-scale-ripple {\n  0% {\n    -webkit-transform: scale(0.1);\n    transform: scale(0.1);\n    opacity: 1; }\n  70% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 0.7; }\n  100% {\n    opacity: 0.0; } }\n\n@keyframes ball-scale-ripple {\n  0% {\n    -webkit-transform: scale(0.1);\n    transform: scale(0.1);\n    opacity: 1; }\n  70% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 0.7; }\n  100% {\n    opacity: 0.0; } }\n\n.vue-audio-mixer-loader-inner {\n  position: relative; }\n\n.vue-audio-mixer-loader-inner > div {\n  -webkit-animation-fill-mode: both;\n  animation-fill-mode: both;\n  position: absolute;\n  left: -20px;\n  top: -20px;\n  border: 2px solid #1d7a9c;\n  border-bottom-color: transparent;\n  border-top-color: transparent;\n  border-radius: 100%;\n  height: 35px;\n  width: 35px;\n  -webkit-animation: rotate 1s 0s ease-in-out infinite;\n  animation: rotate 1s 0s ease-in-out infinite; }\n\n.vue-audio-mixer-loader-inner > div:last-child {\n  display: inline-block;\n  top: -10px;\n  left: -10px;\n  width: 15px;\n  height: 15px;\n  -webkit-animation-duration: 0.5s;\n  animation-duration: 0.5s;\n  border-color: #00a7cc transparent #00a7cc transparent;\n  -webkit-animation-direction: reverse;\n  animation-direction: reverse; }\n\n.vue-audio-mixer-loader {\n  width: 100%;\n  height: 100px;\n  position: relative; }\n\n.vue-audio-mixer-loader-inner {\n  margin: 0 auto;\n  width: 1px; }\n\n.vue-audio-mixer-loader-text {\n  color: #1d7a9c;\n  text-align: center;\n  width: 100%;\n  font-size: 0.7em;\n  position: relative;\n  top: 50%; }\n\n.vue-audio-mixer {\n  display: inline-block;\n  min-width: 105px;\n  overflow: auto;\n  margin: 0 auto;\n  font-family: 'Open Sans', sans-serif;\n  text-align: center; }\n  .vue-audio-mixer * {\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n    /* Disable selection/copy in UIWebView */ }\n\n.vue-audio-mixer-error {\n  color: red;\n  background-color: white; }\n\n.vue-audio-mixer-loading-hider {\n  display: inline-block; }\n\n#vue-audio-mixer-waveform {\n  width: 100% !important;\n  display: block; }\n\n.vue-audio-mixer-download-mix {\n  cursor: pointer;\n  background-color: #bf1111;\n  border-radius: 5px;\n  color: white;\n  padding: 5px;\n  margin: 5px;\n  outline: 0 !important; }\n  .vue-audio-mixer-download-mix.recording {\n    background-color: #fc9595;\n    animation: anim-glow 2s ease infinite;\n    -webkit-animation: anim-glow 2s ease infinite;\n    -moz-animation: anim-glow 2s ease infinite; }\n\n@keyframes anim-glow {\n  0% {\n    box-shadow: 0 0 #bf1111; }\n  100% {\n    box-shadow: 0 0 10px 8px transparent;\n    border-width: 2px; } }\n\n* {\n  box-sizing: content-box; }\n\n.vue-audio-mixer-channel-mute-button, .vue-audio-mixer-channel-solo-button {\n  position: absolute;\n  left: 2px;\n  top: 5px;\n  cursor: pointer; }\n\n.vue-audio-mixer-theme-small .vue-audio-mixer-channel-solo-button {\n  left: 25px; }\n\n.vue-audio-mixer-theme-medium .vue-audio-mixer-channel-solo-button {\n  left: 35px; }\n\n.vue-audio-mixer-channel-mute-button-label, .vue-audio-mixer-channel-solo-button-label {\n  width: 18px;\n  text-align: center;\n  cursor: pointer; }\n\n.vue-audio-mixer-channel-mute-button label input, .vue-audio-mixer-channel-solo-button label input {\n  display: none; }\n\n.vue-audio-mixer-channel-mute-button, .vue-audio-mixer-channel-solo-button {\n  margin: 4px;\n  background-color: #666B73;\n  border-radius: 4px;\n  border: 1px solid #000;\n  overflow: auto;\n  float: left;\n  box-sizing: content-box; }\n\n.vue-audio-mixer-channel-mute-button label, .vue-audio-mixer-channel-solo-button label {\n  float: left;\n  margin-bottom: 0;\n  box-sizing: content-box; }\n\n.vue-audio-mixer-theme-small .vue-audio-mixer-channel-mute-button label span, .vue-audio-mixer-theme-small .vue-audio-mixer-channel-solo-button label span {\n  width: 8px;\n  font-size: 7px; }\n\n.vue-audio-mixer-theme-medium .vue-audio-mixer-channel-mute-button label span, .vue-audio-mixer-theme-medium .vue-audio-mixer-channel-solo-button label span {\n  width: 14px;\n  font-size: 12px; }\n\n.vue-audio-mixer-channel-mute-button label span, .vue-audio-mixer-channel-solo-button label span {\n  text-align: center;\n  padding: 3px;\n  width: 8px;\n  display: block;\n  border-radius: 4px;\n  box-sizing: content-box; }\n\n.vue-audio-mixer-channel-mute-button label input, .vue-audio-mixer-channel-solo-button label input {\n  position: absolute;\n  top: -20px; }\n\n.vue-audio-mixer-channel-mute-button input:hover + span, .vue-audio-mixer-channel-solo-button input:hover + span {\n  opacity: 0.8; }\n\n.vue-audio-mixer-channel-mute-button input:checked + span {\n  background-color: #911;\n  color: #FFF; }\n\n.vue-audio-mixer-channel-solo-button input:checked + span {\n  background-color: #1cdd20;\n  color: #FFF; }\n\n.vue-audio-mixer-channel-mute-button input:checked:hover + span, .vue-audio-mixer-channel-solo-button input:checked:hover + span {\n  opacity: 0.8;\n  color: #FFF; }\n\n.vue-audio-mixer-channel-panner-container {\n  top: -37px;\n  left: 0;\n  position: absolute;\n  width: 100%;\n  padding-left: 12px;\n  box-sizing: border-box; }\n\n.vue-audio-mixer-theme-small .vue-audio-mixer-channel-panner-container {\n  top: -27px; }\n  .vue-audio-mixer-theme-small .vue-audio-mixer-channel-panner-container .knob-control__text-display {\n    font-size: 1.5rem; }\n\n.vue-audio-mixer-channel-panner {\n  width: 19px;\n  height: 10px;\n  margin-top: 2px;\n  border: 0px;\n  background: none;\n  font: bold 7px Arial;\n  text-align: center;\n  color: white;\n  padding: 0px;\n  -webkit-appearance: none;\n  cursor: pointer; }\n\n.vue-audio-mixer-fader-thumb {\n  touch-action: none; }\n\n.vue-audio-mixer-slider {\n  height: 210px;\n  position: absolute;\n  width: 50%;\n  right: 0px; }\n\n.vue-audio-mixer-fader-slider-row, .vue-audio-mixer-fader-slider-row-right {\n  position: absolute;\n  width: 100%;\n  background: black;\n  height: 1px;\n  width: 4px;\n  left: 50%;\n  margin-left: -10px; }\n\n.vue-audio-mixer-fader-slider-row-right {\n  margin-left: 4px; }\n\n.vue-audio-mixer-fader-slider-track {\n  position: absolute;\n  height: 90%;\n  background: black;\n  width: 2px;\n  margin-left: -2px;\n  left: 50%;\n  margin-top: 1rem; }\n\n.vue-audio-mixer-fader-thumb {\n  position: absolute;\n  z-index: 1;\n  border: none;\n  height: 3rem;\n  width: 1.5rem;\n  left: 50%;\n  margin-left: -0.75rem;\n  margin-top: -2rem;\n  border-radius: 0px;\n  cursor: move;\n  user-select: none;\n  background: repeating-linear-gradient(0deg, transparent, transparent 5px, black 6px), linear-gradient(0deg, #464646 0%, #5a5a5a 14%, #141414 15%, #141414 50%, #5a5a5a 84%, #141414 85%, #1e1e1e 100%);\n  box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.5); }\n  .vue-audio-mixer-fader-thumb:after {\n    content: '';\n    position: absolute;\n    top: 50%;\n    left: 0;\n    right: 0;\n    margin-top: -1px;\n    height: 3px;\n    background: rgba(255, 255, 255, 0.75); }\n\n.slider_value {\n  position: absolute;\n  right: 10px;\n  top: 37px;\n  font-size: 10px; }\n\n.waveform {\n  width: 100%; }\n\n.vue-audio-mixer-progress-bar {\n  margin-top: 1px;\n  background: #4c4c4c;\n  position: relative;\n  display: block;\n  clear: both;\n  overflow: auto;\n  cursor: pointer; }\n\n.vue-audio-mixer-progress-cursor {\n  width: 1px;\n  height: 100%;\n  background: #b6c8e1;\n  position: absolute;\n  left: 0;\n  top: 0; }\n\n.time_and_transport {\n  position: relative;\n  width: 100%;\n  background: #000; }\n\n.vue-audio-mixer-transport {\n  overflow: auto;\n  clear: both;\n  display: block;\n  text-align: right;\n  width: 150px;\n  height: 30px;\n  overflow: hidden;\n  position: relative;\n  margin: 0 auto 0 auto;\n  position: absolute;\n  top: 2px;\n  padding-left: 10px; }\n\n.vue-audio-mixer-theme-tracks-1 .vue-audio-mixer-progress-time, .vue-audio-mixer-theme-tracks-2 .vue-audio-mixer-progress-time, .vue-audio-mixer-theme-tracks-3.vue-audio-mixer-theme-small .vue-audio-mixer-progress-time, .vue-audio-mixer-theme-tracks-4.vue-audio-mixer-theme-small .vue-audio-mixer-progress-time {\n  width: 100%;\n  text-align: right !important; }\n\n.vue-audio-mixer-theme-tracks-1 .vue-audio-mixer-timer, .vue-audio-mixer-theme-tracks-2 .vue-audio-mixer-timer {\n  font-size: 0.7em; }\n  .vue-audio-mixer-theme-tracks-1 .vue-audio-mixer-timer .vue-audio-mixer-timer-number, .vue-audio-mixer-theme-tracks-2 .vue-audio-mixer-timer .vue-audio-mixer-timer-number {\n    width: 13px; }\n\n.vue-audio-mixer-theme-tracks-3 .vue-audio-mixer-show-total-time {\n  font-size: 0.7em; }\n  .vue-audio-mixer-theme-tracks-3 .vue-audio-mixer-show-total-time .vue-audio-mixer-timer-number {\n    width: 13px; }\n\n.vue-audio-mixer-timer {\n  font-family: \"Share Tech Mono\";\n  color: #fff;\n  font-size: 1em;\n  padding: 10px;\n  overflow: auto;\n  position: relative;\n  display: block;\n  clear: both;\n  background: #000;\n  text-align: right;\n  margin: 0px; }\n  .vue-audio-mixer-timer span {\n    display: inline-block;\n    text-align: left; }\n    .vue-audio-mixer-timer span .vue-audio-mixer-timer-number {\n      width: 18px; }\n  .vue-audio-mixer-timer .vue-audio-mixer-progress-time {\n    width: 100%;\n    text-align: center; }\n\nbutton {\n  border: none;\n  padding: 0;\n  background: transparent; }\n\n.vue-audio-mixer-transport-play-button {\n  cursor: pointer;\n  display: block;\n  width: 0;\n  float: left;\n  height: 0;\n  border-top: 8px solid transparent;\n  border-bottom: 8px solid transparent;\n  border-left: 9.6px solid #d5d5d5;\n  margin: 8px auto 30px auto;\n  position: relative;\n  z-index: 1;\n  transition: all 0.1s;\n  -webkit-transition: all 0.1s;\n  -moz-transition: all 0.1s;\n  left: 48px;\n  position: relative; }\n  .vue-audio-mixer-transport-play-button:focus, .vue-audio-mixer-transport-play-button:active {\n    outline: none; }\n  .vue-audio-mixer-transport-play-button:before {\n    content: '';\n    position: absolute;\n    top: -12px;\n    left: -18.4px;\n    bottom: -12px;\n    right: -5.6px;\n    border-radius: 50%;\n    border: 2px solid #d5d5d5;\n    z-index: -1;\n    transition: all 0.1s;\n    -webkit-transition: all 0.1s;\n    -moz-transition: all 0.1s; }\n  .vue-audio-mixer-transport-play-button:after {\n    content: '';\n    opacity: 0;\n    transition: opacity 0.2s;\n    -webkit-transition: opacity 0.2s;\n    -moz-transition: opacity 0.2s;\n    z-index: 2; }\n  .vue-audio-mixer-transport-play-button:hover:before, .vue-audio-mixer-transport-play-button:focus:before {\n    transform: scale(1.1);\n    -webkit-transform: scale(1.1);\n    -moz-transform: scale(1.1); }\n  .vue-audio-mixer-transport-play-button.vue-audio-mixer-transport-play-button-active {\n    border-color: transparent; }\n    .vue-audio-mixer-transport-play-button.vue-audio-mixer-transport-play-button-active span:nth-child(1), .vue-audio-mixer-transport-play-button.vue-audio-mixer-transport-play-button-active span:nth-child(2) {\n      content: '';\n      opacity: 1;\n      width: 1.14286px;\n      height: 12.8px;\n      background: #d5d5d5;\n      position: absolute;\n      right: 0.8px;\n      top: -6.4px;\n      border-left: 3.2px solid #d5d5d5; }\n    .vue-audio-mixer-transport-play-button.vue-audio-mixer-transport-play-button-active span:nth-child(1) {\n      right: 0.8px; }\n    .vue-audio-mixer-transport-play-button.vue-audio-mixer-transport-play-button-active span:nth-child(2) {\n      right: 7.2px; }\n\n.vue-audio-mixer-transport-start-button {\n  outline: none;\n  display: block;\n  float: left;\n  margin-left: 5px;\n  width: 0;\n  height: 0;\n  border-top: 8px solid transparent;\n  border-bottom: 8px solid transparent;\n  border-right: 9.6px solid #d5d5d5;\n  margin: 8px auto 8px auto;\n  position: relative;\n  z-index: 1;\n  cursor: pointer;\n  transition: all 0.1s;\n  -webkit-transition: all 0.1s;\n  -moz-transition: all 0.1s; }\n  .vue-audio-mixer-transport-start-button:before {\n    content: '';\n    position: absolute;\n    top: -12px;\n    left: -7.2px;\n    bottom: -12px;\n    right: -16.8px;\n    border-radius: 50%;\n    border: 2px solid #d5d5d5;\n    z-index: 2;\n    transition: all 0.1s;\n    -webkit-transition: all 0.1s;\n    -moz-transition: all 0.1s; }\n  .vue-audio-mixer-transport-start-button:after {\n    content: \"\";\n    display: block;\n    position: absolute;\n    width: 2px;\n    height: 10px;\n    background: #d5d5d5;\n    margin-top: -5px;\n    margin-left: -2px; }\n  .vue-audio-mixer-transport-start-button:hover:before, .vue-audio-mixer-transport-start-button:focus:before {\n    transform: scale(1.1);\n    -webkit-transform: scale(1.1);\n    -moz-transform: scale(1.1); }\n\n.vue-audio-mixer-transport-record-button {\n  display: block;\n  width: 0;\n  float: left;\n  height: 0;\n  border: 4px solid #d5d5d5;\n  border-radius: 75%;\n  margin: 50px auto 30px auto;\n  position: relative;\n  z-index: 1;\n  transition: all 0.1s;\n  -webkit-transition: all 0.1s;\n  -moz-transition: all 0.1s;\n  left: 125px; }\n  .vue-audio-mixer-transport-record-button:before {\n    content: '';\n    position: absolute;\n    top: -12px;\n    left: -30px;\n    bottom: -12px;\n    right: -30px;\n    border-radius: 50%;\n    border: 2px solid #d5d5d5;\n    z-index: 2;\n    transition: all 0.1s;\n    -webkit-transition: all 0.1s;\n    -moz-transition: all 0.1s; }\n  .vue-audio-mixer-transport-record-button:after {\n    content: '';\n    opacity: 0;\n    transition: opacity 0.2s;\n    -webkit-transition: opacity 0.2s;\n    -moz-transition: opacity 0.2s; }\n  .vue-audio-mixer-transport-record-button:hover:before, .vue-audio-mixer-transport-record-button:focus:before {\n    transform: scale(1.1);\n    -webkit-transform: scale(1.1);\n    -moz-transform: scale(1.1); }\n  .vue-audio-mixer-transport-record-button.vue-audio-mixer-transport-record-button-active {\n    border-color: red; }\n\n.vue-audio-mixer-theme-default .slider_value {\n  color: #000; }\n\n.vue-audio-mixer-theme-dark .slider_value {\n  color: #C0C0C0; }\n\n.vue-audio-mixer-theme-default .vue-audio-mixer-channel-label {\n  background: #4ba7b7; }\n\n.vue-audio-mixer-theme-dark .vue-audio-mixer-channel-label {\n  background: #27547B; }\n\n.vue-audio-mixer-theme-default .vue-audio-mixer-channel {\n  background: rgba(41, 44, 48, 0.2); }\n\n.vue-audio-mixer-theme-dark .vue-audio-mixer-channel {\n  background: #282D30; }\n\n.vue-audio-mixer-theme-default .vue-audio-mixer-channel-panner-container {\n  background: rgba(41, 44, 48, 0.2); }\n\n.vue-audio-mixer-theme-dark .vue-audio-mixer-channel-panner-container {\n  background: #282D30; }\n\n.vue-audio-mixer-theme-default .vue-audio-mixer-channel:last-child {\n  background: #4ba7b7; }\n\n.vue-audio-mixer-theme-dark .vue-audio-mixer-channel:last-child {\n  background: #383F44; }\n\n.vue-audio-mixer-theme-default .vue-audio-mixer-channel-panner-container.vue-audio-mixer-is-master {\n  background: #4ba7b7; }\n\n.vue-audio-mixer-theme-dark .vue-audio-mixer-channel-panner-container.vue-audio-mixer-is-master {\n  background: #383F44; }\n";
	styleInject(css_248z);

	// Import vue component

	function install(Vue) {
	  if (install.installed) return;
	  install.installed = true;
	  Vue.component('vue-audio-mixer', script);
	} // Create module definition for Vue.use()

	const plugin = {
	  install
	};

	let GlobalVue = null;

	if (typeof window !== 'undefined') {
	  GlobalVue = window.Vue;
	} else if (typeof global !== 'undefined') {
	  GlobalVue = global.Vue;
	}

	if (GlobalVue) {
	  GlobalVue.use(plugin);
	} // To allow use as module (npm/webpack/etc.) export component

	exports["default"] = script;
	exports.install = install;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
