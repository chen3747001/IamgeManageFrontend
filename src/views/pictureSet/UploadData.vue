<template>
    <div>
        <h1>上传数据页面 {{setName}}</h1>
 
        <div class="multiData">
            <p class="pHeader">多图片上传</p>
            <b-field>
                <b-upload v-model="dropFiles" multiple drag-drop expanded>
                    <section class="section">
                        <div class="content has-text-centered">
                            <p>将文件拖拽至此处或者点击上传</p>
                        </div>
                    </section>
                </b-upload>
            </b-field>

            <el-button type="primary" style="float:center;width:150px"  @click="submit($event)">提交</el-button>
            <!-- <button class="button button-primary button-pill button-small" @click="submit($event)">提交</button> -->

            <div class="tags">
                <span v-for="(file, index) in dropFiles" :key="index" class="tag is-primary">
                    {{file.name}}
                    <button class="delete is-small" type="button" @click="deleteDropFile(index)"></button>
                </span>
            </div>

        </div>

        <div class="mozdirectory">
            <p class="pHeader">文件夹上传(请使用chrome浏览器)</p>
            <input @change="getFiles($event)" name="clickFiles" type="file" webkitdirectory/>
            <el-button type="primary" style="float:center;width:150px"  @click="submitClickFiles($event)">提交</el-button>
        </div>
    </div>
</template>

<script>
import {uploadPicture} from "@/api/picture"
export default {
    name:"UploadData",
    data(){
        return{
            setName:this.$route.params.SetName,
            file: {},
            dropFiles: [],
            clickFiles:[],
        }
    },
    methods:{
        getFiles: function(event) {
            var clickFiles = event.target.clickFiles;
            console.log("文件夹下内容是")
            console.log(event.target.clickFiles)

            console.log(clickFiles)
			for (var i = 0; i < clickFiles.length; i++) {
                this.clickFiles.push(clickFiles[i]);
            }
		},

        deleteDropFile(index) {
            this.dropFiles.splice(index, 1);
        },

        submit: function (event) {
            //阻止元素发生默认的行为
            console.log("这是上交数据环节");
            console.log(this.dropFiles)
            console.log("此时form内的数据")
            // 向formdata中添加需要传输的数据
            let formData = new FormData();
            for(var i=0;i<this.dropFiles.length;i++){
                // 注意图片文件需要用这个形式来上传，无法使用数组直接上传
                formData.append("files",this.dropFiles[i])
            }
            formData.append("setName", this.setName);
            uploadPicture(formData).then((response)=>{
                const{code,message} =response
                this.message=message;
                console.log(message)
                this.$message({
                  message: '上传图片成功',
                  type: 'success'
                })
            })

            this.dropFiles=new Array()
        },

        submitClickFiles: function (event) {
            console.log("这是上交文件夹数据环节");
            console.log(this. clickFiles)
            console.log("此时form内的数据")
        }
    }
}
</script>

 
<style scoped>
    .multiData{
        width: 45%;
        float: left;
    }

    .mozdirectory{
        width: 45%;
        margin-left: 7%;
        float: left;
    }

    .pHeader{
        font-size: 18px;
        font-weight: bold;
    }
</style> 