<template>
  <div class="container">
    <header>
      <h1>
        <slot name="header" :title="title">
            自带标题
        </slot>
      </h1>
    </header>
    <main>
      <slot :content="content">
          这是默认内容
      </slot>
    </main>
    <footer>
      <slot name="footer" :footer="footer"></slot>
    </footer>
  </div>
</template>
<script>
export default {
  name:'mychild',
  props:{
    testVal:{
      required:true,
      type:Function
    }
  },
  watch:{
    title(val){
      this.testVal(val)
    }
  },
  data() {
    return {
      title: "这是标题",
      content: "这是内容",
      footer: "这是脚标",
    };
  },
};
</script>