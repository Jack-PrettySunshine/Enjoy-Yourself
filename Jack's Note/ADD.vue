<template>
    <Drawer
            :title="currentType == 'Add' ? '新增部门' : '编辑部门'"
            v-model="isShow"
            width="620"
            :closable="true"
            :mask-closable="false"
            :styles="styles"
            @on-close="close(false)"
            class-name="cover"
        >
        <div class="l-content">
            <div class="BaseInfo">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="85">
                    <FormItem label="部门名称" prop="deptName" >
                        <Input v-model="formValidate.deptName" placeholder="请输入部门名称" class="input-width" />
                    </FormItem>
                     <FormItem v-if="isEmpty && (formValidate.parentCode != 0 || currentType === 'Add')" label="上级部门" prop="parentCode" >
                        <Select v-if="rendering" filterable v-model="formValidate.parentCode" placeholder="请选择上级部门" class="input-width">
                            <Option v-for="item in DataList" :key="item.id"  :value="item.deptCode">{{item.deptName}}</Option>
                        </Select>
                    </FormItem>
                     <FormItem label="部门排序" prop="sort" >
                        <Input v-model="formValidate.sort" placeholder="请输入部门排序" class="input-width" />
                    </FormItem>
                    <FormItem label="部门编制" prop="authorized" >
                        <Input v-model="formValidate.authorized" placeholder="请输入部门编制" class="input-width" /> <span>人</span>
                    </FormItem>
                    <FormItem label="部门描述" prop="desc" >
                        <Input type="textarea" :rows="4"  v-model="formValidate.desc" placeholder="请输入部门描述" class="input-width" />
                    </FormItem>
                </Form>
            </div>
        </div>
        <div class="L-demo-drawer-footer">
            <Button @click="close(false)" style="margin-right:20px;">取消</Button>
            <Button v-if="currentType === 'Add'" @click="handleReset('formValidate')" style="margin-right:20px;">重置</Button>
            <Button v-if="currentType === 'Add'" @click="handleSubmit('formValidate')"  type="primary">确定</Button>
            <Button v-if="currentType === 'Edit'" @click="Reset" style="margin-right:20px;">重置</Button>
            <Button v-if="currentType === 'Edit'" @click="Submit"  type="primary">确定</Button>
        </div>
         <Spin size="large" fix v-if="spinShow"></Spin>
        </Drawer>
