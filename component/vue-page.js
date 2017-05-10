Vue.component('page',{
    name: 'page',
    props: {
        pageSize: {
            type: Number,
            default: 10
        },
        total: {
            type: Number
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
            inCurrentPage: 1,
        }
    },
    computed: {
        len: function(){        //计算总页数
            return Math.floor(this.total/this.pageSize)
        },
        half: function(){       //计算最大展示页数的一半，用于翻页时，保证前页显示在中间
            return Math.floor(this.max/2)
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
            var text = e.target.textContent
            var page = parseInt(text);
            if(page === this.inCurrentPage){
                return;
            }
            if(isNaN(page)){
                switch (text){
                    case '<':       //上一页
                        this.prev(this.inCurrentPage);
                        break;
                    case '>':       //下一页
                        this.next(this.inCurrentPage);
                        break;
                    case '>>':      //后5页
                        this.pageChange(this.inCurrentPage + 5)
                        break;
                    case '<<':      //前5页
                        this.pageChange(this.inCurrentPage - 5)
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
            page > this.len ? page = this.len : page = page;
            page < 1 ? page = 1 : page = page;
            this.inCurrentPage = page;
            this.$emit('page-change', page)
        }
    },
    template: '<ul class="mj-pages" @click="pageClick"><li class="mj-page mj-page-prev"><</li><li class="mj-page" v-if="inCurrentPage > half+1 && len > max"><<</li><li class="mj-page" v-for="(index, page) in pages" :class="{active: page === inCurrentPage}">{{page}}</li><li class="mj-page" v-if="len > max && inCurrentPage < len-half">>></li><li class="mj-page mj-page-next">></li></ul>'
});