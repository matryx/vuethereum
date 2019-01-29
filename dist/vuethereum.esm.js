import blockies from 'blockies';
import ethers from 'ethers';
import Web3 from 'web3';

var NAME = "vth-blockie";

var script = {
  name: NAME,

  functional: true,

  props: {
    string: {
      type: String,
      required: true
    },
    options: {
      type: Object
    }
  },

  render: function render(create, ref) {
    var props = ref.props;
    var data = ref.data;

    var avatar = blockies(Object.assign({}, props.options,
      {seed: props.string}));

    return create("img", {
      class: [NAME, data.staticClass],
      attrs: Object.assign({}, data.attrs,
        {src: avatar.toDataURL(),
        alt: data.attrs.alt || props.string})
    })
  }
};

function normalizeComponent(compiledTemplate, injectStyle, defaultExport, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, isShadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof isShadowMode === 'function') {
        createInjectorSSR = createInjector;
        createInjector = isShadowMode;
        isShadowMode = false;
    }
    // Vue.extend constructor export interop
    var options = typeof defaultExport === 'function' ? defaultExport.options : defaultExport;
    // render functions
    if (compiledTemplate && compiledTemplate.render) {
        options.render = compiledTemplate.render;
        options.staticRenderFns = compiledTemplate.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (injectStyle) {
                injectStyle.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (injectStyle) {
        hook = isShadowMode
            ? function () {
                injectStyle.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
            }
            : function (context) {
                injectStyle.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return defaultExport;
}

/* script */
var __vue_script__ = script;
// For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
script.__file = "/home/austin/nanome/vuethereum/src/components/blockie/Blockie.vue";

/* template */

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = undefined;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Blockie = normalizeComponent(
    {},
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

var script$1 = {
  name: "vth-contract",

  props: {
    address: {
      type: String,
      required: true
    },
    abi: {
      type: Array,
      required: true
    }
  },

  data: function () { return ({
    contract: null
  }); },

  mounted: function mounted() {
    var provider = window.web3.currentProvider;
    var signer = new ethers.providers.Web3Provider(provider).getSigner();
    this.contract = new ethers.Contract(this.address, this.abi, signer);
  },

  render: function render(create) {
    if (!this.$scopedSlots.default) {
      return create(false)
    }
    var children = this.$scopedSlots.default(Object.assign({}, this.contract));
    if (children.length) {
      // Can only return 1 root node
      return create("div", [children])
    }
    return children
  }
};

/* script */
var __vue_script__$1 = script$1;
// For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
script$1.__file = "/home/austin/nanome/vuethereum/src/components/Contract.vue";

/* template */

  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = undefined;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Contract = normalizeComponent(
    {},
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

var script$2 = {
  name: "vth-status",

  // TODO: Props?
  // config={{
  //   DEBUG:false,
  //   requiredNetwork:['Unknown','Rinkeby'],
  //   hide:false
  // }}
  // metatx={METATX}
  // fallbackWeb3Provider={new Web3.providers.HttpProvider(WEB3_PROVIDER)}
  // onUpdate={(state)=>{
  //  console.log("metamask state update:",state)
  //  if(state.web3Provider) {
  //    state.web3 = new Web3(state.web3Provider)
  //    this.setState(state)
  //  }
  // }}

  data: function () { return ({
    loading: false,
    available: false,
    enabled: false,
    account: null,
    networkVersion: null
  }); },

  methods: {
    getWeb3: function getWeb3() {
      var this$1 = this;

      this.available = true;

      var web3 = new Web3(window.ethereum);
      window.web3 = web3;

      var getNetwork = new Promise(function (resolve, reject) {
        web3.version.getNetwork(function (err, networkVersion) {
          if (err) {
            return reject(err)
          }
          resolve(networkVersion);
        });
      });
      var getAccounts = window.ethereum.enable();

      this.loading = true;
      return Promise.all([getAccounts, getNetwork])
        .then(function (results) {
          var accounts = results[0];
          var networkVersion = results[1];
          this$1.account = accounts[0];
          this$1.networkVersion = networkVersion;
          this$1.enabled = true;
          this$1.loading = false;
          this$1.update();
        })
        .catch(function (error) {
          this$1.enabled = false;
          this$1.account = null;
          this$1.networkVersion = null;
          this$1.loading = false;
          this$1.update();
        })
    },

    update: function update() {
      this.$emit("update", {
        available: this.available,
        enabled: this.enabled,
        account: this.account,
        networkVersion: this.networkVersion
      });
    }
  },

  mounted: function mounted() {
    var this$1 = this;

    if (typeof window.ethereum === "undefined") {
      return
    }
    this.getWeb3().then(function () {
      window.web3.currentProvider.publicConfigStore.on("update", function (config) {
        this$1.account = config.selectedAddress;
        this$1.networkVersion = config.networkVersion;
        this$1.update();
      });
    });
  },

  render: function render(create) {
    var children = this.$scopedSlots.default({
      loading: this.loading,
      available: this.available,
      enabled: this.enabled,
      account: this.account,
      networkVersion: this.networkVersion,
      getWeb3: this.getWeb3
    });
    if (children.length) {
      return create("div", [children])
    }
    return children
  }
};

/* script */
var __vue_script__$2 = script$2;
// For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
script$2.__file = "/home/austin/nanome/vuethereum/src/components/Status.vue";

/* template */

  /* style */
  var __vue_inject_styles__$2 = undefined;
  /* scoped */
  var __vue_scope_id__$2 = undefined;
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = undefined;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Status = normalizeComponent(
    {},
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    undefined,
    undefined
  );

/**
 * Function that accepts a Tx receipt and returns a promise for the successfully mined block associated to the receipt
 *
 * @param {String|Object} txReceipt
 * @param {Number} interval
 * @param {Number} timeout
 *
 * @returns {Promise} A promise which resolves to the succesfully mined block
 */
var defaults = {
  interval: 1000, // 1sec
  timeout: null
};
var getMinedTx = function(txReceipt, options) {
  var ref = Object.assign(defaults, options);
  var interval = ref.interval;
  var timeout = ref.timeout;

  if (typeof txReceipt === "object") {
    txReceipt = txReceipt.hash;
  }

  return new Promise(function (resolve, reject) {
    var timedOutId;
    if (timeout > 0) {
      timedOutId = setTimeout(
        reject,
        timeout,
        new Error("Timed out before transaction was found. Are you on the correct network?")
      );
    }

    function checkTx() {
      window.web3.eth.getTransactionReceipt(txReceipt, function (err, res) {
        if (err) {
          timedOutId && clearTimeout(timedOutId);
          reject(err);
        } else if (res && res.blockNumber) {
          timedOutId && clearTimeout(timedOutId);
          resolve(res);
        } else {
          setTimeout(checkTx, interval);
        }
      });
    }
    checkTx();
  })
};

var script$3 = {
  name: "vth-tx",

  props: {
    tx: {
      type: [String, Object],
      required: true
    },
    interval: {
      type: [String, Number]
    },
    timeout: {
      type: [String, Number]
    }
  },
  model: {
    prop: "tx",
    event: "mined"
  },

  data: function () { return ({
    pending: true,
    error: null,
    localTx: null
  }); },

  methods: {
    getMinedTx: function getMinedTx$1(txReceipt) {
      var this$1 = this;

      txReceipt = txReceipt || this.localTx;
      var options = {
        interval: +this.interval,
        timeout: +this.timeout
      };
      this.pending = true;
      getMinedTx(txReceipt, options)
        .then(function (tx) {
          this$1.localTx = tx;
          this$1.$emit("mined", this$1.localTx);
          this$1.pending = false;
        })
        .catch(function (error) {
          this$1.error = error;
          this$1.$emit("error", error);
          this$1.pending = false;
        });
    }
  },

  watch: {
    tx: {
      immediate: true,
      deep: true,
      handler: function handler(nextTx) {
        var this$1 = this;

        if (typeof nextTx === "object") {
          this.localTx = nextTx;
        } else {
          window.web3.eth.getTransactionReceipt(nextTx, function (error, tx) {
            if (error) {
              this$1.error = error;
            } else if (tx && tx.blockNumber) {
              this$1.localTx = tx;
            }
          });
        }
        this.getMinedTx(nextTx);
      }
    }
  },

  render: function render(create) {
    if (!this.$scopedSlots.default) {
      return create(false)
    }
    var children = this.$scopedSlots.default({
      pending: this.pending,
      tx: this.localTx,
      error: this.error,
      getMinedTx: this.getMinedTx
    });
    if (children.length) {
      return create("div", [children])
    }
    return children
  }
};

/* script */
var __vue_script__$3 = script$3;
// For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
script$3.__file = "/home/austin/nanome/vuethereum/src/components/Tx.vue";

/* template */

  /* style */
  var __vue_inject_styles__$3 = undefined;
  /* scoped */
  var __vue_scope_id__$3 = undefined;
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = undefined;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Tx = normalizeComponent(
    {},
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    undefined,
    undefined
  );



var components = /*#__PURE__*/Object.freeze({
  VthBlockie: Blockie,
  VthContract: Contract,
  VthStatus: Status,
  VthTx: Tx
});

// Import vue components

// install function executed by Vue.use()
function install(Vue) {
  if (install.installed) { return }
  install.installed = true;
  Object.keys(components).forEach(function (key) {
    Vue.component(components[key].name, components[key]);
  });
}

// Create module definition for Vue.use()
var plugin = {
  install: install
};

// To auto-install when vue is found
/* global window global */
var GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default plugin;
export { Blockie as VthBlockie, Contract as VthContract, Status as VthStatus, Tx as VthTx };