</template>
<script>
    import ajaxUrl from "_s/ajaxUrl";
    import { getChooseCompanyId } from "@/utils/storages/companyStorage";
    export default {
        name: "AddDepartment",
        // props: {
        //     currentType:{
        //         type: String
        //     },
        // },
        data () {
            return {
                currentType: '',
                rendering: false,
                isEmpty: true,
                isShow: false,
                spinShow: false,
                companyCode: getChooseCompanyId(),
                DataList: [],
                currentDeptcode: '',
                currentdeptName: '',
                currentparentCode: '',
                currentsort: '',
                currentauthorized: '',
                currentdesc: '',
                currentId: '',
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static',
                },

                formValidate: {
                    deptName: '', // 部门名称
                    parentCode: '', // 上级部门编码
                    sort: "", // 部门排序
                    desc: '' , // 部门描述
                    authorized: '', // 部门编制
                },
                ruleValidate: {
                    deptName: [
                        { required: true, message: '部门名称不能为空', trigger: 'blur' },
                        { validator:(rule, value, cb)=>{this.deptNamelenValid(value, 16, cb)}, trigger: 'change'}
                    ],
                    sort: [
                        {
                            type: 'string',
                            pattern: /^[1-9]\d{0,1}[0]*$/,
                            message: '请输入1-100以内正整数',
                            trigger: 'change',
                            max: 3
                        },
                        { validator: (rule, value, cb ) =>{ this.checkNum(value, value, cb , 'sort' ) } , trigger: 'change'} ,
                    ],
                    authorized: [
                        {
                            required: true,
                            type: 'string',
                            pattern: /^([1-9]\d{0,4}|100000)$/,
                            message: '请输入1-100000以内正整数',
                            trigger: 'change',
                        }
                    ],
                    parentCode: [
                        { required: true, message: '上级部门不能为空', trigger: 'blur' },
                    ],
                    desc: [
                        { type: 'string', message: '最多140个字符', trigger: 'change' , max: 140},
                    ],

                }
            }
        },
        created(){

        },
        mounted(){

        },
        destroyed(){
        },
        methods:{
            Reset: function(){
                this.formValidate = {
                    deptName: this.currentdeptName, // 部门名称
                    parentCode: this.currentparentCode, // 上级部门编码
                    sort: this.currentsort ? this.currentsort.toString() : '', // 部门排序
                    desc: this.currentdesc, // 部门描述
                    authorized: this.currentauthorized ? this.currentauthorized.toString() : '', // 部门编制
                }
            },
            Submit: function(){
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                       // 调用接口
                       const { formValidate } = this ;
                       this.spinShow = true;
                       this.$post({
                            url:ajaxUrl.deptment.updateDeptInfo,
                            notShowError: true,
                            method: 'post',
                            data: {
                                id: this.currentId ,
                                companyCode: this.companyCode ,
                                deptName: formValidate.deptName,
                                parentCode: formValidate.parentCode,
                                sort: formValidate.sort,
                                authorized: formValidate.authorized,
                                deptDesc: formValidate.desc,
                                deptCode:this.currentDeptcode,
                            }
                        }).then(res => {
                            if ( res.status == 200 ){
                                this.spinShow = false;
                                this.handleReset('formValidate');
                                this.$Message.success('保存成功');
                                this.close(false);
                                this.$emit('onreloadData');
                            }
                        }).catch(err => {
                            this.spinShow = false;
                            this.$Message.error(err.msg);
                        });
                        } else {
                            // this.$Message.error('请检查表单!');
                        }
                })
            },
            getDeptList: function(){ 
                let deptCode = '';
                if (this.currentType === 'Add'){ 
                    deptCode = '';
                    console.log('AddPROPS:','Add');
                }else{
                    deptCode = this.currentDeptcode;
                }
                this.spinShow = true;
                this.$post({
                    url:ajaxUrl.deptment.queryDeptSelectList,
                    method: 'post',
                    data: {
                        companyCode: this.companyCode ,
                        deptCode: deptCode,
                    }
                }).then(res => {
                    this.spinShow = false;
                    if ( res.status == 200 ){
                        this.DataList = res.data;
                        this.rendering = true;
                    }
                }).catch(err => {
                    this.spinShow = false;
                    // this.$Message.error(err.msg);
                });
            },
            checkdesc: function( str, num, cb  ){
                if ( str && str.length > 140 ){
                    return cb(new Error('最多140个字符'))
                }
            },
            checkNum: function( str, num, cb , type){
                if ( type === 'sort'){
                    if(str && str%1 != 0  || str > 100){
                       return cb(new Error('请输入1-100之间的整数'))
                    }
                }else if ( type == 'authorized' ){
                    if(str && str%1 != 0 ){
                       return cb(new Error('请输入整数'))
                    }

                    if(str.toString().length>6){
                        return cb(new Error('请输入6位以内的整数'))
                    }
                }

                cb()
            },
            deptNamelenValid: function( str, num, cb ){
                if(str){
                    let len = str.trim().length;
                    if(len == 0){
                        return cb(new Error('部门名称不能为空'))
                    }
                    if(len > num){
                        return cb(new Error('最多16个字符'))
                    }
                }
                cb()
            },
            close: function(isVisible){
                let self = this
                self.isShow = isVisible;
                // 更新部门
                if (isVisible){ 
                    this.getDeptList();
                }else{
                    this.handleReset('formValidate');
                }
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => { 
                    if (valid) {
                       // 调用接口
                       const { formValidate } = this ;
                       this.spinShow = true;
                       console.log(formValidate.parentCode)
                       this.$post({
                            url:ajaxUrl.deptment.updateDeptInfo,
                            method: 'post',
                            notShowError: true,
                            data: {
                                companyCode: this.companyCode ,
                                deptName: formValidate.deptName,
                                parentCode: formValidate.parentCode?formValidate.parentCode : '',
                                sort: formValidate.sort,
                                authorized: formValidate.authorized,
                                deptDesc: formValidate.desc,
                            }
                        }).then(res => {
                            if ( res.status == 200 ){
                                this.spinShow = false;
                                this.handleReset('formValidate');
                                this.$Message.success('保存成功');
                                this.close(false);
                                this.$emit('onreloadData');
                            }
                        }).catch(err => {
                            this.spinShow = false;
                            this.$Message.error(err.msg);
                        });
                        } else {
                            // this.$Message.error('请检查表单!');
                        }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            getData: function(){
                this.spinShow = true;
                this.$post({
                    url:ajaxUrl.deptment.queryDepartmentByCode+`/`+this.currentDeptcode,
                    method: 'post',
                    data: {

                    }
                }).then(res => {
                    if ( res.status == 200 ){  console.log(res)
                         this.spinShow = false;
                        // 赋值
                        this.currentDeptcode = res.data.deptCode;
                        this.currentdeptName = res.data.deptName;
                        this.currentparentCode = res.data.parentCode;
                        this.currentsort = res.data.sort;
                        this.currentauthorized = res.data.authorized;
                        this.currentdesc = res.data.deptDesc;
                        this.currentId = res.data.id;

                        this.formValidate = {
                            deptName: res.data.deptName, // 部门名称
                            parentCode:  res.data.parentCode, // 上级部门编码
                            sort:  res.data.sort ? res.data.sort.toString() : '', // 部门排序
                            desc: res.data.deptDesc, // 部门描述
                            authorized: res.data.authorized ? res.data.authorized.toString() : '', // 部门编制
                        }
                    }
                }).catch(err => {
                    this.spinShow = false;
                    // this.$Message.error(err.msg);
                });
            },
        },

    }
</script>
<style lang="less">


.l-content{
    padding: 50px;
    font-size: 14px;
    .ivu-form .ivu-form-item-label{
        padding: 12px 12px 10px 0;
        color: #9eaec2;
        font-size: 14px;
    }
    .ivu-input{
        font-size: 14px;
    }
    .ivu-form-item-required .ivu-form-item-label:before {
        content: '●';
        display: inline-block;
        margin-right: 6px;
        line-height: 1;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
        font-size: 14px;
        color: #FF3C2CFF;
    }
    .BaseInfo{
        font-size: 14px;
        color: #9eaec2;
        .input-width{
            width: 390px;
        }
    }


}
 .L-demo-drawer-footer{
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        border-top: 1px solid #e8e8e8;
        padding: 25px 16px;
        text-align: right;
        background: #fff;
        text-align: center;
        .ivu-btn{
            padding: 10px 35px 11px;
        }
    }
</style>
