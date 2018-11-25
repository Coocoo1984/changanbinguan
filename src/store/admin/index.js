import Vue from "vue";

export default {
    state: {
        purchaseing: [

        ],
        purchases: [

        ],
        purchaseList: [
            {
                title: "XXX 采购单 201811220833",
                desc: "",
                slot: "<span class='orgin'>采购已确认</span>",
                status: 1
            },
            {
                title: "XXX 采购单 201811220833",
                desc: "",
                slot: "<span class='blur'>备货中</span>",
                status: 2
            },
            {
                title: "XXX 采购单 201811220833",
                desc: "",
                slot: "<span class='blur'>收货中</span>",
                status: 3
            },
            {
                title: "XXX 采购单 201811220833",
                desc: "",
                slot: "<span class='green'>完成</span>",
                status: 4
            }
        ]
    },
    mutations: {
        pushPurchase(state, item) {
            state.purchaseing.push(item);
        },
        pushPurchases(state, item) {
            state.purchases.push(item);
        },
        pushPurchaseList(state, item) {
            state.purchaseList.push(item);
        },
        removePurchase(state, index) {
            Vue.delete(state.purchases, index)
        }
    }
}