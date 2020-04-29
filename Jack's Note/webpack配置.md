```js

## 函数模式
configureWebpack: config => {
        if (process.env.NODE_ENV === "production") {
            // 为生产环境修改配置...
            config.mode = "production";
            // 这里修改下 
			config.optimization.minimizer = [
				new UglifyJsPlugin({
					uglifyOptions: {
						compress: {
							warnings: false,
							drop_console: true, //console
							drop_debugger: true,
							pure_funcs: ['console.log'] //移除console
						}
					}
				})
			]
			//打包文件大小配置
			config["performance"] = {
				"maxEntrypointSize":10000000,
				"maxAssetSize":30000000
			}
        } else {
            // 为开发环境修改配置...
            config.mode = "development";
        }
 	}
  
## 对象模式
configureWebpack : {
        performance: {
            hints:'warning',
            //入口起点的最大体积 整数类型（以字节为单位）
            maxEntrypointSize: 50000000,
            //生成文件的最大体积 整数类型（以字节为单位 300k）
            maxAssetSize: 30000000,
            //只给出 js 文件的性能提示
            assetFilter: function(assetFilename) {
                return assetFilename.endsWith('.js');
            }
        }
    }
```
