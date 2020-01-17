const html = `
<html>

<head>
    <meta charset="UTF-8">
    <title>自定义筛选条件页面</title>
</head>

<body>
    <div>
        <h1>自定义筛选条件页面</h1>
        <form>
            <table>
                <thead>内网付款</thead>
                <tr>
                    <th>单位：</th>
                    <th>
                        <input type="checkbox" name="corp1"><label for="">单位1</label>
                        <input type="checkbox" name="corp2"><label for="">单位2</label>
                        <input type="checkbox" name="corp3"><label for="">单位3</label>
                    </th>
                </tr>
                <tr>
                    <th>付款账号</th>
                    <th>
                        <input type="checkbox" name="account1"><label for="">账号1</label>
                        <input type="checkbox" name="account2"><label for="">账号2</label>
                        <input type="checkbox" name="account3"><label for="">账号3</label>
                    </th>
                </tr>
                <tr>
                    <th>金额</th>
                    <th>
                        <input type="text" placeholder="金额1" name="money1">-
                        <input type="text" placeholder="金额2" name="money2">
                    </th>
                </tr>
                <tr>
                    <th>用途</th>
                    <th>
                        <input type="text" placeholder="用途" name="mark">
                    </th>
                </tr>
            </table>
        </form>
    </div>

    <script>
        // 记录自定义筛选条件数据
        let customCondition = {};

        function resetConditions() {
            // alert("重置筛选条件");
            customCondition = {
                // 内网付款
                intranetPayment: {
                    corpIds: [],
                    paymentAccounts: [],
                    money1: null,
                    money2: null,
                    use: null
                }
            };
        }
        
        resetConditions();

        function submitConditions() {
            // alert("提交筛选条件");
            // customCondition.intranetPayment.use="test";
            window.BTAppBridge.submitConditions && window.BTAppBridge.submitConditions(customCondition);
        }


    </script>

</body>
</html>
`;

export default html;
