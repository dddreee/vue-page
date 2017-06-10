var vm = new Vue({
    el: '#test',
    data: {
        pageSize: 10,
        total: 100,
        currentPage: 1,
        test: 'test',
        max: 5
    },
    methods: {
        handler: function(id){
            console.log(id)
        }
    },
    created: function(){
        /*setTimeout(function(){
            vm.$set('total', 100);
        }, 1000)*/
    }
});