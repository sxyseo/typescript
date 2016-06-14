"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require("underscore");
var Backbone = require("backbone");
var ListItemCollection = (function (_super) {
    __extends(ListItemCollection, _super);
    function ListItemCollection(options) {
        _super.call(this, options);
    }
    return ListItemCollection;
}(Backbone.Collection));
var ListView = (function (_super) {
    __extends(ListView, _super);
    function ListView(options) {
        _super.call(this, options);
    }
    ListView.prototype.initialize = function () {
        this.$el.append(_.template('<a href="#" class="add">add new</a>')());
        this.viewItems = [
            new ItemView({ model: new ItemModel({ text: 'hello.1212' }), tagName: 'li', className: 'row', events: { 'click .edit': 'edit', 'click .del': 'del', 'click .confirm': 'confirm' } }),
            new ItemView({ model: new ItemModel({ text: 'hsdhhaha.~!' }), tagName: 'li', className: 'row', events: { 'click .edit': 'edit', 'click .del': 'del', 'click .confirm': 'confirm' } })
        ];
        for (var _i = 0, _a = this.viewItems; _i < _a.length; _i++) {
            var item = _a[_i];
            this.listenTo(item.model, 'change', this.render);
            this.listenTo(item, 'rendered', this.renderItems);
            item.render();
            coll.add(item.model);
        }
    };
    ListView.prototype.addItem = function () {
        var view = new ItemView({ model: new ItemModel({ text: 'How are you?' }), tagName: 'li', className: 'row', events: { 'click .edit': 'edit', 'click .del': 'del', 'click .confirm': 'confirm' } });
        this.listenTo(view.model, 'change:text', this.render);
        this.listenTo(view, 'rendered', this.renderItems);
        view.render();
        coll.push(view.model);
    };
    ListView.prototype.render = function () {
        //console.log('rerender');
        // console.log(coll);
    };
    ListView.prototype.renderItems = function () {
        this.$el.find('ul').append(arguments[0]);
    };
    return ListView;
}(Backbone.View));
var ItemView = (function (_super) {
    __extends(ItemView, _super);
    function ItemView(options) {
        _super.call(this, options);
    }
    ItemView.prototype.initialize = function () {
        var tpl = '<span>' + this.cid + ':</span><span class="text">' + this.model.get('text') + '</span><p class="oprator"><a class="edit" href="#">edit</a><a class="del" href="#">del</a><a class="confirm" style="display:none" href="#">confirm</a></p>';
        this.template = _.template(tpl);
    };
    ItemView.prototype.render = function () {
        this.trigger('rendered', this.$el.html(this.template()));
    };
    ItemView.prototype.edit = function () {
        this.$el.addClass('editing');
        this.$el.find('.edit').hide();
        this.$el.find('.confirm').show();
        this.$el.find('.text').html('<input type="text" value="' + this.$el.find('.text').text() + '">');
    };
    ItemView.prototype.confirm = function () {
        var val = this.$el.find('input').val();
        if ('' === val.trim()) {
            this.$el.find('input').css('border', '2px solid red');
        }
        else {
            this.model.set('text', val);
            this.$el.find('.text').html(val);
            this.$el.removeClass('editing');
            this.$el.find('.edit').show();
            this.$el.find('.confirm').hide();
        }
    };
    ItemView.prototype.del = function () {
        coll.remove(coll.get(this.model.cid));
        this.el.parentNode.removeChild(this.el);
    };
    return ItemView;
}(Backbone.View));
var ItemModel = (function (_super) {
    __extends(ItemModel, _super);
    function ItemModel(options) {
        _super.call(this, options);
    }
    return ItemModel;
}(Backbone.Model));
var coll;
var listView;
coll = new ListItemCollection({ model: ItemModel });
listView = new ListView({ el: '#list', events: { 'click .add': 'addItem' } });
//# sourceMappingURL=index.js.map