import * as $ from "jquery";
import * as _ from "underscore";
import * as Backbone from "backbone";

// backbone demo.
interface ListViewOptions {
    el: string;
    events: any;
}
interface ItemViewOptions {
    tagName?: string; // default `div`
    className?: string; // default ''
    events: any; // must
    model: any; // must
}
interface ItemModelOptions {
    text: string;
}
interface ListItemCollectionOptions {
    model: any;
}

class ListItemCollection extends Backbone.Collection {
    push: any;
    add: any;
    get: any;
    remove: any;
    length: number;
    constructor(options:ListItemCollectionOptions) {
        super(options);
    }
}

class ListView extends Backbone.View {
    el: any;
    $el: any;
    viewItems: any[];
    listenTo: any;
    constructor(options: ListViewOptions) {
        super(options);
    }
    initialize() {
        this.$el.append( _.template('<a href="#" class="add">add new</a>')() );
        this.viewItems = [
            new ItemView({ model: new ItemModel({text: 'hello.1212'}), tagName: 'li', className: 'row', events: { 'click .edit': 'edit', 'click .del': 'del', 'click .confirm': 'confirm' }}),
            new ItemView({ model: new ItemModel({text: 'hsdhhaha.~!'}), tagName: 'li', className: 'row', events: { 'click .edit': 'edit', 'click .del': 'del', 'click .confirm': 'confirm' }})
        ];
        for (let item of this.viewItems) {
            this.listenTo(item.model, 'change', this.render);
            this.listenTo(item, 'rendered', this.renderItems);
            item.render();
            coll.add(item.model);
        }
    }
    addItem() {
        let view:ItemView = new ItemView({ model: new ItemModel({text:'How are you?'}), tagName: 'li', className: 'row', events: { 'click .edit': 'edit', 'click .del': 'del', 'click .confirm': 'confirm' }});
        this.listenTo(view.model, 'change:text', this.render);
        this.listenTo(view, 'rendered', this.renderItems);
        view.render();
        coll.push(view.model);
    }
    render() {
        //console.log('rerender');
        // console.log(coll);
    }
    renderItems() {
        this.$el.find('ul').append(arguments[0]);
    }
}

class ItemView extends Backbone.View {
    model: any;
    cid: string;
    el: any;
    $el: any;
    template: any;
    trigger: any;
    constructor(options: ItemViewOptions) {
        super(options);
    }
    initialize() {
        let tpl: string = '<span>'+this.cid+':</span><span class="text">'+this.model.get('text')+'</span><p class="oprator"><a class="edit" href="#">edit</a><a class="del" href="#">del</a><a class="confirm" style="display:none" href="#">confirm</a></p>';
        this.template = _.template(tpl);
    }
    render() {
        this.trigger('rendered', this.$el.html(this.template()));
    }
    edit() {
        this.$el.addClass('editing');
        this.$el.find('.edit').hide();
        this.$el.find('.confirm').show();
        this.$el.find('.text').html('<input type="text" value="' + this.$el.find('.text').text() + '">');
    }
    confirm() {
        let val: string = this.$el.find('input').val();
        if ('' === val.trim()) {
            this.$el.find('input').css('border', '2px solid red');
        } else {
            this.model.set('text', val);
            this.$el.find('.text').html(val);
            this.$el.removeClass('editing');
            this.$el.find('.edit').show();
            this.$el.find('.confirm').hide();
        }
    }
    del() {
        coll.remove(coll.get(this.model.cid));
        this.el.parentNode.removeChild(this.el);
    }
}

class ItemModel extends Backbone.Model {
    set: any;
    get: any;
    constructor(options: ItemModelOptions) {
        super(options);
    }
}

let coll = new ListItemCollection({model: ItemModel});

let listView = new ListView({el: '#list', events: {'click .add': 'addItem'}});

