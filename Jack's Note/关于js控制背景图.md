```js
<template>
    <div class="problems">
        <div class="header">
            <div class="search">
                <div class="title">{{data.faqTitle}}</div>
                <div class="content">
                    <p>{{data.faqContent}}</p>
                    
                </div>
            </div>
            <div class="helps">
                <div class="title">这条方案对您有帮助吗？</div>
                <div class="helpimg">
                    <div @click="helpCheck" class="img" :style="helpurl"></div>
                    <div @click="noHelpCheck" class="img" :style="nohelpurl"></div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="title">相关问题推荐</div>
            <van-cell @click="switchTo(item.id)"  v-for="(item,index) in data.hotList" :key="index" :title="item.faqTitle" />
        </div>
    </div>
</template>
<script>
const helpImg     = "background: url(/img/problem/help.png) no-repeat;"
const helpImged   = "background: url(/img/problem/helped.png) no-repeat;"
const noHelpImg   = "background: url(/img/problem/nohelp.png) no-repeat;"
const noHelpImged = "background: url(/img/problem/nohelped.png) no-repeat;"
import {$post} from '@/libs/ajax';
import ajaxUrl from "_s/ajaxUrl";
export default {
    name: 'ProblemDetails',
    data(){
        return{
            currentId: '', // 当前问题详情id
            data: {}, // 当前问题详情数据
            helpurl: helpImg,
            nohelpurl: noHelpImg,
        }
    },
    created() {
        // 获取路由参数
        this.currentId = this.$router.history.current.query.id;
        this.getData();
    },
    methods: {
        // 点击有帮助
        helpCheck: function(){
            const { helpurl , nohelpurl } = this;
            // 初始状态
            if(helpurl == helpImg && nohelpurl == noHelpImg ){
                this.helpurl = helpImged;
                this.getStatus({yesHelp: '1'})
            }else if( helpurl == helpImged){
                this.helpurl = helpImg;
                this.getStatus({yesHelp: '-1'})
            }
        },
        // 点击无帮助
        noHelpCheck: function(){
            const { helpurl , nohelpurl } = this;
            // 初始状态
            if(helpurl == helpImg && nohelpurl == noHelpImg ){
                this.nohelpurl = noHelpImged;
                this.getStatus({noHelp: '1'})
            }else if( nohelpurl == noHelpImged){
                this.nohelpurl = noHelpImg;
                this.getStatus({noHelp: '-1'})
            }
        },
        // 根据点击调用接口改变状态
        getStatus: function(data){
            $post({
                url: ajaxUrl.allocationElaboration.updateFaqHelp,
                data: {
                  id: this.currentId,
                  ...data
                }
            }).then(res => { 
            
            }).catch( err => {

            });
        },
        // 根据id查询问题详情
        getData: function(){
            $post({
                url: ajaxUrl.allocationElaboration.queryFaqDetail,
                data: {
                  id: this.currentId
                }
            }).then(res => { 
                this.data = res.data;
                if(this.data.yesHelp!= 0 && (this.data.yesHelp)%2 != 0 ){
                    this.helpurl = helpImged;
                }else if(this.data.noHelp!= 0 && (this.data.noHelp)%2 != 0 ){
                    this.nohelpurl = noHelpImged;
                }
            }).catch( err => {

            });
        },
        // 相关问题推荐
        switchTo: function(id){   
           this.currentId = id;
           this.getData();
        }
    },
}
</script>
<style lang="less">
@import '~_a/css/base.less';
.problems{
    font-size: @fontdefault;
    .header{
        margin:  .5rem 0;
        width: 100%;
        background: @colordefault;
        padding: .3rem @spacing;
        .search{
            border-bottom: .002rem solid #E5E5E5;
            padding-bottom: .8rem;
            .title{
                color: @colorlight;
                font-weight: @font-weight;
                line-height: 2.6rem;
            }
            .content{
                color: #666;
                overflow: hidden;
                p{
                    word-wrap:break-word;
                }
            }
        }
        .helps{
            .title{
                color: @colorlighter;
                line-height: 3.2rem;
                font-size: .72rem;
                text-align: center;
            }
            .helpimg{
                display: flex;
                justify-content: center;
                .img{
                    width: 5rem;
                    height: 3rem;
                    background-size: 100% !important;
                    margin: 0 .5rem;
                }
            }
        }
    }
    .bottom{
        background: @colordefault;
        padding: .3rem @spacing;
        .title{
            color: @colorlight;
            font-weight: @font-weight;
            line-height: 2.6rem;
        }
        .van-cell{
            padding: .6rem 1rem;
            color: #666;
            font-size: @fontdefault;
            line-height: 1.5rem;
        }
    }
}  
</style>
```
