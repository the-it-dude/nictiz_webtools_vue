(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7052cb80"],{"0393":function(e,t,n){"use strict";n("0481"),n("4069");var a=n("5530"),i=(n("210b"),n("604c")),s=n("d9bd");t["a"]=i["a"].extend({name:"v-expansion-panels",provide:function(){return{expansionPanels:this}},props:{accordion:Boolean,disabled:Boolean,flat:Boolean,hover:Boolean,focusable:Boolean,inset:Boolean,popout:Boolean,readonly:Boolean,tile:Boolean},computed:{classes:function(){return Object(a["a"])(Object(a["a"])({},i["a"].options.computed.classes.call(this)),{},{"v-expansion-panels":!0,"v-expansion-panels--accordion":this.accordion,"v-expansion-panels--flat":this.flat,"v-expansion-panels--hover":this.hover,"v-expansion-panels--focusable":this.focusable,"v-expansion-panels--inset":this.inset,"v-expansion-panels--popout":this.popout,"v-expansion-panels--tile":this.tile})}},created:function(){this.$attrs.hasOwnProperty("expand")&&Object(s["a"])("expand","multiple",this),Array.isArray(this.value)&&this.value.length>0&&"boolean"===typeof this.value[0]&&Object(s["a"])(':value="[true, false, true]"',':value="[0, 2]"',this)},methods:{updateItem:function(e,t){var n=this.getValue(e,t),a=this.getValue(e,t+1);e.isActive=this.toggleMethod(n),e.nextIsActive=this.toggleMethod(a)}}})},"210b":function(e,t,n){},"49e2":function(e,t,n){"use strict";var a=n("0789"),i=n("9d65"),s=n("a9ad"),o=n("3206"),r=n("80d2"),l=n("58df"),c=Object(l["a"])(i["a"],s["a"],Object(o["a"])("expansionPanel","v-expansion-panel-content","v-expansion-panel"));t["a"]=c.extend().extend({name:"v-expansion-panel-content",computed:{isActive:function(){return this.expansionPanel.isActive}},created:function(){this.expansionPanel.registerContent(this)},beforeDestroy:function(){this.expansionPanel.unregisterContent()},render:function(e){var t=this;return e(a["a"],this.showLazyContent((function(){return[e("div",t.setBackgroundColor(t.color,{staticClass:"v-expansion-panel-content",directives:[{name:"show",value:t.isActive}]}),[e("div",{class:"v-expansion-panel-content__wrap"},Object(r["t"])(t))])]})))}})},5311:function(e,t,n){"use strict";var a=n("5607"),i=n("2b0e");t["a"]=i["a"].extend({name:"rippleable",directives:{ripple:a["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(e.staticClass="v-input--selection-controls__ripple",e.directives=e.directives||[],e.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",e)):null}}})},"6ca7":function(e,t,n){},ac7c:function(e,t,n){"use strict";n("d3b7"),n("25f0");var a=n("5530"),i=(n("6ca7"),n("ec29"),n("9d26")),s=n("c37a"),o=n("fe09");t["a"]=o["a"].extend({name:"v-checkbox",props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$checkboxIndeterminate"},offIcon:{type:String,default:"$checkboxOff"},onIcon:{type:String,default:"$checkboxOn"}},data:function(){return{inputIndeterminate:this.indeterminate}},computed:{classes:function(){return Object(a["a"])(Object(a["a"])({},s["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls":!0,"v-input--checkbox":!0,"v-input--indeterminate":this.inputIndeterminate})},computedIcon:function(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon},validationState:function(){if(!this.isDisabled||this.inputIndeterminate)return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0}},watch:{indeterminate:function(e){var t=this;this.$nextTick((function(){return t.inputIndeterminate=e}))},inputIndeterminate:function(e){this.$emit("update:indeterminate",e)},isActive:function(){this.indeterminate&&(this.inputIndeterminate=!1)}},methods:{genCheckbox:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(i["a"],this.setTextColor(this.validationState,{props:{dense:this.dense,dark:this.dark,light:this.light}}),this.computedIcon),this.genInput("checkbox",Object(a["a"])(Object(a["a"])({},this.attrs$),{},{"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()})),this.genRipple(this.setTextColor(this.rippleState))])},genDefaultSlot:function(){return[this.genCheckbox(),this.genLabel()]}}})},b0afa:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.user.groups.includes("termspace | termspace progress")?n("div",{attrs:{id:"app"}},[n("h1",[e._v("Dashboard voortgang Termspace")]),n("v-divider"),n("v-container",{attrs:{fluid:""}},[n("v-row",[n("v-col",{staticClass:"col-12"},[n("Graph",{attrs:{title:"Voortgang per status"}})],1)],1),n("v-row",[n("v-col",{staticClass:"col-12"},[n("Table")],1)],1),n("v-row",[n("v-col",{staticClass:"col-12"},[n("GraphUser",{attrs:{title:"Taken per gebruiker per status"}})],1)],1)],1)],1):e._e()},i=[],s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-container",[n("v-card",[n("v-subheader",[e._v(e._s(e.title))]),n("v-card-text",[n("apexchart",{attrs:{type:"line",height:"400",options:e.options,series:e.seriesFiltered}}),n("v-expansion-panels",[n("v-expansion-panel",[n("v-expansion-panel-header",[e._v("Selectie")]),n("v-expansion-panel-content",e._l(e.chartSeries,(function(t){return n("v-checkbox",{key:t.name,attrs:{dense:"",label:t.name,value:t.name},model:{value:e.selection,callback:function(t){e.selection=t},expression:"selection"}})})),1)],1)],1)],1)],1)],1)],1)},o=[],r=(n("4de4"),n("caad"),n("b0c0"),n("2532"),{components:{},props:["title"],data:function(){return{selection:["Semantic review / Problem, _2019/2021, volkert","Medical review, _2019, volkert","incomplete CAT, _2019, volkert"]}},methods:{},computed:{seriesFiltered:function(){var e=this,t=this.chartSeries.filter((function(t){return e.selection.includes(t.name)}));return t},chartSeries:function(){return this.$store.state.TermspaceProgress.ProgressPerStatus_graph.series},options:function(){return{theme:{palette:"palette2"},chart:{id:"vuechart-example",dropShadow:{enabled:!0,color:"#000",top:18,left:7,blur:10,opacity:.2}},dataLabels:{enabled:!0},stroke:{curve:"smooth"},legend:{position:"right",horizontalAlign:"center",floating:!1,offsetY:0,offsetX:0},grid:{borderColor:"#e7e7e7",row:{colors:["#f3f3f3","transparent"],opacity:.5}},xaxis:{categories:this.$store.state.TermspaceProgress.ProgressPerStatus_graph.categories}}}},created:function(){}}),l=r,c=n("2877"),u=n("6544"),p=n.n(u),h=n("b0af"),d=n("99d9"),v=n("ac7c"),f=n("a523"),m=n("cd55"),b=n("49e2"),x=n("c865"),g=n("0393"),k=n("e0c7"),C=Object(c["a"])(l,s,o,!1,null,null,null),P=C.exports;p()(C,{VCard:h["a"],VCardText:d["b"],VCheckbox:v["a"],VContainer:f["a"],VExpansionPanel:m["a"],VExpansionPanelContent:b["a"],VExpansionPanelHeader:x["a"],VExpansionPanels:g["a"],VSubheader:k["a"]});var V=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-container",[n("v-card",[n("v-subheader",[e._v("Voortgang per status")]),n("v-card-text",[n("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.results,"sort-by":"date","sort-desc":!0,"items-per-page":5}})],1)],1)],1)],1)},y=[],A={components:{},data:function(){return{loading:!1,headers:[{text:"Datum",value:"date"},{text:"Semantisch / Probleem",value:"SemanticProblem2019volkert"},{text:"Medisch",value:"Medical2019volkert"},{text:"CAT incompleet",value:"incompleteCAT2019volkert"},{text:"Alle taken",value:"allTasks"},{text:"Open taken",value:"OpenTasks"}]}},methods:{},computed:{results:function(){return this.$store.state.TermspaceProgress.ProgressPerStatus_table}},created:function(){}},S=A,O=n("8fea"),_=Object(c["a"])(S,V,y,!1,null,null,null),$=_.exports;p()(_,{VCard:h["a"],VCardText:d["b"],VContainer:f["a"],VDataTable:O["a"],VSubheader:k["a"]});var w=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-container",[n("v-card",[n("v-subheader",[e._v(e._s(e.title))]),n("v-card-text",[n("apexchart",{attrs:{type:"line",height:"400",options:e.options,series:e.seriesFiltered}}),n("v-expansion-panels",[n("v-expansion-panel",[n("v-expansion-panel-header",[e._v("Selectie")]),n("v-expansion-panel-content",e._l(e.chartSeries,(function(t){return n("v-checkbox",{key:t.name,attrs:{dense:"",label:t.name,value:t.name},model:{value:e.selection,callback:function(t){e.selection=t},expression:"selection"}})})),1)],1)],1)],1)],1)],1)],1)},I=[],j={components:{},props:["title"],data:function(){return{selection:["e.degroot total open","h.groot total open","dijkstra total open","krul total open","mertens total open","soons total open","paiman total open","hielkema total open","timmer total open","krul total open"]}},methods:{},computed:{seriesFiltered:function(){var e=this,t=this.chartSeries.filter((function(t){return e.selection.includes(t.name)}));return t},options:function(){return{theme:{palette:"palette2"},chart:{id:"vuechart-example",dropShadow:{enabled:!0,color:"#000",top:18,left:7,blur:10,opacity:.2}},dataLabels:{enabled:!0},stroke:{curve:"smooth"},legend:{position:"right",horizontalAlign:"center",floating:!1,offsetY:0,offsetX:0},grid:{borderColor:"#e7e7e7",row:{colors:["#f3f3f3","transparent"],opacity:.5}},xaxis:{categories:this.$store.state.TermspaceProgress.ProgressPerUser.categories}}},chartSeries:function(){return this.$store.state.TermspaceProgress.ProgressPerUser.series}},created:function(){}},T=j,B=Object(c["a"])(T,w,I,!1,null,null,null),D=B.exports;p()(B,{VCard:h["a"],VCardText:d["b"],VCheckbox:v["a"],VContainer:f["a"],VExpansionPanel:m["a"],VExpansionPanelContent:b["a"],VExpansionPanelHeader:x["a"],VExpansionPanels:g["a"],VSubheader:k["a"]});var E={components:{Graph:P,GraphUser:D,Table:$},data:function(){return{graph_status:{values:["SemanticProblem2019volkert","Medical2019volkert","incompleteCAT2019"],labels:["SemanticProblem2019volkert","Medical2019volkert","incompleteCAT2019"]},graph_alltasks:{values:["allTasks","OpenTasks"],labels:["Alle taken","Open taken"]}}},computed:{user:function(){return this.$store.state.userData}},created:function(){this.$store.dispatch("TermspaceProgress/getProgressPerStatus"),this.$store.dispatch("TermspaceProgress/getProgressPerStatusV2"),this.$store.dispatch("TermspaceProgress/getProgressPerUser")}},M=E,R=n("62ad"),F=n("ce7e"),H=n("0fd9"),L=Object(c["a"])(M,a,i,!1,null,"016dfe43",null);t["default"]=L.exports;p()(L,{VCol:R["a"],VContainer:f["a"],VDivider:F["a"],VRow:H["a"]})},c865:function(e,t,n){"use strict";var a=n("5530"),i=n("0789"),s=n("9d26"),o=n("a9ad"),r=n("3206"),l=n("5607"),c=n("80d2"),u=n("58df"),p=Object(u["a"])(o["a"],Object(r["a"])("expansionPanel","v-expansion-panel-header","v-expansion-panel"));t["a"]=p.extend().extend({name:"v-expansion-panel-header",directives:{ripple:l["a"]},props:{disableIconRotate:Boolean,expandIcon:{type:String,default:"$expand"},hideActions:Boolean,ripple:{type:[Boolean,Object],default:!1}},data:function(){return{hasMousedown:!1}},computed:{classes:function(){return{"v-expansion-panel-header--active":this.isActive,"v-expansion-panel-header--mousedown":this.hasMousedown}},isActive:function(){return this.expansionPanel.isActive},isDisabled:function(){return this.expansionPanel.isDisabled},isReadonly:function(){return this.expansionPanel.isReadonly}},created:function(){this.expansionPanel.registerHeader(this)},beforeDestroy:function(){this.expansionPanel.unregisterHeader()},methods:{onClick:function(e){this.$emit("click",e)},genIcon:function(){var e=Object(c["t"])(this,"actions")||[this.$createElement(s["a"],this.expandIcon)];return this.$createElement(i["c"],[this.$createElement("div",{staticClass:"v-expansion-panel-header__icon",class:{"v-expansion-panel-header__icon--disable-rotate":this.disableIconRotate},directives:[{name:"show",value:!this.isDisabled}]},e)])}},render:function(e){var t=this;return e("button",this.setBackgroundColor(this.color,{staticClass:"v-expansion-panel-header",class:this.classes,attrs:{tabindex:this.isDisabled?-1:null,type:"button"},directives:[{name:"ripple",value:this.ripple}],on:Object(a["a"])(Object(a["a"])({},this.$listeners),{},{click:this.onClick,mousedown:function(){return t.hasMousedown=!0},mouseup:function(){return t.hasMousedown=!1}})}),[Object(c["t"])(this,"default",{open:this.isActive},!0),this.hideActions||this.genIcon()])}})},cd55:function(e,t,n){"use strict";var a=n("5530"),i=n("4e82"),s=n("3206"),o=n("80d2"),r=n("58df");t["a"]=Object(r["a"])(Object(i["a"])("expansionPanels","v-expansion-panel","v-expansion-panels"),Object(s["b"])("expansionPanel",!0)).extend({name:"v-expansion-panel",props:{disabled:Boolean,readonly:Boolean},data:function(){return{content:null,header:null,nextIsActive:!1}},computed:{classes:function(){return Object(a["a"])({"v-expansion-panel--active":this.isActive,"v-expansion-panel--next-active":this.nextIsActive,"v-expansion-panel--disabled":this.isDisabled},this.groupClasses)},isDisabled:function(){return this.expansionPanels.disabled||this.disabled},isReadonly:function(){return this.expansionPanels.readonly||this.readonly}},methods:{registerContent:function(e){this.content=e},unregisterContent:function(){this.content=null},registerHeader:function(e){this.header=e,e.$on("click",this.onClick)},unregisterHeader:function(){this.header=null},onClick:function(e){e.detail&&this.header.$el.blur(),this.$emit("click",e),this.isReadonly||this.isDisabled||this.toggle()},toggle:function(){var e=this;this.content&&(this.content.isBooted=!0),this.$nextTick((function(){return e.$emit("change")}))}},render:function(e){return e("div",{staticClass:"v-expansion-panel",class:this.classes,attrs:{"aria-expanded":String(this.isActive)}},Object(o["t"])(this))}})},ec29:function(e,t,n){},fe09:function(e,t,n){"use strict";n.d(t,"b",(function(){return r}));n("4de4"),n("45fc"),n("d3b7"),n("25f0");var a=n("c37a"),i=n("5311"),s=n("8547"),o=n("58df");function r(e){e.preventDefault()}t["a"]=Object(o["a"])(a["a"],i["a"],s["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var e=this,t=this.value,n=this.internalValue;return this.isMultiple?!!Array.isArray(n)&&n.some((function(n){return e.valueComparator(n,t)})):void 0===this.trueValue||void 0===this.falseValue?t?this.valueComparator(t,n):Boolean(n):this.valueComparator(n,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(e){this.lazyValue=e,this.hasColor=e}},methods:{genLabel:function(){var e=a["a"].options.methods.genLabel.call(this);return e?(e.data.on={click:r},e):e},genInput:function(e,t){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:e,type:e},t),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:r},ref:"input"})},onBlur:function(){this.isFocused=!1},onClick:function(e){this.onChange(),this.$emit("click",e)},onChange:function(){var e=this;if(this.isInteractive){var t=this.value,n=this.internalValue;if(this.isMultiple){Array.isArray(n)||(n=[]);var a=n.length;n=n.filter((function(n){return!e.valueComparator(n,t)})),n.length===a&&n.push(t)}else n=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(n,this.trueValue)?this.falseValue:this.trueValue:t?this.valueComparator(n,t)?null:t:!n;this.validate(!0,n),this.internalValue=n,this.hasColor=n}},onFocus:function(){this.isFocused=!0},onKeydown:function(e){}}})}}]);
//# sourceMappingURL=chunk-7052cb80.d7ea54ef.js.map