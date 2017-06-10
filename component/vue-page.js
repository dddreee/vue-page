//分页组件
Vue.component('page',{
    name: 'page',
    props: {
        pageSize: {
            type: Number,
            default: 10
        },
        total: {
            type: Number,
            default: 0
        },
        currentPage: {
            type: Number,
            default: 1
        },
        max: {
            type: Number,
            default: 5
        }
    },
    data: function(){
        return {
            inCurrentPage: 1
        };
    },
    computed: {
        len: function(){        //计算总页数

            var len = this.total/this.pageSize;
            if(len < 1) len = 1;
            if(len > 1 && len > parseInt(len)){
                len = parseInt(len) + 1;
            }
            return len;
        },
        half: function(){       //计算最大展示页数的一半，用于翻页时，保证前页显示在中间
            return Math.floor(this.max/2);
        },
        pages: function(){      //计算当前展示的页码数组
            var pages = [],
                len = this.len > this.max ? this.max : this.len,
                startPage = this.inCurrentPage;
            if(this.len <= this.max){   //总页数比最大展示页数小
                for(var i = 0; i < len; i++){
                    pages.push(i + 1);
                };
            }else{                      //总页数比最大展示页数大
                var half = Math.floor(this.max/2);
                if(startPage > half){   //当前页比最大展示页数一半大
                    if(startPage > this.len - half){    //
                        for(var i = this.len - this.max + 1; i < this.len+1; i++){
                            pages.push(i);
                        };
                    }else{
                        for(var i = startPage - half; i < startPage + half + 1; i++){
                            pages.push(i);
                        };
                    }
                }else{
                    for(var i = 0; i < len; i++){
                        pages.push(i + 1);
                    };
                }
            }
            return pages;
        }
    },
    methods: {
        pageClick: function(e){     //绑定在ul处理点击事件，并判断是点击的页码，还是其他操作
            var text = e.target.textContent;
            var cls = e.target.className;
            // console.log(text, e.target);
            var page = parseInt(text);
            if(page === this.inCurrentPage){
                return;
            }
            if(text === ''){
                switch (cls){
                    case 'icon-left-arrow':       //上一页
                        this.prev(this.inCurrentPage);
                        break;
                    case 'icon-right-arrow':       //下一页
                        this.next(this.inCurrentPage);
                        break;
                    case 'icon-right-more':      //后5页
                        this.pageChange(this.inCurrentPage + 5);
                        break;
                    case 'icon-left-more':      //前5页
                        this.pageChange(this.inCurrentPage - 5);
                        break;
                }
            }else{
                this.pageChange(page);
            }
        },
        prev: function(page){
            if(page === 1){
                return;
            }else{
                this.pageChange(page - 1);
            }
        },
        next: function(page){
            if(page === this.len){
                return;
            }else{
                this.pageChange(page + 1);
            }
        },
        pageChange: function(page){     //处理当前页的变化，并触发pages的变化
            if(page > this.len) page = this.len;
            if(page < 1) page = 1;
            this.inCurrentPage = page;
            this.$emit('page-change', page);
        }
    },
    template:
    '<div>' +
    '<ul class="mj-pages" @click="pageClick">' +
    '<li class="mj-page mj-page-prev"><i class="iconfont  icon-left-arrow"></i></li>' +
    '<li class="mj-page" v-if="inCurrentPage > (half + 1) && len > max"><i class="icon-left-more"></i></li>' +
    '<li class="mj-page" v-for="(page,index) in pages" :class="{active: page === inCurrentPage}" :key="index" v-text="page"></li>' +
    '<li class="mj-page" v-if="len > max && inCurrentPage < len-half"><i class="icon-right-more"></i></li>' +
    '<li class="mj-page mj-page-next"><i class="iconfont  icon-right-arrow"></i></li>' +
    '</ul>' +
    '<span v-text="\'共\' + len + \'页\'"></span>' +
    '</div>'
});