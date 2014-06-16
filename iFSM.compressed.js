/*
 Intersel 2013-2014
 @fileoverview : iFSM : a finite state machine with jQuery
 @see {@link https://github.com/intersel/iFSM}
 @author : Emmanuel Podvin - emmanuel.podvin@intersel.fr
 @version : 1.6.2
 -----------------------------------------------------------------------------------------
*/
(function(f){function x(a){function c(a){return a.replace(/\-([a-z])/gi,function(a,b){return b.toUpperCase()})}for(var b=" -moz- -webkit- -o- -ms- -khtml-".split(" "),d=document.documentElement,e=0;e<b.length;e++){var f=c(b[e]+a);"Ms"==f.substr(0,2)&&(f="m"+f.substr(1));if(f in d.style)return f}}function q(a,c,b){var d={};d.data=b;d.target=a;d.currentTarget=a;d.type=c;d.stopPropagation=function(){return!0};return d}var t=0,l=window.fsm_manager=function(a,c,b){t+=1;void 0==b&&(b=null);this.opts=jQuery.extend({},
{debug:!0,LogLevel:2,AlertError:!1,maxPushEvent:100,startEvent:"start",prefixFsmName:"FSM_",logFSM:""},b||{});this.FSMName=this.opts.prefixFsmName+t;this._stateDefinition=jQuery.extend(!0,{},c);this.currentEvent=this.currentState="";this.pushStateList=[];this.processEventStatus="idle";this.pushEventList=[];this.myUIObject=a;this.listEvents={};this.currentDataEvent={};this.returnGeneralEventStatus=!0;void 0==this.opts.rootMachine&&(this.opts.rootMachine=this);this.rootMachine=this.opts.rootMachine;
this.parentMachine=void 0==this.opts.nextParent?null:this.opts.nextParent;this.opts.nextParent=this;this.childrenMachine=[];this.parentMachine&&this.parentMachine.childrenMachine.push(this);var d,e;b=c="";var l=f(document),h=!1,g=!1,k=[],q=!1;for(d in this._stateDefinition)for(e in"string"==typeof this._stateDefinition[d]&&(this._stateDefinition[d]=this._stateDefinition[this._stateDefinition[d]]),this._stateDefinition[d])this.rootMachine.listEvents[e]||"delegate_machines"==e||e==this.opts.startEvent?
e==this.opts.startEvent&&(q=!0):(this.listEvents[e]=e,this!=this.rootMachine&&(this.rootMachine.listEvents[e]=e),"string"==typeof this._stateDefinition[d][e]&&(this._stateDefinition[d][e]=this._stateDefinition[d][this._stateDefinition[d][e]]));d="";for(e in this.listEvents)d=e.split("_"),"attrchange"==d[0]&&(h=!0,k.push(e),"style"==d[1]&&2<d.length&&(g=!0)),c=c+b+e,b=" ";if(null==a.selector||""==a.selector&&a.attr("id"))a.selector="#"+a.attr("id");if(h&&a.selector){var u,s={},v,r={},m,n,p;f(a.selector).attrchange({trackValues:!0,
callback:function(a){0<=jQuery.inArray("attrchange",k)&&f(this).trigger("attrchange",a);0<=jQuery.inArray("attrchange_"+a.attributeName,k)&&f(this).trigger("attrchange_"+a.attributeName,{newValue:a.newValue,oldValue:a.oldValue});if("style"==a.attributeName&&g){u=a.newValue?a.newValue.split(";"):[];v=a.oldValue?a.oldValue.split(";"):[];for(n=0;n<u.length;n++)m=u[n].split(":"),2==m.length&&(s[m[0]]=m[1].replace(/^\s+/g,"").replace(/\s+$/g,""));for(n=0;n<v.length;n++)m=v[n].split(":"),2==m.length&&(r[m[0]]=
m[1].replace(/^\s+/g,"").replace(/\s+$/g,""));for(p in s)(void 0==r[p]||r[p]&&r[p]!=s[p])&&f(this).trigger("attrchange_style_"+x(p),{newValue:s[p],oldValue:r[p]})}}})}f.isWindow(a[0])&&(l=f(window));var w=this.rootMachine;if(""!=c)l.on(c,a.selector,function(a,b){w.returnGeneralEventStatus=!0;w.processEvent(a.type,arguments);return w.returnGeneralEventStatus});if(q){var y=this;l.on(this.opts.startEvent,a.selector,function(a,b){y.processEvent(a.type,arguments)})}this._log("new fsm_manager:"+this.FSMName+
"-"+a.selector,2)};l.prototype.InitManager=function(a){this._log("InitManager");this.currentState=void 0==a?"DefaultState":a;void 0==this._stateDefinition.DefaultState&&(this._stateDefinition.DefaultState={});null==this.parentMachine?this.trigger(this.opts.startEvent):(a=[],a[0]=q(this.myUIObject,this.opts.startEvent,null),this.processEvent(this.opts.startEvent,a,!0))};l.prototype.processEvent=function(a,c,b){var d=this.currentState,e=this.currentUIEvent=c[0];this.currentDataEvent=c;this.currentEvent=
e;var k=this.currentState,h=void 0==b?!1:!0;this._log("processEvent: anEvent (currentState) machine name ---\x3e "+a+"("+d+")-"+this.FSMName,2);if(1<c.length&&c[c.length-1].targetFSM&&c[c.length-1].targetFSM!=this&&c[c.length-1].targetFSM.rootMachine!=this.rootMachine)this._log("processEvent: not for the current machine ---\x3e exit",2);else if(void 0==this._stateDefinition[d])this._log("processEvent: currentState does not exist! ---\x3e ("+d+")",1);else{if("enterState"==a||"exitState"==a)h=!0;if(this.myUIObject.is(e.currentTarget)||
this.myUIObject.is(e.target)||this.myUIObject[0]==document||f.isWindow(e.currentTarget)||f.isWindow(e.target))if(this.actualTarget=this.myUIObject[0]==document?f(document):f(e.currentTarget),b=null,b=this._stateDefinition[d][a],!1==h&&"idle"!=this.processEventStatus&&(void 0==b||b&&void 0==b.how_process_event||b&&b.how_process_event&&void 0==b.how_process_event.immediate&&void 0==b.how_process_event.delay))this._log("processEvent: Push anEvent (lastevent)---\x3e "+a+" ("+this.lastevent+")",2),this.pushEvent(a,
c);else{this.lastevent=d+"-"+a;if(this._stateDefinition[d].delegate_machines){var g;for(aSubMachine in this._stateDefinition[d].delegate_machines)if(this._log("processEvent: delegate to submachine---\x3e "+aSubMachine),g=this._stateDefinition[d].delegate_machines[aSubMachine],void 0==g.myFSM&&(this._log("processEvent: process submachine ---\x3e create FSM for the submachine "+aSubMachine,2),this._stateDefinition[d].delegate_machines[aSubMachine].myFSM=new l(this.myUIObject,g.submachine,this.opts),
this._stateDefinition[d].delegate_machines[aSubMachine].myFSM.opts.FSMParent=this),"enterState"==a)""!=g.myFSM.currentState&&void 0!=g.no_reinitialisation&&!1!=g.no_reinitialisation||g.myFSM.InitManager();else if("exitState"==a)g.myFSM.trigger("exitMachine"),g.myFSM.cancelDelayedProcess();else if(this._log("processEvent: process submachine (event)---\x3e "+aSubMachine+"("+a+")",2),g.myFSM.processEvent(a,c),this._log("processEvent: process submachine (event)---\x3e "+aSubMachine+"("+a+") processed",
2),g.myFSM._stateDefinition[g.myFSM.currentState][a]&&g.myFSM._stateDefinition[g.myFSM.currentState][a].prevent_bubble||g.myFSM._stateDefinition.DefaultState[a]&&g.myFSM._stateDefinition.DefaultState[a].prevent_bubble||a==this.opts.startEvent){this._log("processEvent: submachine processed and direct exit ",2);this.cleanExitProcess();return}}if(void 0==b){b=this._stateDefinition.DefaultState[a];if(void 0==b){this._log("processEvent: Event does not exist? "+a+"("+k+")");this.cleanExitProcess();return}k=
"DefaultState"}b.pushpop_state&&"PopState"==b.pushpop_state&&0<this.pushStateList.length&&(b.next_state=this.pushStateList[this.pushStateList.length-1]);b.pushpop_state_if_error&&"PopState"==b.pushpop_state_if_error&&0<this.pushStateList.length&&(b.next_state_if_error=this.pushStateList[this.pushStateList.length-1]);if(this.myUIObject.is(e.target)||this.myUIObject[0]==document||f.isWindow(e.currentTarget)||f.isWindow(e.target)||!b.process_on_UItarget||!0!=b.process_on_UItarget)if(b.UI_event_bubble&&
!1!=b.UI_event_bubble||(e.stopPropagation(),this.returnGeneralEventStatus=!1,this.rootMachine.returnGeneralEventStatus=!1),!1==h&&b&&b.how_process_event&&b.how_process_event.delay)this._log("processEvent: Event delayed "+a,2),this.delayProcess(a,b.how_process_event.delay,c),this.cleanExitProcess();else if(void 0==this._stateDefinition[k][a].EventIteration&&(this._stateDefinition[k][a].EventIteration=0),this._stateDefinition[k][a].EventIteration++,this.EventIteration=this._stateDefinition[k][a].EventIteration,
b.process_event_if&&!1==eval(b.process_event_if))this._log("processEvent: event not allowed to process "),b.propagate_event_on_refused&&(this._log("processEvent: propagate_event_on_refused ---\x3e "+a+"-"+b.propagate_event_on_refused),this.trigger(b.propagate_event_on_refused)),this.cleanExitProcess();else{e=this.processEventStatus;this.processEventStatus="processing";h=!0;b.init_function&&(h=[].slice.call(c),h.unshift(b.properties_init_function),h=b.init_function.apply(this,h),this._log("processEvent: anEvent / function done ---\x3e "+
a));g=[];g[0]=q(this.myUIObject,"",null);if(!1!=h&&b.pushpop_state)switch(b.pushpop_state){case "PushState":this._log("processEvent: Push state:"+this.currentState);this.pushStateList.push(this.currentState);break;case "PopState":0<this.pushStateList.length&&(this._log("processEvent: Pop state:"+b.next_state),this.pushStateList.pop())}if(!1!=h&&b.next_state&&d!=b.next_state&&(void 0==b.next_state_when&&void 0==b.next_state_on_target||b.next_state_when&&!0==eval(b.next_state_when)||b.next_state_on_target&&
!0==this.subMachinesRespectTargets(a)))this._stateDefinition[k][a].EventIteration=0,this.cancelDelayedProcess(),g[0].type="exitState",a!=this.opts.startEvent&&this.processEvent("exitState",g,!0),this.currentState=b.next_state,g[0].type="enterState",this.processEvent("enterState",g,!0),this._log("processEvent: new state ---\x3e "+this.currentState),void 0!=b.propagate_event&&(this._log("processEvent: trigger event ---\x3e "+a+"-"+b.propagate_event),!0===b.propagate_event?this.trigger(a,c[1]):this.trigger(b.propagate_event,
c[1]));else if(!1!=h&&void 0!=b.propagate_event)this._log("processEvent: trigger event same state ---\x3e "+a+"-"+b.propagate_event),!0===b.propagate_event?this.trigger(a,c[1]):b.propagate_event!=a&&this.trigger(b.propagate_event,c[1]);else if(!1==h&&b.next_state_if_error){this._log("processEvent: error state ---\x3e "+this.currentState);if(b.pushpop_state_if_error)switch(b.pushpop_state_if_error){case "PushState":this._log("processEvent: Push state:"+this.currentState);this.pushStateList.push(this.currentState);
break;case "PopState":0<this.pushStateList.length&&(this._log("processEvent: Pop state:"+b.next_state_if_error),this.pushStateList.pop())}this.currentState=b.next_state_if_error;this._log("processEvent: new state ---\x3e "+this.currentState);g[0].type="enterState";this.processEvent("enterState",g,!0)}b.out_function&&(h=[].slice.call(c),h.unshift(b.properties_out_function),b.out_function.apply(this,h),this._log("processEvent: end out---\x3e "+a));this.processEventStatus=e;this.cleanExitProcess();this._log("processEvent: exit:"+
a)}else this.cleanExitProcess()}else this._log("processEvent: object not a good target  ---\x3e "+f(e.currentTarget).attr("id"),2)}};l.prototype.cleanExitProcess=function(a,c){this.pushEventList.length&&("idle"==this.processEventStatus||this.pushEventList.length>this.opts.maxPushEvent)&&this.popEvent()};l.prototype.pushEvent=function(a,c){this._log("pushEvent:  ---\x3e "+a);if(this.pushEventList.length>this.opts.maxPushEvent)this._log("pushEvent: too much events...  ---\x3e "+this.pushEventList.length,
2);else{if(void 0==c||0==c.length||void 0==c[0].type){var b=[];b[0]=q(this.myUIObject,a);b[1]=c;c=b}this.pushEventList.push({anEvent:a,data:c});this._log("pushEvent: push  nb event ---\x3e "+this.pushEventList.length)}};l.prototype.popEvent=function(){this._log("popEvent");if(0<this.pushEventList.length){anEventToProcess=this.pushEventList.shift();this._log("popEvent:"+anEventToProcess.anEvent,2);if(void 0==anEventToProcess||void 0==anEventToProcess.anEvent)return!1;this.processEvent(anEventToProcess.anEvent,
anEventToProcess.data);return!0}this._log("popEvent void list");return!1};l.prototype.delayProcess=function(a,c,b){this._log("delayProcess:  ---\x3e "+a);jQuery.doTimeout(this.myUIObject.attr("id")+this._stateDefinition[this.currentState]+a,c,fsm_manager_launchProcess,this,a,b)};l.prototype.cancelDelayedProcess=function(){this._log("cancelDelayedProcess:  ---\x3e ");var a;for(aEvent in this._stateDefinition[this.currentState])a=this._stateDefinition[this.currentState][aEvent],!a.how_process_event||
void 0!=a.how_process_event.preventcancel&&!0==a.how_process_event.preventcancel||jQuery.doTimeout(this._stateDefinition[this.currentState]+aEvent)};l.prototype.trigger=function(a){var c=Array.prototype.slice.call(arguments);c.push({targetFSM:this});c.shift();this.myUIObject.trigger(a,c)};l.prototype.subMachinesRespectTargets=function(a){this._log("subMachinesRespectTargets:");var c=this._stateDefinition[this.currentState];a=c[a].next_state_on_target;var b=a.condition,d="||"==b?!1:!0,e=a.submachines;
for(aSubMachine in e)if(e=-1<a.submachines[aSubMachine].target_list.indexOf(c.delegate_machines[aSubMachine].myFSM.currentState),void 0!=a.submachines[aSubMachine].condition&&"not"==a.submachines[aSubMachine].condition&&(e=!e),"||"==b){if(d=d||e,!0==d)break}else if("&&"==b){if(d=d&&e,!1==d)break}else{this._log("operator unknown"+b);break}return d};l.prototype._log=function(a){!this.opts.debug||1<arguments.length&&arguments[1]>this.opts.LogLevel||1>=arguments.length&&3>this.opts.LogLevel||this.opts.logFSM&&
0>this.opts.logFSM.indexOf(this.FSMName)||!window.console||!console.log||(console.log("[fsm] "+a),1==arguments[1]&&this.opts.AlertError&&alert(a))};fsm_manager_triggerMe=function(a,c,b){this._log("[fsm_manager_triggerMe]"+f(a.objectToTrigger).attr("id")+"-"+a.eventNameToTrigger);f(a.objectToTrigger).trigger(a.eventNameToTrigger)};fsm_manager_launchProcess=function(a,c,b){a._log("launchProcess:  ---\x3e "+c);a.processEvent(c,b,!0)};var k={};f.fn.iFSM=function(a,c){return this.each(function(){var b=
new l(f(this),a,c);void 0!=f(this).attr("id")&&(void 0==k[f(this).attr("id")]&&(k[f(this).attr("id")]=[]),k[f(this).attr("id")].push(b));c&&void 0!=c.initState?b.InitManager(c.initState):b.InitManager()})};f.fn.getFSM=function(a){if(1!=this.length||void 0==this.attr("id"))return[];if(void 0==a)return k[f(this).attr("id")];for(var c=null,b=0,d=null;b<k[f(this).attr("id")].length;b++)if(d=k[f(this).attr("id")][b],d._stateDefinition==a){c=d;break}return c}})(jQuery);
