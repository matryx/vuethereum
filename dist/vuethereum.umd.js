(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('web3')) :
  typeof define === 'function' && define.amd ? define(['exports', 'web3'], factory) :
  (global = global || self, factory(global.Vuetensils = {}, global.Web3));
}(this, function (exports, Web3) { 'use strict';

  Web3 = Web3 && Web3.hasOwnProperty('default') ? Web3['default'] : Web3;

  var script = {
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
        Promise.all([getAccounts, getNetwork])
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
          });
      },

      update: function update() {
        this.$emit("update", {
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
        console.warn("[Web3Provider] Requires 1 root element. Using injected <div>.");
        return create("div", [children])
      }
      return children
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
  script.__file = "/home/austin/nanome/vuethereum/src/components/Web3Provider.vue";

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
    

    
    var Web3Provider = normalizeComponent(
      {},
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      undefined,
      undefined
    );



  var components = /*#__PURE__*/Object.freeze({
    Web3Provider: Web3Provider
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

  exports.default = plugin;
  exports.Web3Provider = Web3Provider;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
