## 1、nullptr

在需要使用空指针的场合，使用nullptr，不要使用0或者NULL。

```cpp
void foo(char c, void *p);

void foo(char c, int i);
```

foo('x', nullptr);语句会调用第一个函数，而使用NULL则会调用第二个foo（）；

## 2、原始字符串

不要在字符串中使用转义符

```cpp
std::string s1 = "C:\\Program Files\\Microsoft Windows\\";
std::string s2 = R"(C:\Program Files\Microsoft Windows\)";
```

默认界定符是"(，若想在字符串中使用)"，则必须自定义界定符，即在"和(之间插入字符

```cpp
std::string s3 = R"+*("(Who are you)")+*";
std::cout<<s3;

//开始界定符："+*(
//结束界定符：)+*"
//s3输出结果："(Who are you)"
```

## 3、自动类型推断

关键字auto

```cpp
int a=1;
auto a=1;

map<string, string> address_book;
map<string, string>::iterator itr = address_book.begin();
auto itr = address_book.begin();

std::shared_ptr<std::string> p1 = std::make_shared<std::string>(10, '9');
auto p1 = std::make_shared<std::string>(10, '9');
```

尽量使用auto来进行类型声明

**类型获取-decltype**

```cpp
int i=4;
decltype(i) a; //int
decltype((i)) b=i; // int&

float a;
double b;
decltype(a+b) c; //double

vector<int> vec;
typedef decltype(vec.begin()) vectype;
//vector iterator type
vectype k;
```

返回类型后置

```cpp
template <typename T, typename U>
??? add(T x, U y)
{
    return x + y;
}
```

上述代码，函数参数均是未知类型的模板，如何定义未知返回值类型？

```cpp
decltype(x+y) add(T x, U y)
{
    return x + y;
}
```

decltype(x+y)出现时，x、y还未定义，不可行！

```cpp
decltype(*(T*)(0) + *(U*)(0)) add(T x, U y)
{
    return x + y;
}
```

这种写法可行，但是过于复杂。可以采取如下方法，返回值类型尾序语法，"->"指定返回类型。

```cpp
auto add(T x, U y) -> decltype(x + y)
{
    return x + y;
}
```

该怎么返回一个数组指针？先看如何声明一个返回数组指针的函数

```cpp
int (*getResultArray(int mode))[10];

using arrT = int[10];
arrT* getArrayType(int i);
//用尾序法加auto关键字获取函数返回值类型
auto getResultArray(int mode) -> int[10];
```

decltype(auto)可用于自动返回类型的限定符保留

```cpp
template<typename Array, typename Index>
auto getDataByIndex(Array& arr, index i)
{
    return arr[i];//返回的是值，将auto改为decltype(auto)返回值类型变为引用
}

int main(){
    std::vector<int> v_arr(3,4);
    decltype(v_arr[0]) a = v_arr[0]; //a类型为int&
    auto b = v_arr[0]; //b类型为int
    
    getDataByIndex(v_arr, 0) = 10; //对右值进行赋值，编译错误
}
```

## 4、基于范围的循环

```cpp
int arr[10] = {1,2,3,4,5,6,7,8,9,10};
for (int i=0;i<10:i++)
    std::cout<<arr[1];
//改为
for (auto n:arr)
    std::cout<<n;
```

使用容器的迭代器进行循环比较繁琐

```cpp
std::vector<int> vec {1,2,3,4,5,6,7,8,9,10};
for (std::vector<int>::iterator itr = vec.begin();itr != vec.end();itr++)
    std::cout<<*itr;
//使用auto
for (auto n:vec)
    std::cout<<n;
//使用for_each遍历
std::for_each(vec.cbegin(), vec.cend(),[](auto n){
    std::cout<<n<<endl;
})
```

## 5、类型别名

```cpp
typedef int arrT[10];
using arrT = int[10];

typedef vactor<int> InteVector;
using IntVector = vector<int>;

vector<int> vec;
typedef decltype(vec.begin()) vectype;
vector<int> vec;
using vectype = decltype(vec.begin());
```

