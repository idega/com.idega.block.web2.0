-/*

2 	  	

- * Tabs 3 - New Wave Tabs

3 	  	

- *

4 	  	

- * Copyright (c) 2007 Klaus Hartl (stilbuero.de)

5 	  	

- * Dual licensed under the MIT (MIT-LICENSE.txt)

6 	  	

- * and GPL (GPL-LICENSE.txt) licenses.

7 	  	

- *

8 	  	

- * http://docs.jquery.com/UI/Tabs

9 	  	

- */

10 	  	

-

11 	  	

-(function($) {

12 	  	

-

13 	  	

-    // if the UI scope is not availalable, add it

14 	  	

-    $.ui = $.ui || {};

15 	  	

-

16 	  	

-    // tabs API methods

17 	  	

-    $.fn.tabs = function() {

18 	  	

-        var method = typeof arguments[0] == 'string' && arguments[0];

19 	  	

-        var args = method && Array.prototype.slice.call(arguments, 1) || arguments;

20 	  	

-

21 	  	

-        return this.each(function() {

22 	  	

-            if (method) {

23 	  	

-                var tabs = $.data(this, 'ui-tabs');

24 	  	

-                tabs[method].apply(tabs, args);

25 	  	

-            } else

26 	  	

-                new $.ui.tabs(this, args[0] || {});

27 	  	

-        });

28 	  	

-    };

29 	  	

-

30 	  	

-    // tabs class

31 	  	

-    $.ui.tabs = function(el, options) {

32 	  	

-        var self = this;

33 	  	

-

34 	  	

-        this.element = el;

35 	  	

-

36 	  	

-        this.options = $.extend({

37 	  	

-

38 	  	

-            // basic setup

39 	  	

-            selected: 0,

40 	  	

-            unselect: options.selected === null,

41 	  	

-            event: 'click',

42 	  	

-            disabled: [],

43 	  	

-            cookie: null, // pass options object as expected by cookie plugin: { expires: 7, path: '/', domain: 'jquery.com', secure: true }

44 	  	

-            // TODO bookmarkable: $.ajaxHistory ? true : false,

45 	  	

-

46 	  	

-            // Ajax

47 	  	

-            spinner: 'Loading&#8230;',

48 	  	

-            cache: false,

49 	  	

-            idPrefix: 'ui-tabs-',

50 	  	

-            ajaxOptions: {},

51 	  	

-

52 	  	

-            // animations

53 	  	

-            fx: null, /* e.g. { height: 'toggle', opacity: 'toggle', duration: 200 } */

54 	  	

-

55 	  	

-            // templates

56 	  	

-            tabTemplate: '<li><a href="#{href}"><span>#{label}</span></a></li>',

57 	  	

-            panelTemplate: '<div></div>',

58 	  	

-

59 	  	

-            // CSS classes

60 	  	

-            navClass: 'ui-tabs-nav',

61 	  	

-            selectedClass: 'ui-tabs-selected',

62 	  	

-            unselectClass: 'ui-tabs-unselect',

63 	  	

-            disabledClass: 'ui-tabs-disabled',

64 	  	

-            panelClass: 'ui-tabs-panel',

65 	  	

-            hideClass: 'ui-tabs-hide',

66 	  	

-            loadingClass: 'ui-tabs-loading'

67 	  	

-

68 	  	

-        }, options);

69 	  	

-

70 	  	

-        this.options.event += '.ui-tabs'; // namespace event

71 	  	

-        this.options.cookie = $.cookie && $.cookie.constructor == Function && this.options.cookie;

72 	  	

-

73 	  	

-        $(el).bind('setData.ui-tabs', function(event, key, value) {

74 	  	

-            self.options[key] = value;

75 	  	

-            this.tabify();

76 	  	

-        }).bind('getData.ui-tabs', function(event, key) {

77 	  	

-            return self.options[key];

78 	  	

-        });

79 	  	

-

80 	  	

-        // save instance for later

81 	  	

-        $.data(el, 'ui-tabs', this);

82 	  	

-

83 	  	

-        // create tabs

84 	  	

-        this.tabify(true);

85 	  	

-    };

86 	  	

-

87 	  	

-    // instance methods

88 	  	

-    $.extend($.ui.tabs.prototype, {

89 	  	

-        tabId: function(a) {

90 	  	

-            return a.title && a.title.replace(/\s/g, '_').replace(/[^A-Za-z0-9\-_:\.]/g, '')

91 	  	

-                || this.options.idPrefix + $.data(a);

92 	  	

-        },

93 	  	

-        ui: function(tab, panel) {

94 	  	

-            return {

95 	  	

-                instance: this,

96 	  	

-                options: this.options,

97 	  	

-                tab: tab,

98 	  	

-                panel: panel

99 	  	

-            };

100 	  	

-        },

101 	  	

-        tabify: function(init) {

102 	  	

-

103 	  	

-            this.$lis = $('li:has(a[href])', this.element);

104 	  	

-            this.$tabs = this.$lis.map(function() { return $('a', this)[0]; });

105 	  	

-            this.$panels = $([]);

106 	  	

-

107 	  	

-            var self = this, o = this.options;

108 	  	

-

109 	  	

-            this.$tabs.each(function(i, a) {

110 	  	

-                // inline tab

111 	  	

-                if (a.hash && a.hash.replace('#', '')) // Safari 2 reports '#' for an empty hash

112 	  	

-                    self.$panels = self.$panels.add(a.hash);

113 	  	

-                // remote tab

114 	  	

-                else if ($(a).attr('href') != '#') { // prevent loading the page itself if href is just "#"

115 	  	

-                    $.data(a, 'href.ui-tabs', a.href); // required for restore on destroy

116 	  	

-                    $.data(a, 'load.ui-tabs', a.href); // mutable

117 	  	

-                    var id = self.tabId(a);

118 	  	

-                    a.href = '#' + id;

119 	  	

-                    var $panel = $('#' + id);

120 	  	

-                    if (!$panel.length) {

121 	  	

-                        $panel = $(o.panelTemplate).attr('id', id).addClass(o.panelClass)

122 	  	

-                            .insertAfter( self.$panels[i - 1] || self.element );

123 	  	

-                        $panel.data('destroy.ui-tabs', true);

124 	  	

-                    }

125 	  	

-                    self.$panels = self.$panels.add( $panel );

126 	  	

-                }

127 	  	

-                // invalid tab href

128 	  	

-                else

129 	  	

-                    o.disabled.push(i + 1);

130 	  	

-            });

131 	  	

-

132 	  	

-            if (init) {

133 	  	

-

134 	  	

-                // attach necessary classes for styling if not present

135 	  	

-                $(this.element).hasClass(o.navClass) || $(this.element).addClass(o.navClass);

136 	  	

-                this.$panels.each(function() {

137 	  	

-                    var $this = $(this);

138 	  	

-                    $this.hasClass(o.panelClass) || $this.addClass(o.panelClass);

139 	  	

-                });

140 	  	

-

141 	  	

-                // disabled tabs

142 	  	

-                for (var i = 0, index; index = o.disabled[i]; i++)

143 	  	

-                    this.disable(index);

144 	  	

-

145 	  	

-                // Try to retrieve selected tab:

146 	  	

-                // 1. from fragment identifier in url if present

147 	  	

-                // 2. from cookie

148 	  	

-                // 3. from selected class attribute on <li>

149 	  	

-                // 4. otherwise use given "selected" option

150 	  	

-                // 5. check if tab is disabled

151 	  	

-                this.$tabs.each(function(i, a) {

152 	  	

-                    if (location.hash) {

153 	  	

-                        if (a.hash == location.hash) {

154 	  	

-                            o.selected = i;

155 	  	

-                            // prevent page scroll to fragment

156 	  	

-                            //if (($.browser.msie || $.browser.opera) && !o.remote) {

157 	  	

-                            if ($.browser.msie || $.browser.opera) {

158 	  	

-                                var $toShow = $(location.hash), toShowId = $toShow.attr('id');

159 	  	

-                                $toShow.attr('id', '');

160 	  	

-                                setTimeout(function() {

161 	  	

-                                    $toShow.attr('id', toShowId); // restore id

162 	  	

-                                }, 500);

163 	  	

-                            }

164 	  	

-                            scrollTo(0, 0);

165 	  	

-                            return false; // break

166 	  	

-                        }

167 	  	

-                    } else if (o.cookie) {

168 	  	

-                        var index = parseInt($.cookie('ui-tabs' + $.data(self.element)),10);

169 	  	

-                        if (index && self.$tabs[index]) {

170 	  	

-                            o.selected = index;

171 	  	

-                            return false; // break

172 	  	

-                        }

173 	  	

-                    } else if ( self.$lis.eq(i).hasClass(o.selectedClass) ) {

174 	  	

-                        o.selected = i;

175 	  	

-                        return false; // break

176 	  	

-                    }

177 	  	

-                });

178 	  	

-                var n = this.$lis.length;

179 	  	

-                while (this.$lis.eq(o.selected).hasClass(o.disabledClass) && n) {

180 	  	

-                    o.selected = ++o.selected < this.$lis.length ? o.selected : 0;

181 	  	

-                    n--;

182 	  	

-                }

183 	  	

-                if (!n) // all tabs disabled, set option unselect to true

184 	  	

-                    o.unselect = true;

185 	  	

-

186 	  	

-                // highlight selected tab

187 	  	

-                this.$panels.addClass(o.hideClass);

188 	  	

-                this.$lis.removeClass(o.selectedClass);

189 	  	

-                if (!o.unselect) {

190 	  	

-                    this.$panels.eq(o.selected).show().removeClass(o.hideClass); // use show and remove class to show in any case no matter how it has been hidden before

191 	  	

-                    this.$lis.eq(o.selected).addClass(o.selectedClass);

192 	  	

-                }

193 	  	

-

194 	  	

-                // load if remote tab

195 	  	

-                var href = !o.unselect && $.data(this.$tabs[o.selected], 'load.ui-tabs');

196 	  	

-                if (href)

197 	  	

-                    this.load(o.selected, href);

198 	  	

-

199 	  	

-                // disable click if event is configured to something else

200 	  	

-                if (!(/^click/).test(o.event))

201 	  	

-                    this.$tabs.bind('click', function(e) { e.preventDefault(); });

202 	  	

-

203 	  	

-            }

204 	  	

-

205 	  	

-            var hideFx, showFx, baseFx = { 'min-width': 0, duration: 1 }, baseDuration = 'normal';

206 	  	

-            if (o.fx && o.fx.constructor == Array)

207 	  	

-                hideFx = o.fx[0] || baseFx, showFx = o.fx[1] || baseFx;

208 	  	

-            else

209 	  	

-                hideFx = showFx = o.fx || baseFx;

210 	  	

-

211 	  	

-            // reset some styles to maintain print style sheets etc.

212 	  	

-            var resetCSS = { display: '', overflow: '', height: '' };

213 	  	

-            if (!$.browser.msie) // not in IE to prevent ClearType font issue

214 	  	

-                resetCSS.opacity = '';

215 	  	

-

216 	  	

-            // Hide a tab, animation prevents browser scrolling to fragment,

217 	  	

-            // $show is optional.

218 	  	

-            function hideTab(clicked, $hide, $show) {

219 	  	

-                $hide.animate(hideFx, hideFx.duration || baseDuration, function() { //

220 	  	

-                    $hide.addClass(o.hideClass).css(resetCSS); // maintain flexible height and accessibility in print etc.

221 	  	

-                    if ($.browser.msie && hideFx.opacity)

222 	  	

-                        $hide[0].style.filter = '';

223 	  	

-                    if ($show)

224 	  	

-                        showTab(clicked, $show, $hide);

225 	  	

-                });

226 	  	

-            }

227 	  	

-

228 	  	

-            // Show a tab, animation prevents browser scrolling to fragment,

229 	  	

-            // $hide is optional.

230 	  	

-            function showTab(clicked, $show, $hide) {

231 	  	

-                if (showFx === baseFx)

232 	  	

-                    $show.css('display', 'block'); // prevent occasionally occuring flicker in Firefox cause by gap between showing and hiding the tab panels

233 	  	

-                $show.animate(showFx, showFx.duration || baseDuration, function() {

234 	  	

-                    $show.removeClass(o.hideClass).css(resetCSS); // maintain flexible height and accessibility in print etc.

235 	  	

-                    if ($.browser.msie && showFx.opacity)

236 	  	

-                        $show[0].style.filter = '';

237 	  	

-

238 	  	

-                    // callback

239 	  	

-                    $(self.element).triggerHandler("show.ui-tabs", [self.ui(clicked, $show[0])]);

240 	  	

-

241 	  	

-                });

242 	  	

-            }

243 	  	

-

244 	  	

-            // switch a tab

245 	  	

-            function switchTab(clicked, $li, $hide, $show) {

246 	  	

-                /*if (o.bookmarkable && trueClick) { // add to history only if true click occured, not a triggered click

247 	  	

-                    $.ajaxHistory.update(clicked.hash);

248 	  	

-                }*/

249 	  	

-                $li.addClass(o.selectedClass)

250 	  	

-                    .siblings().removeClass(o.selectedClass);

251 	  	

-                hideTab(clicked, $hide, $show);

252 	  	

-            }

253 	  	

-

254 	  	

-            // attach tab event handler, unbind to avoid duplicates from former tabifying...

255 	  	

-            this.$tabs.unbind(o.event).bind(o.event, function() {

256 	  	

-

257 	  	

-                //var trueClick = e.clientX; // add to history only if true click occured, not a triggered click

258 	  	

-                var $li = $(this).parents('li:eq(0)'),

259 	  	

-                    $hide = self.$panels.filter(':visible'),

260 	  	

-                    $show = $(this.hash);

261 	  	

-

262 	  	

-                // If tab is already selected and not unselectable or tab disabled or click callback returns false stop here.

263 	  	

-                // Check if click handler returns false last so that it is not executed for a disabled tab!

264 	  	

-                if (($li.hasClass(o.selectedClass) && !o.unselect) || $li.hasClass(o.disabledClass)

265 	  	

-                    || $(self.element).triggerHandler("select.ui-tabs", [self.ui(this, $show[0])]) === false) {

266 	  	

-                    this.blur();

267 	  	

-                    return false;

268 	  	

-                }

269 	  	

-

270 	  	

-                self.options.selected = self.$tabs.index(this);

271 	  	

-

272 	  	

-                // if tab may be closed

273 	  	

-                if (o.unselect) {

274 	  	

-                    if ($li.hasClass(o.selectedClass)) {

275 	  	

-                        self.options.selected = null;

276 	  	

-                        $li.removeClass(o.selectedClass);

277 	  	

-                        self.$panels.stop();

278 	  	

-                        hideTab(this, $hide);

279 	  	

-                        this.blur();

280 	  	

-                        return false;

281 	  	

-                    } else if (!$hide.length) {

282 	  	

-                        self.$panels.stop();

283 	  	

-                        var a = this;

284 	  	

-                        self.load(self.$tabs.index(this), function() {

285 	  	

-                            $li.addClass(o.selectedClass).addClass(o.unselectClass);

286 	  	

-                            showTab(a, $show);

287 	  	

-                        });

288 	  	

-                        this.blur();

289 	  	

-                        return false;

290 	  	

-                    }

291 	  	

-                }

292 	  	

-

293 	  	

-                if (o.cookie)

294 	  	

-                    $.cookie('ui-tabs' + $.data(self.element), self.options.selected, o.cookie);

295 	  	

-

296 	  	

-                // stop possibly running animations

297 	  	

-                self.$panels.stop();

298 	  	

-

299 	  	

-                // show new tab

300 	  	

-                if ($show.length) {

301 	  	

-

302 	  	

-                    // prevent scrollbar scrolling to 0 and than back in IE7, happens only if bookmarking/history is enabled

303 	  	

-                    /*if ($.browser.msie && o.bookmarkable) {

304 	  	

-                        var showId = this.hash.replace('#', '');

305 	  	

-                        $show.attr('id', '');

306 	  	

-                        setTimeout(function() {

307 	  	

-                            $show.attr('id', showId); // restore id

308 	  	

-                        }, 0);

309 	  	

-                    }*/

310 	  	

-

311 	  	

-                    var a = this;

312 	  	

-                    self.load(self.$tabs.index(this), function() {

313 	  	

-                        switchTab(a, $li, $hide, $show);

314 	  	

-                    });

315 	  	

-

316 	  	

-                    // Set scrollbar to saved position - need to use timeout with 0 to prevent browser scroll to target of hash

317 	  	

-                    /*var scrollX = window.pageXOffset || document.documentElement && document.documentElement.scrollLeft || document.body.scrollLeft || 0;

318 	  	

-                    var scrollY = window.pageYOffset || document.documentElement && document.documentElement.scrollTop || document.body.scrollTop || 0;

319 	  	

-                    setTimeout(function() {

320 	  	

-                        scrollTo(scrollX, scrollY);

321 	  	

-                    }, 0);*/

322 	  	

-

323 	  	

-                } else

324 	  	

-                    throw 'jQuery UI Tabs: Mismatching fragment identifier.';

325 	  	

-

326 	  	

-                // Prevent IE from keeping other link focussed when using the back button

327 	  	

-                // and remove dotted border from clicked link. This is controlled in modern

328 	  	

-                // browsers via CSS, also blur removes focus from address bar in Firefox

329 	  	

-                // which can become a usability and annoying problem with tabsRotate.

330 	  	

-                if ($.browser.msie)

331 	  	

-                    this.blur();

332 	  	

-

333 	  	

-                //return o.bookmarkable && !!trueClick; // convert trueClick == undefined to Boolean required in IE

334 	  	

-                return false;

335 	  	

-

336 	  	

-            });

337 	  	

-

338 	  	

-        },

339 	  	

-        add: function(url, label, index) {

340 	  	

-            if (url && label) {

341 	  	

-                index = index || this.$tabs.length; // append by default

342 	  	

-

343 	  	

-                var o = this.options;

344 	  	

-                var $li = $(o.tabTemplate.replace(/#\{href\}/, url).replace(/#\{label\}/, label));

345 	  	

-                $li.data('destroy.ui-tabs', true);

346 	  	

-

347 	  	

-                var id = url.indexOf('#') == 0 ? url.replace('#', '') : this.tabId( $('a:first-child', $li)[0] );

348 	  	

-

349 	  	

-                // try to find an existing element before creating a new one

350 	  	

-                var $panel = $('#' + id);

351 	  	

-                if (!$panel.length) {

352 	  	

-                    $panel = $(o.panelTemplate).attr('id', id)

353 	  	

-                        .addClass(o.panelClass).addClass(o.hideClass);

354 	  	

-                    $panel.data('destroy.ui-tabs', true);

355 	  	

-                }

356 	  	

-                if (index >= this.$lis.length) {

357 	  	

-                    $li.appendTo(this.element);

358 	  	

-                    $panel.appendTo(this.element.parentNode);

359 	  	

-                } else {

360 	  	

-                    $li.insertBefore(this.$lis[index]);

361 	  	

-                    $panel.insertBefore(this.$panels[index]);

362 	  	

-                }

363 	  	

-

364 	  	

-                this.tabify();

365 	  	

-

366 	  	

-                if (this.$tabs.length == 1) {

367 	  	

-                     $li.addClass(o.selectedClass);

368 	  	

-                     $panel.removeClass(o.hideClass);

369 	  	

-                     var href = $.data(this.$tabs[0], 'load.ui-tabs');

370 	  	

-                     if (href)

371 	  	

-                         this.load(index, href);

372 	  	

-                }

373 	  	

-

374 	  	

-                // callback

375 	  	

-                $(this.element).triggerHandler("add.ui-tabs",

376 	  	

-                    [this.ui(this.$tabs[index], this.$panels[index])]

377 	  	

-                );

378 	  	

-

379 	  	

-            } else

380 	  	

-                throw 'jQuery UI Tabs: Not enough arguments to add tab.';

381 	  	

-        },

382 	  	

-        remove: function(index) {

383 	  	

-            if (index && index.constructor == Number) {

384 	  	

-                var o = this.options, $li = this.$lis.eq(index).remove(),

385 	  	

-                    $panel = this.$panels.eq(index).remove();

386 	  	

-

387 	  	

-                // If selected tab was removed focus tab to the right or

388 	  	

-                // tab to the left if last tab was removed.

389 	  	

-                if ($li.hasClass(o.selectedClass) && this.$tabs.length > 1)

390 	  	

-                    this.click(index + (index < this.$tabs.length ? 1 : -1));

391 	  	

-                this.tabify();

392 	  	

-

393 	  	

-                // callback

394 	  	

-                $(this.element).triggerHandler("remove.ui-tabs",

395 	  	

-                    [this.ui($li.find('a')[0], $panel[0])]

396 	  	

-                );

397 	  	

-

398 	  	

-            }

399 	  	

-        },

400 	  	

-        enable: function(index) {

401 	  	

-            var self = this, o = this.options, $li = this.$lis.eq(index);

402 	  	

-            $li.removeClass(o.disabledClass);

403 	  	

-            if ($.browser.safari) { // fix disappearing tab (that used opacity indicating disabling) after enabling in Safari 2...

404 	  	

-                $li.css('display', 'inline-block');

405 	  	

-                setTimeout(function() {

406 	  	

-                    $li.css('display', 'block');

407 	  	

-                }, 0);

408 	  	

-            }

409 	  	

-

410 	  	

-            o.disabled = $.map(this.$lis.filter('.' + o.disabledClass),

411 	  	

-                function(n, i) { return self.$lis.index(n); } );

412 	  	

-

413 	  	

-            // callback

414 	  	

-            $(this.element).triggerHandler("enable.ui-tabs",

415 	  	

-                [this.ui(this.$tabs[index], this.$panels[index])]

416 	  	

-            );

417 	  	

-

418 	  	

-        },

419 	  	

-        disable: function(index) {

420 	  	

-            var self = this, o = this.options;

421 	  	

-            this.$lis.eq(index).addClass(o.disabledClass);

422 	  	

-

423 	  	

-            o.disabled = $.map(this.$lis.filter('.' + o.disabledClass),

424 	  	

-                function(n, i) { return self.$lis.index(n); } );

425 	  	

-

426 	  	

-            // callback

427 	  	

-            $(this.element).triggerHandler("disable.ui-tabs",

428 	  	

-                [this.ui(this.$tabs[index], this.$panels[index])]

429 	  	

-            );

430 	  	

-

431 	  	

-        },

432 	  	

-        select: function(index) {

433 	  	

-            if (typeof index == 'string')

434 	  	

-                index = this.$tabs.index( this.$tabs.filter('[href$=' + index + ']')[0] );

435 	  	

-            this.$tabs.eq(index).trigger(this.options.event);

436 	  	

-        },

437 	  	

-        load: function(index, callback) { // callback is for internal usage only

438 	  	

-            var self = this, o = this.options,

439 	  	

-                $a = this.$tabs.eq(index), a = $a[0];

440 	  	

-

441 	  	

-            var url = $a.data('load.ui-tabs');

442 	  	

-

443 	  	

-            // no remote - just finish with callback

444 	  	

-            if (!url) {

445 	  	

-                typeof callback == 'function' && callback();

446 	  	

-                return;

447 	  	

-            }

448 	  	

-

449 	  	

-            // load remote from here on

450 	  	

-            if (o.spinner) {

451 	  	

-                var $span = $('span', a), label = $span.html();

452 	  	

-                $span.html('<em>' + o.spinner + '</em>');

453 	  	

-            }

454 	  	

-            var finish = function() {

455 	  	

-                self.$tabs.filter('.' + o.loadingClass).each(function() {

456 	  	

-                    $(this).removeClass(o.loadingClass);

457 	  	

-                    if (o.spinner)

458 	  	

-                        $('span', this).html(label);

459 	  	

-                });

460 	  	

-                self.xhr = null;

461 	  	

-            };

462 	  	

-            var ajaxOptions = $.extend({}, o.ajaxOptions, {

463 	  	

-                url: url,

464 	  	

-                success: function(r, s) {

465 	  	

-                    $(a.hash).html(r);

466 	  	

-                    finish();

467 	  	

-                    // This callback is required because the switch has to take

468 	  	

-                    // place after loading has completed.

469 	  	

-                    typeof callback == 'function' && callback();

470 	  	

-

471 	  	

-                    if (o.cache)

472 	  	

-                        $.removeData(a, 'load.ui-tabs'); // if loaded once do not load them again

473 	  	

-

474 	  	

-                    // callback

475 	  	

-                    $(self.element).triggerHandler("load.ui-tabs",

476 	  	

-                        [self.ui(self.$tabs[index], self.$panels[index])]

477 	  	

-                    );

478 	  	

-

479 	  	

-                    o.ajaxOptions.success && o.ajaxOptions.success(r, s);

480 	  	

-                }

481 	  	

-            });

482 	  	

-            if (this.xhr) {

483 	  	

-                // terminate pending requests from other tabs and restore tab label

484 	  	

-                this.xhr.abort();

485 	  	

-                finish();

486 	  	

-            }

487 	  	

-            $a.addClass(o.loadingClass);

488 	  	

-            setTimeout(function() { // timeout is again required in IE, "wait" for id being restored

489 	  	

-                self.xhr = $.ajax(ajaxOptions);

490 	  	

-            }, 0);

491 	  	

-

492 	  	

-        },

493 	  	

-        url: function(index, url) {

494 	  	

-            this.$tabs.eq(index).data('load.ui-tabs', url);

495 	  	

-        },

496 	  	

-        destroy: function() {

497 	  	

-            var o = this.options;

498 	  	

-            $(this.element).unbind('.ui-tabs')

499 	  	

-                .removeClass(o.navClass).removeData('ui-tabs');

500 	  	

-            this.$tabs.each(function() {

501 	  	

-                var href = $.data(this, 'href.ui-tabs');

502 	  	

-                if (href)

503 	  	

-                    this.href = href;

504 	  	

-                $(this).unbind('.ui-tabs')

505 	  	

-                    .removeData('href.ui-tabs').removeData('load.ui-tabs');

506 	  	

-            });

507 	  	

-            this.$lis.add(this.$panels).each(function() {

508 	  	

-                if ($.data(this, 'destroy.ui-tabs'))

509 	  	

-                    $(this).remove();

510 	  	

-                else

511 	  	

-                    $(this).removeClass([o.selectedClass, o.unselectClass,

512 	  	

-                        o.disabledClass, o.panelClass, o.hideClass].join(' '));

513 	  	

-            });

514 	  	

-        }

515 	  	

-    });

516 	  	

-

517 	  	

-})(jQuery); 