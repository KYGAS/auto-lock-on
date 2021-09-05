"use strict";module.exports=function C(a){let t=[],d=false,f={},o=[],r=[],u=[],c=[],g=[],m=[],i=-1,s=null;const n={444:[2201],3037:[2201]};const l={3105:[1e3],3205:[1e3],444:[1e3,1001,2e3,2001],3037:[1e3,1001,2e3,2001],2105:[1e3,1001,1002,1003,2e3],3102:[1e3,1001,1002,1003],3202:[1e3,1001,1002,1003]};a.command.add("autoheal",e=>{if(e)e=e.toLowerCase();if(e==null){a.settings.autoHeal=!a.settings.autoHeal}else if(e==="off"){a.settings.autoHeal=false}else if(e==="on"){a.settings.autoHeal=true}else if(e==="debug"){d=!d;a.command.message("Debug "+(d?"enabled":"disabled"));return}else if(e==="test"){A(0);return}else if(!isNaN(e)){a.settings.autoHeal=true;a.settings.hpCutoff=e<0?0:e>100?100:e}else{a.command.message(e+" is an invalid argument");return}a.command.message("Healing "+(a.settings.autoHeal?"enabled ("+a.settings.hpCutoff+"%)":"disabled"))});a.command.add("autocleanse",e=>{if(e)e=e.toLowerCase();if(e==null){a.settings.autoCleanse=!a.settings.autoCleanse}else if(e==="off"){a.settings.autoCleanse=false}else if(e==="on"){a.settings.autoCleanse=true}else{a.command.message(e+" is an invalid argument for cleanse command");return}a.command.message("Cleansing "+(a.settings.autoCleanse?"enabled":"disabled"))});a.command.add("autocast",e=>{if(e)e=e.toLowerCase();if(e==null){a.settings.autoCast=!a.settings.autoCast}else if(e==="off"){a.settings.autoCast=false}else if(e==="on"){a.settings.autoCast=true}else{a.command.message(e+" is an invalid argument for cast command");return}a.command.message("Casting "+(a.settings.autoCast?"enabled":"disabled"))});a.command.add("autodebuff",e=>{if(e)e=e.toLowerCase();if(e==null){a.settings.autoDebuff=!a.settings.autoDebuff}else if(e==="off"){a.settings.autoDebuff=false}else if(e==="on"){a.settings.autoDebuff=true}else{a.command.message(e+" is an invalid argument for cast command");return}a.command.message("Debuffing "+(a.settings.autoCast?"enabled":"disabled"))});a.game.on("enter_game",()=>{i=(a.game.me.templateId-10101)%100;a.settings.allySkills[i]||a.settings.enemySkills[i]?I():_()});function e(){t.push(a.hook(...arguments))}function _(){if(t.length){for(let e of t)a.unhook(e);t=[]}}function I(){if(!t.length){e("S_PARTY_MEMBER_LIST",9,e=>{const i=o;o=e.members.filter(e=>e.playerId!=a.game.me.playerId);if(i){for(let t=0;t<o.length;t++){const s=i.find(e=>e.playerId==o[t].playerId);if(s){o[t].gameId=s.gameId;if(s.loc)o[t].loc=s.loc}}}});e("S_LEAVE_PARTY",1,e=>{o=[]});e("C_PLAYER_LOCATION",5,e=>{f=e});e("S_SPAWN_ME",3,e=>{f.loc=e.loc;f.w=e.w});e("S_SPAWN_USER",17,t=>{if(o.length!=0){let e=o.find(e=>e.playerId===t.playerId);if(e){e.gameId=t.gameId;e.loc=t.loc;e.alive=t.alive;e.hpP=t.alive?100:0}}});e("S_USER_LOCATION",6,t=>{let e=o.find(e=>e.gameId===t.gameId);if(e)e.loc=t.loc});e("S_USER_LOCATION_IN_ACTION",2,t=>{let e=o.find(e=>e.gameId===t.gameId);if(e)e.loc=t.loc});e("S_INSTANT_DASH",3,t=>{let e=o.find(e=>e.gameId===t.gameId);if(e)e.loc=t.loc});e("S_PARTY_MEMBER_CHANGE_HP",4,t=>{if(a.game.me.playerId==t.playerId)return;let e=o.find(e=>e.playerId===t.playerId);if(e){e.hpP=Number(t.currentHp)/Number(t.maxHp)*100}});e("S_PARTY_MEMBER_STAT_UPDATE",4,t=>{if(a.game.me.playerId==t.playerId)return;let e=o.find(e=>e.playerId===t.playerId);if(e){e.hpP=Number(t.hp)/Number(t.maxHp)*100;e.alive=t.alive}});e("S_DEAD_LOCATION",2,t=>{let e=o.find(e=>e.gameId===t.gameId);if(e){e.loc=t.loc;e.hpP=0;e.alive=false}});e("S_LEAVE_PARTY_MEMBER",2,t=>{o=o.filter(e=>e.playerId!=t.playerId)});e("S_LOGOUT_PARTY_MEMBER",1,t=>{let e=o.find(e=>e.playerId===t.playerId);if(e)e.online=false});e("S_BAN_PARTY_MEMBER",1,t=>{o=o.filter(e=>e.playerId!=t.playerId)});e("S_BOSS_GAGE_INFO",3,e=>{const t=r.indexOf(e.id);if(t>-1){r.splice(t,1)}r.push(e.id)});e("S_SPAWN_NPC",12,e=>{if(n[e.huntingZoneId])if(n[e.huntingZoneId].includes(e.templateId))u.push(e.gameId);if(l[e.huntingZoneId])if(l[e.huntingZoneId].includes(e.templateId))g.push(e.gameId);m[e.gameId]=e.loc});e("S_DESPAWN_NPC",3,e=>{const t=r.indexOf(e.gameId);if(t>-1){r.splice(t,1)}const i=u.indexOf(e.gameId);if(i>-1){u.splice(i,1)}const s=g.indexOf(e.gameId);if(s>-1){g.splice(s,1)}const n=c.indexOf(e.gameId);if(n>-1){c.splice(n,1)}const l=m.indexOf(e.gameId);if(l>-1){m.splice(l,1)}});e("S_NPC_LOCATION",3,e=>{m[e.gameId]=e.loc});e("S_LOAD_TOPO","event",e=>{r=[];u=[];g=[];m=[];c=[]});e("S_NPC_STATUS",2,e=>{if(!e.enraged)return;const t=u.indexOf(e.gameId);if(t>-1){u.splice(t,1)}const i=c.indexOf(e.gameId);if(i>-1){c.splice(i,1)}});e("S_ABNORMALITY_BEGIN",5,e=>{if(![30372204].includes(e.id))return;const t=u.indexOf(e.target);if(t>-1){u.splice(t,1)}const i=c.indexOf(e.target);if(i>-1){c.splice(i,1)}});e("S_ABNORMALITY_BEGIN",5,e=>{if(![701101,801202].includes(e.id))return;const t=u.indexOf(e.target);if(t>-1){c.push(u.splice(t,1)[0])}});e("S_ABNORMALITY_END",1,e=>{if(![701101,801202].includes(e.id))return;const t=c.indexOf(e.target);if(t>-1){u.push(c.splice(t,1)[0])}});e("C_START_SKILL",7,{order:-Infinity,filter:{fake:false}},n=>{if(o.length==0)return;if(n.skill.id/10&1!=0){f.w=n.w;return}let l=Math.floor(n.skill.id/1e4);if(a.settings.allySkills[i]&&a.settings.allySkills[i].includes(l)){if(l!=9&&!a.settings.autoHeal)return;if(l==9&&!a.settings.autoCleanse)return;let i=[];let s=p(l);if(l!=9)h();for(let e=0,t=o.length;e<t;e++){if(o[e].online&&o[e].alive&&o[e].hpP!=undefined&&o[e].hpP!=0&&(l==9?true:o[e].hpP<=a.settings.hpCutoff)&&o[e].loc!=undefined&&o[e].loc.dist3D(f.loc)/25<=a.settings.maxDistance){i.push(o[e]);if(i.length==s)break}}if(i.length>0){if(d)A(n.skill);for(let e=0,t=i.length;e<t;e++){setTimeout(()=>{a.send("C_CAN_LOCKON_TARGET",3,{target:i[e].gameId,skill:n.skill.id})},a.settings.lockSpeed)}if(a.settings.autoCast){setTimeout(()=>{a.send("C_START_SKILL",7,Object.assign({},n,{w:f.w,skill:n.skill.id+10}))},Math.max(a.settings.castSpeed,a.settings.lockSpeed+10))}}}});e("C_START_SKILL",7,{order:-Infinity,filter:{fake:false}},l=>{if(l.skill.id/10&1!=0){f.w=l.w;return}let e=Math.floor(l.skill.id/1e4);if(a.settings.enemySkills[i]&&a.settings.enemySkills[i].includes(e)){if(!a.settings.autoDebuff)return;let i=[];let s=p(e);switch(e){case 41:case 35:case 24:i=i.concat(r);break;case 30:i=i.concat(g);break;case 28:case 33:i=i.concat(u);break;default:return}if(i.length==0)return;let n=[];for(let e=0,t=i.length;e<t;e++){if(m[i[e]]!=undefined&&m[i[e]].dist3D(f.loc)/25<=a.settings.maxDistance){n.push(i[e]);if(n.length==s)break}}if(n.length>0){if(d)A(l.skill);for(let e=0,t=n.length;e<t;e++){setTimeout(()=>{a.send("C_CAN_LOCKON_TARGET",3,{target:n[e],skill:l.skill.id})},a.settings.lockSpeed)}if(a.settings.autoCast){setTimeout(()=>{a.send("C_START_SKILL",7,Object.assign({},l,{w:f.w,skill:l.skill.id+10}))},Math.max(a.settings.castSpeed,a.settings.lockSpeed+10))}}}});e("S_CREST_INFO",2,e=>{s=e.crests});e("S_CREST_APPLY",2,t=>{let e=s.find(e=>e.id==t.id);if(e)e.enable=t.enable})}}function p(e){switch(e){case 41:return 1;case 37:return 1;case 35:return 1;case 33:return 1;case 30:return 1;case 28:return 1;case 24:return S(27040)?5:4;case 19:return S(28003)?4:2;case 9:return S(27063)||S(27003)?5:3;case 5:return S(27e3)?4:2}return 1}function S(t){let e=s.find(e=>e.id==t&&e.enable);if(e)return true;else return false}function h(){o.sort(function(e,t){return parseFloat(e.hpP)-parseFloat(t.hpP)})}function A(e){let d="\nAutoheal Debug... Skill: "+e.id+"\tpartyMemebers.length: "+o.length;for(let a=0;a<o.length;a++){d+="\n"+a+"\t";let e=o[a].name;e+=" ".repeat(21-e.length);let t="\tHP: "+parseFloat(o[a].hpP).toFixed(2);let i="\tundefined";if(o[a].loc)i="\tDist: "+(o[a].loc.dist3D(f.loc)/25).toFixed(2);let s="\tOnline: "+o[a].online;let n="\tAlive: "+o[a].alive;let l="\tpid: "+o[a].playerId+"  gid: "+o[a].gameId;d+=e+t+i+s+n+l}console.log(d)}};