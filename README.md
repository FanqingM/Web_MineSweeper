# Web_Minesweeper(for igem and os project)

The code may not be formal and brief due to learning time constraints

## 地址

- Github Repo地址: https://github.com/FanqingM/Web_MineSweeper
- 试玩地址:https://fanqingm.github.io/Web_MineSweeper/

## 规则

- 点雷游戏结束，出现所有雷
- 点数字出数字
- 点空白，打开周围区域
- 点完除雷外所有格子游戏结束
- 先选难度，会出地图，并且计时器自动计时。输或者赢都会导致页面冻结以及计时器停止

## 推荐查询资料

- [MDN](https://developer.mozilla.org/zh-CN/)
- [HTML颜色](https://htmlcolorcodes.com/zh/)

## 代码解释

### html

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" type="text/css" href="index.css"/>
    <title>Web版扫雷</title>
</head>
<body>
    <div id="main">
    <div id="map"></div>
    <div id="choose">
    <fieldset>
        <legend>选择难度</legend>
        <button type="submit" id="btn1" onclick="btn1()">初级</button>
        <button type="submit" id="btn2" onclick="btn2()">中级</button>
        <button type="submit" id="btn3" onclick="btn3()">终极</button>
    </fieldset>
    <button type="submit" id="replay" onclick="replay()">重新游戏</button>
    <div id="timer">
        <input type="text" value="00:00">
    </div>
    </div>
</div>
</body>
<script src="index.js"></script>
</html>
```

### CSS

```
#map
{
    position: absolute;
    border: 3px #A4A4A4 solid;
    border-radius: 20px;
    padding: 5px;
}
#choose
{
    position: absolute;
    left:800px;
}
.block
{
    cursor: pointer;
    width: 20px;
    height: 20px;
    border-radius: 5px;
    text-align: center;
    background-color:rgb(163, 170, 163)
}

.block:hover
{
    background-color:rgb(61, 59, 59)
}

```

### 需要了解

- [Selector](https://developer.mozilla.org/zh-CN/docs/Glossary/CSS_Selector)

### 主体部分

#### 地图渲染

```
function BuildMap()
{
    let table  =document.createElement('table');
    for(let i = 0;i < height; i++)
    {
        let tr = document.createElement('tr');
        for(let j = 0; j < width; j++)
        {
            // console.log(i,j);
            let td = document.createElement('td');
            td.className = 'block';
            // td.style.backgroundColor = '#33FFBB';
            td.id = i + '-' +j;
            // if(ArrMap[i][j].isRender)
            // {
            //     td.innerHTML = "@";
            // }
            // else
            // {
            //     let str = ArrMap[i][j].countAround;
            //     // console.log(str);
            //     td.innerHTML = str;
            // }   //for test
            // td.onmousedown = function(e)
            // {
            //     if(e.button == 1)
            //     {
            //         Click(i,j);
            //     }
            // }
            td.onclick = function()
            {
                Click(i,j);
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    DOM.appendChild(table);
}

```

首先我们因为需要设置难度梯度，所以我们需要动态来生成地图（在html的map块中）。这里采用的手段是利用[table](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/table)来生成地图。通过文档可以看出tr是一列，td是单元格。我们只需要根据我们的参数动态生成即可。需要注意的是别忘了加到map块里面以及一个节点必须先创建才能加入。这里涉及到一点点简单的javascript的dom操作。

AutoTable.html还有一个例子

并且需要说明的是，由于我们后面需要给td附加点击事件，所以需要给他一个id，另外class都是一样的因为在点击前他们都是一个样式（css指定）。需要了解id与class的区别。

#### 随机初始化地图

```
function Init()
{
    for (let i=0;i<height;i++)
    {
        ArrMap[i] = [];
        for(let j=0;j<width;j++)
        {
            ArrMap[i][j] = {isShow:false,isRender:false,countAround:''};
        }
    }
}

```

这里需要注意数组的每一个单元都是一个[object](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects)

#### 初始化雷

```
function BuildRender()
{
    let countNow = 0;
    let i;
    let j;
    //有点bug，因为可能重复，导致雷数不到要求
    while(countNow<count)
    {
        i = Math.floor(Math.random()*height);
        j = Math.floor(Math.random()*width);
        if(ArrMap[i][j].isRender === false)
        {
            ArrMap[i][j].isRender = true;
            countNow++;
        }
    }
}
```

这里需要注意一下范围，如果范围不对浏览器会报错 undefined（不是很直观能感受到是越界的问题）

并且避免重复

#### 计算周围雷数

```
function CalculateRenderAround()
{
    let countAroundNow = 0;
    for(let i = 0;i < height; i++)
    {
        for(let j = 0;j < width; j++)
        {
            // if(ArrMap[i][j].isRender)
            // {
            //     countAroundNow++;
            // }
            //上
            if(j-1>=0)
            {
                if(ArrMap[i][j-1].isRender)
                {
                    countAroundNow++;
                }
            }
            //下
            if(j+1<=width-1)
            {
                if(ArrMap[i][j+1].isRender)
                {
                    countAroundNow++;
                }
            }
            //左
            if(i-1>=0)
            {
                if(ArrMap[i-1][j].isRender)
                {
                    countAroundNow++;
                }
            }
            //右
            if(i+1<=height-1)
            {
                if(ArrMap[i+1][j].isRender)
                {
                    countAroundNow++;
                }
            }
            //左上
            if(i-1>=0&&j-1>=0)
            {
                if(ArrMap[i-1][j-1].isRender)
                {
                    countAroundNow++;
                }
            }
            //左下
            if(i-1>=0&&j+1<=width-1)
            {
                if(ArrMap[i-1][j+1].isRender)
                {
                    countAroundNow++;
                }
            }
            //右上
            if(i+1<=height-1&&j-1>=0)
            {
                if(ArrMap[i+1][j-1].isRender)
                {
                    countAroundNow++;
                }
            }
            //右下
            if(i+1<height-1&&j+1<=width-1)
            {
                if(ArrMap[i+1][j+1].isRender)
                {
                    countAroundNow++;
                }
            }
            if(countAroundNow>0)
            {
                ArrMap[i][j].countAround = countAroundNow.toString();
                countAroundNow = 0;
            }
        }
    }
}

```

#### 附加点击事件

```
function Click(i,j)
{
    let currentDom = document.getElementById(i + '-' + j);
    let current = ArrMap[i][j];
    var flag = true;
    // console.log(m,n);
    if(current.isRender)
    {
        currentDom.style.backgroundColor = '#A4A4A4';
        // currentDom.innerHTML = '<span style="color:red">@</span>';
        over();
        showAllRender();
        DOM.style.pointerEvents = 'none';
        alert('game over,replay?');
    }
    // console.log(i,j);
    // current.isShow = true;
    // currentDom.style.backgroundColor = '#848484';
    // currentDom.innerHTML = current.countAround;
    showNum(i,j);
    for(let m=0;m<height;m++)
    {
        for(let s=0;s<width;s++)
        {
            let now = ArrMap[m][s];
            if(now.isShow === false && now.isRender === false)
            {
                flag = false;
            }
        }
    }
    if(flag === true)
    {
        over();
        showAllRender();
        DOM.style.pointerEvents = 'none';
        alert('win,replay?');
    }
}

```

#### 空格扩展

```
function showNum(i,j)
//展示数字
{
    let currentDom = document.getElementById(i + '-' + j);
    let current = ArrMap[i][j];
    if(current.isShow === false)
    {
        current.isShow = true;
        currentDom.style.backgroundColor = '#A4A4A4';
        currentDom.innerHTML = current.countAround;
        if(current.countAround === '')
        {
            if(i-1>=0&&j-1>=0)
            {
                showNum(i-1,j-1);
            }
            if(i-1>=0)
            {
                showNum(i-1,j);
            }
            if(i-1>=0&&j+1<width)
            {
                showNum(i-1,j+1);
            }
            if(j+1<width)
            {
                showNum(i,j+1);
            }
            if(i+1<height&&j+1<width)
            {
                showNum(i+1,j+1);
            }
            if(i+1<height)
            {
                showNum(i+1,j);
            }
            if(i+1<height&&j-1>=0)
            {
                showNum(i+1,j-1);
            }
            if(j-1>=0)
            {
                showNum(i,j-1);
            }

        }
    }
}

```

这里采用递归，当然也可以dfs/bfs

### 计时器模块

```
var oTxt=document.getElementsByTagName("input")[0];
var n= 0, timer=null;
    //开始计时
function start() {
        clearInterval(timer);
        timer=setInterval(function () {
            n++;
            var m=parseInt(n/60);
            var s=parseInt(n%60);
            oTxt.value=toDub(m)+":"+toDub(s);
        },1000/60);
    }
    //暂停并且清空计时器
function over() {
        clearInterval(timer);
    }
    //补零
    function toDub(n){
        return n<10?"0"+n:""+n;
    }
```

Timer.html中还有一个例子
