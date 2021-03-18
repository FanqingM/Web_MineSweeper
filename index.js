var width = 20;
var height = 20;
var count = 50;   //雷数
const rowDir = [ -1, 0, 1, 1, -1, -1, 0, 1];
const colDir = [ 0, -1, 1, -1, 1, -1, 1, 0];
let ArrMap = [];   //定义一个全局变量
let DOM = document.getElementById('map');
// window.onload = function()
// {
//     // Init();
//     //初始化地图“数组”
//     Init();
//     BuildRender();
//         // //建立雷
//     CalculateRenderAround();
//     // //计算周围的雷数，初始化“数组”
//     BuildMap();
//         //渲染地图
// }
function btn1()
{
    //只能点一个，点击完后三个都设为disabled
    width = 20;
    height = 20;
    count = 50;
    console.log(width,height,count);
    document.getElementById('btn1').disabled = true;
    document.getElementById('btn2').disabled = true;
    document.getElementById('btn3').disabled = true;
    Init();
    BuildRender();
        // //建立雷
    CalculateRenderAround();
    // //计算周围的雷数，初始化“数组”
    BuildMap();
        //渲染地图
}
function btn2()
{
    width = 25;
    height = 25;
    count = 100;
    console.log(width,height,count);
    document.getElementById('btn1').disabled = true;
    document.getElementById('btn2').disabled = true;
    document.getElementById('btn3').disabled = true;
    Init();
    BuildRender();
        // //建立雷
    CalculateRenderAround();
    // //计算周围的雷数，初始化“数组”
    BuildMap();
        //渲染地图
}
function btn3()
{
    width = 30;
    height = 30;
    count = 200;
    console.log(width,height,count);
    document.getElementById('btn1').disabled = true;
    document.getElementById('btn2').disabled = true;
    document.getElementById('btn3').disabled = true;
    Init();
    BuildRender();
        // //建立雷
    CalculateRenderAround();
    // //计算周围的雷数，初始化“数组”
    BuildMap();
        //渲染地图
}
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
            td.style.backgroundColor = '#BDBDBD';
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
function Click(i,j)
{
    let currentDom = document.getElementById(i + '-' + j);
    let current = ArrMap[i][j];
    // console.log(m,n);
    if(current.isRender)
    {
        currentDom.style.backgroundColor = '#A4A4A4';
        currentDom.innerHTML = '<span style="color:red">@</span>';
        showAllRender();
        alert('game over');
    }
    console.log(i,j);
    // current.isShow = true;
    // currentDom.style.backgroundColor = '#848484';
    // currentDom.innerHTML = current.countAround;
    showNum(i,j);
}
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
function showAllRender()
{
    for(let i=0;i<height;i++)
    {
        for (let j =0;j<width;j++)
        {
            if(ArrMap[i][j].isRender)
            {
                let dom = document.getElementById(i + '-' + j);
                dom.style.backgroundColor = '#A4A4A4';
                dom.innerHTML = '<span style="color:red">@</span>';
            }
        }
    }
}