还有一种情况，typedef很难定义，模板是用using的理由，否则不得不用嵌套在模板化的struct里的typedef才能实现

```cpp
template<typename T>
using MapStr = std::map<T, std::string>;
```

## 6、常量表达式

常量表达式可以充分利用编译时的计算能力

```cpp
constexpr int multiply(int x, int y){
    return x*y;
}
const int val = multiply(10, 10);
```

而且，可以用constexpr函数的返回值声明数组

```cpp
constexpr int getDefaultArraySize(int multiplier){
    return 10*multiplier;
}
int my_array[getDefaultArraySize(3)];
```

如果其传入的参数可以在编译时期计算出来，那么这个函数就会产生编译时期的值。

修饰函数时：

- 函数内只能有一个return语句（C++14上取消了这个限制）
- 只能调用其他constexpr函数
- 只能使用全局constexpr变量

```cpp
constexpr int factorial(int n)//C++11
{
    return n==0?1:n*factorial(n-1);
}

constexpr int factorial(int n)//C++14
{
    int result = 1;
    for (int i=1;i<=n;++i)
        result *= i;
    return result;
}
```

- C++17允许在if语句中使用constexpr来修饰，方便编译时优化
- /system/core/init/first_stage_init.cpp

```cpp
CHECKCALL(mknod("/dev/kmsg", S_IFCHR|0600,makedev(1,11)));
if constexpr(WORD_WRITABLE_KMSG) {
    CHECKCALL(mknod("/dev/kmsg_debug", S_IFCHR|0622, makedev(1,11)));
}
CHECKCALL(mknod("/dev/random", S_IFCHR|0666, makedev(1,8)));
```

## 7、std:enable_if

SFINAE

- SFINAE = Substitution Failure Is Not An Error
- 当调用模板函数时编译器会根据传入参数推导最合适的模板函数，在这个推到过程中如果某一个或者某几个模板函数推到出来是编译无法通过的，只要有一个可以正确推导出来，那么那几个推导得到的可能产生编译错误的模板函数并不会引发编译错误。

```cpp
struct Test{
    typedef int foo;
};

template <typename T>
void f(typename T::foo) {} //definition #1

template <typename T>
void f(T){} //definition #2

int main() {
    f<Test>(10);  //Call #1
    f<int>(10);  //Call #2
}
```
我们可以利用SFINAE原则，构造一个开关类，但满足某一条件时，让某类型能出现；不满足时，让他没有该类型，解析失败。这个开关就是enable_if。
```cpp
template<bool, typename _Tp = void>
struct enable_if{};

template<typename _Tp>
struct enable_if<true, _Tp> {typedef _Tp type;};
```
根据模板类型推导，看下面四种情况能否编译通过。
```cpp
typename std::enable_if<true, int>::type t1; //pass
typename std::enable_if<true>::type; //pass
typename std::enable_if<false>::type; //fail
typename std::enable_if<false, int>::type t2; //fail
```

- std::enable_if<>是一种类型萃取（type trait），会根据给定的一个编译时期的表达式（第一个参数）来确定其行为。
- 如果这个表达式为true， std::enable_if<>::type会返回 
   - 如果没有第二个模板，返回类型是void
   - 否则，返回类型是第二个参数的类型

## 8、静态断言
传统的assert是运行时断言，可视作对参数有效性进行判断，考虑如下情形：
```cpp
template<typename T, typename U>
void bit_copy(T& a, U& b){
    assert(sizeof(a) == sizeof(b)); //只能在运行时判决
    static_assert(sizeof(a) == sizeof(b), "Not same width"); //编译期判定,C++17第二个参数可省略
    memcpy(&a, &b, sizeof(b));
}
```

static_assert仅可对常量表达式进行判断
## 9、enum class

限定作用域的枚举，想象一下在使用enum的时候有哪些限制和问题

