var LT;(()=>{"use strict";const e="ghostnet",t="KT1TRuN4Uc4ai6ZjWRjtedX9ChmfcfvxfBXt";function n(e){return Array.from((new TextEncoder).encode(e),(e=>e.toString(16).padStart(2,"0"))).join("")}function a(e){const t=new Uint8Array(e.length/2);for(let n=0;n!==t.length;n++)t[n]=parseInt(e.substr(2*n,2),16);return(new TextDecoder).decode(t)}function s(e){return e&&e.length>14?e.substring(0,5)+"..."+e.substring(e.length-5):e}function o(e){if(navigator.clipboard)return navigator.clipboard.writeText(e).then((function(){}),(function(e){return console.log("ERROR copyToClipboard(): "+e),!1})),!0;let t;var n=document.createElement("textarea");n.value=e,n.style.top="0",n.style.left="0",n.style.position="fixed",document.body.appendChild(n),n.focus(),n.select();try{document.execCommand("copy"),t=!0}catch(e){console.log("ERROR copyToClipboard(): "+e)}return document.body.removeChild(n),t}function i(e){return/^(tz|KT)[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{34}$/.test(String(e))}let r="";const c=new beacon.DAppClient({name:"NFTez",preferredNetwork:e});async function l(t,n,a){let s="sort.desc=lastActivity&select=address,tokensCount,firstActivityTime,creator.address as creator&typeHash=-1889653220"+(n?"&limit="+n:"")+(a?"&offset="+a:"")+(t?"&creator="+t:"");try{let t=await fetch("https://api."+e+".tzkt.io/v1/contracts?"+s);if(t.ok)return await t.json();console.log("ERROR getCollections(): can't get collections")}catch(e){console.log("ERRROR getCollections(): "+JSON.stringify(e))}}async function d(t){try{let n=await fetch("https://api."+e+".tzkt.io/v1/contracts/"+t+"/bigmaps/metadata/keys?key=content&select=value");if(n.ok)return(await n.json())[0];console.log("ERROR getCollection(): can't get collection")}catch(e){console.log("ERRROR getCollection(): "+JSON.stringify(e))}}async function m(n,a){let s="sort.desc=id&active=true&select=key,value"+(n?"&value.token.address="+n:"")+(a?"&value.token.id="+a:"");try{let n=await fetch("https://api."+e+".tzkt.io/v1/contracts/"+t+"/bigmaps/offers/keys?"+s);if(n.ok){let e=await n.json();if(e&&e.length>0){let t=null;for(let n of e)n.value.seller!==r&&(t?Number(t.value.price)>=Number(n.value.price)&&(t=n):t=n);return t}}else console.log("ERROR getBestOffer(): can't get best offer")}catch(e){console.log("ERRROR getBestOffer(): "+e+JSON.stringify(e))}}async function u(t,n){let a="limit=1&select=account.address as account,token,balance,firstTime&token.contract="+t+"&token.tokenid="+n;try{let t=await fetch("https://api."+e+".tzkt.io/v1/tokens/balances?"+a+"&account="+r);if(t.ok){let n=await t.json();if(n.length>0)return n[0];{let t=await fetch("https://api."+e+".tzkt.io/v1/tokens/balances?"+a);if(t.ok){if(n=await t.json(),n.length>0)return n[0].account=r,n[0].balance=0,n[0]}else console.log("ERROR getToken(): can't get token")}}else console.log("ERROR getToken(): can't get token balance")}catch(e){console.log("ERRROR getToken(): "+JSON.stringify(e))}}const g={message:"The address is copied",type:"is-success"};bulmaToast.setDefaults({duration:5e3,position:"bottom-left",animate:{in:"zoomIn",out:"zoomOut"}}),document.addEventListener("DOMContentLoaded",(async function(){await B(!0);let t=new URLSearchParams(window.location.search).get("cmd");"info"===t?await(document.getElementById("btnBurger").classList.remove("is-active"),document.getElementById("navbarMenu").classList.remove("is-active"),R(),void document.getElementById("pageInfo").classList.remove("is-hidden")):"tokens"===t?await async function(){R(),document.getElementById("dTokens").innerHTML="",document.getElementById("pageTokens").classList.remove("is-hidden");let e=new URLSearchParams(window.location.search).get("cid");e&&(v=e),await h()}():"token"===t?await async function(){R();let e=document.getElementById("btnTokenBuy"),t=document.getElementById("btnTokenList");t.classList.add("is-hidden");let n=document.getElementById("btnTokenBurn");n.classList.add("is-hidden");let a=document.getElementById("btnTokenTransfer");a.classList.add("is-hidden"),document.getElementById("dToken").classList.add("is-hidden"),document.getElementById("pageToken").classList.remove("is-hidden");let i=new URL(window.location),c=new URLSearchParams(window.location.search),l=c.get("cid");l?v=l:l=v;let d=c.get("tid");d?w=d:d=w;let y,f=document.getElementById("pageToken"),p=await u(v,d);if(p){let c;E=p,p.account===r&&p.balance>0&&(t.classList.remove("is-hidden"),n.classList.remove("is-hidden"),a.classList.remove("is-hidden")),new Promise((t=>{setTimeout((()=>{t(Promise.all([m(p.token.contract.address,p.token.tokenId),e]))}),10)})).then((e=>{e[0]&&(e[1].append(document.createTextNode((parseFloat(e[0].value.price)/1e6).toFixed(2)+" ꜩ")),e[1].addEventListener("click",(()=>I(e[0].key,e[0].value.price))),e[1].removeAttribute("disabled"))})),y=p.token.metadata?.name,f.querySelector(".js-name").innerText=y||"",y=p.token.metadata?.description,f.querySelector(".js-description").innerText=y||"";let l=f.querySelector(".js-creators"),d=f.querySelector(".js-creator");y=p.token.metadata?.creators;try{y=JSON.parse(y);for(let e=0;e<y.length;e++)c=d.cloneNode(!0),c.setAttribute("href",i.origin+i.pathname+"?cmd=tokens&creator="+y[e]),c.append(document.createTextNode(s(y[e]))),c.classList.remove("is-hidden"),l.append(c),l.append(document.createElement("br"))}catch(e){f.querySelector(".js-creators").innerText=""}y=r&&r===p.account?p.balance:"",f.querySelector(".js-balance").innerText=y||"",y=p.token.totalSupply,f.querySelector(".js-editions").innerText=y||"",y=p.firstTime,f.querySelector(".js-firsttime").innerText=y?new Date(Date.parse(y)).toLocaleString():"";let u=p.token.contract.address;c=f.querySelector(".js-contract"),c.setAttribute("href",i.origin+i.pathname+"?cmd=tokens&cid="+u),c.append(document.createTextNode(s(u))),f.querySelector(".js-contract-copy").addEventListener("click",(()=>{u&&o(u)&&bulmaToast.toast(g)})),y=p.token.tokenId,f.querySelector(".js-tokenid").innerText=y||"";let v=f.querySelector(".tags"),h=v.querySelector(".tag");y=p.token.metadata?.tags;try{y=JSON.parse(y);for(let e=0;e<y.length;e++)c=h.cloneNode(!0),c.append(document.createTextNode(y[e])),c.setAttribute("href",i.origin+i.pathname+"?cmd=tokens&tag="+y[e]),c.classList.remove("is-hidden"),v.append(c)}catch(e){v.innerText=""}let T=p.token.metadata?.mimeType;if(f.querySelector(".js-type").innerText=T||"",y=p.token.metadata?.artifactUri,y){try{new URL(y),y=y.replace("ipfs://","https://ipfs.io/ipfs/")}catch(e){}T&&T.startsWith("video")?(f.querySelector(".js-img").remove(),f.querySelector(".js-audio").remove(),f.querySelector(".js-svg").remove(),c=f.querySelector(".js-video"),c.setAttribute("src",y)):T&&T.startsWith("audio")?(f.querySelector(".js-img").remove(),f.querySelector(".js-video").remove(),f.querySelector(".js-svg").remove(),c=f.querySelector(".js-audio"),c.setAttribute("src",y)):T&&T.startsWith("image/svg+xml")?(f.querySelector(".js-img").remove(),f.querySelector(".js-video").remove(),f.querySelector(".js-audio").remove(),c=f.querySelector(".js-svg"),c.setAttribute("data",y)):(f.querySelector(".js-video").remove(),f.querySelector(".js-audio").remove(),f.querySelector(".js-svg").remove(),c=f.querySelector(".js-img"),c.setAttribute("src",y)),c.classList.remove("is-hidden")}document.getElementById("dToken").classList.remove("is-hidden")}}():"search"===t?await async function(){R(),document.getElementById("pageSearch").classList.remove("is-hidden")}():"collections"===t?await async function(){R(),document.getElementById("dCollections").innerHTML="",document.getElementById("pageCollections").classList.remove("is-hidden"),await f()}():"newtoken"===t?await async function(){if(R(),r?document.getElementById("btnNewTokenCreate").removeAttribute("disabled"):(document.getElementById("btnNewTokenCreate").setAttribute("disabled",""),bulmaToast.toast({message:"To create a new token you need to connect wallet.",type:"is-danger"})),document.getElementById("nftCreators").value=r,document.getElementById("pageNewToken").classList.remove("is-hidden"),r){const e=document.getElementById("nftCollection");let t=document.createElement("option");t.setAttribute("value","KT1FjaAGqvC1QNVGACGSKwzeg1L3sVwFmzZL"),t.append(document.createTextNode("NFTez default collection")),e.append(t),e.parentNode.classList.add("is-loading");let n=await l(r,15,y);if(n)for(let s of n){let n=await d(s.address);if(n)try{n=JSON.parse(a(n))}catch(e){continue}t=document.createElement("option"),t.setAttribute("value",s.address),t.append(document.createTextNode(n?.name)),e.append(t)}e.parentNode.classList.remove("is-loading")}}():"newcollection"===t?await async function(){R(),r?document.getElementById("btnNewCollectionCreate").removeAttribute("disabled"):(document.getElementById("btnNewCollectionCreate").setAttribute("disabled",""),bulmaToast.toast({message:"To create a new collection you need to connect wallet.",type:"is-danger"})),document.getElementById("cCreators").value=r,document.getElementById("pageNewCollection").classList.remove("is-hidden")}():"listings"===t?await async function(){R(),document.getElementById("dListings").innerHTML="",document.getElementById("pageListings").classList.remove("is-hidden"),await k()}():await async function(){R(),document.getElementById("dActiveTokens").innerHTML="",document.getElementById("pageActiveTokens").classList.remove("is-hidden");let t=document.getElementById("dActiveTokens"),n=0,a=await async function(){try{let t=await fetch("https://api."+e+".tzkt.io/v1/tokens?sort.desc=lastActivity&select=contract,tokenId,totalSupply,metadata&totalSupply.gt=0&metadata.artifactUri.as=data*&limit=50");if(t.ok)return await t.json();console.log("ERROR getActiveTokens(): can't get tokens")}catch(e){console.log("ERRROR getActiveTokens(): "+e+JSON.stringify(e))}}();for(let e of a){n++;let a=await T(e);t.append(a)}0===(p+=n)&&(t.textContent="There are no tokens yet.")}()})),document.getElementById("btnMoreCollections").addEventListener("click",(()=>f()));var y=0;async function f(){document.getElementById("btnMoreCollections").classList.add("is-loading");let e=document.getElementById("dCollections"),t=0,n=new URLSearchParams(window.location.search).get("creator"),i=await l(n,15,y);if(i)for(let n of i){t++;let i=await d(n.address);if(i)try{i=JSON.parse(a(i))}catch(e){continue}const r=document.getElementById("t-collection").content.cloneNode(!0);let c=i?.imageUri;if(c){try{new URL(c),c=c.replace("ipfs://","https://ipfs.io/ipfs/")}catch(e){}r.querySelector(".js-img").setAttribute("src",c)}r.querySelector(".js-name").innerText=i?.name,r.querySelector(".js-description").innerText=i?.description,r.querySelector(".js-address").prepend(document.createTextNode(s(n.address))),r.querySelector(".copy-item").addEventListener("click",(()=>{n.address&&o(n.address)&&bulmaToast.toast(g)})),r.querySelector(".js-count").innerText=n.tokensCount;let l=new URL(window.location);r.querySelectorAll(".js-collection-item").forEach((function(e){e.setAttribute("href",l.origin+l.pathname+"?cmd=tokens&cid="+n.address)})),e.append(r)}let r=document.getElementById("dMoreCollections");t<15?r.classList.add("is-hidden"):r.classList.remove("is-hidden"),document.getElementById("btnMoreCollections").classList.remove("is-loading"),0===(y+=t)&&(e.textContent="There are no collections yet.")}document.getElementById("btnMoreTokens").addEventListener("click",(()=>h()));var p=0,v="";async function h(){document.getElementById("btnMoreTokens").classList.add("is-loading");let t,n=document.getElementById("dTokens"),a=0,s=new URLSearchParams(window.location.search);t=s.get("account")?await async function(t,n,a){let s="sort.desc=id&select=account.address%20as%20account,token,balance&balance.gt=0&token.standard=fa2"+(t?"&account="+t:"")+"&limit=20"+(a?"&offset="+a:"")+"&token.metadata.artifactUri.as=data:*";try{let t=await fetch("https://api."+e+".tzkt.io/v1/tokens/balances?"+s);if(t.ok)return await t.json();console.log("ERROR getUserTokens(): can't get tokens")}catch(e){console.log("ERRROR getUserTokens(): "+JSON.stringify(e))}}(s.get("account"),0,p):await async function(t,n,a,s,o,i,r,c){let l="sort.desc=id&select=contract,tokenId,totalSupply,metadata&totalSupply.gt=0&limit=20"+(n?"&offset="+n:"")+(a?"&contract.in="+a:"")+(c?"&firstMinter="+c:"")+(s?"&metadata.name="+s:"")+"&metadata.artifactUri.as=data:"+(r||"")+"*";if(o&&o.length>0){o.sort(),l+="&metadata.creators.as=*";for(let e of o)l+='"'+e+'"*'}if(i&&i.length>0){i.sort(((e,t)=>e.localeCompare(t))),l+="&metadata.tags.as=*";for(let e of i)l+='"'+e+'"*'}try{let t=await fetch("https://api."+e+".tzkt.io/v1/tokens?"+l);if(t.ok)return await t.json();console.log("ERROR getTokens(): can't get tokens")}catch(e){console.log("ERRROR getTokens(): "+JSON.stringify(e))}}(0,p,s.get("cid"),s.get("name"),s.getAll("creator"),s.getAll("tag"),s.get("type"),s.get("minter"));for(let e of t){a++;let t=e.token?e.token:e,s=await T(t);n.append(s)}let o=document.getElementById("dMoreTokens");a<20?o.classList.add("is-hidden"):o.classList.remove("is-hidden"),document.getElementById("btnMoreTokens").classList.remove("is-loading"),0===(p+=a)&&(n.textContent="There are no tokens yet.")}async function T(e){let t,n=new URL(window.location);const a=document.getElementById("t-token").content.cloneNode(!0);let o=a.querySelector(".js-price");new Promise((t=>{setTimeout((()=>{t(Promise.all([m(e.contract.address,e.tokenId),o]))}),10)})).then((e=>{e[0]&&(e[1].innerText=(parseFloat(e[0].value.price)/1e6).toFixed(2),e[1].parentNode.classList.remove("is-hidden"))}));let i=e.metadata?.name;t=a.querySelector(".js-name"),t.innerText=i||"";let r=a.querySelector(".js-creators"),c=a.querySelector(".js-creator");i=e.metadata?.creators;try{i=JSON.parse(i);for(let e=0;e<i.length;e++)t=c.cloneNode(!0),t.setAttribute("href",n.origin+n.pathname+"?cmd=tokens&creator="+i[e]),t.append(document.createTextNode(s(i[e]))),e>0&&r.append(document.createTextNode(", ")),t.classList.remove("is-hidden"),r.append(t)}catch(e){a.querySelector(".js-creators").innerText=""}if(i=e.totalSupply,t=a.querySelector(".js-count"),t.innerText=i||"",i=e.metadata?.artifactUri,i){try{new URL(i),i=i.replace("ipfs://","https://ipfs.io/ipfs/")}catch(e){}let n=e.metadata?.mimeType;n&&n.startsWith("video")?(a.querySelector(".js-img").remove(),a.querySelector(".js-audio").remove(),a.querySelector(".js-svg").remove(),t=a.querySelector(".js-video"),t.setAttribute("src",i)):n&&n.startsWith("audio")?(a.querySelector(".js-img").remove(),a.querySelector(".js-video").remove(),a.querySelector(".js-svg").remove(),t=a.querySelector(".js-audio"),t.setAttribute("src",i)):n&&n.startsWith("image/svg+xml")?(a.querySelector(".js-img").remove(),a.querySelector(".js-video").remove(),a.querySelector(".js-audio").remove(),t=a.querySelector(".js-svg"),t.setAttribute("data",i)):(a.querySelector(".js-video").remove(),a.querySelector(".js-audio").remove(),a.querySelector(".js-svg").remove(),t=a.querySelector(".js-img"),t.setAttribute("src",i)),t.classList.remove("is-hidden")}return a.querySelectorAll(".js-token-item").forEach((function(t){t.setAttribute("href",n.origin+n.pathname+"?cmd=token&cid="+e.contract.address+"&tid="+e.tokenId)})),a}async function k(){let n=document.getElementById("dListings"),a=new URLSearchParams(window.location.search),s=a.get("seller"),o=a.get("minprice"),i=a.get("maxprice"),r=a.get("cid"),c=a.get("tid");document.getElementById("btnMoreListings").classList.add("is-loading");let l=0,d=await async function(n,a,s,o,i,r,c){let l="sort.desc=id&active=true&select=key,value&limit=15"+(c?"&offset="+c:"")+(n?"&value.seller="+n:"")+(a?"&value.price.ge="+a:"")+(s?"&value.price.le="+s:"")+(o?"&value.token.address="+o:"")+(i?"&value.token.id="+i:"");try{let n=await fetch("https://api."+e+".tzkt.io/v1/contracts/"+t+"/bigmaps/offers/keys?"+l);if(n.ok)return await n.json();console.log("ERROR getOffers(): can't get offers")}catch(e){console.log("ERRROR getOffers(): "+JSON.stringify(e))}}(s,o,i,r,c,0,p);for(let e of d){l++;let t=await b(e);n.append(t)}let m=document.getElementById("dMoreListings");l<15?m.classList.add("is-hidden"):m.classList.remove("is-hidden"),document.getElementById("btnMoreListings").classList.remove("is-loading"),0===(p+=l)&&(n.textContent="There are no listings matching these criteria.")}async function b(e){let n,a=new URL(window.location);const o=document.getElementById("t-listing").content.cloneNode(!0);let i=(await u(e.value.token.address,e.value.token.id)).token,l=i.metadata?.name;n=o.querySelector(".js-name"),n.innerText=l||"";let d=o.querySelector(".js-creators"),m=o.querySelector(".js-creator");l=i.metadata?.creators;try{l=JSON.parse(l);for(let e=0;e<l.length;e++)n=m.cloneNode(!0),n.setAttribute("href",a.origin+a.pathname+"?cmd=tokens&creator="+l[e]),n.append(document.createTextNode(s(l[e]))),e>0&&d.append(document.createTextNode(", ")),n.classList.remove("is-hidden"),d.append(n)}catch(e){o.querySelector(".js-creators").innerText=""}if(l=new Date(Date.parse(e.value.time_start)).toLocaleString(),n=o.querySelector(".js-start-time"),n.innerText=l||"",l=e.value.time_expiry?new Date(Date.parse(e.value.time_expiry))?.toLocaleString():"...",n=o.querySelector(".js-expiry-time"),n.innerText=l||"",l=e.value.amount,n=o.querySelector(".js-amount"),n.innerText=l||"",l=(parseFloat(e.value.price)/1e6).toFixed(2),n=o.querySelector(".js-price"),n.innerText=l||"",l=i.metadata?.artifactUri,l){try{new URL(l),l=l.replace("ipfs://","https://ipfs.io/ipfs/")}catch(e){}let e=i.metadata?.mimeType;e&&e.startsWith("video")?(o.querySelector(".js-img").remove(),o.querySelector(".js-audio").remove(),o.querySelector(".js-svg").remove(),n=o.querySelector(".js-video"),n.setAttribute("src",l)):e&&e.startsWith("audio")?(o.querySelector(".js-img").remove(),o.querySelector(".js-video").remove(),o.querySelector(".js-svg").remove(),n=o.querySelector(".js-audio"),n.setAttribute("src",l)):e&&e.startsWith("image/svg+xml")?(o.querySelector(".js-img").remove(),o.querySelector(".js-video").remove(),o.querySelector(".js-audio").remove(),n=o.querySelector(".js-svg"),n.setAttribute("data",l)):(o.querySelector(".js-video").remove(),o.querySelector(".js-audio").remove(),o.querySelector(".js-svg").remove(),n=o.querySelector(".js-img"),n.setAttribute("src",l)),n.classList.remove("is-hidden")}let g=o.querySelector(".js-btn-buy"),y=o.querySelector(".js-btn-cancel-offer");return e.value.seller===r?(g.classList.add("is-hidden"),y.classList.remove("is-hidden"),y.addEventListener("click",(()=>async function(e){let n=event.currentTarget;n.classList.add("is-loading");let a=event.target.closest(".js-listing"),s=await async function(e){try{let n=await c.requestOperation({operationDetails:[{kind:beacon.TezosOperationType.TRANSACTION,amount:0,destination:t,parameters:{entrypoint:"cancel_offer",value:JSON.parse('{ "int": "'+e+'" }')}}]});if(n.transactionHash)return n.transactionHash}catch(e){console.log("ERRROR cancelOffer(): "+e+" "+JSON.stringify(e))}}(e);s&&(j(s),a.remove()),n.classList.remove("is-loading")}(e.key)))):(y.classList.add("is-hidden"),g.classList.remove("is-hidden"),g.addEventListener("click",(()=>I(e.key,e.value.price)))),o.querySelectorAll(".js-token-item").forEach((function(e){e.setAttribute("href",a.origin+a.pathname+"?cmd=token&cid="+i.contract.address+"&tid="+i.tokenId)})),o}document.getElementById("btnMoreListings").addEventListener("click",(()=>k())),document.getElementById("btnSearch").addEventListener("click",(()=>async function(){let e="";if(document.getElementById("searchListTab").classList.contains("is-active")){let t,n,a=document.getElementById("searchListMinPrice").value;if(a){if(a=Math.round(parseFloat(a)*10**6),Number.isNaN(a)||a<=0)return void bulmaToast.toast({message:"Invalid min price.",type:"is-danger"});t=a,e+="&minprice="+a}if(a=document.getElementById("searchListMaxPrice").value,a){if(a=Math.round(parseFloat(a)*10**6),Number.isNaN(a)||a<=0)return void bulmaToast.toast({message:"Invalid max price.",type:"is-danger"});n=a,e+="&maxprice="+a}if(t&&n&&t>n)return void bulmaToast.toast({message:"Invalid price range.",type:"is-danger"});if(a=document.getElementById("searchListAddress").value.trim(),a){if(!i(a))return void bulmaToast.toast({message:"Invalid token or collection address.",type:"is-danger"});e+="&cid="+a}if(a=document.getElementById("searchListSeller").value.trim(),a){if(!i(a))return void bulmaToast.toast({message:"Invalid seller address.",type:"is-danger"});e+="&seller="+a}window.location.search="cmd=listings"+e}else if(document.getElementById("searchColTab").classList.contains("is-active")){let t=document.getElementById("searchColCreator").value.trim();if(t){if(!i(t))return void bulmaToast.toast({message:"Invalid creator address.",type:"is-danger"});e+="&creator="+t}window.location.search="cmd=collections"+e}else if(document.getElementById("searchTokTab").classList.contains("is-active")){let t=document.getElementById("searchTokName").value.trim();if(t){if(t.length>200)return void bulmaToast.toast({message:"The name length must be less than 200 characters.",type:"is-danger"});e+="&name="+t}t=document.getElementById("searchTokCreators").value.trim().split(/\s*,\s*/).filter((e=>e.length>0));for(let n of t){if(!i(n))return void bulmaToast.toast({message:"Invalid creator address: "+n,type:"is-danger"});e+="&creator="+n.trim()}t=document.getElementById("searchTokTags").value.trim().split(/\s*,\s*/).filter((e=>e.length>0));for(let n of t){if(n.length<3)return void bulmaToast.toast({message:"The tag length must be more than 2 characters.",type:"is-danger"});e+="&tag="+n.trim()}if(t=document.getElementById("searchTokType").value.trim(),t&&(e+="&type="+t),t=document.getElementById("searchTokMinter").value.trim(),t){if(!i(t))return void bulmaToast.toast({message:"Invalid minter address.",type:"is-danger"});e+="&minter="+t}window.location.search="cmd=tokens"+e}}())),document.getElementById("btnNewCollectionCreate").addEventListener("click",(()=>async function(){let e,t=new Map;if(e=document.getElementById("cName").value.trim(),!e)return void bulmaToast.toast({message:"The collection name must not be empty.",type:"is-danger"});if(e.length>200)return void bulmaToast.toast({message:"The name length must be less than 200 characters.",type:"is-danger"});if(t.set("name",e),e=document.getElementById("cDescription").value.trim(),e){if(e.length>2e3)return void bulmaToast.toast({message:"The description length must be less than 2000 characters.",type:"is-danger"});t.set("description",e)}if(e=document.getElementById("cSymbol").value.trim(),e&&t.set("symbol",e),e=document.getElementById("cType").value.trim(),e&&t.set("type",e),e=document.getElementById("cInterfaces").value.split(/\s*,\s*/).filter((e=>e.length>0)),e.length>0&&t.set("interfaces",e),e=document.getElementById("cAuthors").value.split(/\s*,\s*/).filter((e=>e.length>0)),e.length>0&&t.set("authors",e),e=document.getElementById("cAddresses").value.split(/\s*,\s*/).filter((e=>e.length>0)),e.length>0){for(let t of e)if(!i(t))return void bulmaToast.toast({message:"Invalid author address: "+t,type:"is-danger"});e.sort(),t.set("authoraddress",e)}if(e=document.getElementById("cCreators").value.split(/\s*,\s*/).filter((e=>e.length>0)),e.length>0){for(let t of e)if(!i(t))return void bulmaToast.toast({message:"Invalid creator address: "+t,type:"is-danger"});e.sort(),t.set("creators",e)}const a=document.getElementById("cFile").files;a.length>0&&(e=await new Promise((e=>{let t=new FileReader;t.onload=n=>e(t.result),t.readAsDataURL(a[0])})),t.set("imageUri",e)),document.getElementById("btnNewCollectionCreate").classList.add("is-loading");let s=await async function(e){let t=e.size>0?n(JSON.stringify(Object.fromEntries(e))):"";try{let e=await fetch("./collection02.json");if(e.ok){let n=await e.text();n&&(n=n.replaceAll("${user_address}",r),n=n.replaceAll("${metadata_content}",t));const a=await c.requestOperation({operationDetails:[{kind:beacon.TezosOperationType.ORIGINATION,balance:"0",script:JSON.parse(n)}]});if(a.transactionHash)return a.transactionHash}else console.log("ERROR createCollection(): can't create collection")}catch(e){console.log("ERRROR createCollection(): "+JSON.stringify(e))}}(t);s&&j(s),document.getElementById("btnNewCollectionCreate").classList.remove("is-loading")}())),document.getElementById("btnNewTokenCreate").addEventListener("click",(()=>async function(){let t,a=new Map,s=document.getElementById("nftCollection").value;if(!s)return void bulmaToast.toast({message:"Collection must be selected.",type:"is-danger"});if(t=document.getElementById("nftName").value.trim(),t){if(t.length>200)return void bulmaToast.toast({message:"The name length must be less than 200 characters.",type:"is-danger"});a.set("name",t)}if(t=document.getElementById("nftDescription").value.trim(),t){if(t.length>200)return void bulmaToast.toast({message:"The description length must be less than 2000 characters.",type:"is-danger"});a.set("description",t)}if(t=document.getElementById("nftTags").value.trim().split(/\s*,\s*/).filter((e=>e.length>0)),t.length>0){for(let e of t)if(e.length<3)return void bulmaToast.toast({message:"The tag length must be more than 2 characters.",type:"is-danger"});t.sort(((e,t)=>e.localeCompare(t))),a.set("tags",t)}if(t=document.getElementById("nftCreators").value.trim().split(/\s*,\s*/).filter((e=>e.length>0)),t.length>0){for(let e of t)if(!i(e))return void bulmaToast.toast({message:"Invalid creator address: "+e,type:"is-danger"});t.sort(),a.set("creators",t)}t=document.getElementById("nftType").value.trim(),t&&a.set("mimeType",t),t=document.getElementById("nftRights").value.trim(),t&&a.set("rights",t),t=document.getElementById("nftDecimals").value.trim(),t&&a.set("decimals",t);let o=new Map,l=0,d=document.getElementById("pageNewToken").querySelectorAll(".js-royalties-line-data");for(let e of d){let t=e.querySelector(".js-royalties-data-address").value.trim();if(0===t.length)return void bulmaToast.toast({message:"The royalty address must not be empty.",type:"is-danger"});if(!i(t))return void bulmaToast.toast({message:"Invalid royalty address: "+t,type:"is-danger"});if(o.has(t))return void bulmaToast.toast({message:"The royalty addresses must be different.",type:"is-danger"});let n=e.querySelector(".js-royalties-data-value").value;try{n=Math.round(100*parseFloat(n))}catch(e){return void bulmaToast.toast({message:"The royalty value must be a number.",type:"is-danger"})}if(n<=0)return void bulmaToast.toast({message:"The royalty value must be greater than zero.",type:"is-danger"});if(l+=n,l>2500)return void bulmaToast.toast({message:"The maximum amount of the total royalty shall not exceed 25%.",type:"is-danger"});o.set(t,n)}o.size>0&&(t='{"decimals":4,"shares":'+JSON.stringify(Object.fromEntries(o))+"}",a.set("royalties",t));const m=document.getElementById("nftFile").files;if(!(m.length>0))return void bulmaToast.toast({message:"Media file must be selected.",type:"is-danger"});t=await new Promise((e=>{let t=new FileReader;t.onload=n=>e(t.result),t.readAsDataURL(m[0])})),a.set("artifactUri",t);let u=new Map,g=document.getElementById("pageNewToken").querySelectorAll(".js-attributes-line-data");for(let e of g){let t=e.querySelector(".js-attributes-data-name").value.trim();if(0===t.length)return void bulmaToast.toast({message:"The attribute name must not be empty.",type:"is-danger"});if(u.has(t))return void bulmaToast.toast({message:"The attribute names must be different.",type:"is-danger"});let n=e.querySelector(".js-attributes-data-value").value;u.set(t,n)}if(u.size>0){let e="[",t=!0;for(let[n,a]of u)t?t=!1:e+=",",e+='{"name":"'+n+'","value":"'+a+'"}';e+="]",a.set("attributes",e)}let y=document.getElementById("nftEditions").value;document.getElementById("btnNewTokenCreate").classList.add("is-loading");let f=await async function(t,a,s){let o="";if((s=new Map([...s].sort())).size>0){let e=0;for(let[t,a]of s)e>0&&(o+=","),e++,o+='{"prim":"Elt","args":[{"string":"'+t+'"},{"bytes":"'+n("string"==typeof a||a instanceof String?a:JSON.stringify(a))+'"}]}'}try{let n='{"prim":"Pair","args":[{"int":"'+a+'"},{"prim":"Pair","args":[['+o+'],{"string":"'+r+'"}]}]}';try{let a=await fetch("https://api."+e+".tzkt.io/v1/contracts/"+t+"/entrypoints/mint"),s=await a.json();2===Object.keys(s.jsonParameters["schema:object"]).length&&(n='{"prim":"Pair","args":[['+o+'],{"string":"'+r+'"}]}')}catch(e){}let s=await c.requestOperation({operationDetails:[{kind:beacon.TezosOperationType.TRANSACTION,amount:0,destination:t,parameters:{entrypoint:"mint",value:JSON.parse(n)}}]});if(s.transactionHash)return s.transactionHash}catch(e){console.log("ERRROR createToken(): "+e+" "+JSON.stringify(e))}}(s,y,a);f&&j(f),document.getElementById("btnNewTokenCreate").classList.remove("is-loading")}())),document.getElementById("btnTokenList").addEventListener("click",(()=>async function(){E&&document.getElementById("mListTokenAmount").setAttribute("max",E.balance),document.getElementById("mListToken").classList.add("is-active")}())),document.getElementById("btnListTokenList").addEventListener("click",(()=>async function(){if(!E)return void bulmaToast.toast({message:"The token is not found.",type:"is-danger"});let e=Math.round(parseFloat(document.getElementById("mListTokenPrice").value)*10**6);if(Number.isNaN(e)||e<=0)return void bulmaToast.toast({message:"Invalid price.",type:"is-danger"});let n,a=E.token.contract.address,s=E.token.tokenId,o=document.getElementById("mListTokenAmount").value;try{let e=JSON.parse(E.token.metadata.royalties);n=new Map(Object.entries(e.shares));let t=e.decimals;for(let[e,a]of n)n.set(e,Math.trunc(Number(a)/10**t*1e4))}catch(e){n=new Map}let i=document.getElementById("mListTokenStartTiime").value;i=Math.trunc(Date.parse(i)/1e3),i||(i=Math.trunc(Date.now()/1e3));document.getElementById("btnListTokenList").classList.add("is-loading");let l=await async function(e,n,a,s,o,i,l){let d="";if(o&&o.size>0){o=new Map([...o].sort());let e=0;for(let[t,n]of o)e>0&&(d+=","),e++,d+='{"prim":"Elt","args":[{"string":"'+t+'"},{"int":"'+n+'"}]}'}l=l?'"prim":"Some","args":[{"int":"'+l+'"}]':'"prim":"None"';try{let o=await c.requestOperation({operationDetails:[{kind:beacon.TezosOperationType.TRANSACTION,amount:0,destination:n,parameters:{entrypoint:"update_operators",value:JSON.parse('[ { "prim": "Left", "args": [ { "prim": "Pair", "args": [ { "string": "'+r+'" }, { "prim": "Pair", "args": [ { "string": "'+t+'" }, { "int": "'+a+'" } ] } ] } ] } ]')}},{kind:beacon.TezosOperationType.TRANSACTION,amount:0,destination:t,parameters:{entrypoint:"add_offer",value:JSON.parse('{"prim":"Pair","args":[{"prim":"Pair","args":[{"int":"'+s+'"},{"prim":"Pair","args":[{"int":"'+e+'"},['+d+']]}]},{"prim":"Pair","args":[{'+l+'},{"prim":"Pair","args":[{"int":"'+i+'"},{"prim":"Pair","args":[{"string":"'+n+'"},{"int":"'+a+'"}]}]}]}]}')}}]});if(o.transactionHash)return o.transactionHash}catch(e){console.log("ERRROR addOffer(): "+e+" "+JSON.stringify(e))}}(e,a,s,o,n,i,"");l&&(j(l),document.getElementById("mListToken").classList.remove("is-active")),document.getElementById("btnListTokenList").classList.remove("is-loading")}())),document.getElementById("btnTokenBurn").addEventListener("click",(()=>async function(){E&&document.getElementById("mBurnTokenAmount").setAttribute("max",E.balance),document.getElementById("mBurnToken").classList.add("is-active")}())),document.getElementById("btnBurnTokenBurn").addEventListener("click",(()=>async function(){document.getElementById("btnBurnTokenBurn").classList.add("is-loading");let t=document.getElementById("mBurnTokenAmount").value,n=await async function(t,n,a){try{let s='{"prim":"Pair","args":[{"int":"'+a+'"},{"int":"'+n+'"}]}';try{let a=await fetch("https://api."+e+".tzkt.io/v1/contracts/"+t+"/entrypoints/burn?json=false&michelson=true");(await a.json()).michelsonParameters.startsWith("pair")||(s='{"int":"'+n+'"}')}catch(e){}let o=await c.requestOperation({operationDetails:[{kind:beacon.TezosOperationType.TRANSACTION,amount:0,destination:t,parameters:{entrypoint:"burn",value:JSON.parse(s)}}]});if(o.transactionHash)return o.transactionHash}catch(e){console.log("ERRROR burnToken(): "+e+" "+JSON.stringify(e))}}(v,w,t);n&&(j(n),window.history.back()),document.getElementById("btnBurnTokenBurn").classList.remove("is-loading")}())),document.getElementById("btnTokenTransfer").addEventListener("click",(()=>async function(){E&&document.getElementById("mTransferTokenAmount").setAttribute("max",E.balance),document.getElementById("mTransferTokenAddressTo").value="",document.getElementById("mTransferToken").classList.add("is-active")}())),document.getElementById("btnTransferTokenTransfer").addEventListener("click",(()=>async function(){let e=document.getElementById("mTransferTokenAmount").value,t=document.getElementById("mTransferTokenAddressTo").value.trim();if(!i(t))return void bulmaToast.toast({message:"Invalid destination address.",type:"is-danger"});document.getElementById("btnTransferTokenTransfer").classList.add("is-loading");let n=await async function(e,t,n,a){try{let s=await c.requestOperation({operationDetails:[{kind:beacon.TezosOperationType.TRANSACTION,amount:0,destination:e,parameters:{entrypoint:"transfer",value:JSON.parse('[{"prim": "Pair","args":[{"string":"'+r+'"},[{"prim": "Pair","args":[{"string":"'+a+'"},{"prim": "Pair","args":[{"int":"'+t+'"},{"int":"'+n+'"}]}]}]]}]')}}]});if(s.transactionHash)return s.transactionHash}catch(e){console.log("ERRROR transferToken(): "+e+" "+JSON.stringify(e))}}(v,w,e,t);n&&(j(n),document.getElementById("mTransferToken").classList.remove("is-active")),document.getElementById("btnTransferTokenTransfer").classList.remove("is-loading")}()));var E,w="";async function I(e,n){let a=event.currentTarget;a.classList.add("is-loading");let s=await async function(e,n,a){try{let n=await c.requestOperation({operationDetails:[{kind:beacon.TezosOperationType.TRANSACTION,amount:1*a,destination:t,parameters:{entrypoint:"accept_offer",value:JSON.parse('{"prim":"Pair","args":[{"int":"1"},{"int":"'+e+'"}]}')}}]});if(n.transactionHash)return n.transactionHash}catch(e){console.log("ERRROR buyToken(): "+e+" "+JSON.stringify(e))}}(e,0,n);s&&j(s),a.classList.remove("is-loading")}function L(){let e=event.currentTarget.querySelector(".fas");event.currentTarget.parentElement.querySelector(".is-collapsible").classList.toggle("is-active"),e.classList.toggle("fa-angle-down"),e.classList.toggle("fa-angle-up")}async function S(t){var n;document.querySelectorAll(".has-dropdown").forEach((function(e){e.classList.remove("is-hoverable"),setTimeout((function(){e.classList.add("is-hoverable")}),100)})),t!==e&&(e!==(n=t)&&(e=n,c.network={type:e},console.log("dAppClient.network="+c.network.type)),document.getElementById("titleNetwork").innerHTML="&nbsp;"+e)}async function B(t){let n=r;await async function(t){let n=await c.getActiveAccount();if(n)r=n.address;else if(!t){let t=await c.requestPermissions({network:{type:e}});r=t.address}}(t),r&&(document.getElementById("divConnect").classList.add("is-hidden"),document.getElementById("aAddress").innerHTML=s(r),document.getElementById("divDisconnect").classList.remove("is-hidden")),t||n===r||window.location.reload()}function R(){document.querySelectorAll(".js-page").forEach((function(e){e.classList.add("is-hidden")}))}function j(t){bulmaToast.toast({message:"Your request is processing with ID <a href='https://"+e+".tzkt.io/"+t+"' target='_blank'>"+s(t)+"</a>",duration:5e3,type:"is-success"})}document.querySelectorAll(".js-faq-item").forEach((function(e){e.onclick=L})),document.getElementById("btnConnect").addEventListener("click",(()=>B(!1))),document.getElementById("btnDisconnect").addEventListener("click",(()=>async function(){await async function(){await c.removeAllAccounts(),r=""}(),r||(document.getElementById("divDisconnect").classList.add("is-hidden"),document.getElementById("aAddress").innerHTML="",document.getElementById("divConnect").classList.remove("is-hidden")),window.location.reload()}())),document.getElementById("btnMenuTokens").addEventListener("click",(()=>{window.location.search="cmd=tokens"})),document.getElementById("btnMenuCollections").addEventListener("click",(()=>{window.location.search="cmd=collections"})),document.getElementById("btnMenuListings").addEventListener("click",(()=>{window.location.search="cmd=listings"})),document.getElementById("btnMenuSearch").addEventListener("click",(()=>{window.location.search="cmd=search"})),document.getElementById("btnMenuNewToken").addEventListener("click",(()=>{window.location.search="cmd=newtoken"})),document.getElementById("btnMenuNewCollection").addEventListener("click",(()=>{window.location.search="cmd=newcollection"})),document.getElementById("btnMenuInfo").addEventListener("click",(()=>{window.location.search="cmd=info"})),document.getElementById("btnMenuCopyAddress").addEventListener("click",(()=>{r&&o(r)&&bulmaToast.toast(g)})),document.getElementById("btnMenuMyCollections").addEventListener("click",(()=>{window.location.search="cmd=collections&creator="+r})),document.getElementById("btnMenuMyTokens").addEventListener("click",(()=>{window.location.search="cmd=tokens&account="+r})),document.getElementById("btnMenuMyListings").addEventListener("click",(()=>{window.location.search="cmd=listings&seller="+r})),document.getElementById("btnNetMainnet").addEventListener("click",(()=>S("mainnet"))),document.getElementById("btnNetGhostnet").addEventListener("click",(()=>S("ghostnet"))),LT={}})();