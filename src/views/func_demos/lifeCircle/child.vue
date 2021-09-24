<script>
export default {
    beforeCreate(){
        document.write('child  beforeCreate>>>>')
    },
    created(){
         document.write('child  created>>>>')
    },
    beforeMount(){
         document.write('child  beforeMount>>>>')
    },
    mounted(){
         document.write('child  mounted>>>>')
    },
    beforeUpdate(){
        document.write('child  beforeUpdate>>>>')
    },
    updated(){
        document.write('child  updated>>>>')
    },
    beforeUnmount(){
       document.write('child  beforeDestroy>>>>')
    },
    unmounted() {
        document.write('child  destroyed>>>>')
    },
    render(){
        return <div><h1>子组件</h1></div>
    }
}
</script>