```cpp
enum Direction {
    TOP_LEFT,
    TOP_RIGHT,
    BOTTOM_LEFT,
    BOTTOM_RIGHT
    };
enum WindowsCorner {
    TOP_LEFT,
    TOP_RIGHT,
    BOTTOM_LEFT,
    BOTTOM_RIGHT
}; //变量重复定义
```

```cpp
enum Direction {
    DIR_TOP_LEFT,
    DIR_TOP_RIGHT,
    DIR_BOTTOM_LEFT,
    DIR_BOTTOM_RIGHT
    };
enum WindowsCorner {
    WC_TOP_LEFT,
    WC_TOP_RIGHT,
    WC_BOTTOM_LEFT,
    WC_BOTTOM_RIGHT
};
```

需要变量改名来避免重复定义，根本原因在于传统的enum没有限定作用域。c++11上引入了限定作用域的枚举

```cpp
enum class Direction {
    TOP_LEFT,
    TOP_RIGHT,
    BOTTOM_LEFT,
    BOTTOM_RIGHT
    };
enum class WindowsCorner {
    TOP_LEFT,
    TOP_RIGHT,
    BOTTOM_LEFT,
    BOTTOM_RIGHT
    };
Direction d = Direction::TOP_LEFT;
WindowsCorner wc = WindowsCorner::TOP_LEFT;
```

## 10、initializer_list

使用初始化列表将STL容器初始化

