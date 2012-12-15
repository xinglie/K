
Google Closure Compiler Script

安装指南
=========

安装步骤：

1. 安装请点击 install.cmd
2. 卸载请点击 uninstall.cmd
3. 如果安装过之前的版本，请先卸载老版本


压缩测试：

选中 test.js, 执行右键菜单“Process with Cl&osureCompiler”，会生成 test-min.js.

注意事项：

1. 需要安装 JDK >= 1.6, 并设置环境变量 JAVA_HOME
2. css 和 js 文件编码必须是 GB2312, GBK 或 GB18030. 如果要支持 UTF-8, 请删除 compiler.cmd 中 native2ascii 相关代码


历史更新
=========
2009-11-10	yubo	初始版本 集成 closure-compiler build 20091106b


版权声明
=========
所有版权归 Google 所有

