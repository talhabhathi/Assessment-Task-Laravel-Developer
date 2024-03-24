/*
 Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.plugins.add("devtools", { lang: "ar,az,bg,ca,cs,cy,da,de,de-ch,el,en,en-au,en-gb,eo,es,es-mx,et,eu,fa,fi,fr,fr-ca,gl,gu,he,hr,hu,id,it,ja,km,ko,ku,lt,lv,nb,nl,no,oc,pl,pt,pt-br,ro,ru,si,sk,sl,sq,sv,tr,tt,ug,uk,vi,zh,zh-cn", init: function(k) { k._.showDialogDefinitionTooltips = 1 }, onLoad: function() { CKEDITOR.document.appendStyleText(CKEDITOR.config.devtools_styles || "#cke_tooltip { padding: 5px; border: 2px solid #333; background: #ffffff }#cke_tooltip h2 { font-size: 1.1em; border-bottom: 1px solid; margin: 0; padding: 1px; }#cke_tooltip ul { padding: 0pt; list-style-type: none; }") } });
(function() {
    function k(a, c, b, f) {
        a = a.lang.devtools;
        var l = '\x3ca href\x3d"https://docs.ckeditor.com/ckeditor4/docs/#!/api/CKEDITOR.dialog.definition.' + (b ? "text" == b.type ? "textInput" : b.type : "content") + '" target\x3d"_blank" rel\x3d"noopener noreferrer"\x3e' + (b ? b.type : "content") + "\x3c/a\x3e";
        c = "\x3ch2\x3e" + a.title + "\x3c/h2\x3e\x3cul\x3e\x3cli\x3e\x3cstrong\x3e" + a.dialogName + "\x3c/strong\x3e : " + c.getName() + "\x3c/li\x3e\x3cli\x3e\x3cstrong\x3e" + a.tabName + "\x3c/strong\x3e : " + f + "\x3c/li\x3e";
        b && (c += "\x3cli\x3e\x3cstrong\x3e" +
            a.elementId + "\x3c/strong\x3e : " + b.id + "\x3c/li\x3e");
        c += "\x3cli\x3e\x3cstrong\x3e" + a.elementType + "\x3c/strong\x3e : " + l + "\x3c/li\x3e";
        return c + "\x3c/ul\x3e"
    }

    function m(d, c, b, f, l, g) {
        var e = c.getDocumentPosition(),
            h = { "z-index": CKEDITOR.dialog._.currentZIndex + 10, top: e.y + c.getSize("height") + "px" };
        a.setHtml(d(b, f, l, g));
        a.show();
        "rtl" == b.lang.dir ? (d = CKEDITOR.document.getWindow().getViewPaneSize(), h.right = d.width - e.x - c.getSize("width") + "px") : h.left = e.x + "px";
        a.setStyles(h)
    }
    var a;
    CKEDITOR.on("reset", function() {
        a &&
            a.remove();
        a = null
    });
    CKEDITOR.on("dialogDefinition", function(d) {
        var c = d.editor;
        if (c._.showDialogDefinitionTooltips) {
            a || (a = CKEDITOR.dom.element.createFromHtml('\x3cdiv id\x3d"cke_tooltip" tabindex\x3d"-1" style\x3d"position: absolute"\x3e\x3c/div\x3e', CKEDITOR.document), a.hide(), a.on("mouseover", function() { this.show() }), a.on("mouseout", function() { this.hide() }), a.appendTo(CKEDITOR.document.getBody()));
            var b = d.data.definition.dialog,
                f = c.config.devtools_textCallback || k;
            b.on("load", function() {
                for (var d =
                        b.parts.tabs.getChildren(), g, e = 0, h = d.count(); e < h; e++) g = d.getItem(e), g.on("mouseover", function() {
                    var a = this.$.id;
                    m(f, this, c, b, null, a.substring(4, a.lastIndexOf("_")))
                }), g.on("mouseout", function() { a.hide() });
                b.foreach(function(d) {
                    if (!(d.type in { hbox: 1, vbox: 1 })) {
                        var e = d.getElement();
                        e && (e.on("mouseover", function() { m(f, this, c, b, d, b._.currentTabId) }), e.on("mouseout", function() { a.hide() }))
                    }
                })
            })
        }
    })
})();