## 11、无序容器
[C++中关联容器的使用](https://www.yuque.com/u21276715/vi3gqz/gds2s4?view=doc_embed)
STL新增的无序容器，通过哈希表实现，而非红黑树，大大降低时间复杂度

- unordered_map
- unordered_multimap
- unordered_set
- unordered_multiset

对高效率查询的情况，可使用无序容器
## 12、default&delete

让编译器自动生成默认的特殊成员函数

- 默认构造函数
- 默认析构函数
- 拷贝构造函数
- 拷贝赋值运算符
- 移动构造函数
- 移动赋值运算符

类里显式声明了非默认构造函数，却没有定义默认构造函数

```cpp
class A
{
    public:
    A()=default;
    A(int v):value(v){};
    private:
    int value;
};

int main(){
    A a;
    return 0;
}
```

**大三律：**如果你声明了拷贝构造函数、拷贝复制运算符、析构函数中的任何一个，你就得同时声明所有这三个

如果你声明了析构函数，拷贝操作就不会被自动生成

默认移动操作的生成条件

- 该类未声明任何拷贝操作
- 该类未声明任何移动操作
- 该类未声明任何析构函数

**Delete**函数

考虑和Defaulted函数相反的情况，如果禁用复制构造函数，在C++98上，一般用private来实现：

```cpp
class Track
{
    public:
    Track();
    ~Track(){};
    private:
    Track(const Track&){};
}
```

然而，这个构造函数依然存在，只是不能从外部进行访问。在C++11上 可以用delete实现。

```cpp
class Track
{
    public:
    Track();
    ~Track(){};
    Track(const Track&) = delete;
};
```

比private更方便的，还可以用delete过滤某些特定的形参类型

```cpp
template<typename T>
void f(T*);

template<>
void f<void*> = delete;

template<>
void f<char*> = delete;
```

## 13、结构化绑定（c++17）

绑定指定名称到初始化器的子对象或元素

```cpp
#include <iostream>
#include <tuple>
#include <string>

std::tuple<double, char, std::string> get_student(int id) {
    if (id==0) return std::make_tuple(3.8,'A',"Lisa");
    if (id==0) return std::make_tuple(3.4,'B',"Mike");
    throw std::invalid_argument("id");
}
int main(){
    auto student0=get_student(0);
    std::cout<<"ID:0,"<<"GPA:"<<std::get<0>(student0)<<","<<"grade:"<<std::get<1>(student0)<<","<<"name:"<<std::get<2>(student0)<<"\n";
    
    auto [gpa,grade,name]=get_student(1); //直接绑定到成员
    std::cout<<"ID:1"<<"GPA:"<<gpa<<","<<"grade:"<<grade<<","<<"name:"<<name<<"\n";
    return 0;
}
```

绑定到数组

```cpp
int a[2]={1,2};

auto [x,y]=a; //存在一次拷贝
auto& [xr,yr]=a;
```

绑定到数据成员

```cpp
struct S{
    int i;
    double d;
}
struct S s;
auto [a,b]=s;
```

## 14、std::optional(c++17)

std::optional可视为std::pair<bool, T>

```cpp
std::optional<int> foo(int param1, int param2) {
    if (param1 == 0||param2 == 0)
        return std::nullopt;
    return param1+param2;
}

int main(){
    auto ret=foo(1,2);
    if (ret.has_value())
        std::cout<<ret.value()<<std::endl;
    
    return 0;
}
```

如果想返回多个值，可以考虑用其他容器封装

```cpp
std::optional<std::tuple<int, int>> foo(int param1, int param2) {
    if (param1 == 0||param2 == 0)
        return std::nullopt;
    return std::make_tuple(param1+param2, param1-param2);
}

int main(){
    auto ret=foo(1,2);
    if (ret) {
        auto [a,b]=*ret;
        std::cout<<a<<","<<b<<std::endl;
    }
    return 0;
}
```

## 15、Lambda表达式

完整声明如下：
![image.png](https://img.picgo.net/2022/12/08/image26720b2e75dd68fb.png)

1. capture 子句 (在 C++ specification.) 中也称为 lambda-introducer
2. 参数列表 （可选） (也称为 lambda 声明符)
3. 可变规范 （可选）
4. exception-specification （可选）
5. trailing-return-type （可选）
6. lambda 正文

捕获外部变量的表达方式

| 捕获 | 含义 |
| --- | --- |
| [] | 不捕获，Lambda表达式内不可以使用外部变量 |
| [x,&y] | x按值捕获，y按引用捕获 |
| [&] | 所有外部变量都按引用捕获 |
| [=] | 所有外部变量都按值捕获 |
| [&,x] | x按值捕获，其他都按引用捕获 |
| [=,&y] | y按引用捕获，其他都按值捕获 |


## 16、std::function

std::function 是一个可调用对象包装器，是一个类模板，可以容纳除了类成员函数指针之外的所有可调用对象，它可以用统一的方式处理函数、函数对象、函数指针，并允许保存和延迟它们的执行。

定义格式：std::function<函数类型>。

std::function可以取代函数指针的作用，因为它可以延迟函数的执行，特别适合作为回调函数使用。它比普通函数指针更加的灵活和便利。

C中**可调用对象**的虽然都有一个比较统一的操作形式，但是定义方法五花八门，这样就导致使用统一的方式保存可调用对象或者传递可调用对象时，会十分繁琐。C11中提供了std::function和std::bind统一了可调用对象的各种操作。

不同类型可能具有相同的调用形式，如：

```cpp
// 普通函数
int add(int a, int b){return a+b;} 

// lambda表达式
auto mod = [](int a, int b){ return a % b;}

// 函数对象类
struct divide{
    int operator()(int denominator, int divisor){
        return denominator/divisor;
    }
};
```

上述三种可调用对象虽然类型不同，但是共享了一种调用形式：

```cpp
int(int ,int)
```

std::function就可以将上述类型保存起来，如下：

```cpp
std::function<int(int ,int)>  a = add; 
std::function<int(int ,int)>  b = mod ; 
std::function<int(int ,int)>  c = divide();
```

## 17、std::bind

std::bind是一个通用的函数适配器，它可接受一个可调用对象，生成一个新的可调用对象，使用原来的参数列表

```cpp
#include <functional>
#include <iostream>

int add(int a,int b) {
    return a+b;
}
int main(){
    auto fn = std::bind(add, std::placeholders::_1,3); //普通函数作实参，会隐式的转换为函数指针。 _1 _2 _3在functional中为占位符
    std::cout<<fn(4)<<std::endl; //output: 7
}
```

## 18、智能指针
C++11之前，auto_ptr
C++11之后，unique_ptr、shared_ptr、weak_ptr
> 智能指针主要用于管理在堆上分配的内存，它将普通的指针封装为一个栈对象。当栈对象的生存周期结束后，会在析构函数中释放掉申请的内存，从而防止内存泄漏。C++ 11中最常用的智能指针类型为shared_ptr,它采用引用计数的方法，记录当前内存资源被多少个智能指针引用。该引用计数的内存在堆上分配。当新增一个时引用计数加1，当过期时引用计数减一。只有引用计数为0时，智能指针才会自动释放引用的内存资源。对shared_ptr进行初始化时不能将一个普通指针直接赋值给智能指针，因为一个是指针，一个是类。可以通过make_shared函数或者通过构造函数传入普通指针。并可以通过get函数获得普通指针。





**weak_ptr**

-  weak_ptr指向shared_ptr管理的对象，但不会增加shared_ptr的引用计数 
-  weak_ptr没有重载*和->方法 
-  使用 
   - use_count方法观察shared_ptr的引用技术
   - expired方法判断shared_ptr是否被销毁
   - lock方法创建一个新的shared_ptr对象

## 19、右值引用

右值引用、移动语义、移动构造

**右值**

（1）等号左边的就叫左值，等号右边的就叫右值。

（2）能对表达式取地址的就是左值（lvalue），不能的就是右值（rvalue）。

（3）纯右值（prvalue）就是C++98上标准右值，如2、true、"hello"。

（4）将亡值（xvalue）是C+11新增的和右值引用相关的表达式，表示该对象即将消亡：返回右值引用的函数的调用表达式、转换为右值引用的转换函数的调用表达式。

（5）左值和将亡值合称为泛左值（glvalue）。

**右值引用**

左值引用&

右值引用&&

**移动构造函数**

右值主要用来实现移动构造函数，资源给了新的移动构造函数的对象，总的来说移动构造函数只交换资源的所有权。

**移动语义**

通过std::move将一个左值强制转换为右值引用。

**当左右值引用结合**

C++中规定

左值-左值 T& &=T&

左值-右值 T& &&=T&

右值-左值 T&& &=T&

右值-右值 T&& &&=T&&

**万能引用**

①普通函数中的一个参数要么接收左值类型要么接收右值类型，不能同时接收两种类型。

```cpp
void func(int&& var){};
int i=100;
func(i);//此时编译报错，只能接收右值
```

②&&并不一定代表右值引用有的情况还表示万能引用（必须配合模板）。

```cpp
//编译器通过引用折叠实现了万能引用
template<typename T>
void func(T&& var){};
func(100);
int i=100;
func(i);//传入左值编译器正常通过，这表明T&&左右值都可以接收；
```

## 20、完美转发

学习完右值引用之后，再来理解完美转发就会简单许多。调用模板函数给另一个函数传值时，为了将参数类型保持原本状态传入函数，需要使用完美转发std:forwrad() ，完美转发必须与模板一起使用，不能单独使用。

```cpp
//编译器通过引用折叠、万能引用、forward<T>()实现完美转发
template<typename T>
class A
{
    public:
    //成员函数实现完美转发需要单独定义模板
    template<typename F,typename T1,typename T2>
    void func(F f,T1&& t1,T2&& t2) {
        f(forward<T1>(t1), forward<T2>(t2));
    };
};

void Bfunc(int& var1, int&& var2) {};
template<typename F,typename T1,typename T2>
void Afunc(F f,T1&& t1,T2&& t2) {
f(forward<T1>(t1), forward<T2>(t2));
}

void main(){
int i=100;
A obj;
obj.func(Bfunc,i,200);
Afunc(Bfunc,i,200);
}
```

完美转发，不用担心实参在传入到转发函数时，形参发型类型改变。

详解：[https://blog.csdn.net/u014351125/article/details/84502427](https://blog.csdn.net/u014351125/article/details/84502427)

**推荐阅读**

《C++ Primer Plus （第6版）中文版》

《Effective Modern C++ 中文版》
