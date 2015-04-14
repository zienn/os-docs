namelist=['zhangjie','xiaoming','xiaowang','xiaoqiang']
passwdlist=['123','abcd','efg','qwe']

commoditylist=['apple','apple','orange','peach','Apricot','bag','computer','pen','Pencil']
blacklist=[]
shoppingcart=[]
num = 0
while True:
    name = raw_input("请输入用户名：")
    if name in namelist:
        passwd = raw_input("请输入密码：")
        p = passwdlist[namelist.index(name)]
        while True:
            if passwd != p:
                passwd = raw_input("密码不正确，请重新输入密码：")
                num +=1
                if num >= 3:
                    blacklist.append(name)
                    if name in blacklist:
                        print "用户已被锁定..."
            else:
                print "=====================.欢迎光临.===================="
                print "我们可提供的商品有:\n=================================================="
                for i in commoditylist:
                    print i
                print "==================================================\n请将你选好的商品放入购物车"
                while True:
                    commodity = raw_input("请将你选好的商品放入购物车 (提示：输入end 结束购物 )：")
                    if not commodity:
                        continue
                    if commodity in commoditylist:
                        shoppingcart.append(commodity)
                        commoditylist.remove(commodity)
                    else:
                        print "你要的 %s 没有货了...请选择其它商品" % (commodity)
                    if commodity == "end":
                        for i in shoppingcart:
                            print "购物车商品：%s\n" %(i)
                        break
                break
    else:
        print "用户名不存在"
        continue
    break