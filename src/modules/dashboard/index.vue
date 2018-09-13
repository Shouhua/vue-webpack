<template>
  <div>
    <h1>Dashboard</h1>
    <div class="content">
      In the {{name}} page!
    </div>
    <el-form :rules="rules" :model="ruleForm" ref="ruleForm" label-width="100px" class="rule-form">
      <el-form-item label="活动名称" prop="name" :meg="checkDup" required name>
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="活动地址" prop="addr">
        <el-input v-model="ruleForm.addr"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "Dashboard",
      ruleForm: {
        name: "",
        addr: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        addr: [
          { required: true, message: "请输入活动地址", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      dupValidation: {
        validator: this.checkDup,
        message: "不能重复",
        trigger: "blur"
      }
    };
  },
  methods: {
    checkDup(rule, value, callback) {
      console.log(value);
      axios
        .post(
          "http://10.199.1.140/api/auth/v5/check",
          {
            checkType: "USER",
            userName: value
          },
          {
            headers: {
              Authorization:
                "qefjSsnmnVjoWvMMLuHIwLTjXZLIMEjQNlOeiutXtgnmITYJrXRDHwlUNwId"
            }
          }
        )
        .then(res => {
          if (res.data.data.reduplicated) {
            callback(Error("名字重复了，你懂的"));
          } else {
            callback();
          }
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submited");
        } else {
          alert("error submit!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  color: purple;
}
.rule-form {
  width: 500px;
  margin-top: 20px;
}
</style>

