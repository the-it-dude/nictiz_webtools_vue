(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d2f22dc6"],{"713e":function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.user.groups.includes("mapping | access")?a("v-container",{attrs:{fluid:""}},[a("v-card",[a("v-toolbar",{attrs:{color:"cyan darken-2",dark:""}},[a("v-toolbar-title",[a("v-btn",{attrs:{text:""},on:{click:function(e){return t.back()}}},[t._v("Terug naar projecten")]),a("br")],1)],1)],1)],1):t._e()},s=[],n={data:function(){return{}},methods:{back:function(){this.$store.commit("MappingTasks/clearTaskMemory"),this.$router.push({path:"/mapping/Projects/".concat(this.$route.params.projectid,"/")})}},computed:{user:function(){return this.$store.state.userData}},mounted:function(){}},i=n,o=a("2877"),l=a("6544"),c=a.n(l),u=a("8336"),d=a("b0af"),p=a("a523"),f=a("71d9"),v=a("2a7f"),h=Object(o["a"])(i,r,s,!1,null,null,null);e["a"]=h.exports;c()(h,{VBtn:u["a"],VCard:d["a"],VContainer:p["a"],VToolbar:f["a"],VToolbarTitle:v["a"]})},dd33:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("AuditHitList")],1)},s=[],n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.user.groups.includes("mapping | access")?a("v-container",[a("v-row",[a("v-col",{attrs:{cols:"12"}},[a("v-row",[a("BackToProjectsSolo")],1)],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12"}},[a("v-card",[a("v-card-title",[t._v(" Taken ")]),a("v-card-text",[a("v-simple-table",{attrs:{"max-width":"40"}},[a("tbody",[a("tr",[a("td",{attrs:{colspan:"2"}},[a("v-text-field",{attrs:{label:"Zoek binnen resultaten","hide-details":"",autofocus:"",clearable:"",dense:""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)]),t._l(t.headers,(function(e){return a("tr",{key:e.text},[t.filters.hasOwnProperty(e.value)?a("td",{attrs:{align:"left"}},[t._v(" "+t._s(e.text)+" ")]):t._e(),t.filters.hasOwnProperty(e.value)?a("td",{staticClass:"text-left"},[a("v-select",{attrs:{flat:"",dense:"","hide-details":"",small:"",multiple:"",clearable:"",items:t.columnValueList(e.value)},model:{value:t.filters[e.value],callback:function(a){t.$set(t.filters,e.value,a)},expression:"filters[header.value]"}})],1):t._e()])}))],2)])],1)],1)],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12"}},[a("v-card",{staticClass:"pa-1"},[a("v-card-title",[t._v(" Audit hits ")]),a("v-card-text",[a("v-data-table",{staticClass:"elevation-2",attrs:{headers:t.headers,"footer-props":t.pagination,items:t.filteredHits,"items-per-page":50,loading:t.loading,search:t.search,"multi-sort":"",dense:""},scopedSlots:t._u([{key:"item.open",fn:function(e){var r=e.item;return[a("v-btn",{attrs:{small:"",color:"blue lighten-2",href:"?#/mapping/Projects/"+r.project+"/Task/"+r.task,target:"_blank"}},[t._v("Open")])]}},{key:"item.reason",fn:function(e){var r=e.item;return[a("span",{staticStyle:{"white-space":"pre"}},[t._v(" "+t._s(r.reason)+" ")])]}}],null,!1,510797260)})],1)],1)],1)],1)],1):t._e()],1)},i=[],o=(a("99af"),a("a623"),a("4de4"),a("caad"),a("d81d"),a("b64b"),a("2532"),a("713e")),l={components:{BackToProjectsSolo:o["a"]},data:function(){return{headers:[{text:"",value:"open"},{text:"Task ID",value:"task"},{text:"Project ID",value:"project",align:" d-none"},{text:"Type melding",value:"type"},{text:"Reden",value:"reason"},{text:"Gebruiker",value:"user"},{text:"Status",value:"status"},{text:"Whitelist",value:"ignore"},{text:"Sticky",value:"sticky"},{text:"timestamp",value:"timestamp"}],pagination:{"items-per-page-options":[25,50,100,150]},filters:{user:[],status:[],ignore:[],type:[]}}},methods:{selectTask:function(t,e){this.$router.push({path:"/mapping/Projects/".concat(e,"/Task/").concat(t)})},columnValueList:function(t){return this.hits.map((function(e){return e[t]})).sort()}},computed:{hits:function(){return this.$store.state.MappingAudits.auditsPerProject},loading:function(){return this.$store.state.MappingAudits.loading},user:function(){return this.$store.state.userData},filteredHits:function(){var t=this;return this.hits.filter((function(e){return Object.keys(t.filters).every((function(a){return t.filters[a].length<1||t.filters[a].includes(e[a])}))}))}},created:function(){this.$store.commit("MappingAudits/resetAuditHitsByProject"),this.$store.dispatch("MappingAudits/getAuditsByProject",this.$route.params.projectid)}},c=l,u=a("2877"),d=a("6544"),p=a.n(d),f=a("8336"),v=a("b0af"),h=a("99d9"),m=a("62ad"),b=a("a523"),g=a("8fea"),k=a("0fd9"),x=a("b974"),_=a("1f4f"),T=a("8654"),j=Object(u["a"])(c,n,i,!1,null,null,null),y=j.exports;p()(j,{VBtn:f["a"],VCard:v["a"],VCardText:h["b"],VCardTitle:h["c"],VCol:m["a"],VContainer:b["a"],VDataTable:g["a"],VRow:k["a"],VSelect:x["a"],VSimpleTable:_["a"],VTextField:T["a"]});var V={components:{AuditHitList:y}},w=V,$=Object(u["a"])(w,r,s,!1,null,null,null);e["default"]=$.exports}}]);
//# sourceMappingURL=chunk-d2f22dc6.a1826839.js.map