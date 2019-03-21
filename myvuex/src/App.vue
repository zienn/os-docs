<template>
  <div id="app">
    <p>冲啊，手榴弹扔了{{$store.state.count}}个</p>
    <p>冲啊，手榴弹扔了{{count1}}个</p>
    <p>冲啊，手榴弹扔了{{count2}}个</p>
    <p>炸死了{{$store.getters.killCount}}个柜子</p>
    <p>
      <button @click="add">扔一个</button>
      <button @click="addAsync">蓄力扔俩</button>
      <button @click="increment">使用mapMutation</button>

    </p>
    <Battalion></Battalion>
  </div>
</template>
<script>
import Battalion from '@/components/Battalion'
import {mapState,mapMutations} from './zhao'
export default {
  name: 'app',
  computed:{
    ...mapState({
      count1:state=>state.count,
      count2:'count'
    })
  },
  components:{
    Battalion
  },
  created(){
  },
  methods:{
    ...mapMutations(['increment']),
    add(){
      this.$store.commit('increment')
    },
    addAsync(){
      this.$store.dispatch('incrementAsync')
    }
  }
}
</script>
<style>

div{
  border:1px solid red;
  margin:20px;
  padding:20px;
}
</style>

