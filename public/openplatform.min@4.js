var OP={},OPENPLATFORM=OP;OP.version=424,OP.callbacks={},OP.events={},OP.is=top!==window,OP.pending=[],OP.$appearance=0,OP.interval=setInterval(function(){OP.ready&&(clearInterval(OP.interval),OP.pending.forEach(OP.$process),OP.pending=[])},500),document.addEventListener('click',function(n){var e=n.target,o=e;if('A'!==o.tagName)for(var t=3;0<=--t&&(o=o.parentNode)&&'BODY'!==o.tagName&&'HTML'!==o.tagName;)if('A'===o.tagName){e=o;break}if('A'===e.tagName&&'openplatform://'===e.href.substring(0,15)){var r=e.href.substring(15),i=-1===(t=r.indexOf('?'))?'':r.substring(t+1);if(-1!==t&&(r=r.substring(0,t)),n.preventDefault(),i){var a=i.split('&');i={};for(var s=0;s<a.length;s++){var c=a[s].split('=');c[0]&&(i[c[0]]=c[1]&&decodeURIComponent(c[1]))}}return OP.share(r,'link',i),!1}OP&&OP.$sendfocus()}),document.onkeydown=function(n){var e=!1;if(112===n.keyCode?(e=!0,OP.send('quicksearch')):116===n.keyCode?(OP.loading(!1),OP.offline(!1),OP.progress(0),setTimeout(function(){-1===location.href.indexOf('openplatform=')?location.href=OP.tokenizator(location.href):location.reload(!0)},200),e=!0):9===n.keyCode&&(n.altKey||n.ctrlKey||n.metaKey)&&(e=!0,OP.send('nextwindow')),e)return n.returnValue=!1,n.keyCode=0,!1},OP.changelog=function(n){OP.send('changelog',{body:n})},OP.help=function(n){OP.send('help',{body:n})},OP.success2=function(n,e,o){OP.console('success',n,e,o)},OP.titlesuccess=function(n){OP.send('titlesuccess',n)},OP.install=function(n){OP.send('install',{type:'install',url:n})},OP.titlewarning=function(n){n instanceof Array&&(n=n[0].error),OP.send('titlewarning',n)},OP.warning2=function(n,e,o){OP.console('warning',n,e,o)},OP.error2=function(n,e,o){OP.console('error',n,e,o)},OP.info2=function(n,e,o){OP.console('info',n,e,o)},OP.busy=function(n){OP.send('busy',n)},OP.appearance=function(){OP.$appearance=1,OP.send('appearance')},OP.console=function(n,e,o,t){if(e instanceof Array)for(var r=0;r<e.length;r++){var i=e[r];i&&i.error&&(i=i.error),i&&OP.send('console',{type:n,msg:(t||'')+i,show:o})}else OP.send('console',{type:n,msg:(t||'')+e,show:o})},OP.command=function(n,e){OP.send('command',{type:n,body:e})},OP.screenshot=function(n,e){var o;OP.$screenshot||(window.Promise||((o=document.createElement('script')).type='text/javascript',o.src=(n||'//cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.26.0')+'/polyfill.min.js',document.body.appendChild(o)),(o=document.createElement('script')).type='text/javascript',o.src=(n||'//html2canvas.hertzen.com/dist')+'/html2canvas.min.js',document.body.appendChild(o),OP.$screenshot=1);var t=setInterval(function(){window.html2canvas&&(clearInterval(t),OP.loading(!0),html2canvas(document.body).then(function(n){e?e(n.toDataURL('image/jpeg',.85)):OP.send('screenshot',n.toDataURL('image/jpeg',.85)),OP.loading(!1)}))},1e3)},OP.launched=function(n){OP.send('launched',null,n)},OP.progress=function(n){return OP.send('progress',n)},OP.init=function(t,n){if(OP.ready=!1,t||(t=function(n){if(null!=n){if(!document.body)throw new Error('401: Unauthorized');document.body.innerHTML='401: Unauthorized',setTimeout(function(){window.close()},2e3)}else OP.ready=!0}),!OP.is)return t(new Error('OpenPlatform isn\'t detected.')),void(document.body.innerHTML='401: Unauthorized');for(var e=location.search.substring(1).split('&'),o=null,r=0,i=e.length;r<i;r++){var a=e[r];if('openplatform='===a.substring(0,13)){var s=decodeURIComponent(a.substring(13));OP.token=a.substring(13),o=decodeURIComponent(s.substring(s.indexOf('accesstoken=')+12));break}}var c={};c.ua=navigator.userAgent,OP.accesstoken=o,$(document).ready(function(){if(n)return OP.ready=!0,void(t&&setTimeout(t,100));var o=setTimeout(function(){o=null,t('timeout'),document.body.innerHTML='401: Unauthorized'},2e3);OP.send('verify',c,function(n,e){o&&(clearTimeout(o),OP.ready=!n,t(null,e,setTimeout(function(){e.href&&(location.href=e.href)},100))),o=null,OP.id=e.id,OP.openplatformurl=e.openplatformurl})})},OP.$sendfocus=function(){var n=Date.now();(!OP.$focus||OP.$focus<n)&&OP.focus(),OP.$focus=n+2e3},document.addEventListener('touchstart',function(){OP&&OP.$sendfocus()},{passive:!0}),OP.loading2=function(n,e){OP.$loading2&&clearTimeout(OP.$loading2),e?OP.$loading2=setTimeout(function(n){OP.send('loading2',n)},e,n):OP.send('loading2',n)},OP.loading=function(n,e){OP.$loading&&clearTimeout(OP.$loading);var o={show:n,text:''};'string'==typeof e&&(o.text=e,e=0),e?OP.$loading=setTimeout(function(n){OP.send('loading',n)},e,o):OP.send('loading',o)},OP.success=function(n,e){return OP.snackbar(n,'success',e)},OP.warning=function(n,e){return OP.snackbar(n,'warning',e)},OP.message=function(n,e,o){var t={};return t.body=n,t.type=e,t.button=o,OP.send('message',t)},OP.confirm2=function(n,e,o){OP.confirm(n,e instanceof Array?e:e.split(',').trim(),function(n){!n&&o()})},OP.confirm=function(n,e,o){var t={};t.body=n,t.buttons=e instanceof Array?e:e.split(',').trim();var r=window.M&&window.M.scope?window.M.scope():null;return OP.send('confirm',t,function(n,e){r&&window.M.scope(r),o(e?e.index:-1)})},OP.options=function(e,t){OP.on('options',function(){var n=[];e(n);var o=window.M&&window.M.scope?window.M.scope():null;OP.send('options',n,function(n,e){o&&window.M.scope(o),e&&t(e)})})},OP.config=function(n,o){var e={};e.body='function'==typeof n?(o=n,null):JSON.stringify(n);var t=window.M&&window.M.scope?window.M.scope():null;return OP.send('config',e,function(n,e){t&&window.M.scope(t),o&&o(e,n)})},OP.clipboard=function(n){OP.send('clipboard',n)},OP.snackbar=function(n,e,o){var t={};return t.body=n,t.type=e,t.button=o,OP.send('snackbar',t,o)},OP.offline=function(n){OP.send('offline',n)},OP.meta=function(o){var n={};n.ua=navigator.userAgent,n.accesstoken=OP.accesstoken;var t=window.M&&window.M.scope?window.M.scope():null;OP.send('meta',n,function(n,e){t&&window.M.scope(t),o(n,e)})},OP.play=function(n){return/^[a-z]+$/.test(n)||/^(http|https):\/\//.test(n)||('/'!==n.substring(0,1)&&(n='/'+n),n=location.protocol+'//'+location.hostname+n),OP.send('play',n)},OP.stop=function(n){return OP.send('stop',n)},OP.focus=function(){return OP.send('focus')},OP.maximize=function(n){return OP.send('maximize',n)},OP.restart=function(){return OP.send('restart',location.href)},OP.open=function(n,e){return OP.send('open',{id:n,data:e})},OP.minimize=function(){return OP.send('minimize')},OP.badge=function(n){return OP.send('badge',n)},OP.log=function(n){return OP.send('log',n)},OP.close=function(){return OP.send('kill')},OP.notify=function(n,e,o){return'string'==typeof n&&(o=e,e=n,n=0),OP.send('notify',{type:n,body:e,data:o||'',dtcreated:new Date})},OP.share=function(n,e,o,t){return setTimeout(function(){OP.send('share',{app:n&&'object'==typeof n?n.id:n,type:e,body:o,dtcreated:new Date,silent:t})},100),OP},OP.report=function(n,e,o){return OP.send('report',{type:n,body:e,high:o})},OP.mail=function(n,e,o,t){return OP.send('mail',{email:n,subject:e,body:o,dtcreated:new Date,type:t||'html'})},OP.shake=function(n){return OP.send('shake',n)},OP.send=function(n,e,o){'function'==typeof e&&(o=e,e=null);var t={openplatform:!0};if(t.accesstoken=OP.accesstoken,t.type=n,t.body=e||null,t.sender=!0,t.origin=location.protocol+'//'+location.hostname,top)return o&&(t.callback=(1e6*Math.random()).toString(32).replace(/\./g,''),OP.callbacks[t.callback]=o),top.postMessage(JSON.stringify(t),'*'),OP;o&&o(new Error('The application is not running in the OpenPlatform scope.'))},OP.on=function(n,e){return'print'!==n&&'options'!==n||(OP.events[n]=null),!OP.events[n]&&(OP.events[n]=[]),OP.events[n].push(e),OP},OP.on('print',function(){window.print()}),OP.$process=function(n){if(n.callback){var e=OP.callbacks[n.callback];e&&(n.sender&&(n.error=new Error('The application is not running in the OpenPlatform scope.')),e(n.error,n.body||{}),delete OP.callbacks[n.callback])}else{if(!n.sender)if('link'!==n.type)if('command'!==n.type){if('appearance'===n.type&&OP.$appearance){var o,t=document.head||document.getElementsByTagName('head')[0],r=document.createElement('style');1===OP.$appearance?OP.$appearance=2:(o=document.getElementById('opstyle'))&&o.parentNode.removeChild(o);var i=n.body,a=document.body.classList;a.add(i.darkmode?'opdark':'oplight'),i.darkmode&&a.add('ui-dark'),a.add('opbody'),a.remove(i.darkmode?'oplight':'opdark'),!i.darkmode&&a.remove('ui-dark'),i.colorscheme||(i.colorscheme='#4285f4'),window.OPCOLOR=i.colorscheme,window.OPDARKMODE=i.darkmode,r.appendChild(document.createTextNode('.opbody{background-color:#'+(i.darkmode?'202020':'FFFFFF')+'}body.opbody{color:#'+(i.darkmode?'E0E0E0':'000000')+'}.opborder,.opborderhover:hover{border-color:'+i.colorscheme+'!important}.opbg,.opbghover:hover{background-color:'+i.colorscheme+'!important}.opfg,.opfghover:hover{color:'+i.colorscheme+'!important}')),r.id='opstyle',t.appendChild(r)}if('reload'!==n.type)if('screenshotmake'!==n.type)if('redirect'!==n.type){if('kill'===n.type&&(n.type='close'),'share'===n.type&&(n.body.share=function(n,e){OP.share(this.app,n,e)}),s=OP.events[n.type])for(i={},c=0;c<s.length;c++)s[c](n.body||i)}else location.href=n.body;else OP.screenshot(n.body);else-1===location.href.indexOf('openplatform=')?location.href=OP.tokenizator(location.href):location.reload(!0)}else{var s;if(s=OP.events[n.type])for(var c=0;c<s.length;c++)s[c](n.body.type,n.body.body)}else if(s=OP.events[n.type])for(var c=0;c<s.length;c++)s[c](n.body.path,n.body.data)}},OP.emit=function(n,e,o,t,r,i){var a=OP.events[n];if(a&&a.length)for(var s=0;s<a.length;s++)a[s](e,o,t,r,i)},OP.done=function(o,t,r){'function'==typeof o&&(r=t,t=o,o=null),null==r&&(r=!0);var i=window.M&&window.M.scope?window.M.scope():null;return function(n,e){r&&OP.loading(!1,500),i&&window.M.scope(i),!n&&e&&(n=[{name:'network',error:e}]),n instanceof Array?OP.send('done',n):(o&&OP.send('done',o),t&&t(n,e))}},OP.resume=function(o,t){var r=window.M&&window.M.scope?window.M.scope():null;return function(n,e){r&&window.M.scope(r),t&&OP.loading(!1,500),!n&&e&&(n=[{name:'network',error:e}]),n instanceof Array?OP.send('done',n):'function'==typeof o?o(n):SETR(o,n)}},window.addEventListener('message',function(n){try{var e=JSON.parse(n.data);if(!e.openplatform)return;OP.ready||'verify'===e.type?OP.$process(e):OP.pending.push(e)}catch(n){}},!1),OP.link=function(n,e){var o='OPLINKINPUT',t=window[o];t||((t=document.createElement('INPUT')).style='position:absolute;left:-100px;top:-100px;opacity:0',document.body.appendChild(t),window[o]=t),e=(e=JSON.stringify({id:OP.id,path:n,data:e})).substring(1,e.length-1);var r=OP.openplatformurl+'?share='+btoa(encodeURIComponent(e)).replace(/=/g,'');return setTimeout(function(){t.value=r,t.focus(),t.select(),document.execCommand('copy')},100),r},OP.tokenizator=function(n){var e=n.indexOf('?');return-1===e?n+'?openplatform='+OP.token:n.substring(0,e+1)+'openplatform='+OP.token+'&'+n.substring(e+1)},window.history&&(history.pushState(null,null,location.href),window.onpopstate=function(){history.go(1)});