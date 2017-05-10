var vm = new Vue({
    el: '#test',
    data: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
        test: 'test'
    },
    methods: {
        handler: function(id){
            console.log(id)
        }
    },
    created: function(){
        setTimeout(function(){
            vm.$set('total', 100);
        }, 1000)
    }
});