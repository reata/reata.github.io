"use strict";(self.webpackChunkreata_s_blog=self.webpackChunkreata_s_blog||[]).push([[647],{69299:function(e,t,a){a.d(t,{Z:function(){return g}});var o=a(87462),n=a(63366),r=a(67294),l=a(85505),i=a(31670),c=a(12037),s=a(18297),d=a(48377),u=a(85893),p=["className","component"];var m=a(79742),v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.defaultTheme,a=e.defaultClassName,m=void 0===a?"MuiBox-root":a,v=e.generateClassName,g=e.styleFunctionSx,f=void 0===g?c.Z:g,h=(0,i.ZP)("div",{shouldForwardProp:function(e){return"theme"!==e&&"sx"!==e&&"as"!==e}})(f),y=r.forwardRef((function(e,a){var r=(0,d.Z)(t),i=(0,s.Z)(e),c=i.className,g=i.component,f=void 0===g?"div":g,y=(0,n.Z)(i,p);return(0,u.jsx)(h,(0,o.Z)({as:f,ref:a,className:(0,l.Z)(c,v?v(m):m),theme:r},y))}));return y}({defaultTheme:(0,a(1503).Z)(),defaultClassName:"MuiBox-root",generateClassName:m.Z.generate}),g=v},61807:function(e,t,a){a.d(t,{Z:function(){return y}});var o=a(63366),n=a(87462),r=a(67294),l=a(85505),i=a(9236),c=a(67663),s=a(18379),d=function(e){return((e<1?5.11916*Math.pow(e,2):4.5*Math.log(e+1)+2)/100).toFixed(2)},u=a(96981),p=a(19508),m=a(31351);function v(e){return(0,m.Z)("MuiPaper",e)}(0,p.Z)("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);var g=a(85893),f=["className","component","elevation","square","variant"],h=(0,s.ZP)("div",{name:"MuiPaper",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,t[a.variant],!a.square&&t.rounded,"elevation"===a.variant&&t["elevation".concat(a.elevation)]]}})((function(e){var t,a=e.theme,o=e.ownerState;return(0,n.Z)({backgroundColor:(a.vars||a).palette.background.paper,color:(a.vars||a).palette.text.primary,transition:a.transitions.create("box-shadow")},!o.square&&{borderRadius:a.shape.borderRadius},"outlined"===o.variant&&{border:"1px solid ".concat((a.vars||a).palette.divider)},"elevation"===o.variant&&(0,n.Z)({boxShadow:(a.vars||a).shadows[o.elevation]},!a.vars&&"dark"===a.palette.mode&&{backgroundImage:"linear-gradient(".concat((0,c.Fq)("#fff",d(o.elevation)),", ").concat((0,c.Fq)("#fff",d(o.elevation)),")")},a.vars&&{backgroundImage:null==(t=a.vars.overlays)?void 0:t[o.elevation]}))})),y=r.forwardRef((function(e,t){var a=(0,u.Z)({props:e,name:"MuiPaper"}),r=a.className,c=a.component,s=void 0===c?"div":c,d=a.elevation,p=void 0===d?1:d,m=a.square,y=void 0!==m&&m,b=a.variant,Z=void 0===b?"elevation":b,C=(0,o.Z)(a,f),w=(0,n.Z)({},a,{component:s,elevation:p,square:y,variant:Z}),k=function(e){var t=e.square,a=e.elevation,o=e.variant,n=e.classes,r={root:["root",o,!t&&"rounded","elevation"===o&&"elevation".concat(a)]};return(0,i.Z)(r,v,n)}(w);return(0,g.jsx)(h,(0,n.Z)({as:s,ownerState:w,className:(0,l.Z)(k.root,r),ref:t},C))}))},93723:function(e,t,a){a.d(t,{G:function(){return R},L:function(){return g},M:function(){return w},P:function(){return C},_:function(){return i},a:function(){return l},b:function(){return d},c:function(){return s},g:function(){return u},h:function(){return c}});var o=a(67294),n=(a(92369),a(45697)),r=a.n(n);function l(){return l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var o in a)Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o])}return e},l.apply(this,arguments)}function i(e,t){if(null==e)return{};var a,o,n={},r=Object.keys(e);for(o=0;o<r.length;o++)t.indexOf(a=r[o])>=0||(n[a]=e[a]);return n}var c=function(){return"undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype};var s=function(e){var t;return function(e){var t,a;return Boolean(null==e||null==(t=e.images)||null==(a=t.fallback)?void 0:a.src)}(e)?e:function(e){return Boolean(null==e?void 0:e.gatsbyImageData)}(e)?e.gatsbyImageData:function(e){return Boolean(null==e?void 0:e.gatsbyImage)}(e)?e.gatsbyImage:null==e||null==(t=e.childImageSharp)?void 0:t.gatsbyImageData};function d(e,t,a,o,n){return void 0===n&&(n={}),l({},a,{loading:o,shouldLoad:e,"data-main-image":"",style:l({},n,{opacity:t?1:0})})}function u(e,t,a,o,n,r,i,c){var s={};r&&(s.backgroundColor=r,"fixed"===a?(s.width=o,s.height=n,s.backgroundColor=r,s.position="relative"):("constrained"===a||"fullWidth"===a)&&(s.position="absolute",s.top=0,s.left=0,s.bottom=0,s.right=0)),i&&(s.objectFit=i),c&&(s.objectPosition=c);var d=l({},e,{"aria-hidden":!0,"data-placeholder-image":"",style:l({opacity:t?0:1,transition:"opacity 500ms linear"},s)});return d}var p,m=["children"],v=function(e){var t=e.layout,a=e.width,n=e.height;return"fullWidth"===t?o.createElement("div",{"aria-hidden":!0,style:{paddingTop:n/a*100+"%"}}):"constrained"===t?o.createElement("div",{style:{maxWidth:a,display:"block"}},o.createElement("img",{alt:"",role:"presentation","aria-hidden":"true",src:"data:image/svg+xml;charset=utf-8,%3Csvg height='"+n+"' width='"+a+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E",style:{maxWidth:"100%",display:"block",position:"static"}})):null},g=function(e){var t=e.children,a=i(e,m);return o.createElement(o.Fragment,null,o.createElement(v,l({},a)),t,null)},f=["src","srcSet","loading","alt","shouldLoad"],h=["fallback","sources","shouldLoad"],y=function(e){var t=e.src,a=e.srcSet,n=e.loading,r=e.alt,c=void 0===r?"":r,s=e.shouldLoad,d=i(e,f);return o.createElement("img",l({},d,{decoding:"async",loading:n,src:s?t:void 0,"data-src":s?void 0:t,srcSet:s?a:void 0,"data-srcset":s?void 0:a,alt:c}))},b=function(e){var t=e.fallback,a=e.sources,n=void 0===a?[]:a,r=e.shouldLoad,c=void 0===r||r,s=i(e,h),d=s.sizes||(null==t?void 0:t.sizes),u=o.createElement(y,l({},s,t,{sizes:d,shouldLoad:c}));return n.length?o.createElement("picture",null,n.map((function(e){var t=e.media,a=e.srcSet,n=e.type;return o.createElement("source",{key:t+"-"+n+"-"+a,type:n,media:t,srcSet:c?a:void 0,"data-srcset":c?void 0:a,sizes:d})})),u):u};y.propTypes={src:n.string.isRequired,alt:n.string.isRequired,sizes:n.string,srcSet:n.string,shouldLoad:n.bool},b.displayName="Picture",b.propTypes={alt:n.string.isRequired,shouldLoad:n.bool,fallback:n.exact({src:n.string.isRequired,srcSet:n.string,sizes:n.string}),sources:n.arrayOf(n.oneOfType([n.exact({media:n.string.isRequired,type:n.string,sizes:n.string,srcSet:n.string.isRequired}),n.exact({media:n.string,type:n.string.isRequired,sizes:n.string,srcSet:n.string.isRequired})]))};var Z=["fallback"],C=function(e){var t=e.fallback,a=i(e,Z);return t?o.createElement(b,l({},a,{fallback:{src:t},"aria-hidden":!0,alt:""})):o.createElement("div",l({},a))};C.displayName="Placeholder",C.propTypes={fallback:n.string,sources:null==(p=b.propTypes)?void 0:p.sources,alt:function(e,t,a){return e[t]?new Error("Invalid prop `"+t+"` supplied to `"+a+"`. Validation failed."):null}};var w=function(e){return o.createElement(o.Fragment,null,o.createElement(b,l({},e)),o.createElement("noscript",null,o.createElement(b,l({},e,{shouldLoad:!0}))))};w.displayName="MainImage",w.propTypes=b.propTypes;var k,S,x=function(e,t,a){for(var o=arguments.length,n=new Array(o>3?o-3:0),l=3;l<o;l++)n[l-3]=arguments[l];return e.alt||""===e.alt?r().string.apply(r(),[e,t,a].concat(n)):new Error('The "alt" prop is required in '+a+'. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html')},E={image:r().object.isRequired,alt:x},I=["as","image","style","backgroundColor","className","class","onStartLoad","onLoad","onError"],L=["style","className"],T=new Set,z=function(e){var t=e.as,n=void 0===t?"div":t,r=e.image,s=e.style,d=e.backgroundColor,u=e.className,p=e.class,m=e.onStartLoad,v=e.onLoad,g=e.onError,f=i(e,I),h=r.width,y=r.height,b=r.layout,Z=function(e,t,a){var o={},n="gatsby-image-wrapper";return"fixed"===a?(o.width=e,o.height=t):"constrained"===a&&(n="gatsby-image-wrapper gatsby-image-wrapper-constrained"),{className:n,"data-gatsby-image-wrapper":"",style:o}}(h,y,b),C=Z.style,w=Z.className,x=i(Z,L),E=(0,o.useRef)(),z=(0,o.useMemo)((function(){return JSON.stringify(r.images)}),[r.images]);p&&(u=p);var R=function(e,t,a){var o="";return"fullWidth"===e&&(o='<div aria-hidden="true" style="padding-top: '+a/t*100+'%;"></div>'),"constrained"===e&&(o='<div style="max-width: '+t+'px; display: block;"><img alt="" role="presentation" aria-hidden="true" src="data:image/svg+xml;charset=utf-8,%3Csvg height=\''+a+"' width='"+t+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E\" style=\"max-width: 100%; display: block; position: static;\"></div>"),o}(b,h,y);return(0,o.useEffect)((function(){k||(k=Promise.all([a.e(774),a.e(217)]).then(a.bind(a,39217)).then((function(e){var t=e.renderImageToString,a=e.swapPlaceholderImage;return S=t,{renderImageToString:t,swapPlaceholderImage:a}})));var e,t,o=E.current.querySelector("[data-gatsby-image-ssr]");return o&&c()?(o.complete?(null==m||m({wasCached:!0}),null==v||v({wasCached:!0}),setTimeout((function(){o.removeAttribute("data-gatsby-image-ssr")}),0)):(null==m||m({wasCached:!0}),o.addEventListener("load",(function e(){o.removeEventListener("load",e),null==v||v({wasCached:!0}),setTimeout((function(){o.removeAttribute("data-gatsby-image-ssr")}),0)}))),void T.add(z)):S&&T.has(z)?void 0:(k.then((function(a){var o=a.renderImageToString,n=a.swapPlaceholderImage;E.current&&(E.current.innerHTML=o(l({isLoading:!0,isLoaded:T.has(z),image:r},f)),T.has(z)||(e=requestAnimationFrame((function(){E.current&&(t=n(E.current,z,T,s,m,v,g))}))))})),function(){e&&cancelAnimationFrame(e),t&&t()})}),[r]),(0,o.useLayoutEffect)((function(){T.has(z)&&S&&(E.current.innerHTML=S(l({isLoading:T.has(z),isLoaded:T.has(z),image:r},f)),null==m||m({wasCached:!0}),null==v||v({wasCached:!0}))}),[r]),(0,o.createElement)(n,l({},x,{style:l({},C,s,{backgroundColor:d}),className:w+(u?" "+u:""),ref:E,dangerouslySetInnerHTML:{__html:R},suppressHydrationWarning:!0}))},R=(0,o.memo)((function(e){return e.image?(0,o.createElement)(z,e):null}));R.propTypes=E,R.displayName="GatsbyImage";var O,P=["src","__imageData","__error","width","height","aspectRatio","tracedSVGOptions","placeholder","formats","quality","transformOptions","jpgOptions","pngOptions","webpOptions","avifOptions","blurredOptions","breakpoints","outputPixelDensities"],N=function(e,t){for(var a=arguments.length,o=new Array(a>2?a-2:0),n=2;n<a;n++)o[n-2]=arguments[n];return"fullWidth"!==e.layout||"width"!==t&&"height"!==t||!e[t]?r().number.apply(r(),[e,t].concat(o)):new Error('"'+t+'" '+e[t]+" may not be passed when layout is fullWidth.")},F=new Set(["fixed","fullWidth","constrained"]),q={src:r().string.isRequired,alt:x,width:N,height:N,sizes:r().string,layout:function(e){if(void 0!==e.layout&&!F.has(e.layout))return new Error("Invalid value "+e.layout+'" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".')}},M=(O=R,function(e){var t=e.src,a=e.__imageData,n=e.__error,r=i(e,P);return n&&console.warn(n),a?o.createElement(O,l({image:a},r)):(console.warn("Image not loaded",t),null)});M.displayName="StaticImage",M.propTypes=q},92369:function(e){var t=function(e,t){if("string"!=typeof e&&!Array.isArray(e))throw new TypeError("Expected the input to be `string | string[]`");t=Object.assign({pascalCase:!1},t);var a;return e=Array.isArray(e)?e.map((function(e){return e.trim()})).filter((function(e){return e.length})).join("-"):e.trim(),0===e.length?"":1===e.length?t.pascalCase?e.toUpperCase():e.toLowerCase():(e!==e.toLowerCase()&&(e=function(e){for(var t=!1,a=!1,o=!1,n=0;n<e.length;n++){var r=e[n];t&&/[a-zA-Z]/.test(r)&&r.toUpperCase()===r?(e=e.slice(0,n)+"-"+e.slice(n),t=!1,o=a,a=!0,n++):a&&o&&/[a-zA-Z]/.test(r)&&r.toLowerCase()===r?(e=e.slice(0,n-1)+"-"+e.slice(n-1),o=a,a=!1,t=!0):(t=r.toLowerCase()===r&&r.toUpperCase()!==r,o=a,a=r.toUpperCase()===r&&r.toLowerCase()!==r)}return e}(e)),e=e.replace(/^[_.\- ]+/,"").toLowerCase().replace(/[_.\- ]+(\w|$)/g,(function(e,t){return t.toUpperCase()})).replace(/\d+(\w|$)/g,(function(e){return e.toUpperCase()})),a=e,t.pascalCase?a.charAt(0).toUpperCase()+a.slice(1):a)};e.exports=t,e.exports.default=t},18937:function(e,t,a){a.d(t,{Z:function(){return z}});var o=a(67294),n=a(94449),r=a(4942),l=a(63366),i=a(87462),c=a(85505),s=a(9236),d=a(67663),u=a(94388),p=a(85893),m=(0,u.Z)((0,p.jsx)("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}),"Cancel"),v=a(68636),g=a(77869),f=a(48082),h=a(96981),y=a(18379),b=a(19508),Z=a(31351);function C(e){return(0,Z.Z)("MuiChip",e)}var w=(0,b.Z)("MuiChip",["root","sizeSmall","sizeMedium","colorError","colorInfo","colorPrimary","colorSecondary","colorSuccess","colorWarning","disabled","clickable","clickableColorPrimary","clickableColorSecondary","deletable","deletableColorPrimary","deletableColorSecondary","outlined","filled","outlinedPrimary","outlinedSecondary","filledPrimary","filledSecondary","avatar","avatarSmall","avatarMedium","avatarColorPrimary","avatarColorSecondary","icon","iconSmall","iconMedium","iconColorPrimary","iconColorSecondary","label","labelSmall","labelMedium","deleteIcon","deleteIconSmall","deleteIconMedium","deleteIconColorPrimary","deleteIconColorSecondary","deleteIconOutlinedColorPrimary","deleteIconOutlinedColorSecondary","deleteIconFilledColorPrimary","deleteIconFilledColorSecondary","focusVisible"]),k=["avatar","className","clickable","color","component","deleteIcon","disabled","icon","label","onClick","onDelete","onKeyDown","onKeyUp","size","variant"],S=(0,y.ZP)("div",{name:"MuiChip",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState,o=a.color,n=a.iconColor,l=a.clickable,i=a.onDelete,c=a.size,s=a.variant;return[(0,r.Z)({},"& .".concat(w.avatar),t.avatar),(0,r.Z)({},"& .".concat(w.avatar),t["avatar".concat((0,g.Z)(c))]),(0,r.Z)({},"& .".concat(w.avatar),t["avatarColor".concat((0,g.Z)(o))]),(0,r.Z)({},"& .".concat(w.icon),t.icon),(0,r.Z)({},"& .".concat(w.icon),t["icon".concat((0,g.Z)(c))]),(0,r.Z)({},"& .".concat(w.icon),t["iconColor".concat((0,g.Z)(n))]),(0,r.Z)({},"& .".concat(w.deleteIcon),t.deleteIcon),(0,r.Z)({},"& .".concat(w.deleteIcon),t["deleteIcon".concat((0,g.Z)(c))]),(0,r.Z)({},"& .".concat(w.deleteIcon),t["deleteIconColor".concat((0,g.Z)(o))]),(0,r.Z)({},"& .".concat(w.deleteIcon),t["deleteIcon".concat((0,g.Z)(s),"Color").concat((0,g.Z)(o))]),t.root,t["size".concat((0,g.Z)(c))],t["color".concat((0,g.Z)(o))],l&&t.clickable,l&&"default"!==o&&t["clickableColor".concat((0,g.Z)(o),")")],i&&t.deletable,i&&"default"!==o&&t["deletableColor".concat((0,g.Z)(o))],t[s],t["".concat(s).concat((0,g.Z)(o))]]}})((function(e){var t,a=e.theme,o=e.ownerState,n=(0,d.Fq)(a.palette.text.primary,.26),l="light"===a.palette.mode?a.palette.grey[700]:a.palette.grey[300];return(0,i.Z)((t={maxWidth:"100%",fontFamily:a.typography.fontFamily,fontSize:a.typography.pxToRem(13),display:"inline-flex",alignItems:"center",justifyContent:"center",height:32,color:(a.vars||a).palette.text.primary,backgroundColor:(a.vars||a).palette.action.selected,borderRadius:16,whiteSpace:"nowrap",transition:a.transitions.create(["background-color","box-shadow"]),cursor:"default",outline:0,textDecoration:"none",border:0,padding:0,verticalAlign:"middle",boxSizing:"border-box"},(0,r.Z)(t,"&.".concat(w.disabled),{opacity:(a.vars||a).palette.action.disabledOpacity,pointerEvents:"none"}),(0,r.Z)(t,"& .".concat(w.avatar),{marginLeft:5,marginRight:-6,width:24,height:24,color:a.vars?a.vars.palette.Chip.defaultAvatarColor:l,fontSize:a.typography.pxToRem(12)}),(0,r.Z)(t,"& .".concat(w.avatarColorPrimary),{color:(a.vars||a).palette.primary.contrastText,backgroundColor:(a.vars||a).palette.primary.dark}),(0,r.Z)(t,"& .".concat(w.avatarColorSecondary),{color:(a.vars||a).palette.secondary.contrastText,backgroundColor:(a.vars||a).palette.secondary.dark}),(0,r.Z)(t,"& .".concat(w.avatarSmall),{marginLeft:4,marginRight:-4,width:18,height:18,fontSize:a.typography.pxToRem(10)}),(0,r.Z)(t,"& .".concat(w.icon),(0,i.Z)({marginLeft:5,marginRight:-6},"small"===o.size&&{fontSize:18,marginLeft:4,marginRight:-4},o.iconColor===o.color&&(0,i.Z)({color:a.vars?a.vars.palette.Chip.defaultIconColor:l},"default"!==o.color&&{color:"inherit"}))),(0,r.Z)(t,"& .".concat(w.deleteIcon),(0,i.Z)({WebkitTapHighlightColor:"transparent",color:a.vars?"rgba(".concat(a.vars.palette.text.primaryChannel," / 0.26)"):n,fontSize:22,cursor:"pointer",margin:"0 5px 0 -6px","&:hover":{color:a.vars?"rgba(".concat(a.vars.palette.text.primaryChannel," / 0.4)"):(0,d.Fq)(n,.4)}},"small"===o.size&&{fontSize:16,marginRight:4,marginLeft:-4},"default"!==o.color&&{color:a.vars?"rgba(".concat(a.vars.palette[o.color].contrastTextChannel," / 0.7)"):(0,d.Fq)(a.palette[o.color].contrastText,.7),"&:hover, &:active":{color:(a.vars||a).palette[o.color].contrastText}})),t),"small"===o.size&&{height:24},"default"!==o.color&&{backgroundColor:(a.vars||a).palette[o.color].main,color:(a.vars||a).palette[o.color].contrastText},o.onDelete&&(0,r.Z)({},"&.".concat(w.focusVisible),{backgroundColor:a.vars?"rgba(".concat(a.vars.palette.action.selectedChannel," / calc(").concat(a.vars.palette.action.selectedOpacity+a.vars.palette.action.focusOpacity,"))"):(0,d.Fq)(a.palette.action.selected,a.palette.action.selectedOpacity+a.palette.action.focusOpacity)}),o.onDelete&&"default"!==o.color&&(0,r.Z)({},"&.".concat(w.focusVisible),{backgroundColor:(a.vars||a).palette[o.color].dark}))}),(function(e){var t,a=e.theme,o=e.ownerState;return(0,i.Z)({},o.clickable&&(t={userSelect:"none",WebkitTapHighlightColor:"transparent",cursor:"pointer","&:hover":{backgroundColor:a.vars?"rgba(".concat(a.vars.palette.action.selectedChannel," / calc(").concat(a.vars.palette.action.selectedOpacity+a.vars.palette.action.hoverOpacity,"))"):(0,d.Fq)(a.palette.action.selected,a.palette.action.selectedOpacity+a.palette.action.hoverOpacity)}},(0,r.Z)(t,"&.".concat(w.focusVisible),{backgroundColor:a.vars?"rgba(".concat(a.vars.palette.action.selectedChannel," / calc(").concat(a.vars.palette.action.selectedOpacity+a.vars.palette.action.focusOpacity,"))"):(0,d.Fq)(a.palette.action.selected,a.palette.action.selectedOpacity+a.palette.action.focusOpacity)}),(0,r.Z)(t,"&:active",{boxShadow:(a.vars||a).shadows[1]}),t),o.clickable&&"default"!==o.color&&(0,r.Z)({},"&:hover, &.".concat(w.focusVisible),{backgroundColor:(a.vars||a).palette[o.color].dark}))}),(function(e){var t,a,o=e.theme,n=e.ownerState;return(0,i.Z)({},"outlined"===n.variant&&(t={backgroundColor:"transparent",border:o.vars?"1px solid ".concat(o.vars.palette.Chip.defaultBorder):"1px solid ".concat("light"===o.palette.mode?o.palette.grey[400]:o.palette.grey[700])},(0,r.Z)(t,"&.".concat(w.clickable,":hover"),{backgroundColor:(o.vars||o).palette.action.hover}),(0,r.Z)(t,"&.".concat(w.focusVisible),{backgroundColor:(o.vars||o).palette.action.focus}),(0,r.Z)(t,"& .".concat(w.avatar),{marginLeft:4}),(0,r.Z)(t,"& .".concat(w.avatarSmall),{marginLeft:2}),(0,r.Z)(t,"& .".concat(w.icon),{marginLeft:4}),(0,r.Z)(t,"& .".concat(w.iconSmall),{marginLeft:2}),(0,r.Z)(t,"& .".concat(w.deleteIcon),{marginRight:5}),(0,r.Z)(t,"& .".concat(w.deleteIconSmall),{marginRight:3}),t),"outlined"===n.variant&&"default"!==n.color&&(a={color:(o.vars||o).palette[n.color].main,border:"1px solid ".concat(o.vars?"rgba(".concat(o.vars.palette[n.color].mainChannel," / 0.7)"):(0,d.Fq)(o.palette[n.color].main,.7))},(0,r.Z)(a,"&.".concat(w.clickable,":hover"),{backgroundColor:o.vars?"rgba(".concat(o.vars.palette[n.color].mainChannel," / ").concat(o.vars.palette.action.hoverOpacity,")"):(0,d.Fq)(o.palette[n.color].main,o.palette.action.hoverOpacity)}),(0,r.Z)(a,"&.".concat(w.focusVisible),{backgroundColor:o.vars?"rgba(".concat(o.vars.palette[n.color].mainChannel," / ").concat(o.vars.palette.action.focusOpacity,")"):(0,d.Fq)(o.palette[n.color].main,o.palette.action.focusOpacity)}),(0,r.Z)(a,"& .".concat(w.deleteIcon),{color:o.vars?"rgba(".concat(o.vars.palette[n.color].mainChannel," / 0.7)"):(0,d.Fq)(o.palette[n.color].main,.7),"&:hover, &:active":{color:(o.vars||o).palette[n.color].main}}),a))})),x=(0,y.ZP)("span",{name:"MuiChip",slot:"Label",overridesResolver:function(e,t){var a=e.ownerState.size;return[t.label,t["label".concat((0,g.Z)(a))]]}})((function(e){var t=e.ownerState;return(0,i.Z)({overflow:"hidden",textOverflow:"ellipsis",paddingLeft:12,paddingRight:12,whiteSpace:"nowrap"},"small"===t.size&&{paddingLeft:8,paddingRight:8})}));function E(e){return"Backspace"===e.key||"Delete"===e.key}var I=o.forwardRef((function(e,t){var a=(0,h.Z)({props:e,name:"MuiChip"}),n=a.avatar,r=a.className,d=a.clickable,u=a.color,y=void 0===u?"default":u,b=a.component,Z=a.deleteIcon,w=a.disabled,I=void 0!==w&&w,L=a.icon,T=a.label,z=a.onClick,R=a.onDelete,O=a.onKeyDown,P=a.onKeyUp,N=a.size,F=void 0===N?"medium":N,q=a.variant,M=void 0===q?"filled":q,D=(0,l.Z)(a,k),j=o.useRef(null),_=(0,v.Z)(j,t),A=function(e){e.stopPropagation(),R&&R(e)},W=!(!1===d||!z)||d,V=W||R?f.Z:b||"div",B=(0,i.Z)({},a,{component:V,disabled:I,size:F,color:y,iconColor:o.isValidElement(L)&&L.props.color||y,onDelete:!!R,clickable:W,variant:M}),H=function(e){var t=e.classes,a=e.disabled,o=e.size,n=e.color,r=e.iconColor,l=e.onDelete,i=e.clickable,c=e.variant,d={root:["root",c,a&&"disabled","size".concat((0,g.Z)(o)),"color".concat((0,g.Z)(n)),i&&"clickable",i&&"clickableColor".concat((0,g.Z)(n)),l&&"deletable",l&&"deletableColor".concat((0,g.Z)(n)),"".concat(c).concat((0,g.Z)(n))],label:["label","label".concat((0,g.Z)(o))],avatar:["avatar","avatar".concat((0,g.Z)(o)),"avatarColor".concat((0,g.Z)(n))],icon:["icon","icon".concat((0,g.Z)(o)),"iconColor".concat((0,g.Z)(r))],deleteIcon:["deleteIcon","deleteIcon".concat((0,g.Z)(o)),"deleteIconColor".concat((0,g.Z)(n)),"deleteIcon".concat((0,g.Z)(c),"Color").concat((0,g.Z)(n))]};return(0,s.Z)(d,C,t)}(B),U=V===f.Z?(0,i.Z)({component:b||"div",focusVisibleClassName:H.focusVisible},R&&{disableRipple:!0}):{},K=null;R&&(K=Z&&o.isValidElement(Z)?o.cloneElement(Z,{className:(0,c.Z)(Z.props.className,H.deleteIcon),onClick:A}):(0,p.jsx)(m,{className:(0,c.Z)(H.deleteIcon),onClick:A}));var G=null;n&&o.isValidElement(n)&&(G=o.cloneElement(n,{className:(0,c.Z)(H.avatar,n.props.className)}));var X=null;return L&&o.isValidElement(L)&&(X=o.cloneElement(L,{className:(0,c.Z)(H.icon,L.props.className)})),(0,p.jsxs)(S,(0,i.Z)({as:V,className:(0,c.Z)(H.root,r),disabled:!(!W||!I)||void 0,onClick:z,onKeyDown:function(e){e.currentTarget===e.target&&E(e)&&e.preventDefault(),O&&O(e)},onKeyUp:function(e){e.currentTarget===e.target&&(R&&E(e)?R(e):"Escape"===e.key&&j.current&&j.current.blur()),P&&P(e)},ref:_,ownerState:B},U,D,{children:[G||X,(0,p.jsx)(x,{className:(0,c.Z)(H.label),ownerState:B,children:T}),K]}))})),L=a(13366),T=[{title:"Blog",url:"/"},{title:"Gist",url:"/gist"},{title:"Notebook",url:"/notebook"},{title:"About",url:"/about"}];function z(){return o.createElement(o.Fragment,null,o.createElement(n.Z,{component:"nav",variant:"dense",sx:{justifyContent:"space-between",overflowX:"auto"}},T.map((function(e){return o.createElement(I,{label:o.createElement(L.Z,{variant:"subtitle2",gutterBottom:!0},e.title),component:"a",href:e.url,clickable:!0})}))))}},30150:function(e,t,a){a.r(t),a.d(t,{default:function(){return v}});var o=a(67294),n=a(49503),r=a(2751),l=a(69299),i=a(61807),c=a(18379),s=a(18937),d=a(68900),u=a(93723),p=a(99447),m=(0,c.ZP)("div")((function(){return{width:740,"& h2":{fontFamily:"Lato",fontSize:26,fontWeight:700,padding:0,margin:"56px 0 -13px -1.883px",textAlign:"left",lineHeight:"34.5px",letterSpacing:-.45},"& p":{marginTop:21,fontFamily:"Lora",fontSize:21,letterSpacing:-.03,lineHeight:1.58},"& li":{fontFamily:"Lora",fontSize:21,letterSpacing:-.03,lineHeight:1.58},"& pre":{overflowX:"auto",fontFamily:"Solaris",fontStyle:"italic",letterSpacing:-.36,margin:"45px 0 23px 0",color:"rgba(0, 0, 0, 0.68)",backgroundColor:"rgba(240,240,240,0.68)"}}}));function v(e){var t=e.data.markdownRemark,a=t.frontmatter,c=t.html,v=t.rawMarkdownBody,g=(0,p.Z)(v);return o.createElement(o.Fragment,null,o.createElement(n.Z,{maxWidth:"lg"},o.createElement(s.Z,null),o.createElement("main",null,o.createElement(r.ZP,{container:!0,spacing:1,sx:{marginTop:5,marginBottom:5}},o.createElement(r.ZP,{item:!0,xs:6},o.createElement(l.Z,{sx:{padding:"6 6 0 0"}},o.createElement("h1",{style:{fontFamily:"Playfair Display",fontSize:48,textAlign:"left",marginBottom:8}},a.title),o.createElement("subtitle",{style:{fontFamily:"Lato",fontSize:21,color:"rgba(0, 0, 0, 0.54)"}},a.excerpt),o.createElement(l.Z,{sx:{fontFamily:"Lato",fontSize:16,fontWeight:400,marginTop:2}},o.createElement("a",{href:"https://reata.github.io/"},"Reata")),o.createElement(l.Z,{sx:{color:"rgba(0, 0, 0, 0.54)"}},a.date," ",o.createElement("span",{className:"median-divider"},"·")," ",g," min read"))),o.createElement(r.ZP,{item:!0,xs:6},o.createElement(i.Z,null,o.createElement(u.G,{alt:"",image:(0,u.c)(a.image)})))),o.createElement(r.ZP,{container:!0,justifyContent:"center",alignItems:"center"},o.createElement(m,null,o.createElement(l.Z,{dangerouslySetInnerHTML:{__html:c}}))))),o.createElement(d.Z,null))}},99447:function(e,t){t.Z=function(e){return Math.ceil(e.length/500)}}}]);
//# sourceMappingURL=component---src-pages-markdown-remark-frontmatter-slug-js-51844855d542a25ca2c6.js.map